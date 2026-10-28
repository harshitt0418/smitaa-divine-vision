import React, { useState } from "react";
import { Award, UserCheck, Heart, Sparkles, MessageCircle, FileText, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { SITE_CONFIG, getWhatsAppLink } from "../../data/siteContent";

export default function AboutSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden bg-midnight-950/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="sm" icon={UserCheck}>
            About the Practice
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-4">
            A Thoughtful, Client-Centered Guide
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300">
            Rooted in authentic tradition, delivered with empathy and contemporary common sense.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Authentic Event Photo with caption */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 bg-midnight-900 shadow-card group">
              <img
                src={SITE_CONFIG.eventCredibility.image}
                alt="Smitaa receiving certificate recognition at the Numerology Professional Success Program in Mumbai"
                className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/20 to-transparent opacity-80" />
              
              {/* Event caption overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-[10px] uppercase tracking-wider font-semibold mb-1">
                  Professional Felicitation
                </span>
                <p className="font-cinzel text-sm sm:text-base font-semibold text-ivory-light">
                  {SITE_CONFIG.eventCredibility.title}
                </p>
                <p className="text-xs text-ivory-muted mt-0.5">
                  {SITE_CONFIG.eventCredibility.location} &bull; {SITE_CONFIG.eventCredibility.date}
                </p>
              </div>
            </div>

            {/* Factual Credibility Note */}
            <div className="p-4 rounded-xl bg-midnight-900/60 border border-white/5 text-xs text-ivory-muted space-y-1">
              <p className="font-semibold text-gold-300">Authentic Documentation:</p>
              <p>
                Visual evidence from the <em>Numerology Professional Success Program</em> in Mumbai, felicitated by Arviend Sud (Destiny Sscience).
              </p>
            </div>
          </div>

          {/* Right: Narrative & Approach */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="card-celestial p-6 sm:p-8 rounded-2xl space-y-5">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-light">
                Meet Smitaa
              </h3>
              
              <p className="text-sm sm:text-base text-ivory-soft leading-relaxed">
                Welcome to <strong>Smitaa Divine Vision</strong>. Smitaa is a dedicated practitioner and author specializing in Vedic Astrology, Numerology, and Vastu Shastra. Her work is guided by a singular conviction: spiritual disciplines are most powerful when they assist human clarity, peace of mind, and responsible action.
              </p>

              <p className="text-sm sm:text-base text-ivory-soft leading-relaxed">
                Rather than treating charts or numbers as fatalistic decree, Smitaa creates a calm, supportive environment where questions can be explored deeply. Her sessions focus on helping clients identify natural strengths, navigate challenging transitions, and create spaces that foster focus and harmony.
              </p>

              {/* What to Expect in a Consultation */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-gold-300 font-semibold">
                  What You Can Always Expect:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-ivory-soft">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Active, compassionate listening without judgment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Practical, actionable interpretations for real-world life</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>No scare tactics, fabricated curses, or pressure to buy items</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Strict confidentiality regarding your personal data</span>
                  </div>
                </div>
              </div>

              {/* Clearly Editable Biography Placeholder Box */}
              <div className="p-3.5 rounded-xl bg-midnight-950/80 border border-gold-500/20 text-xs text-ivory-muted/90 space-y-1">
                <div className="flex items-center gap-2 text-gold-400 font-medium">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Editable Practitioner Notes:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Additional formal degrees, university certifications, and practice milestones can be seamlessly inserted here or configured via the backend site settings.
                </p>
              </div>

              {/* Action button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  href={getWhatsAppLink("Hello Smitaa, I would like to schedule a session and discuss your consultation approach.")}
                  external
                  variant="primary"
                  size="md"
                  icon={MessageCircle}
                  ariaLabel="Contact Smitaa directly on WhatsApp"
                >
                  Schedule a Discussion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
