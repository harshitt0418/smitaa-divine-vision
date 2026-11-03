import React from "react";
import { Sparkles, ArrowDown, BookOpen, Compass, ShieldCheck, HeartHandshake, Award } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { SITE_CONFIG } from "../../data/siteContent";

export default function Hero() {
  const scrollToConsultations = (e) => {
    e.preventDefault();
    const target = document.querySelector("#astrology");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBook = (e) => {
    e.preventDefault();
    const target = document.querySelector("#book");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToRecognition = (e) => {
    e.preventDefault();
    const target = document.querySelector("#recognition");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Restrained celestial orbits & ambient elements with multi-speed slow motion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] celestial-orbit pointer-events-none opacity-20 animate-spin-very-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] celestial-orbit pointer-events-none opacity-15 animate-spin-slow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-in fade-in duration-700">
        {/* Intro Badge & Conclave Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <Badge variant="gold" size="md" icon={Sparkles} className="animate-pulse-subtle">
            {SITE_CONFIG.brandName} &bull; {SITE_CONFIG.practitionerName}
          </Badge>
          <a
            href="#recognition"
            onClick={scrollToRecognition}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight-900 border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 text-xs transition-all hover:scale-105 duration-300 shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-gold-400" />
            <span>Featured at Navbharat Astro Mahasangam</span>
          </a>
        </div>

        {/* Emotionally resonant headline */}
        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory-light leading-[1.2] sm:leading-[1.18] mb-6">
          Clarity for Your Journey.
          <br />
          <span className="text-gold-gradient font-normal italic font-cormorant sm:text-6xl lg:text-7xl">
            Direction for What Lies Ahead.
          </span>
        </h1>

        {/* Grounded supporting copy */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-ivory-soft/90 font-light leading-relaxed mb-10">
          When life presents pivotal choices in career, relationships, and living spaces, guidance should be clear, grounded, and empowering. Guided by <strong>Smita Singh</strong> (MBA, corporate executive transition), Smitaa Divine Vision provides reflective Vedic Astrology, Numerology, and Vastu frameworks that honor your agency—without fatalistic fear or superficial promises.
        </p>

        {/* Primary and Secondary Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
          <Button
            href="#astrology"
            onClick={scrollToConsultations}
            variant="primary"
            size="lg"
            icon={Compass}
            className="shadow-gold-glow hover:scale-105 transition-all duration-300"
            ariaLabel="Explore the consultation disciplines"
          >
            Explore Consultations
          </Button>

          <Button
            href="#recognition"
            onClick={scrollToRecognition}
            variant="secondary"
            size="lg"
            icon={Award}
            className="hover:scale-105 transition-all duration-300"
            ariaLabel="View media recognition and events"
          >
            Media & Recognition
          </Button>

          <Button
            href="#book"
            onClick={scrollToBook}
            variant="outline"
            size="lg"
            icon={BookOpen}
            className="hover:scale-105 transition-all duration-300"
            ariaLabel="Discover the published numerology book"
          >
            The Book
          </Button>
        </div>

        {/* Three Pillar Guarantees / Reassurances */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/10">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-midnight-900/40 border border-white/5">
            <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-semibold text-ivory-light">Zero Fear-Based Tactics</p>
              <p className="text-[11px] text-ivory-muted">Grounded, empowering advice</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-midnight-900/40 border border-white/5">
            <Sparkles className="w-5 h-5 text-gold-400 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-semibold text-ivory-light">Classical Disciplines</p>
              <p className="text-[11px] text-ivory-muted">Jyotish, Numerology & Vastu</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-midnight-900/40 border border-white/5">
            <HeartHandshake className="w-5 h-5 text-gold-400 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-semibold text-ivory-light">Direct & Confidential</p>
              <p className="text-[11px] text-ivory-muted">One-on-one personalized sessions</p>
            </div>
          </div>
        </div>

        {/* Soft scroll prompt */}
        <div className="mt-12 flex justify-center">
          <a
            href="#recognition"
            onClick={scrollToRecognition}
            className="group flex flex-col items-center gap-1.5 text-xs text-ivory-muted hover:text-gold-300 transition-colors focus:outline-none"
            aria-label="Scroll down to recognition section"
          >
            <span className="tracking-widest uppercase text-[10px]">Explore Practise</span>
            <ArrowDown className="w-4 h-4 text-gold-400 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
