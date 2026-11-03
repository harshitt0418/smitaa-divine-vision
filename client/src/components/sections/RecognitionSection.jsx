import React, { useState, useRef } from "react";
import {
  Award,
  Video,
  FileCheck,
  ExternalLink,
  Sparkles,
  Maximize2,
  Play,
  Volume2,
  ShieldCheck,
  Building,
  CheckCircle2,
  Calendar,
  MapPin
} from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { SITE_CONFIG } from "../../data/siteContent";

export default function RecognitionSection() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const { recognition } = SITE_CONFIG;

  const handleVideoPlayToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <section id="recognition" className="py-20 sm:py-28 relative overflow-hidden border-t border-white/5 reveal-on-scroll">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="sm" icon={Award}>
            Credibility & Media Recognition
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-3">
            Featured at Recognised Astrology Platforms
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300">
            Participation, professional conclaves, and documented practitioner credibility.
          </p>

          {/* Carefully worded lead narrative */}
          <div className="mt-5 p-4 rounded-xl bg-midnight-900/60 border border-gold-500/25 max-w-2xl mx-auto text-xs sm:text-sm text-ivory-soft leading-relaxed">
            &ldquo;Smita Singh is an astrology and numerology expert associated with recognised astrology events and platforms, including <strong>Navbharat Astro Mahasangam</strong> and <strong>Navbharat Times/NBT Times</strong>.&rdquo;
          </div>
        </div>

        {/* Top Feature Grid: Stage Photograph + Event Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          {/* Left Feature: Stage Recognition Photograph */}
          <div className="lg:col-span-7 space-y-4">
            <div className="card-celestial p-6 sm:p-7 rounded-2xl space-y-4 border-gold-500/30 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-gold-400" />
                  Stage Felicitation
                </span>
                <span className="text-xs text-ivory-muted font-medium">
                  Navbharat Times (NBT)
                </span>
              </div>

              {/* Image Preview with click-to-expand */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 group bg-midnight-950">
                <img
                  src="/assets/recognition/nbt-astro-mahasangam-stage.jpg"
                  alt="Smita Singh receiving recognition on stage at the Navbharat Astro Mahasangam"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
                  loading="lazy"
                />
                
                {/* Expand Overlay Button */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedMedia({
                      type: "image",
                      title: "Navbharat Astro Mahasangam Stage Felicitation",
                      src: "/assets/recognition/nbt-astro-mahasangam-stage.jpg",
                      caption:
                        "Smita Singh receiving the official ASTRO महासंगम trophy shield from dignitaries at the Navbharat Astro+ Mahasangam Conclave & Expo, organized by the Times Group / Navbharat Times."
                    })
                  }
                  className="absolute inset-0 bg-midnight-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-ivory-light text-xs font-medium focus:outline-none focus:opacity-100"
                  aria-label="View full resolution stage felicitation image"
                >
                  <span className="px-3 py-1.5 rounded-full bg-midnight-900/90 border border-gold-500/40 backdrop-blur-sm flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                    Click to Expand
                  </span>
                </button>
              </div>

              {/* Caption & Context */}
              <div className="space-y-1.5 pt-1 text-left">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-ivory-light">
                  Navbharat Astro+ Mahasangam Conclave & Expo
                </h3>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Smita Singh receiving formal felicitation at the <strong>Navbharat Astro Mahasangam</strong>, a premier national astrology expo and conference organized by the Times Group to provide authentic Vedic astrology, horoscope analysis, and life guidance remedies.
                </p>
              </div>
            </div>
          </div>

          {/* Right Feature: Square Responsive Event Video */}
          <div className="lg:col-span-5 space-y-4">
            <div className="card-celestial p-6 sm:p-7 rounded-2xl space-y-4 border-gold-500/30 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-indigo-400" />
                  Event Video Footage
                </span>
                <span className="text-xs text-ivory-muted font-medium">
                  Times Internet Presents Astro+
                </span>
              </div>

              {/* Responsive Square Video Container (1:1 Aspect Ratio) */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-square flex items-center justify-center">
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  preload="metadata"
                  poster="/assets/recognition/nbt-astro-event-poster.jpg"
                  className="w-full h-full object-cover"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  aria-label="Smita Singh at a recognised astrology and numerology event"
                >
                  <source src="/assets/recognition/nbt-astro-event-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Initial Play Overlay Button (Hidden once user clicks play) */}
                {!isVideoPlaying && (
                  <button
                    type="button"
                    onClick={handleVideoPlayToggle}
                    className="absolute inset-0 bg-midnight-950/30 hover:bg-midnight-950/10 transition-colors flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    aria-label="Play event video"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold-500 text-midnight-950 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-1 fill-current" />
                    </div>
                  </button>
                )}
              </div>

              {/* Video Caption */}
              <div className="space-y-1 text-left">
                <p className="text-xs font-semibold text-ivory-light">
                  Smita Singh at a recognised astrology and numerology event.
                </p>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  Stage presentation footage from the Times Internet Presents Astro+ conclave, highlighting professional participation and public address.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Achievement & Documentation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Official Conclave Profile Documentation */}
          <div className="card-celestial p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-gold-500/40 transition-colors group">
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gold-300">
                  Verified Profile
                </span>
                <FileCheck className="w-4 h-4 text-gold-400" />
              </div>

              {/* Thumbnail */}
              <div
                className="relative rounded-lg overflow-hidden border border-white/10 bg-midnight-950 aspect-[4/3] cursor-pointer group-hover:border-gold-500/30 transition-colors"
                onClick={() =>
                  setSelectedMedia({
                    type: "image",
                    title: "Times Group / NBT Astrological Conclave Profile",
                    src: "/assets/recognition/nbt-astro-profile-doc.jpg",
                    caption:
                      "Documented overview highlighting Smita Singh's role as an expert participant at the NBT Astro+ Mahasangam and her academic MBA background transitioning into professional occult practices."
                  })
                }
              >
                <img
                  src="/assets/recognition/nbt-astro-profile-doc.jpg"
                  alt="Documentation of Smita Singh's participation in Navbharat Times events"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-midnight-950/20 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-midnight-950/80 text-[10px] text-ivory-light border border-white/10">
                  Click to View
                </span>
              </div>

              <h4 className="font-cinzel text-sm font-bold text-ivory-light">
                Times Group / NBT Profile
              </h4>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Featured as an expert participant and consultant for the <strong>NBT Astro+ Mahasangam Conclave & Expo</strong>, organized by the Times Group.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedMedia({
                  type: "image",
                  title: "Times Group / NBT Astrological Conclave Profile",
                  src: "/assets/recognition/nbt-astro-profile-doc.jpg",
                  caption:
                    "Documented overview highlighting Smita Singh's role as an expert participant at the NBT Astro+ Mahasangam and her academic MBA background transitioning into professional occult practices."
                })
              }
              className="text-xs text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-1.5 pt-2 border-t border-white/5 focus:outline-none"
            >
              <span>View Verification Document</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Card 2: Destiny Sscience Mumbai Felicitation */}
          <div className="card-celestial p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-gold-500/40 transition-colors group">
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gold-300">
                  Mumbai Conclave
                </span>
                <Award className="w-4 h-4 text-gold-400" />
              </div>

              {/* Thumbnail */}
              <div
                className="relative rounded-lg overflow-hidden border border-white/10 bg-midnight-950 aspect-[4/3] cursor-pointer group-hover:border-gold-500/30 transition-colors"
                onClick={() =>
                  setSelectedMedia({
                    type: "image",
                    title: "Numerology Professional Success Program — Mumbai",
                    src: "/assets/event-award.jpg",
                    caption:
                      "Smita Singh receiving certification and recognition at the Numerology Professional Success Program in Mumbai (May 2024), felicitated by Arviend Sud (Destiny Sscience)."
                  })
                }
              >
                <img
                  src="/assets/event-award.jpg"
                  alt="Smita Singh receiving certificate recognition in Mumbai"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-midnight-950/20 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-midnight-950/80 text-[10px] text-ivory-light border border-white/10">
                  Click to View
                </span>
              </div>

              <h4 className="font-cinzel text-sm font-bold text-ivory-light">
                Professional Success Program
              </h4>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Certification and felicitation at the <strong>Destiny Sscience Numerology Professional Success Program</strong> in Mumbai by Arviend Sud.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedMedia({
                  type: "image",
                  title: "Numerology Professional Success Program — Mumbai",
                  src: "/assets/event-award.jpg",
                  caption:
                    "Smita Singh receiving certification and recognition at the Numerology Professional Success Program in Mumbai (May 2024), felicitated by Arviend Sud (Destiny Sscience)."
                })
              }
              className="text-xs text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-1.5 pt-2 border-t border-white/5 focus:outline-none"
            >
              <span>View Mumbai Award Photo</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Card 3: Google Maps & Digital Footprint Reference */}
          <div className="card-celestial p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-gold-500/40 transition-colors group">
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gold-300">
                  Digital Footprint
                </span>
                <MapPin className="w-4 h-4 text-gold-400" />
              </div>

              {/* Thumbnail */}
              <div
                className="relative rounded-lg overflow-hidden border border-white/10 bg-midnight-950 aspect-[4/3] cursor-pointer group-hover:border-gold-500/30 transition-colors"
                onClick={() =>
                  setSelectedMedia({
                    type: "image",
                    title: "Google Local Search & Social Handles",
                    src: "/assets/recognition/google-maps-instagram-reference.jpg",
                    caption:
                      "Verification references showing active Google Maps presence ('Smita Singh Astrologer Lucknow'), official Instagram @smitaa.divinevision, and conclave references."
                  })
                }
              >
                <img
                  src="/assets/recognition/google-maps-instagram-reference.jpg"
                  alt="Search reference for Smita Singh Astrologer Lucknow and social handles"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-midnight-950/20 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-midnight-950/80 text-[10px] text-ivory-light border border-white/10">
                  Click to View
                </span>
              </div>

              <h4 className="font-cinzel text-sm font-bold text-ivory-light">
                Verified Local & Social Footprint
              </h4>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Searchable via <strong>Smita Singh Astrologer Lucknow</strong> on Google Maps, and through verified Instagram and YouTube platforms.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedMedia({
                  type: "image",
                  title: "Google Local Search & Social Handles",
                  src: "/assets/recognition/google-maps-instagram-reference.jpg",
                  caption:
                    "Verification references showing active Google Maps presence ('Smita Singh Astrologer Lucknow'), official Instagram @smitaa.divinevision, and conclave references."
                })
              }
              className="text-xs text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-1.5 pt-2 border-t border-white/5 focus:outline-none"
            >
              <span>View Search Reference</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      <Modal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        title={selectedMedia?.title || "Verification Asset"}
        maxWidth="max-w-3xl"
      >
        {selectedMedia && (
          <div className="space-y-4 text-center">
            <div className="rounded-xl overflow-hidden border border-gold-500/30 bg-midnight-950 p-2">
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                className="w-full max-h-[75vh] object-contain rounded-lg mx-auto"
              />
            </div>
            <div className="text-left text-xs text-ivory-muted p-2 space-y-1">
              <p className="font-semibold text-gold-300">Documented Evidence:</p>
              <p className="text-ivory-soft leading-relaxed">{selectedMedia.caption}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
