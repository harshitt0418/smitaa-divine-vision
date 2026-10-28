import React from "react";
import { Compass, CheckCircle2, MessageCircle, AlertCircle, Clock, Calendar, Shield } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { SERVICES } from "../../data/services";

export default function AstrologySection() {
  const service = SERVICES.find((s) => s.id === "astrology");
  if (!service) return null;

  return (
    <section id="astrology" className="py-20 sm:py-28 relative overflow-hidden border-t border-white/5">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="sm" icon={Compass}>
            Vedic Astrology (Jyotish)
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-4">
            A Reflective Framework for Life's Seasons & Timing
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300">
            {service.subtitle}
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Philosophy, What a session involves, Who is it for */}
          <div className="lg:col-span-7 space-y-6">
            <div className="card-celestial p-6 sm:p-8 rounded-2xl space-y-6">
              <div>
                <h3 className="font-cinzel text-lg font-semibold text-ivory-light mb-3">
                  The Astrological Perspective
                </h3>
                <p className="text-sm sm:text-base text-ivory-soft/90 leading-relaxed">
                  {service.philosophy}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-gold-300 font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-400" />
                  What a Consultation Involves
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
                  Who Will Find This Helpful
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
                <span className="font-semibold text-gold-300 block mb-0.5">Ethical Clarity:</span>
                {service.ethicalNote}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card & What to Prepare */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-celestial p-6 sm:p-8 rounded-2xl relative border-gold-500/30 shadow-card">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="inline-block px-3 py-1 bg-gold-500 text-midnight-950 font-bold text-[10px] tracking-wider uppercase rounded-full">
                  1-on-1 Personalized
                </span>
              </div>

              <div className="text-center sm:text-left mb-6">
                <span className="text-3xl font-cinzel text-gold-400 opacity-60">०१</span>
                <h3 className="font-cinzel text-xl font-bold text-ivory-light mt-1">
                  Astrology Consultation
                </h3>
                <p className="text-xs text-ivory-muted mt-1">
                  Direct one-on-one session with Smitaa
                </p>
              </div>

              <div className="space-y-4 mb-8 text-xs text-ivory-soft">
                <div className="p-3.5 rounded-xl bg-midnight-950/60 border border-white/5 space-y-2">
                  <span className="font-medium text-gold-300 block">Required for chart calculation:</span>
                  <ul className="space-y-1.5 text-ivory-muted">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      Date of birth (Day, Month, Year)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      Accurate birth time (as recorded on birth certificate)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      City and country of birth
                    </li>
                  </ul>
                </div>
                <p className="text-[11px] text-ivory-muted/70 italic text-center">
                  Your confidential birth data is used solely for the calculation of your charts during the session.
                </p>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="space-y-3">
                <Button
                  href={service.whatsAppLink}
                  external
                  variant="whatsapp"
                  size="lg"
                  icon={MessageCircle}
                  className="w-full"
                  ariaLabel="Book Astrology Consultation via WhatsApp"
                >
                  {service.ctaLabel}
                </Button>
                <p className="text-[11px] text-center text-ivory-muted">
                  Opens WhatsApp with a pre-filled inquiry message
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
