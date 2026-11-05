import React, { useState, useMemo, useEffect } from "react";
import {
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  CreditCard,
  RotateCcw,
  Check,
  Loader2,
} from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CONSULTATION_SERVICES, getConsultationById } from "../../data/services";
import { createPaymentOrder, verifyPayment, getAvailableSlots } from "../../services/api";

const TIME_SLOTS = [
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

// Helper to load Razorpay checkout script
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Helper to format date string YYYY-MM-DD to readable English
function formatReadableDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Generate the next 5 upcoming weekdays (Mon–Fri only) for quick selection
function getUpcomingWeekdays() {
  const list = [];
  const curr = new Date();
  curr.setDate(curr.getDate() + 1); // Start from tomorrow

  while (list.length < 5) {
    const day = curr.getDay();
    if (day >= 1 && day <= 5) {
      const yyyy = curr.getFullYear();
      const mm = String(curr.getMonth() + 1).padStart(2, "0");
      const dd = String(curr.getDate()).padStart(2, "0");
      list.push({
        iso: `${yyyy}-${mm}-${dd}`,
        label: curr.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        full: curr.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
      });
    }
    curr.setDate(curr.getDate() + 1);
  }
  return list;
}

export default function AppointmentBookingModal({
  isOpen,
  onClose,
  initialServiceId = "astrology-consultation",
}) {
  const [step, setStep] = useState(1); // 1: Schedule & Service, 2: Client Info, 3: Review & Pay, 4: Verified
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [dateError, setDateError] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNotes, setClientNotes] = useState("");

  const [bookedSlots, setBookedSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | processing | failed | cancelled | verified

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fallbackMode, setFallbackMode] = useState(null);
  const [verifiedData, setVerifiedData] = useState(null);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  // Query dynamic availability whenever appointmentDate changes
  useEffect(() => {
    let isCurrent = true;
    if (!appointmentDate || Boolean(dateError)) {
      setBookedSlots([]);
      return;
    }

    setIsLoadingSlots(true);
    getAvailableSlots(appointmentDate)
      .then((res) => {
        if (!isCurrent) return;
        const booked = Array.isArray(res?.bookedSlots) ? res.bookedSlots : [];
        setBookedSlots(booked);

        // If currently chosen time slot is booked, notify and clear it
        if (appointmentTime && booked.includes(appointmentTime)) {
          setAppointmentTime("");
          setErrorMessage(
            `The ${appointmentTime} slot on ${formatReadableDate(
              appointmentDate
            )} was already booked. Please choose another available time.`
          );
        }
      })
      .catch((err) => {
        console.warn("Slot check error:", err);
      })
      .finally(() => {
        if (isCurrent) setIsLoadingSlots(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [appointmentDate, dateError]);

  const selectedService = useMemo(() => {
    return getConsultationById(selectedServiceId);
  }, [selectedServiceId]);

  const upcomingWeekdays = useMemo(() => getUpcomingWeekdays(), []);

  const minDateIso = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const handleDateChange = (val) => {
    setAppointmentDate(val);
    if (!val) {
      setDateError("");
      return;
    }
    const parts = val.split("-");
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const day = d.getDay();
      if (day === 0 || day === 6) {
        setDateError("Appointments are strictly Monday to Friday. Saturdays & Sundays are closed.");
      } else {
        setDateError("");
      }
    }
  };

  const resetState = () => {
    setStep(1);
    setAppointmentDate("");
    setAppointmentTime("");
    setBookedSlots([]);
    setDateError("");
    setErrorMessage("");
    setPaymentStatus("idle");
    setFallbackMode(null);
    setVerifiedData(null);
    onClose();
  };

  const handleStep1Next = (e) => {
    e.preventDefault();
    if (!appointmentDate) {
      setDateError("Please select a date for your appointment.");
      return;
    }
    if (dateError) {
      return;
    }
    if (!appointmentTime) {
      setErrorMessage("Please select an appointment time between 1:00 PM and 5:00 PM.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handleStep2Next = (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!clientPhone.trim() || clientPhone.trim().length < 8) {
      setErrorMessage("Please enter a valid WhatsApp or phone contact number.");
      return;
    }
    setErrorMessage("");
    setStep(3);
  };

  // Step 3: Initiate Razorpay Checkout and Server-side Verification
  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    setErrorMessage("");
    setPaymentStatus("processing");

    try {
      // 1. Create order on backend (strictly for the authoritative service price)
      const orderData = await createPaymentOrder({
        serviceId: selectedService.id,
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        clientEmail: clientEmail.trim(),
        appointmentDate,
        appointmentTime,
        notes: clientNotes.trim(),
      });

      const effectiveKeyId = orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID;

      // If Razorpay keys are not yet configured in server environment, show direct WhatsApp booking
      if (!effectiveKeyId) {
        setFallbackMode(orderData);
        setIsProcessing(false);
        return;
      }

      // 2. Load Razorpay Checkout SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Unable to load Razorpay payment SDK. Please check your internet connection.");
      }

      // 3. Configure Razorpay modal with fixed amount
      const options = {
        key: effectiveKeyId,
        amount: orderData.amount || Math.round(selectedService.price * 100), // Exact fixed amount in paise
        currency: orderData.currency || "INR",
        name: "Smitaa Divine Vision",
        description: `${selectedService.name} — Fixed Fee: ${selectedService.formattedPrice}`,
        image: "/assets/official-logo-dv.jpg",
        order_id: orderData.orderId || undefined,
        prefill: {
          name: clientName,
          contact: clientPhone,
          email: clientEmail || "",
        },
        theme: {
          color: "#D4AF37",
        },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            setIsProcessing(false);
            setPaymentStatus("cancelled");
          },
        },
        // 4. Verification callback: Server-side HMAC SHA-256 verification and automatic WhatsApp redirection
        handler: async function (response) {
          try {
            setIsProcessing(true);
            const verifyResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingReference: orderData.bookingReference,
            });

            if (verifyResult.verified && verifyResult.success) {
              setPaymentStatus("verified");
              setVerifiedData(verifyResult);
              setStep(4);
              // Automatic instant redirect straight to WhatsApp
              if (verifyResult.whatsappUrl) {
                window.location.href = verifyResult.whatsappUrl;
              }
            } else {
              setPaymentStatus("failed");
              setErrorMessage("Payment verification failed. Please contact Smita Singh with your payment reference.");
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            // Fallback direct WhatsApp redirect with payment ID
            const fallbackWhatsappText = encodeURIComponent(
              `Namaste Smita Singh,\nI have completed payment of ${selectedService.formattedPrice} for ${selectedService.name}:\n• Payment ID: ${response.razorpay_payment_id}\n• Name: ${clientName}\n• Appointment: ${formatReadableDate(appointmentDate)} at ${appointmentTime}`
            );
            window.location.href = `https://wa.me/919119860551?text=${fallbackWhatsappText}`;
          } finally {
            setIsProcessing(false);
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
        console.error("Razorpay Payment Failed:", response.error);
        setPaymentStatus("failed");
        setErrorMessage(
          (response.error && response.error.description) ||
            "Payment was not completed. Your booking details and chosen slot are preserved. Please retry your payment."
        );
        setIsProcessing(false);
      });

      razorpayInstance.open();
    } catch (err) {
      console.error("Payment flow error:", err);
      setPaymentStatus("failed");
      setErrorMessage(err.message || "Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetState}
      title={step === 4 ? "Appointment Confirmed & Verified" : "Book Consultation & Appointment"}
      maxWidth="max-w-xl"
    >
      {/* Progress Steps Header */}
      {step < 4 && (
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10 text-xs">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? "bg-gold-500 text-midnight-950" : "bg-white/10 text-ivory-muted"
              }`}
            >
              1
            </span>
            <span className={step >= 1 ? "text-gold-300 font-semibold" : "text-ivory-muted"}>
              Schedule
            </span>
          </div>
          <div className="w-8 h-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? "bg-gold-500 text-midnight-950" : "bg-white/10 text-ivory-muted"
              }`}
            >
              2
            </span>
            <span className={step >= 2 ? "text-gold-300 font-semibold" : "text-ivory-muted"}>
              Details
            </span>
          </div>
          <div className="w-8 h-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? "bg-gold-500 text-midnight-950" : "bg-white/10 text-ivory-muted"
              }`}
            >
              3
            </span>
            <span className={step >= 3 ? "text-gold-300 font-semibold" : "text-ivory-muted"}>
              Review & Pay
            </span>
          </div>
        </div>
      )}

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 1: SERVICE SELECTION & SCHEDULE (MON-FRI 1PM - 5PM) */}
      {/* ======================================================== */}
      {step === 1 && (
        <form onSubmit={handleStep1Next} className="space-y-5">
          {/* Service Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1.5">
              Select Consultation or Healing Service
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-gold-500/30 text-ivory text-xs focus:outline-none focus:border-gold-400"
            >
              {CONSULTATION_SERVICES.map((s) => (
                <option key={s.id} value={s.id} className="bg-midnight-950 text-ivory">
                  {s.name} — {s.formattedPrice} ({s.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Service Spotlight Card */}
          <div className="p-3.5 rounded-xl bg-midnight-950/70 border border-gold-500/20 flex items-center justify-between">
            <div>
              <span className="text-xs font-cinzel font-bold text-ivory-light block">
                {selectedService.name}
              </span>
              <span className="text-[11px] text-ivory-muted">
                {selectedService.duration} • {selectedService.tagline}
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="font-cinzel text-base sm:text-lg font-bold text-gold-400">
                {selectedService.formattedPrice}
              </span>
            </div>
          </div>

          {/* Schedule Rules Notice */}
          <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-gold-300 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-gold-200">
                Official Consultation Hours:
              </span>
              <span>
                Monday through Friday, from <strong>1:00 PM to 5:00 PM IST</strong>. (Weekends closed)
              </span>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <label htmlFor="appointment-date" className="block text-xs font-medium text-ivory-soft">
              Choose Appointment Date (Monday to Friday only) *
            </label>

            {/* Quick Weekday Chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {upcomingWeekdays.map((slot) => {
                const isSelected = appointmentDate === slot.iso;
                return (
                  <button
                    key={slot.iso}
                    type="button"
                    onClick={() => handleDateChange(slot.iso)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                      isSelected
                        ? "bg-gold-500 text-midnight-950 border-gold-400 font-bold shadow-gold-glow"
                        : "bg-midnight-950/60 text-ivory-soft border-white/10 hover:border-gold-500/40"
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>

            {/* Native Date Picker */}
            <input
              type="date"
              id="appointment-date"
              min={minDateIso}
              value={appointmentDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs transition-colors"
            />

            {dateError && (
              <p className="text-red-400 text-[11px] flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{dateError}</span>
              </p>
            )}

            {appointmentDate && !dateError && (
              <p className="text-emerald-400 text-[11px] flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Selected: {formatReadableDate(appointmentDate)}</span>
              </p>
            )}
          </div>

          {/* Time Slot Selection (1:00 PM - 5:00 PM) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-ivory-soft">
                Choose Preferred Time Slot (1:00 PM – 5:00 PM) *
              </label>
              {isLoadingSlots && (
                <span className="text-[11px] text-gold-300/80 flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Checking slot availability...
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isSelected = appointmentTime === slot;
                const isBooked = bookedSlots.includes(slot);

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isBooked}
                    onClick={() => {
                      if (!isBooked) {
                        setAppointmentTime(slot);
                        setErrorMessage("");
                      }
                    }}
                    title={isBooked ? `${slot} is already booked` : `Select ${slot}`}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all text-center relative ${
                      isBooked
                        ? "bg-midnight-950/40 text-ivory-muted/30 border-white/5 cursor-not-allowed opacity-60 line-through"
                        : isSelected
                        ? "bg-gold-500 text-midnight-950 border-gold-400 font-bold shadow-gold-glow scale-[1.02]"
                        : "bg-midnight-950/80 text-ivory-soft border-white/10 hover:border-gold-500/40 hover:bg-white/5"
                    }`}
                  >
                    <span>{slot}</span>
                    {isBooked && (
                      <span className="block text-[9px] no-underline uppercase tracking-wide text-red-400 font-normal">
                        Booked
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {bookedSlots.length > 0 && (
              <p className="text-[10px] text-ivory-muted pt-0.5">
                Note: Greylisted slots marked <span className="text-red-400 font-semibold">Booked</span> are already reserved for confirmed appointments.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
            <Button type="button" onClick={resetState} variant="outline" size="sm">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              disabled={!appointmentDate || Boolean(dateError) || !appointmentTime}
            >
              Continue to Details
            </Button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 2: CLIENT DETAILS (NAME & WHATSAPP NUMBER)          */}
      {/* ======================================================== */}
      {step === 2 && (
        <form onSubmit={handleStep2Next} className="space-y-4">
          <div className="p-3 rounded-xl bg-midnight-950/60 border border-white/10 text-xs text-ivory-muted">
            <span className="text-gold-300 font-semibold block mb-0.5">Appointment Summary:</span>
            <span>
              {selectedService.name} &bull; {formatReadableDate(appointmentDate)} at {appointmentTime}
            </span>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="client-name" className="block text-xs font-medium text-gold-300 mb-1">
              Your Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="client-name"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/40 transition-colors"
              />
            </div>
          </div>

          {/* WhatsApp / Phone */}
          <div>
            <label htmlFor="client-phone" className="block text-xs font-medium text-gold-300 mb-1">
              WhatsApp / Mobile Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                id="client-phone"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/40 transition-colors"
              />
            </div>
            <p className="text-[10px] text-ivory-muted mt-1">
              Required for appointment verification, session link, and WhatsApp confirmation.
            </p>
          </div>

          {/* Email (Optional) */}
          <div>
            <label htmlFor="client-email" className="block text-xs font-medium text-gold-300 mb-1">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                id="client-email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="e.g. ananya@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/40 transition-colors"
              />
            </div>
          </div>

          {/* Primary Consultation Focus Notes (Optional) */}
          <div>
            <label htmlFor="client-notes" className="block text-xs font-medium text-gold-300 mb-1">
              Primary Focus or Question (Optional)
            </label>
            <textarea
              id="client-notes"
              rows={2}
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder="e.g. Career transition timing, business name review, residential Vastu..."
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/40 transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex justify-between gap-3">
            <Button
              type="button"
              onClick={() => setStep(1)}
              variant="outline"
              size="sm"
              icon={ArrowLeft}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              disabled={!clientName.trim() || !clientPhone.trim()}
            >
              Review Booking & Pay
            </Button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 3: REVIEW SUMMARY & SECURE PAYMENT                  */}
      {/* ======================================================== */}
      {step === 3 && (
        <div className="space-y-5">
          {/* Review Step Card */}
          <div className="card-celestial p-4 sm:p-5 rounded-2xl border-gold-500/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] uppercase font-cinzel font-bold tracking-widest text-gold-400">
                Appointment Summary Review
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                Slot Reserved
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-start">
                <span className="text-ivory-muted">Selected Service:</span>
                <span className="font-semibold text-ivory-light text-right">{selectedService.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-ivory-muted">Appointment Date:</span>
                <span className="font-semibold text-gold-300">{formatReadableDate(appointmentDate)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-ivory-muted">Appointment Time:</span>
                <span className="font-semibold text-gold-300">{appointmentTime} IST</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-ivory-muted">Client Name:</span>
                <span className="font-semibold text-ivory-light">{clientName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-ivory-muted">WhatsApp Contact:</span>
                <span className="font-semibold text-ivory-light">{clientPhone}</span>
              </div>

              {clientEmail && (
                <div className="flex justify-between items-center">
                  <span className="text-ivory-muted">Email:</span>
                  <span className="text-ivory-soft">{clientEmail}</span>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-cinzel text-xs uppercase tracking-wider text-ivory-muted">
                  Total Fixed Fee:
                </span>
                <span className="font-cinzel text-xl sm:text-2xl font-bold text-gold-400">
                  {selectedService.formattedPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Retry Callout if payment failed or was dismissed */}
          {(paymentStatus === "cancelled" || paymentStatus === "failed") && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-start gap-2">
                <RotateCcw className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300 block">
                    {paymentStatus === "cancelled" ? "Payment Window Closed" : "Payment Incomplete"}
                  </span>
                  <p className="text-[11px] text-ivory-soft/90 mt-0.5">
                    Your appointment slot ({formatReadableDate(appointmentDate)} at {appointmentTime}) and details are preserved.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="primary"
                size="sm"
                icon={RotateCcw}
                onClick={handleProceedToPayment}
                disabled={isProcessing}
                className="shrink-0 text-xs font-bold shadow-gold-glow"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Missing Keys Notice if keys are not in environment yet */}
          {fallbackMode && (
            <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-gold-200 block">
                    Razorpay Account Connection
                  </span>
                  <p className="text-ivory-muted text-[11px] leading-relaxed">
                    To trigger the instant Razorpay popup directly on your website, please add your <code className="text-gold-300 font-mono">RAZORPAY_KEY_ID</code> to your server configuration. Alternatively, confirm your appointment directly with Smita Singh on WhatsApp below:
                  </p>
                </div>
              </div>

              <Button
                href={`https://wa.me/919119860551?text=${encodeURIComponent(
                  `Namaste Smita Singh,\nI would like to book an appointment:\n• Service: ${selectedService.name}\n• Date: ${formatReadableDate(appointmentDate)}\n• Time: ${appointmentTime} IST\n• Client: ${clientName} (${clientPhone})\n• Fee: ${selectedService.formattedPrice}`
                )}`}
                external
                variant="whatsapp"
                size="sm"
                icon={MessageCircle}
                className="w-full text-xs font-bold shadow-gold-glow"
              >
                Confirm Appointment on WhatsApp Directly &rarr;
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex justify-between gap-3">
            <Button
              type="button"
              onClick={() => setStep(2)}
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              disabled={isProcessing}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleProceedToPayment}
              variant="primary"
              size="md"
              icon={CreditCard}
              disabled={isProcessing}
              className="shadow-gold-glow font-bold text-xs sm:text-sm px-6"
            >
              {isProcessing ? "Opening Razorpay..." : `Pay ${selectedService.formattedPrice} via Razorpay`}
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 4: VERIFIED PAYMENT SUCCESS & WHATSAPP REDIRECTION  */}
      {/* ======================================================== */}
      {step === 4 && verifiedData && (
        <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse-glow">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[10px] font-cinzel font-bold tracking-widest text-emerald-400 uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 inline-block mb-2">
              Payment Server-Verified
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-light">
              Appointment Successfully Booked!
            </h3>
            <p className="font-cormorant italic text-sm sm:text-base text-gold-300 mt-1">
              Your consultation session has been scheduled with Smita Singh.
            </p>
          </div>

          {/* Verification Badge Receipt */}
          <div className="p-4 rounded-2xl bg-midnight-950/80 border border-gold-500/30 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-ivory-muted text-[11px]">Booking Reference:</span>
              <span className="font-mono font-bold text-gold-300">
                {verifiedData.bookingReference}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ivory-muted">Payment ID:</span>
              <span className="font-mono text-emerald-400 text-[11px]">
                {verifiedData.paymentId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ivory-muted">Service:</span>
              <span className="font-semibold text-ivory-light">
                {verifiedData.booking.serviceName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ivory-muted">Appointment:</span>
              <span className="font-semibold text-gold-300">
                {formatReadableDate(verifiedData.booking.appointmentDate)}, {verifiedData.booking.appointmentTime}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ivory-muted">Client:</span>
              <span className="font-semibold text-ivory-light">
                {verifiedData.booking.clientName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ivory-muted">WhatsApp:</span>
              <span className="font-semibold text-ivory-light">
                {verifiedData.booking.clientPhone}
              </span>
            </div>
            {verifiedData.booking.clientEmail && (
              <div className="flex justify-between items-center">
                <span className="text-ivory-muted">Email:</span>
                <span className="text-ivory-soft">
                  {verifiedData.booking.clientEmail}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="text-ivory-muted">Amount Paid:</span>
              <span className="font-bold text-gold-400 font-cinzel text-sm">
                ₹{verifiedData.booking.amount?.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ivory-muted">Payment Status:</span>
              <span className="text-emerald-400 font-bold uppercase text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                Verified & Confirmed
              </span>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-400">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>Owner notified via configured dispatch channels.</span>
            </div>
          </div>

          {/* Prefilled WhatsApp Callout */}
          <div className="space-y-3 pt-2">
            <p className="text-xs text-ivory-muted max-w-sm mx-auto">
              Your payment is verified. Click below to send your prefilled booking confirmation and payment reference directly to Smita Singh on WhatsApp:
            </p>

            <Button
              href={verifiedData.whatsappUrl}
              external
              variant="whatsapp"
              size="lg"
              icon={MessageCircle}
              className="w-full shadow-gold-glow hover:scale-105 transition-all text-xs sm:text-sm font-bold"
              ariaLabel="Confirm appointment with Smita Singh on WhatsApp"
            >
              Send Confirmation on WhatsApp &rarr;
            </Button>

            <button
              type="button"
              onClick={resetState}
              className="text-[11px] text-ivory-muted hover:text-white underline pt-2 block mx-auto transition-colors"
            >
              Done & Return to Website
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
