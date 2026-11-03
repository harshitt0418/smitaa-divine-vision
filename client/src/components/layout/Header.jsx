import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, MessageCircle } from "lucide-react";
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
          ? "bg-midnight-950/90 backdrop-blur-md border-b border-gold-500/15 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-4 sm:py-5 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Mark with Authentic Celestial Emblem */}
          <a
            href="#home"
            onClick={(e) => handleNavLinkClick(e, "#home")}
            className="group flex items-center gap-3 focus:outline-none shrink-0"
            aria-label={`${SITE_CONFIG.brandName} - Return to top`}
          >
            <div className="relative w-10 h-10 rounded-full border border-gold-500/40 bg-black flex items-center justify-center overflow-hidden group-hover:border-gold-400 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <img
                src={SITE_CONFIG.brandEmblem}
                alt={SITE_CONFIG.brandName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-cinzel font-bold text-base sm:text-lg tracking-wide text-ivory-light group-hover:text-gold-300 transition-colors">
                {SITE_CONFIG.brandName}
              </span>
              <span className="text-[10px] sm:text-xs text-gold-400/90 tracking-widest uppercase font-medium">
                {SITE_CONFIG.practitionerName} &bull; {SITE_CONFIG.alternateBrandName}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-6" aria-label="Main Navigation">
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

          {/* Header Action Button (Desktop) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
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

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="xl:hidden p-2 rounded-lg text-ivory hover:text-gold-300 hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-x-0 top-[65px] bg-midnight-950/98 backdrop-blur-2xl border-b border-gold-500/20 px-6 py-6 shadow-2xl transition-all animate-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-65px)] overflow-y-auto"
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
