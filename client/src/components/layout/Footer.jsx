import React from "react";
import { MessageCircle, ExternalLink, Sparkles, BookOpen, Heart, Award, GraduationCap, Calculator } from "lucide-react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "../ui/SocialIcons";
import { SITE_CONFIG, getWhatsAppLink } from "../../data/siteContent";
import { SERVICES } from "../../data/services";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-midnight-950 border-t border-gold-500/20 pt-16 pb-12 overflow-hidden z-10">
      {/* Decorative celestial top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio Summary */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border border-gold-500/40 bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
                <img
                  src={SITE_CONFIG.officialLogo}
                  alt="Smitaa Divine Vision official logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(212,175,55,0.25)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel font-bold text-lg text-ivory-light">
                  {SITE_CONFIG.brandName}
                </span>
                <span className="text-[10px] text-gold-400 font-medium">
                  {SITE_CONFIG.practitionerName} &bull; {SITE_CONFIG.alternateBrandName}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
              Refined, client-centered consultations blending the time-tested wisdom of Vedic Astrology, Numerology, and Vastu Shastra with corporate executive clarity. Associated with prominent conclaves including Navbharat Astro Mahasangam.
            </p>
            <p className="text-xs text-gold-400/90 font-medium tracking-wide">
              Brand Identity: {SITE_CONFIG.alternateBrandName}
            </p>
            {/* Social channels */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-midnight-850 border border-white/10 flex items-center justify-center text-ivory-soft hover:text-gold-300 hover:border-gold-500/40 hover:bg-midnight-800 transition-colors"
                aria-label="Follow Smita Singh on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-midnight-850 border border-white/10 flex items-center justify-center text-ivory-soft hover:text-gold-300 hover:border-gold-500/40 hover:bg-midnight-800 transition-colors"
                aria-label="Subscribe to Numeros Miita on YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-midnight-850 border border-white/10 flex items-center justify-center text-ivory-soft hover:text-gold-300 hover:border-gold-500/40 hover:bg-midnight-800 transition-colors"
                aria-label="Connect on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Consultation Options via WhatsApp */}
          <div className="space-y-4 text-left">
            <h4 className="font-cinzel text-sm font-semibold text-gold-300 uppercase tracking-widest">
              Direct Consultations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <a
                    href={srv.whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ivory-muted hover:text-gold-300 transition-colors group"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{srv.discipline}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#classes"
                  onClick={(e) => handleScrollTo(e, "#classes")}
                  className="inline-flex items-center gap-2 text-ivory-muted hover:text-gold-300 transition-colors group"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>Numerology Classes Demo</span>
                </a>
              </li>
              <li>
                <a
                  href="#calculator"
                  onClick={(e) => handleScrollTo(e, "#calculator")}
                  className="inline-flex items-center gap-2 text-ivory-muted hover:text-gold-300 transition-colors group"
                >
                  <Calculator className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>Discover Your Core Numbers</span>
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={getWhatsAppLink("Hello Smita Singh, I have a general consultation question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gold-400/90 hover:underline flex items-center gap-1"
                >
                  Direct WhatsApp: {SITE_CONFIG.phoneNumberDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: The Featured Book */}
          <div className="space-y-4 text-left">
            <h4 className="font-cinzel text-sm font-semibold text-gold-300 uppercase tracking-widest">
              Featured Publication
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-ivory-muted">
              <p className="font-medium text-ivory-light">
                {SITE_CONFIG.book.title}
              </p>
              <p className="text-xs text-gold-400">By {SITE_CONFIG.book.author}</p>
              <p className="text-xs leading-relaxed">
                Available on major international and Indian platforms:
              </p>
              <div className="flex flex-col gap-2 pt-1">
                {SITE_CONFIG.book.retailers.map((retailer) => (
                  <a
                    key={retailer.name}
                    href={retailer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-midnight-900 border border-white/5 hover:border-gold-500/30 text-ivory-soft hover:text-gold-300 transition-colors"
                  >
                    <span>{retailer.name}</span>
                    <ExternalLink className="w-3 h-3 text-gold-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Ethical Note */}
          <div className="space-y-4 text-left">
            <h4 className="font-cinzel text-sm font-semibold text-gold-300 uppercase tracking-widest">
              Site Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-ivory-muted">
              <li>
                <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="hover:text-gold-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#recognition" onClick={(e) => handleScrollTo(e, "#recognition")} className="hover:text-gold-300 transition-colors">
                  Recognition
                </a>
              </li>
              <li>
                <a href="#astrology" onClick={(e) => handleScrollTo(e, "#astrology")} className="hover:text-gold-300 transition-colors">
                  Astrology
                </a>
              </li>
              <li>
                <a href="#numerology" onClick={(e) => handleScrollTo(e, "#numerology")} className="hover:text-gold-300 transition-colors">
                  Numerology
                </a>
              </li>
              <li>
                <a href="#calculator" onClick={(e) => handleScrollTo(e, "#calculator")} className="hover:text-gold-300 transition-colors">
                  Core Numbers
                </a>
              </li>
              <li>
                <a href="#classes" onClick={(e) => handleScrollTo(e, "#classes")} className="hover:text-gold-300 transition-colors">
                  Classes Demo
                </a>
              </li>
              <li>
                <a href="#vastu" onClick={(e) => handleScrollTo(e, "#vastu")} className="hover:text-gold-300 transition-colors">
                  Vastu
                </a>
              </li>
              <li>
                <a href="#book" onClick={(e) => handleScrollTo(e, "#book")} className="hover:text-gold-300 transition-colors">
                  The Book
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleScrollTo(e, "#reviews")} className="hover:text-gold-300 transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-gold-300 transition-colors">
                  About Smita
                </a>
              </li>
            </ul>

            <div className="p-3 rounded-lg bg-midnight-900/60 border border-white/5 text-[11px] text-ivory-muted/80 leading-relaxed">
              <span className="text-gold-400 font-semibold block mb-1">Ethical Standard:</span>
              Consultations provide reflective interpretation and guidance. We promote self-agency and mindful decision-making without fatalistic claims.
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-muted">
          <p>© {currentYear} {SITE_CONFIG.brandName} ({SITE_CONFIG.alternateBrandName}) &bull; Smita Singh. All rights reserved.</p>
          <p className="text-[11px] text-ivory-muted/70 text-center sm:text-right">
            Associated with Navbharat Astro Mahasangam &bull; Privacy protected &bull; Grounded Guidance
          </p>
        </div>
      </div>
    </footer>
  );
}
