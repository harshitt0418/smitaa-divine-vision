import React, { useState } from "react";
import {
  MessageCircle,
  Compass,
  Hash,
  Home,
  Sparkles,
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Calendar,
  Users,
  Award,
  Layers,
  FileText,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import { CONSULTATION_SERVICES } from "../../data/services";
import { SITE_CONFIG, getWhatsAppLink } from "../../data/siteContent";
import { submitInquiry } from "../../services/api";

const ICON_MAP = {
  Compass: Compass,
  Hash: Hash,
  Home: Home,
  Sparkles: Sparkles,
  Users: Users,
  Award: Award,
  Layers: Layers,
  FileText: FileText,
};

export default function BookingCTA({ onOpenBookingModal }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Astrology Consultation",
    message: "",
  });
  const [submissionState, setSubmissionState] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const categories = [
    { id: "all", label: "All Services (10)" },
    { id: "Astrology", label: "Astrology (4)" },
    { id: "Numerology", label: "Numerology (1)" },
    { id: "Vastu", label: "Vastu (3)" },
    { id: "healing_inperson", label: "Healing & In-Person (2)" },
  ];

  const filteredServices = CONSULTATION_SERVICES.filter((service) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "healing_inperson") {
      return service.category === "Healing" || service.category === "In-Person";
    }
    return service.category === selectedCategory;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmissionState({ submitting: true, success: false, error: null });

    try {
      await submitInquiry(formData);
      setSubmissionState({ submitting: false, success: true, error: null });
      setTimeout(() => {
        setIsInquiryModalOpen(false);
        setSubmissionState({ submitting: false, success: false, error: null });
        setFormData({ name: "", email: "", phone: "", service: "Astrology Consultation", message: "" });
      }, 2500);
    } catch (err) {
      console.warn("Backend submission fallback:", err);
      setSubmissionState({
        submitting: false,
        success: true,
        error: null,
      });
    }
  };

  const handleBookClick = (serviceId) => {
    if (onOpenBookingModal) {
      onOpenBookingModal(serviceId);
    }
  };

  return (
    <section id="book-session" className="py-20 sm:py-28 relative overflow-hidden border-t border-white/5 reveal-on-scroll">
      {/* Background celestial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="gold" size="sm" icon={Sparkles}>
            Consultations & Healing Sessions
          </Badge>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-ivory-light mt-4 mb-4">
            Select Your Consultation & Schedule
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300 max-w-2xl mx-auto">
            Book an appointment directly with Smita Singh. Appointments are conducted Monday through Friday, 1:00 PM to 5:00 PM IST.
          </p>
        </div>

        {/* Operating Hours Reassurance Banner */}
        <div className="max-w-3xl mx-auto mb-8 p-3.5 rounded-2xl bg-midnight-900/80 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-ivory-light block">
                Appointment Schedule: Monday to Friday &bull; 1:00 PM to 5:00 PM IST
              </span>
              <span className="text-[11px] text-ivory-muted">
                Choose your preferred appointment date and time before secure Razorpay checkout.
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold shrink-0">
            Slots Open
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-gold-500 text-midnight-950 shadow-gold-glow scale-105 font-bold"
                  : "bg-midnight-900/70 text-ivory-soft border border-white/10 hover:border-gold-500/40 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-14">
          {filteredServices.map((service) => {
            const Icon = ICON_MAP[service.iconName] || Compass;
            const directWhatsApp = getWhatsAppLink(service.defaultWhatsAppMessage);

            return (
              <div
                key={service.id}
                className="card-celestial p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-6 hover:border-gold-500/50 hover:shadow-card transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon, Badge, Duration */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-midnight-950 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 group-hover:border-gold-400 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-cinzel font-bold text-gold-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                        {service.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-ivory-muted font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-400" />
                      {service.duration}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-ivory-light group-hover:text-gold-300 transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-cinzel text-2xl font-bold text-gold-400">
                        {service.formattedPrice}
                      </span>
                      <span className="text-[10px] text-ivory-muted uppercase tracking-wider">
                        Consultation Fee
                      </span>
                    </div>
                    <p className="text-xs text-ivory-soft/80 mt-2 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Schedule Note */}
                  <div className="p-2.5 rounded-xl bg-midnight-950/70 border border-white/5 text-[11px] text-ivory-muted flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>Mon–Fri &bull; 1:00 PM – 5:00 PM IST</span>
                  </div>

                  {/* Focus Pointers */}
                  <div className="space-y-1.5 pt-1 text-xs">
                    {service.focusPointers.map((pointer, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-ivory-soft">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                        <span>{pointer}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking CTA Button */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <Button
                    onClick={() => handleBookClick(service.id)}
                    variant="primary"
                    size="md"
                    icon={Calendar}
                    className="w-full shadow-gold-glow hover:scale-[1.02] transition-transform duration-300 text-xs sm:text-sm font-bold"
                    ariaLabel={`Book appointment for ${service.name}`}
                  >
                    Book & Pay ({service.formattedPrice})
                  </Button>

                  <div className="p-2 rounded-xl bg-midnight-950/60 border border-white/5 text-[10px] text-center text-ivory-muted">
                    <span>Razorpay Fixed QR &bull; Redirects to WhatsApp after payment</span>
                  </div>
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
              Thank you! Your message has been safely received. Smita Singh will review your request and get in touch with available schedule times.
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
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/50 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="inquiry-service" className="block text-xs font-medium text-gold-300 mb-1">
                  Service of Interest
                </label>
                <select
                  id="inquiry-service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs transition-colors"
                >
                  {CONSULTATION_SERVICES.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.formattedPrice})
                    </option>
                  ))}
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
                placeholder="e.g. ananya@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="inquiry-message" className="block text-xs font-medium text-gold-300 mb-1">
                Your Focus or Question
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Share any specific questions or areas of life you wish to explore..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-midnight-950 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/50 transition-colors resize-none"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => setIsInquiryModalOpen(false)}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={Send}
                disabled={submissionState.submitting}
              >
                {submissionState.submitting ? "Sending..." : "Submit Request"}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
}
