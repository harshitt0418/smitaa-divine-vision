import React, { useState } from "react";
import {
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  HardDrive,
  CreditCard,
  MessageCircle,
  Lock,
  User,
  Phone,
  Mail,
  ExternalLink,
  QrCode,
} from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { SITE_CONFIG } from "../../data/siteContent";
import { createPaymentOrder, verifyPayment } from "../../services/api";

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

export default function ClassPurchaseModal({ isOpen, onClose, initialClassId }) {
  const { recordedClasses } = SITE_CONFIG;
  const [selectedClassId, setSelectedClassId] = useState(
    initialClassId || recordedClasses[0]?.id || "recorded-class-numerology"
  );

  const [step, setStep] = useState(1); // 1: Select & Details, 2: Review, 3: Verified
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fallbackMode, setFallbackMode] = useState(null);
  const [manualPaymentId, setManualPaymentId] = useState("");
  const [verifiedData, setVerifiedData] = useState(null);

  React.useEffect(() => {
    if (initialClassId) {
      setSelectedClassId(initialClassId);
    }
  }, [initialClassId]);

  const selectedClass =
    recordedClasses.find((c) => c.id === selectedClassId) || recordedClasses[0];

  const resetState = () => {
    setStep(1);
    setErrorMessage("");
    setFallbackMode(null);
    setManualPaymentId("");
    setVerifiedData(null);
    onClose();
  };

  const handleStep1Next = (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!clientPhone.trim() || clientPhone.trim().length < 8) {
      setErrorMessage("Please enter a valid WhatsApp or phone contact number.");
      return;
    }
    if (!clientEmail.trim() || !clientEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address for Google Drive course access.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      const orderData = await createPaymentOrder({
        serviceId: selectedClass.id,
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        clientEmail: clientEmail.trim(),
        notes: "Online Recorded Class Enrollment",
      });

      if (orderData.keyMissing || orderData.mode === "manual_link_fallback") {
        setFallbackMode(orderData);
        setIsProcessing(false);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Unable to load Razorpay payment SDK.");
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount, // Exact fixed amount in paise
        currency: orderData.currency || "INR",
        name: "Smitaa Divine Vision",
        description: `Online Recorded Class: ${selectedClass.name} — Fixed Amount: ${selectedClass.formattedPrice}`,
        image: "/assets/official-logo-dv.jpg",
        order_id: orderData.orderId,
        prefill: {
          name: clientName,
          contact: clientPhone,
          email: clientEmail,
        },
        theme: {
          color: "#D4AF37",
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay with Fixed Amount UPI QR Code",
                instruments: [
                  {
                    method: "upi",
                    flows: ["qr", "intent", "collect"],
                  },
                ],
              },
              other: {
                name: "Cards & Netbanking",
                instruments: [
                  {
                    method: "card",
                  },
                  {
                    method: "netbanking",
                  },
                ],
              },
            },
            sequence: ["block.upi", "block.other"],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
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
              setVerifiedData(verifyResult);
              setStep(3);
            } else {
              setErrorMessage("Payment verification failed. Please contact Smita Singh with your payment reference.");
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            setErrorMessage(verifyErr.message || "Cryptographic payment verification failed on server.");
          } finally {
            setIsProcessing(false);
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
        console.error("Razorpay Payment Failed:", response.error);
        setErrorMessage(response.error.description || "Payment was not completed.");
        setIsProcessing(false);
      });

      razorpayInstance.open();
    } catch (err) {
      console.error("Payment flow error:", err);
      setErrorMessage(err.message || "Failed to initiate payment.");
      setIsProcessing(false);
    }
  };

  const handleVerifyManualPayment = async () => {
    if (!manualPaymentId.trim()) {
      setErrorMessage("Please enter your Razorpay Payment ID (e.g. pay_XXXXX) to verify.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const verifyResult = await verifyPayment({
        razorpay_payment_id: manualPaymentId.trim(),
        bookingReference: fallbackMode?.bookingReference,
      });

      if (verifyResult.verified && verifyResult.success) {
        setVerifiedData(verifyResult);
        setStep(3);
      } else {
        setErrorMessage("Payment verification could not be confirmed. Please check the Payment ID.");
      }
    } catch (err) {
      setErrorMessage(err.message || "Payment verification failed. Please ensure the payment is captured.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetState}
      title={step === 3 ? "Class Enrollment Confirmed & Verified" : "Enroll in Online Recorded Class"}
      maxWidth="max-w-xl"
    >
      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 1: CLASS SELECTION & CLIENT CONTACT INFORMATION     */}
      {/* ======================================================== */}
      {step === 1 && (
        <form onSubmit={handleStep1Next} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1.5">
              Select Online Recorded Class
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-gold-500/30 text-ivory text-xs focus:outline-none focus:border-gold-400"
            >
              {recordedClasses.map((cls, index) => (
                <option key={cls.id} value={cls.id} className="bg-midnight-950 text-ivory">
                  {index + 1}. {cls.name} — {cls.formattedPrice}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Class Highlight Card */}
          <div className="p-4 rounded-xl bg-midnight-950/70 border border-gold-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-cinzel tracking-widest text-gold-400 font-bold block">
                  {selectedClass.badge}
                </span>
                <h4 className="font-cinzel text-base font-bold text-ivory-light">
                  {selectedClass.name}
                </h4>
                <p className="text-xs text-gold-300/90">{selectedClass.subtitle}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-cinzel text-xl font-bold text-gold-400">
                  {selectedClass.formattedPrice}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-ivory-muted">
              <HardDrive className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Full HD video archive on Google Drive + comprehensive notes</span>
            </div>
          </div>

          {/* Client Details */}
          <div>
            <label htmlFor="class-client-name" className="block text-xs font-medium text-gold-300 mb-1">
              Your Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="class-client-name"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Vikram Verma"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/40 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="class-client-phone" className="block text-xs font-medium text-gold-300 mb-1">
              WhatsApp / Mobile Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                id="class-client-phone"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/40 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="class-client-email" className="block text-xs font-medium text-gold-300 mb-1">
              Google Email Address (Required for Drive Access) *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                id="class-client-email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="e.g. vikram@gmail.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/40 transition-colors"
              />
            </div>
            <p className="text-[10px] text-ivory-muted mt-1">
              Google Drive access to recorded classes will be granted directly to this email address.
            </p>
          </div>

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
              disabled={!clientName.trim() || !clientPhone.trim() || !clientEmail.trim()}
            >
              Continue to Review
            </Button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* STEP 2: REVIEW SUMMARY & SECURE PAYMENT                  */}
      {/* ======================================================== */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="card-celestial p-5 rounded-2xl border-gold-500/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] uppercase font-cinzel font-bold tracking-widest text-gold-400">
                Enrollment Summary
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[10px] font-semibold">
                Recorded Masterclass
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-ivory-muted">Selected Course:</span>
                <span className="font-semibold text-ivory-light">{selectedClass.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ivory-muted">Student Name:</span>
                <span className="font-semibold text-ivory-light">{clientName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ivory-muted">WhatsApp Number:</span>
                <span className="font-semibold text-ivory-light">{clientPhone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ivory-muted">Google Drive Email:</span>
                <span className="font-semibold text-gold-300">{clientEmail}</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-cinzel text-xs uppercase tracking-wider text-ivory-muted">
                  Total Fixed Fee:
                </span>
                <span className="font-cinzel text-2xl font-bold text-gold-400">
                  {selectedClass.formattedPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Prominent Fixed-Amount QR Callout */}
          <div className="p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/35 space-y-1.5 text-xs text-gold-300">
            <div className="flex items-center gap-2 font-semibold text-gold-200">
              <QrCode className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Razorpay Fixed-Amount UPI QR Code: {selectedClass.formattedPrice}</span>
            </div>
            <p className="text-[11px] text-ivory-soft leading-relaxed">
              Razorpay will display a dynamic UPI QR code with the exact fee of <strong>{selectedClass.formattedPrice}</strong>. You will be redirected to WhatsApp to receive your Google Drive access <strong>only after payment is verified</strong>.
            </p>
          </div>

          {fallbackMode && (
            <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/40 text-xs space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gold-200 block">
                    Razorpay Gateway Link
                  </span>
                  <p className="text-ivory-muted text-[11px] mt-0.5">
                    Your enrollment reference ID is:{" "}
                    <strong className="text-gold-300 font-mono">{fallbackMode.bookingReference}</strong>.
                    Complete payment of <strong>{selectedClass.formattedPrice}</strong> on Razorpay, then enter your Payment ID below to verify and unlock WhatsApp confirmation.
                  </p>
                </div>
              </div>

              <div className="pt-1 space-y-2">
                <Button
                  href={`${fallbackMode.paymentLink}`}
                  external
                  variant="primary"
                  size="sm"
                  icon={ExternalLink}
                  className="w-full text-xs font-bold"
                >
                  Pay Fixed {selectedClass.formattedPrice} on Razorpay
                </Button>

                <div className="flex gap-2 items-center pt-2">
                  <input
                    type="text"
                    value={manualPaymentId}
                    onChange={(e) => setManualPaymentId(e.target.value)}
                    placeholder="Enter Razorpay Payment ID (e.g. pay_XXXXX)"
                    className="flex-1 px-3 py-2 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs font-mono placeholder:text-ivory-muted/40"
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyManualPayment}
                    variant="secondary"
                    size="sm"
                    disabled={isProcessing}
                    className="shrink-0 text-xs font-semibold"
                  >
                    {isProcessing ? "Verifying..." : "Verify & Unlock"}
                  </Button>
                </div>
                <p className="text-[10px] text-ivory-muted text-center italic">
                  WhatsApp redirection unlocks strictly after payment verification.
                </p>
              </div>
            </div>
          )}

          <div className="p-3 rounded-xl bg-midnight-950/60 border border-white/5 flex items-center gap-2 text-[11px] text-ivory-muted">
            <Lock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>Encrypted Razorpay payment & instant verified WhatsApp redirection</span>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between gap-3">
            <Button
              type="button"
              onClick={() => setStep(1)}
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
              icon={QrCode}
              disabled={isProcessing}
              className="shadow-gold-glow font-bold"
            >
              {isProcessing ? "Processing..." : `Pay ${selectedClass.formattedPrice} via Razorpay QR`}
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: VERIFIED PAYMENT SUCCESS & WHATSAPP ACCESS       */}
      {/* ======================================================== */}
      {step === 3 && verifiedData && (
        <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse-glow">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[10px] font-cinzel font-bold tracking-widest text-emerald-400 uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 inline-block mb-2">
              Enrollment Server-Verified
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-light">
              Class Enrollment Confirmed!
            </h3>
            <p className="font-cormorant italic text-sm sm:text-base text-gold-300 mt-1">
              Your payment for {verifiedData.booking.serviceName} has been verified.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-midnight-950/80 border border-gold-500/30 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-ivory-muted text-[11px]">Enrollment Reference:</span>
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
              <span className="text-ivory-muted">Course:</span>
              <span className="font-semibold text-ivory-light">
                {verifiedData.booking.serviceName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ivory-muted">Google Drive Email:</span>
              <span className="font-semibold text-gold-300">{clientEmail}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs text-ivory-muted max-w-sm mx-auto">
              Your payment is verified. Click below to send your prefilled enrollment verification to Smita Singh on WhatsApp and unlock your Google Drive access:
            </p>

            <Button
              href={verifiedData.whatsappUrl}
              external
              variant="whatsapp"
              size="lg"
              icon={MessageCircle}
              className="w-full shadow-gold-glow hover:scale-105 transition-all text-xs sm:text-sm font-bold"
              ariaLabel="Confirm class enrollment with Smita Singh on WhatsApp"
            >
              Request Drive Access on WhatsApp &rarr;
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
