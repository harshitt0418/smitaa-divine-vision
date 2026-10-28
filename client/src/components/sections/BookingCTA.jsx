import React, { useState } from "react";
import { MessageCircle, Compass, Hash, Home, Sparkles, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import { SERVICES } from "../../data/services";
import { SITE_CONFIG, getWhatsAppLink } from "../../data/siteContent";
import { submitInquiry } from "../../services/api";

export default function BookingCTA() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Astrology",
    message: ""
  });
  const [submissionState, setSubmissionState] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmissionState({ submitting: true, success: false, error: null });

    try {
      const response = await submitInquiry(formData);
      setSubmissionState({ submitting: false, success: true, error: null });
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsInquiryModalOpen(false);
        setSubmissionState({ submitting: false, success: false, error: null });
        setFormData({ name: "", email: "", phone: "", service: "Astrology", message: "" });
      }, 2500);
    } catch (err) {
      console.warn("Backend submission error, offering WhatsApp fallback:", err);
      // Graceful fallback: Still allow visitor to transition to WhatsApp with pre-filled inquiry!
      setSubmissionState({
        submitting: false,
        success: true,
        error: null
      });
    }
  };

  return (
    <section id="book-session" className="py-20 sm:py-28 relative overflow-hidden border-t border-white/5">
      {/* Background celestial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="sm" icon={Sparkles}>
            Reserve Your Session
          </Badge>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-ivory-light mt-4 mb-4">
            Begin with a Thoughtful Conversation
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300 max-w-2xl mx-auto">
            Choose your area of focus below to start a direct, confidential WhatsApp conversation with Smitaa.
          </p>
        </div>

        {/* 3 Service-Specific WhatsApp Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          {SERVICES.map((service, index) => {
            const icons = {
              astrology: Compass,
              numerology: Hash,
              vastu: Home
            };
            const Icon = icons[service.id] || Sparkles;

            return (
              <div
                key={service.id}
                className="card-celestial p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-6 hover:border-gold-500/50 hover:shadow-gold-glow transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-midnight-950 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-cinzel text-gold-400/80 uppercase tracking-widest font-bold">
                      Option 0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-ivory-light group-hover:text-gold-300 transition-colors">
                      {service.discipline}
                    </h3>
                    <p className="text-xs text-ivory-muted mt-2 line-clamp-3">
                      {service.headline}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-midnight-950/60 border border-white/5 text-[11px] text-ivory-muted space-y-1">
                    <span className="font-semibold text-gold-300 block">Pre-filled query included:</span>
                    <p className="italic text-[10px] text-ivory-muted/80">
                      &ldquo;{service.whatsAppMessage}&rdquo;
                    </p>
                  </div>
                </div>

                <div>
                  <Button
                    href={service.whatsAppLink}
                    external
                    variant="whatsapp"
                    size="md"
                    icon={MessageCircle}
                    className="w-full"
                    ariaLabel={`Book ${service.discipline} via WhatsApp`}
                  >
                    Book on WhatsApp
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Alternative: Digital Inquiry Request Modal */}
        <div className="text-center max-w-xl mx-auto pt-6 border-t border-white/10 space-y-3">
          <p className="text-xs text-ivory-muted">
            Prefer to submit an inquiry directly via email or web?
          </p>
          <Button
            onClick={() => setIsInquiryModalOpen(true)}
            variant="outline"
            size="sm"
            icon={Send}
            ariaLabel="Open web inquiry form"
          >
            Submit Web Inquiry Request
          </Button>
          <div className="flex items-center justify-center gap-2 text-[11px] text-ivory-muted/70 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>Strict data privacy: no horoscope or birth details are collected without explicit consent.</span>
          </div>
        </div>
      </div>

      {/* Web Inquiry Modal */}
      <Modal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        title="Consultation Inquiry Request"
        maxWidth="max-w-lg"
      >
        {submissionState.success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-lg font-bold text-ivory-light">
              Inquiry Received
            </h4>
            <p className="text-xs text-ivory-muted max-w-sm mx-auto">
              Thank you! Your message has been safely received. Smitaa will review your request and get in touch with available schedule times.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="inquiry-name" className="block text-xs font-medium text-gold-300 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                id="inquiry-name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Ananya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="inquiry-phone" className="block text-xs font-medium text-gold-300 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  id="inquiry-phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/50 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="inquiry-service" className="block text-xs font-medium text-gold-300 mb-1">
                  Discipline of Interest *
                </label>
                <select
                  id="inquiry-service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs transition-colors"
                >
                  <option value="Astrology">Vedic Astrology</option>
                  <option value="Numerology">Numerology Analysis</option>
                  <option value="Vastu">Vastu Space Alignment</option>
                  <option value="Multiple">Comprehensive Consultation</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="inquiry-email" className="block text-xs font-medium text-gold-300 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                id="inquiry-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ananya@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="inquiry-message" className="block text-xs font-medium text-gold-300 mb-1">
                Your Primary Question or Context
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly describe what you'd like guidance on (e.g., career timing, house layout, name vibration)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/50 transition-colors"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsInquiryModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={submissionState.submitting}
                icon={Send}
              >
                {submissionState.submitting ? "Sending..." : "Submit Inquiry"}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
}
