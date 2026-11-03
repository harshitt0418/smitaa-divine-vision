import React, { useState, useEffect } from "react";
import CelestialBackground from "./components/ui/CelestialBackground";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import RecognitionSection from "./components/sections/RecognitionSection";
import AstrologySection from "./components/sections/AstrologySection";
import NumerologySection from "./components/sections/NumerologySection";
import NumerologyCalculator from "./components/sections/NumerologyCalculator";
import ClassesDemoSection from "./components/sections/ClassesDemoSection";
import VastuSection from "./components/sections/VastuSection";
import AboutSection from "./components/sections/AboutSection";
import BookSection from "./components/sections/BookSection";
import ReviewsSection from "./components/sections/ReviewsSection";
import BookingCTA from "./components/sections/BookingCTA";
import { getTestimonials } from "./services/api";
import { VERIFIED_REVIEWS } from "./data/testimonials";

export default function App() {
  const [reviews, setReviews] = useState(VERIFIED_REVIEWS);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadReviews() {
      try {
        const data = await getTestimonials();
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      } catch (err) {
        console.info("Using local verified reviews fallback:", err.message);
      } finally {
        if (isMounted) setIsLoadingReviews(false);
      }
    }
    loadReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  // Graceful scroll-reveal animation observer
  useEffect(() => {
    const handleScrollReveal = () => {
      const targets = document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      targets.forEach((t) => observer.observe(t));
      return observer;
    };

    const timer = setTimeout(() => {
      handleScrollReveal();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen text-ivory flex flex-col bg-midnight-950 font-sans selection:bg-gold-500/30 selection:text-ivory-light">
      {/* Restrained subtle celestial canvas background */}
      <CelestialBackground />

      {/* Main sticky navigation */}
      <Header />

      {/* Main Structured Flow */}
      <main id="main-content" className="flex-grow z-10">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Credibility & Media Recognition */}
        <RecognitionSection />

        {/* 3. Vedic Astrology (Jyotish) */}
        <AstrologySection />

        {/* 4. Numerology Foundation */}
        <NumerologySection />

        {/* 5. Interactive Core Numbers Calculator */}
        <NumerologyCalculator />

        {/* 6. Numerology Classes Demo Videos */}
        <ClassesDemoSection />

        {/* 7. Vastu Shastra & Spatial Harmony */}
        <VastuSection />

        {/* 8. About Smita Singh & Professional Background */}
        <AboutSection />

        {/* 9. Featured Publication: The Divine Digits */}
        <BookSection />

        {/* 10. Authentic Client Reviews & Verification Lightbox */}
        <ReviewsSection backendReviews={reviews} />

        {/* 11. Final Booking CTA & WhatsApp Options */}
        <BookingCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
