import React from "react";
import { BookOpen, ExternalLink, ShoppingBag, Tablet, Sparkles, CheckCircle2, Bookmark } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { SITE_CONFIG } from "../../data/siteContent";

export default function BookSection() {
  const { book } = SITE_CONFIG;

  const getRetailerIcon = (iconName) => {
    switch (iconName) {
      case "BookOpen":
        return BookOpen;
      case "ShoppingBag":
        return ShoppingBag;
      case "Tablet":
        return Tablet;
      default:
        return ExternalLink;
    }
  };

  return (
    <section id="book" className="py-20 sm:py-28 relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="sm" icon={BookOpen}>
            Featured Publication
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-3">
            {book.title}
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-gold-300">
            {book.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-gold-400/90 tracking-widest uppercase font-medium mt-2">
            By {book.author}
          </p>
        </div>

        {/* 2-Column Book Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
          {/* Left: Prominent Book Cover Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-xs sm:max-w-sm">
              {/* Golden celestial backlight glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 via-amber-500/20 to-gold-300/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70" />

              <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-midnight-950">
                <img
                  src={book.coverImage}
                  alt="The Divine Digits: Mastering Life Through Digits by Dr. Smiita Siingh - Discover Your Life Path Through Numerology"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
                  loading="lazy"
                />
                
                {/* Subtle corner badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-midnight-950/90 border border-gold-500/30 text-[10px] font-cinzel text-gold-300 font-bold tracking-wider uppercase backdrop-blur-sm">
                    Verified Work
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Compelling Non-Fabricated Description & 3 Purchase Links */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="card-celestial p-6 sm:p-8 rounded-2xl space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
                  Theme: {book.promotionalHeadline}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-ivory-light">
                  Decode Your Life Code & Personal Potential
                </h3>
              </div>

              <p className="text-sm sm:text-base text-ivory-soft leading-relaxed">
                {book.description}
              </p>

              {/* Key themes explored */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-gold-300 font-semibold">
                  Inside This Guide:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-ivory-soft/90">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Understanding the core vibrational blueprint of numbers 1 through 9</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Calculating and interpreting your Mulank, Bhagyank, and Namank</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>Practical alignment strategies for personal direction and decision-making</span>
                  </li>
                </ul>
              </div>

              {/* Three Separate Purchase Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <p className="text-xs text-gold-300 font-semibold uppercase tracking-wider">
                  Select Your Preferred Retailer:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {book.retailers.map((retailer) => {
                    const IconComponent = getRetailerIcon(retailer.icon);
                    return (
                      <a
                        key={retailer.name}
                        href={retailer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col p-3 rounded-xl bg-midnight-900 border border-gold-500/25 hover:border-gold-400 hover:bg-midnight-800 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                        aria-label={`Buy ${book.title} on ${retailer.name} (opens in new tab)`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <IconComponent className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
                          <ExternalLink className="w-3 h-3 text-ivory-muted group-hover:text-gold-300 transition-colors" />
                        </div>
                        <span className="font-cinzel text-xs font-bold text-ivory-light group-hover:text-gold-300 transition-colors">
                          {retailer.name}
                        </span>
                        <span className="text-[10px] text-ivory-muted mt-0.5">
                          {retailer.badge}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-ivory-muted/70 text-center sm:text-left flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>All book purchases are securely handled directly through certified retail partners.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
