import React, { useState, useEffect } from "react";
import CelestialBackground from "./components/ui/CelestialBackground";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import AstrologySection from "./components/sections/AstrologySection";
import NumerologySection from "./components/sections/NumerologySection";
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
        if (isMounted && data) {
          setReviews(data);
        }
      } catch (err) {
        console.error("Error loading reviews:", err);
      } finally {
        if (isMounted) setIsLoadingReviews(false);
      }
    }
    loadReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen text-ivory flex flex-col bg-midnight-950 font-sans selection:bg-gold-500/30 selection:text-ivory-light">
      {/* Restrained subtle celestial canvas background */}
      <CelestialBackground />

      {/* Main sticky navigation */}
      <Header />

      {/* Main Page Flow */}
      <main id="main-content" className="flex-grow z-10">
        <Hero />
        <AstrologySection />
        <NumerologySection />
        <VastuSection />
        <AboutSection />
        <BookSection />
        <ReviewsSection backendReviews={reviews} />
        <BookingCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
