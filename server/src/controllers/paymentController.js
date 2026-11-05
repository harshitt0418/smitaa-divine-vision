import crypto from "crypto";
import Razorpay from "razorpay";
import { Booking } from "../models/Booking.js";
import { isDbConnected } from "../config/db.js";
import {
  CONSULTATION_SERVICES,
  RECORDED_CLASSES,
  findServiceOrClass,
  validateAppointmentSchedule,
} from "../config/servicesCatalog.js";
import { notifyOwnerOfBooking } from "../services/notificationService.js";

// Resilient memory cache for serverless / offline MongoDB fallback
export const memoryBookings = new Map();

const DEFAULT_WHATSAPP = "919119860551";
const DEFAULT_PAYMENT_LINK = "https://razorpay.me/@diivinevision";

export const ALL_TIME_SLOTS = [
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

/**
 * Public payment configuration
 * Never exposes the RAZORPAY_KEY_SECRET
 */
export function getPaymentConfig(req, res) {
  const isConfigured = Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  );

  return res.status(200).json({
    keyId: process.env.RAZORPAY_KEY_ID || null,
    paymentLink: process.env.RAZORPAY_PAYMENT_LINK || DEFAULT_PAYMENT_LINK,
    whatsappNumber: process.env.WHATSAPP_BUSINESS_NUMBER || DEFAULT_WHATSAPP,
    isConfigured,
    currency: "INR",
    supportedMethods: ["UPI", "Cards (Visa, MasterCard, RuPay)", "Net Banking", "Wallets"],
  });
}

/**
 * Public Services and Recorded Classes Catalog
 */
export function getCatalog(req, res) {
  return res.status(200).json({
    consultations: CONSULTATION_SERVICES,
    recordedClasses: RECORDED_CLASSES,
  });
}

/**
 * Get Available Time Slots for a given date
 * Enforces Monday–Friday, 1:00 PM – 5:00 PM, and filters out already booked slots
 */
export async function getAvailableSlots(req, res) {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required (YYYY-MM-DD)." });
    }

    // Validate date format and weekday
    const dateParts = date.split("-");
    if (dateParts.length !== 3) {
      return res.status(400).json({ error: "Invalid date format. Expected YYYY-MM-DD." });
    }

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);

    const targetDate = new Date(year, month, day, 12, 0, 0);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid appointment date selected." });
    }

    const dayOfWeek = targetDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(400).json({
        error: "Appointments are only available Monday through Friday. Weekends are closed.",
        isWeekend: true,
      });
    }

    // Prevent past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day, 0, 0, 0);
    if (checkDate < today) {
      return res.status(400).json({
        error: "Appointment date cannot be in the past.",
        isPast: true,
      });
    }

    // Query booked slots from MongoDB or memory cache
    let bookedBookings = [];
    if (isDbConnected()) {
      try {
        bookedBookings = await Booking.find({
          appointmentDate: date,
          status: "PAID",
        }).select("appointmentTime");
      } catch (dbErr) {
        console.warn("[MongoDB Slot Query Error] Falling back to memory cache:", dbErr.message);
      }
    }

    const bookedTimes = new Set(
      bookedBookings.map((b) => b.appointmentTime).filter(Boolean)
    );

    // Merge memoryBookings if any are present
    for (const b of memoryBookings.values()) {
      if (b.appointmentDate === date && b.status === "PAID" && b.appointmentTime) {
        bookedTimes.add(b.appointmentTime);
      }
    }

    const bookedSlots = Array.from(bookedTimes);
    const availableSlots = ALL_TIME_SLOTS.filter((slot) => !bookedTimes.has(slot));

    return res.status(200).json({
      date,
      allSlots: ALL_TIME_SLOTS,
      bookedSlots,
      availableSlots,
    });
  } catch (error) {
    console.error("[Get Available Slots Error]", error);
    return res.status(500).json({ error: "Failed to fetch appointment availability." });
  }
}

/**
 * Create a Razorpay Order and Booking Record
 * Server-side validation of schedule (Mon-Fri, 1-5 PM), prices, duplicate slots, and client details
 */
export async function createOrder(req, res) {
  try {
    const {
      serviceId,
      clientName,
      clientPhone,
      clientEmail,
      appointmentDate,
      appointmentTime,
      notes,
    } = req.body;

    if (!clientName || !clientName.trim()) {
      return res.status(400).json({ error: "Customer name is required." });
    }

    if (!clientPhone || !clientPhone.trim()) {
      return res.status(400).json({ error: "Mobile number is required." });
    }

    const service = findServiceOrClass(serviceId);
    if (!service) {
      return res.status(400).json({
        error: "Invalid service selection. Please choose from our official offerings.",
      });
    }

    // Consultation schedule validation: Monday to Friday only, 1:00 PM to 5:00 PM
    if (service.serviceType === "consultation") {
      const scheduleValidation = validateAppointmentSchedule(appointmentDate, appointmentTime);
      if (!scheduleValidation.valid) {
        return res.status(400).json({ error: scheduleValidation.error });
      }

      // Duplicate booking prevention: check if this exact slot is already booked and paid
      let existingBooking = null;
      if (isDbConnected()) {
        try {
          existingBooking = await Booking.findOne({
            appointmentDate,
            appointmentTime,
            status: "PAID",
          });
        } catch (dbErr) {
          console.warn("[MongoDB Duplicate Check Error]", dbErr.message);
        }
      }

      if (!existingBooking) {
        for (const b of memoryBookings.values()) {
          if (
            b.appointmentDate === appointmentDate &&
            b.appointmentTime === appointmentTime &&
            b.status === "PAID"
          ) {
            existingBooking = b;
            break;
          }
        }
      }

      if (existingBooking) {
        return res.status(409).json({
          error: `The appointment slot on ${appointmentDate} at ${appointmentTime} has already been reserved. Please choose another available slot.`,
        });
      }
    }

    // Generate unique reference
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    const bookingReference = `SDV-${timestamp}-${randomSuffix}`;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    let razorpayOrderId = null;

    if (keyId && keySecret) {
      try {
        const razorpay = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const order = await razorpay.orders.create({
          amount: Math.round(service.price * 100), // In paise
          currency: "INR",
          receipt: bookingReference,
          notes: {
            bookingReference,
            serviceName: service.name,
            serviceType: service.serviceType,
            clientName: clientName.trim(),
            clientPhone: clientPhone.trim(),
            clientEmail: (clientEmail || "").trim(),
            appointmentDate: appointmentDate || "N/A (Recorded Class)",
            appointmentTime: appointmentTime || "N/A",
          },
        });

        razorpayOrderId = order.id;
      } catch (rzpErr) {
        console.error("[Razorpay API Error]", rzpErr);
        return res.status(502).json({
          error: "Failed to create payment order with Razorpay gateway. Please try again or contact support.",
          details: process.env.NODE_ENV === "development" ? rzpErr.message : undefined,
        });
      }
    }

    const bookingPayload = {
      reference: bookingReference,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: (clientEmail || "").trim(),
      serviceId: service.id,
      serviceName: service.name,
      serviceType: service.serviceType,
      amount: service.price,
      currency: "INR",
      appointmentDate: appointmentDate || null,
      appointmentTime: appointmentTime || null,
      notes: (notes || "").trim(),
      status: "PENDING",
      razorpayOrderId,
      ownerNotified: false,
    };

    // Save in DB if connected
    if (isDbConnected()) {
      try {
        const bookingDoc = new Booking(bookingPayload);
        await bookingDoc.save();
      } catch (dbErr) {
        console.warn("[MongoDB Booking Save Error] Falling back to memory cache:", dbErr.message);
      }
    }

    // Always keep in memory store for verification fallback
    memoryBookings.set(bookingReference, { ...bookingPayload, createdAt: new Date() });
    if (razorpayOrderId) {
      memoryBookings.set(razorpayOrderId, { ...bookingPayload, createdAt: new Date() });
    }

    // If Razorpay keys are configured, return active Razorpay checkout payload
    if (keyId && keySecret && razorpayOrderId) {
      return res.status(200).json({
        success: true,
        orderId: razorpayOrderId,
        amount: Math.round(service.price * 100),
        currency: "INR",
        keyId,
        bookingReference,
        serviceName: service.name,
        service: {
          id: service.id,
          name: service.name,
          price: service.price,
          serviceType: service.serviceType,
        },
        client: {
          name: clientName.trim(),
          phone: clientPhone.trim(),
          email: (clientEmail || "").trim(),
        },
        appointmentDate: appointmentDate || null,
        appointmentTime: appointmentTime || null,
      });
    }

    // Graceful fallback when Razorpay keys are not yet configured in environment
    return res.status(200).json({
      success: true,
      mode: "manual_link_fallback",
      keyMissing: true,
      bookingReference,
      serviceName: service.name,
      paymentLink: process.env.RAZORPAY_PAYMENT_LINK || DEFAULT_PAYMENT_LINK,
      amount: service.price,
      currency: "INR",
      service: {
        id: service.id,
        name: service.name,
        price: service.price,
        serviceType: service.serviceType,
      },
      client: {
        name: clientName.trim(),
        phone: clientPhone.trim(),
        email: (clientEmail || "").trim(),
      },
      appointmentDate: appointmentDate || null,
      appointmentTime: appointmentTime || null,
      message:
        "Razorpay API keys (RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET) are pending in environment configuration. You may make payment via the official Razorpay link https://razorpay.me/@diivinevision.",
    });
  } catch (error) {
    console.error("[Create Order Error]", error);
    return res.status(500).json({ error: "Failed to create booking order." });
  }
}

/**
 * Verify Razorpay payment signature or captured payment
 * Strictly verifies server-side, updates status to PAID, and notifies the website owner
 */
export async function verifyPayment(req, res) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingReference,
    } = req.body;

    if (!razorpay_payment_id) {
      return res.status(400).json({
        success: false,
        verified: false,
        error: "Missing required payment ID parameter.",
      });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return res.status(500).json({
        success: false,
        verified: false,
        error: "Server payment configuration missing. Cannot cryptographically verify payment without RAZORPAY_KEY_SECRET.",
      });
    }

    // Find the booking first to check idempotency
    let booking = null;

    if (isDbConnected()) {
      try {
        booking = await Booking.findOne({
          $or: [
            { razorpayOrderId: razorpay_order_id },
            { reference: bookingReference },
          ],
        });
      } catch (dbErr) {
        console.warn("[MongoDB Lookup Error]", dbErr.message);
      }
    }

    if (!booking) {
      booking =
        memoryBookings.get(razorpay_order_id) ||
        memoryBookings.get(bookingReference);
    }

    // Idempotency: If this booking is already marked PAID, return existing verified response without duplicating notifications
    if (booking && booking.status === "PAID") {
      const clientName = booking.clientName;
      const serviceName = booking.serviceName;
      const amount = booking.amount;
      const appointmentDate = booking.appointmentDate;
      const appointmentTime = booking.appointmentTime;
      const refCode = booking.reference;
      const serviceType = booking.serviceType;

      const whatsappText = [
        "Namaste Smita Singh,",
        `I have booked and confirmed payment for my consultation:`,
        `• Customer Name: ${clientName}`,
        `• Mobile: ${booking.clientPhone}`,
        `• Service: ${serviceName}${amount ? ` (₹${amount.toLocaleString("en-IN")})` : ""}`,
        `• Appointment: ${appointmentDate || "Selected weekday"}, ${appointmentTime || "1:00 PM - 5:00 PM"}`,
        `• Payment ID: ${booking.razorpayPaymentId || razorpay_payment_id}`,
        `• Order Ref: ${refCode}`,
        "",
        "Looking forward to our session. Please confirm my appointment.",
      ].join("\n");

      const whatsappNumber = process.env.WHATSAPP_BUSINESS_NUMBER || DEFAULT_WHATSAPP;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

      return res.status(200).json({
        success: true,
        verified: true,
        alreadyVerified: true,
        message: "Payment was previously verified.",
        paymentId: booking.razorpayPaymentId || razorpay_payment_id,
        orderId: booking.razorpayOrderId || razorpay_order_id || null,
        bookingReference: refCode,
        booking,
        whatsappUrl,
        whatsappText,
      });
    }

    let isVerified = false;

    // Method 1: Cryptographic HMAC SHA-256 Signature Verification from Razorpay Checkout
    if (razorpay_order_id && razorpay_signature) {
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      const isMatch =
        expectedSignature.length === razorpay_signature.length &&
        crypto.timingSafeEqual(
          Buffer.from(expectedSignature),
          Buffer.from(razorpay_signature)
        );

      if (!isMatch) {
        console.warn(
          `[Payment Verification Failed] Mismatch for order ${razorpay_order_id} and payment ${razorpay_payment_id}`
        );
        return res.status(400).json({
          success: false,
          verified: false,
          error: "Payment verification failed. Cryptographic signature does not match.",
        });
      }
      isVerified = true;
    } else if (keyId && keySecret) {
      // Method 2: Direct API fetch verification for payments made via Razorpay Link
      try {
        const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
        const payment = await razorpay.payments.fetch(razorpay_payment_id);
        if (payment && (payment.status === "captured" || payment.status === "authorized")) {
          isVerified = true;
        } else {
          return res.status(400).json({
            success: false,
            verified: false,
            error: `Payment is currently in '${payment?.status}' state and not yet captured.`,
          });
        }
      } catch (fetchErr) {
        return res.status(400).json({
          success: false,
          verified: false,
          error: `Could not verify payment ID '${razorpay_payment_id}' with Razorpay: ${fetchErr.message}`,
        });
      }
    }

    if (!isVerified) {
      return res.status(400).json({
        success: false,
        verified: false,
        error: "Payment could not be verified. Please complete payment before continuing.",
      });
    }

    const paidAt = new Date();

    if (booking && booking.save) {
      booking.status = "PAID";
      booking.razorpayPaymentId = razorpay_payment_id;
      if (razorpay_signature) booking.razorpaySignature = razorpay_signature;
      booking.paidAt = paidAt;
      await booking.save();
    } else if (booking) {
      booking.status = "PAID";
      booking.razorpayPaymentId = razorpay_payment_id;
      if (razorpay_signature) booking.razorpaySignature = razorpay_signature;
      booking.paidAt = paidAt;
      if (razorpay_order_id) memoryBookings.set(razorpay_order_id, booking);
      if (booking.reference) memoryBookings.set(booking.reference, booking);
    }

    const clientName = booking ? booking.clientName : "Valued Client";
    const clientPhone = booking ? booking.clientPhone : "";
    const clientEmail = booking ? booking.clientEmail : "";
    const serviceName = booking ? booking.serviceName : "Consultation / Class";
    const amount = booking ? booking.amount : "";
    const appointmentDate = booking ? booking.appointmentDate : null;
    const appointmentTime = booking ? booking.appointmentTime : null;
    const refCode = booking ? booking.reference : bookingReference || razorpay_order_id || razorpay_payment_id;
    const serviceType = booking ? booking.serviceType : "consultation";
    const notes = booking ? booking.notes : "";

    // =========================================================================
    // OWNER NOTIFICATION: Send email/webhook notification strictly after payment
    // =========================================================================
    const notificationPayload = {
      clientName,
      clientPhone,
      clientEmail,
      serviceName,
      serviceType,
      appointmentDate,
      appointmentTime,
      amount,
      currency: "INR",
      status: "PAID",
      reference: refCode,
      razorpayPaymentId,
      razorpayOrderId: razorpay_order_id || null,
      notes,
      paidAt,
      ownerNotified: booking ? booking.ownerNotified : false,
    };

    const notificationResult = await notifyOwnerOfBooking(notificationPayload);

    // Update notification status on booking
    if (booking && booking.save) {
      booking.ownerNotified = true;
      booking.ownerNotifiedAt = new Date();
      booking.notificationChannel = notificationResult.emailSent
        ? "email"
        : notificationResult.webhookSent
        ? "webhook"
        : "mock_logged";
      await booking.save();
    } else if (booking) {
      booking.ownerNotified = true;
      booking.ownerNotifiedAt = new Date();
    }

    // Build prefilled WhatsApp message for customer redirect
    let whatsappText = "";
    if (serviceType === "recorded-class") {
      whatsappText = [
        "Namaste Smita Singh,",
        `I have enrolled and confirmed payment for the online recorded class:`,
        `• Customer Name: ${clientName}`,
        `• Mobile: ${clientPhone}`,
        `• Class: ${serviceName}${amount ? ` (₹${amount.toLocaleString("en-IN")})` : ""}`,
        `• Payment ID: ${razorpay_payment_id}`,
        `• Order Ref: ${refCode}`,
        "",
        "Please grant Google Drive access to the course recordings and study material.",
      ].join("\n");
    } else {
      whatsappText = [
        "Namaste Smita Singh,",
        `I have booked and confirmed payment for my consultation:`,
        `• Customer Name: ${clientName}`,
        `• Mobile: ${clientPhone}`,
        `• Service: ${serviceName}${amount ? ` (₹${amount.toLocaleString("en-IN")})` : ""}`,
        `• Appointment: ${appointmentDate || "Selected weekday"}, ${appointmentTime || "1:00 PM - 5:00 PM"}`,
        `• Payment ID: ${razorpay_payment_id}`,
        `• Order Ref: ${refCode}`,
        "",
        "Looking forward to our session. Please confirm my appointment.",
      ].join("\n");
    }

    const whatsappNumber = process.env.WHATSAPP_BUSINESS_NUMBER || DEFAULT_WHATSAPP;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    return res.status(200).json({
      success: true,
      verified: true,
      message: "Payment successfully verified and appointment confirmed.",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id || null,
      bookingReference: refCode,
      booking: {
        clientName,
        clientPhone,
        clientEmail,
        serviceName,
        amount,
        appointmentDate,
        appointmentTime,
        serviceType,
        status: "PAID",
        paidAt,
        ownerNotified: true,
      },
      whatsappUrl,
      whatsappText,
    });
  } catch (error) {
    console.error("[Payment Verification Error]", error);
    return res.status(500).json({
      success: false,
      verified: false,
      error: "An unexpected error occurred during payment verification.",
    });
  }
}
