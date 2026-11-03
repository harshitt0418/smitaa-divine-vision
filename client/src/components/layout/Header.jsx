import React, { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import Button from "../ui/Button";
import { SITE_CONFIG, getWhatsAppLink } from "../../data/siteContent";

export default function Header({ onOpenBookingModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Recognition", href: "#recognition" },
    { label: "Astrology", href: "#astrology" },
    { label: "Numerology", href: "#numerology" },
    { label: "Core Numbers", href: "#calculator" },
    { label: "Classes Demo", href: "#classes" },
    { label: "Vastu", href: "#vastu" },
    { label: "The Book", href: "#book" },
    { label: "Reviews", href: "#reviews" },
    { label: "About", href: "#about" },
  ];

  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generalWhatsAppBooking = getWhatsAppLink(
    "Hello Smita Singh, I would like to inquire about booking a consultation session with you. Please share available timings and what details you need from me."
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-midnight-950/95 backdrop-blur-md border-b border-gold-500/15 py-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
          : "bg-midnight-950/80 sm:bg-midnight-950/50 backdrop-blur-sm py-2 sm:py-3.5 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top-Centre Centered Official Logo Layout */}
        <div className="relative flex items-center justify-between gap-3 min-h-[54px] sm:min-h-[64px] lg:min-h-[78px]">
          
          {/* Left: Brand Identity Typography */}
          <div className="flex items-center min-w-0 max-w-[130px] xs:max-w-[160px] sm:max-w-none z-10">
            <a
              href="#home"
              onClick={(e) => handleNavLinkClick(e, "#home")}
              className="group flex flex-col text-left focus:outline-none"
              aria-label="Return to Smitaa Divine Vision homepage"
            >
              <span className="font-cinzel font-bold text-xs sm:text-base lg:text-lg tracking-wide text-ivory-light group-hover:text-gold-300 transition-colors truncate">
                {SITE_CONFIG.brandName}
              </span>
              <span className="text-[8px] sm:text-[10px] lg:text-[11px] text-gold-400/90 tracking-widest uppercase font-medium truncate">
                {SITE_CONFIG.practitionerName} &bull; {SITE_CONFIG.alternateBrandName}
              </span>
            </a>
          </div>

          {/* Center: Official Logo (Positioned Centrally at the Top) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
            <a
              href="#home"
              onClick={(e) => handleNavLinkClick(e, "#home")}
              className="group block focus:outline-none transition-transform duration-300 hover:scale-105"
              aria-label="Return to Smitaa Divine Vision homepage"
            >
              <div
                className={`relative rounded-full border border-gold-500/35 bg-black flex items-center justify-center overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-gold-400 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] ${
                  isScrolled
                    ? "w-[48px] h-[48px] sm:w-[58px] sm:h-[58px] lg:w-[68px] lg:h-[68px]"
                    : "w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] lg:w-[78px] lg:h-[78px]"
                }`}
              >
                <img
                  src={SITE_CONFIG.officialLogo}
                  alt="Smitaa Divine Vision official logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(212,175,55,0.25)] group-hover:brightness-110 transition-all duration-300"
                />
              </div>
            </a>
          </div>

          {/* Right: Actions (Book a Session Button & Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
            <div className="hidden sm:block">
              <Button
                href={generalWhatsAppBooking}
                external
                variant="primary"
                size="sm"
                icon={MessageCircle}
                ariaLabel="Book a consultation session via WhatsApp"
              >
                Book a Session
              </Button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              className="xl:hidden p-2 rounded-lg text-ivory hover:text-gold-300 hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Row 2: Aligned Desktop Navigation Links Centered Beneath Logo */}
        <nav
          className="hidden xl:flex items-center justify-center gap-6 2xl:gap-8 pt-2.5 pb-1 mt-1 border-t border-gold-500/10"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="text-xs uppercase tracking-wider text-ivory-soft hover:text-gold-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-x-0 top-[64px] sm:top-[74px] bg-[#070B19] border-b border-gold-500/25 px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 transition-all animate-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-74px)] overflow-y-auto"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="text-sm font-cinzel text-ivory-light hover:text-gold-300 py-2 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-gold-500/50">&rarr;</span>
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Button
                href={generalWhatsAppBooking}
                external
                variant="whatsapp"
                size="md"
                icon={MessageCircle}
                className="w-full"
                ariaLabel="Book a Session on WhatsApp"
              >
                Book a Session (WhatsApp)
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
