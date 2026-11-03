import React, { useState } from "react";
import {
  Award,
  UserCheck,
  Heart,
  Sparkles,
  MessageCircle,
  FileText,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Compass,
  Building2,
  ExternalLink,
  ShieldCheck,
  Maximize2
} from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import { SITE_CONFIG, getWhatsAppLink } from "../../data/siteContent";

export default function AboutSection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden bg-midnight-950/70 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="sm" icon={UserCheck}>
            About the Practitioner
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-4">
            Meet Smita Singh
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300">
            MBA, Corporate Executive Transition, and Practitioner at Smitaa Divine Vision.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Authentic Stage Photograph & Brand Emblem */}
          <div className="lg:col-span-5 space-y-6">
            {/* Stage Photograph with Lightbox Trigger */}
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 bg-midnight-900 shadow-card group">
              <img
                src="/assets/recognition/nbt-astro-mahasangam-stage.jpg"
                alt="Smita Singh on stage at the Navbharat Astro Mahasangam"
                className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-102"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/20 to-transparent opacity-85" />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-[10px] uppercase tracking-wider font-semibold mb-1.5">
                  Conclave Felicitation
                </span>
                <p className="font-cinzel text-sm sm:text-base font-semibold text-ivory-light">
                  Navbharat Astro+ Mahasangam
                </p>
                <p className="text-xs text-ivory-muted mt-0.5">
                  Organized by Times Group / Navbharat Times
                </p>
              </div>

              {/* Expand Button */}
              <button
                type="button"
                onClick={() =>
                  setSelectedPhoto({
                    title: "Smita Singh — Navbharat Astro Mahasangam",
                    src: "/assets/recognition/nbt-astro-mahasangam-stage.jpg",
                    caption:
                      "Smita Singh receiving stage felicitation at the Navbharat Astro+ Mahasangam Conclave & Expo, organized by the Times Group / Navbharat Times."
                  })
                }
                className="absolute top-3 right-3 p-2 rounded-lg bg-midnight-950/80 border border-gold-500/30 text-gold-400 hover:text-white transition-colors focus:outline-none"
                aria-label="View full size stage photo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Brand Emblem & Identity Card */}
            <div className="card-celestial p-4 rounded-xl flex items-center gap-4 border-gold-500/20">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gold-500/40 shrink-0 bg-black">
                <img
                  src={SITE_CONFIG.brandEmblem}
                  alt="Smitaa Divine Vision celestial brand emblem"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left text-xs">
                <p className="font-cinzel font-bold text-ivory-light text-sm">
                  {SITE_CONFIG.brandName}
                </p>
                <p className="text-gold-400 font-medium text-[11px]">
                  {SITE_CONFIG.alternateBrandName} &bull; Spiritual & Astrological Consultations
                </p>
                <p className="text-ivory-muted text-[11px] mt-0.5">
                  Operated by Smita Singh
                </p>
              </div>
            </div>

            {/* Quick Credentials Summary Card */}
            <div className="p-4 rounded-xl bg-midnight-900/60 border border-white/5 space-y-2.5 text-xs text-ivory-muted text-left">
              <div className="flex items-center gap-2 text-gold-300 font-semibold">
                <GraduationCap className="w-4 h-4 text-gold-400" />
                <span>Academic & Professional Transition</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-ivory-muted/90">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1 shrink-0" />
                  <span><strong>Master of Business Administration (MBA):</strong> Academic foundation in management, organizational analysis, and strategic communication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1 shrink-0" />
                  <span><strong>Executive Corporate & Teaching Background:</strong> Transitioned from corporate management and teaching into life guidance, occult sciences, and counseling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1 shrink-0" />
                  <span><strong>Recognised Conclaves:</strong> Regular participant and consultant for events including Navbharat Astro Mahasangam and Times Group conclaves.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Detailed Biography & Practice Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="card-celestial p-6 sm:p-8 rounded-2xl space-y-5">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-light">
                Professional Background & Consultation Philosophy
              </h3>

              <p className="text-sm sm:text-base text-ivory-soft leading-relaxed">
                <strong>Smita Singh</strong> is an expert in <strong>Astrology and Numerology</strong> who serves as a consultant and participant in prominent astrological events hosted by <strong>Navbharat Times (NBT)</strong> and the <strong>Times Group</strong>.
              </p>

              <p className="text-sm sm:text-base text-ivory-soft leading-relaxed">
                After completing her <strong>MBA</strong>, she transitioned from an executive corporate career and teaching into life guidance and occult practices. Her corporate background gives her consultations a grounded, practical edge—enabling her to translate ancient symbolic systems into actionable strategies for contemporary professionals, entrepreneurs, and families.
              </p>

              <p className="text-sm sm:text-base text-ivory-soft leading-relaxed">
                Under her practice banner, <strong>Smitaa Divine Vision</strong> (and <em>Numeros Miita</em>), she provides specialized advice spanning:
              </p>

              {/* 4 Core Specialization Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-midnight-950/70 border border-white/5 space-y-1">
                  <span className="font-semibold text-gold-300 text-xs block">Career & Business Timing</span>
                  <p className="text-[11px] text-ivory-muted leading-relaxed">
                    Analyzing planetary Dashas and numerical personal year cycles to plan pivotal transitions, investments, and professional pivots.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-midnight-950/70 border border-white/5 space-y-1">
                  <span className="font-semibold text-gold-300 text-xs block">Relationship Compatibility</span>
                  <p className="text-[11px] text-ivory-muted leading-relaxed">
                    Chart synastry and number resonance to understand temperaments, communication styles, and mutual growth pathways.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-midnight-950/70 border border-white/5 space-y-1">
                  <span className="font-semibold text-gold-300 text-xs block">Vastu Spatial Remedies</span>
                  <p className="text-[11px] text-ivory-muted leading-relaxed">
                    Non-destructive spatial balance for residences and commercial offices, harmonizing elemental energies with practical layout advice.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-midnight-950/70 border border-white/5 space-y-1">
                  <span className="font-semibold text-gold-300 text-xs block">Numerology & Name Tuning</span>
                  <p className="text-[11px] text-ivory-muted leading-relaxed">
                    Mulank, Bhagyank, and Namank analysis, author of <em>The Divine Digits</em>, and masterclass educator in Vedic numerological systems.
                  </p>
                </div>
              </div>

              {/* Ethical Guarantees */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-gold-300 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  What Clients Can Always Rely On:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-ivory-soft">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Respect for individual agency and decision-making</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Zero fear-based predictions or fabricated claims</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>No commercial pressure to purchase expensive items</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Strict confidentiality and empathetic listening</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  href={getWhatsAppLink(
                    "Hello Smita Singh, I read your background on your website and would like to schedule a personal consultation session."
                  )}
                  external
                  variant="primary"
                  size="md"
                  icon={MessageCircle}
                  ariaLabel="Contact Smita Singh directly on WhatsApp"
                >
                  Schedule a Consultation
                </Button>

                <Button
                  href="#recognition"
                  variant="outline"
                  size="md"
                  icon={Award}
                  ariaLabel="View media recognition and events"
                >
                  View Conclave Recognition
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        title={selectedPhoto?.title || "Recognition Photo"}
        maxWidth="max-w-3xl"
      >
        {selectedPhoto && (
          <div className="space-y-4 text-center">
            <div className="rounded-xl overflow-hidden border border-gold-500/30 bg-midnight-950 p-2">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full max-h-[75vh] object-contain rounded-lg mx-auto"
              />
            </div>
            <div className="text-left text-xs text-ivory-muted p-2">
              <p className="font-semibold text-gold-300">Conclave Recognition:</p>
              <p className="text-ivory-soft leading-relaxed">{selectedPhoto.caption}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
