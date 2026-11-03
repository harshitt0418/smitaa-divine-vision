import React from "react";
import {
  Hash,
  CheckCircle2,
  MessageCircle,
  BookOpen,
  Shield,
  Layers,
  HelpCircle,
  Sparkles,
  GraduationCap,
  Calculator,
  ArrowDown,
  Calendar
} from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { SERVICES } from "../../data/services";

export default function NumerologySection({ onOpenBookingModal }) {
  const service = SERVICES.find((s) => s.id === "numerology");
  if (!service) return null;

  const handleBookClick = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal("numerology-consultation");
    }
  };

  const scrollToCalculator = (e) => {
    e.preventDefault();
    const target = document.querySelector("#calculator");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToClasses = (e) => {
    e.preventDefault();
    const target = document.querySelector("#classes");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="numerology" className="py-20 sm:py-28 relative overflow-hidden bg-midnight-950/60 border-t border-white/5 reveal-on-scroll">
      {/* Subtle blue/indigo ambient glow */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="indigo" size="sm" icon={Hash}>
            Vedic & Pythagorean Numerology
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-4">
            The Vibrational Architecture of Your Numbers
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300">
            {service.subtitle}
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          {/* Left Column: Booking Card & Key Calculations */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div className="card-celestial p-6 sm:p-8 rounded-2xl relative border-gold-500/30 shadow-card">
              <div className="text-center sm:text-left mb-6">
                <span className="text-3xl font-cinzel text-gold-400 opacity-60">०२</span>
                <h3 className="font-cinzel text-xl font-bold text-ivory-light mt-1">
                  Numerology Consultation
                </h3>
                <p className="text-xs text-ivory-muted mt-1">
                  Personalized analysis by Smita Singh
                </p>
                <div className="mt-2">
                  <span className="font-cinzel text-2xl font-bold text-gold-400">
                    ₹2,100
                  </span>
                  <span className="text-[11px] text-ivory-muted ml-2">
                    &bull; Mon–Fri, 1:00 PM – 5:00 PM
                  </span>
                </div>
              </div>

              {/* Number Core Elements Grid */}
              <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
                <div className="p-3 rounded-xl bg-midnight-950/70 border border-white/5">
                  <span className="text-xs font-semibold text-gold-300 block">Mulank</span>
                  <span className="text-[10px] text-ivory-muted">Birth Core (1-31)</span>
                </div>
                <div className="p-3 rounded-xl bg-midnight-950/70 border border-white/5">
                  <span className="text-xs font-semibold text-gold-300 block">Bhagyank</span>
                  <span className="text-[10px] text-ivory-muted">Destiny (DD/MM/YYYY)</span>
                </div>
                <div className="p-3 rounded-xl bg-midnight-950/70 border border-white/5">
                  <span className="text-xs font-semibold text-gold-300 block">Namank</span>
                  <span className="text-[10px] text-ivory-muted">Name Vibration</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-midnight-950/60 border border-white/5 space-y-2 mb-6 text-xs">
                <span className="font-medium text-gold-300 block">What you explore in a session:</span>
                <ul className="space-y-1.5 text-ivory-muted">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    Full legal name & commonly used signature acoustics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    Complete date of birth and core Life Path resonance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    Personal Year cycles (Varshik Ank) for career & business timing
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleBookClick}
                  variant="primary"
                  size="lg"
                  icon={Calendar}
                  className="w-full shadow-gold-glow hover:scale-[1.02] transition-transform font-bold"
                  ariaLabel="Book Numerology Session appointment"
                >
                  Book Numerology Session (₹2,100)
                </Button>

                <Button
                  href="#calculator"
                  onClick={scrollToCalculator}
                  variant="secondary"
                  size="md"
                  icon={Calculator}
                  className="w-full text-xs"
                  ariaLabel="Scroll down to calculate your numbers interactively"
                >
                  Calculate Your Core Numbers Live
                </Button>

                <div className="p-2.5 rounded-xl bg-midnight-950/70 border border-white/5 text-[11px] text-center text-ivory-muted space-y-0.5">
                  <p className="text-gold-300 font-medium">Fixed Fee: ₹2,100 &bull; Mon–Fri, 1:00 PM – 5:00 PM</p>
                  <p className="text-[10px]">Payment via Razorpay Fixed QR &bull; Redirects to WhatsApp upon verification</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Breakdown */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="card-celestial p-6 sm:p-8 rounded-2xl space-y-6">
              <div>
                <h3 className="font-cinzel text-lg font-semibold text-ivory-light mb-3">
                  The Numerological Framework
                </h3>
                <p className="text-sm sm:text-base text-ivory-soft/90 leading-relaxed">
                  {service.philosophy}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-gold-300 font-semibold mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-gold-400" />
                  What the Consultation Explores
                </h4>
                <ul className="space-y-3">
                  {service.sessionIncludes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ivory-soft">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-gold-300 font-semibold mb-2">
                  Who Benefits Most
                </h4>
                <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
                  {service.whoIsItFor}
                </p>
              </div>
            </div>

            {/* Ethical disclosure note */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-midnight-900/60 border border-gold-500/20 text-xs text-ivory-muted">
              <Shield className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gold-300 block mb-0.5">Objective Perspective:</span>
                {service.ethicalNote}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Transition Banner to Interactive Calculator & Classes */}
        <div className="p-4 rounded-2xl bg-midnight-900/50 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-cinzel text-sm font-bold text-ivory-light flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              Ready to Calculate Your Own Numbers?
            </h4>
            <p className="text-xs text-ivory-muted">
              Discover your Mulank, Bhagyank, and Namank archetypal resonance below.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              href="#calculator"
              onClick={scrollToCalculator}
              variant="outline"
              size="sm"
              icon={Calculator}
            >
              Core Calculator
            </Button>
            <Button
              href="#classes"
              onClick={scrollToClasses}
              variant="ghost"
              size="sm"
              icon={GraduationCap}
            >
              Class Demos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
