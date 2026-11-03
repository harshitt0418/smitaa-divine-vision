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

// Resilient memory cache for serverless / offline MongoDB fallback
const memoryBookings = new Map();

const DEFAULT_WHATSAPP = "919119860551";
const DEFAULT_PAYMENT_LINK = "https://razorpay.me/@diivinevision";

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
 * Create a Razorpay Order and Booking Record
 * Server-side validation of schedule (Mon-Fri, 1-5 PM), prices, and client details
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
      return res.status(400).json({ error: "Client name is required." });
    }

    if (!clientPhone || !clientPhone.trim()) {
      return res.status(400).json({ error: "WhatsApp / phone number is required." });
    }

    const service = findServiceOrClass(serviceId);
    if (!service) {
      return res.status(400).json({
        error: "Invalid service or class selection. Please choose from our official offerings.",
      });
    }

    // Consultation schedule validation: Monday to Friday only, 1:00 PM to 5:00 PM
    if (service.serviceType === "consultation") {
      const scheduleValidation = validateAppointmentSchedule(appointmentDate, appointmentTime);
      if (!scheduleValidation.valid) {
        return res.status(400).json({ error: scheduleValidation.error });
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
 * Verify Razorpay payment signature
 * Only after cryptographic verification is successful, generate the verified WhatsApp redirection
 */
export async function verifyPayment(req, res) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingReference,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        verified: false,
        error: "Missing required payment parameters (order id, payment id, or signature).",
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(500).json({
        success: false,
        verified: false,
        error: "Server payment configuration missing. Cannot cryptographically verify payment without RAZORPAY_KEY_SECRET.",
      });
    }

    // Cryptographic HMAC SHA-256 Signature Verification
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

    // Payment is verified! Find and update the booking
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

    const paidAt = new Date();

    if (booking && booking.save) {
      booking.status = "PAID";
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;
      booking.paidAt = paidAt;
      await booking.save();
    } else if (booking) {
      booking.status = "PAID";
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;
      booking.paidAt = paidAt;
      memoryBookings.set(razorpay_order_id, booking);
      if (booking.reference) memoryBookings.set(booking.reference, booking);
    }

    const clientName = booking ? booking.clientName : "Valued Client";
    const serviceName = booking ? booking.serviceName : "Consultation / Class";
    const amount = booking ? booking.amount : "";
    const appointmentDate = booking ? booking.appointmentDate : null;
    const appointmentTime = booking ? booking.appointmentTime : null;
    const refCode = booking ? booking.reference : bookingReference || razorpay_order_id;
    const serviceType = booking ? booking.serviceType : "consultation";

    // Build prefilled WhatsApp message
    let whatsappText = "";
    if (serviceType === "recorded-class") {
      whatsappText = [
        "Namaste Smita Singh,",
        `I have enrolled and confirmed payment for the online recorded class:`,
        `• Name: ${clientName}`,
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
        `• Name: ${clientName}`,
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
      message: "Payment successfully verified.",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      bookingReference: refCode,
      booking: {
        clientName,
        serviceName,
        amount,
        appointmentDate,
        appointmentTime,
        serviceType,
        status: "PAID",
        paidAt,
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
