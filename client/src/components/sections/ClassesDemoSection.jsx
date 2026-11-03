import React from "react";
import {
  Video,
  ExternalLink,
  Play,
  Sparkles,
  BookOpen,
  GraduationCap,
  Clock,
  Layers,
  ShieldCheck,
  CheckCircle2,
  HardDrive
} from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { SITE_CONFIG, getWhatsAppLink } from "../../data/siteContent";

export default function ClassesDemoSection() {
  const { classDemos } = SITE_CONFIG;

  return (
    <section id="classes" className="py-20 sm:py-28 relative overflow-hidden bg-midnight-950/70 border-t border-white/5 reveal-on-scroll">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="sm" icon={GraduationCap}>
            Educational Masterclasses
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-3">
            Numerology Classes Demo
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300">
            Preview recorded masterclass sessions, foundational lectures, and student case studies.
          </p>
          <p className="text-xs text-ivory-muted mt-2 max-w-2xl mx-auto">
            Experience Smita Singh's clear, engaging teaching style firsthand. These video demos illustrate how numerical archetypes are systematically taught and applied to real-life situations.
          </p>
        </div>

        {/* 3 Premium Demo Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-14">
          {classDemos.map((demo, index) => (
            <div
              key={demo.id}
              className="card-celestial p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:border-gold-500/50 hover:shadow-card transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Visual Preview / Thumbnail Container */}
                <div className="relative rounded-xl overflow-hidden border border-gold-500/30 bg-midnight-900 aspect-video flex items-center justify-center group-hover:border-gold-400 transition-colors">
                  {/* Subtle dark celestial gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-midnight-800 via-midnight-950 to-midnight-900" />
                  
                  {/* Concentric subtle celestial circles */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-28 h-28 rounded-full border border-gold-500/30 animate-pulse-subtle" />
                    <div className="w-40 h-40 rounded-full border border-gold-500/15 absolute" />
                  </div>

                  {/* Play badge */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400/60 flex items-center justify-center text-gold-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-midnight-950 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>

                  {/* Part Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-midnight-950/80 border border-gold-500/30 text-[10px] font-cinzel text-gold-300 font-bold uppercase tracking-wider backdrop-blur-sm">
                      {demo.part}
                    </span>
                  </div>

                  {/* External Service Pill */}
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-midnight-950/80 border border-white/10 text-[10px] text-ivory-muted backdrop-blur-sm">
                    <HardDrive className="w-3 h-3 text-gold-400" />
                    <span>Google Drive</span>
                  </div>
                </div>

                {/* Content info */}
                <div>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-ivory-light group-hover:text-gold-300 transition-colors">
                    {demo.title}
                  </h3>
                  <p className="text-xs text-gold-400/90 font-medium mt-1">
                    {demo.subtitle}
                  </p>
                  <p className="text-xs text-ivory-muted mt-2.5 leading-relaxed">
                    {demo.description}
                  </p>
                </div>

                {/* Covered topics tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {demo.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-ivory-soft border border-white/5"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button & External link notice */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <Button
                  href={demo.driveUrl}
                  external
                  variant="primary"
                  size="md"
                  icon={ExternalLink}
                  iconPosition="right"
                  className="w-full text-xs"
                  ariaLabel={`Watch ${demo.title} on Google Drive (opens in a new tab)`}
                >
                  Watch Class Demo
                </Button>

                <p className="text-[10px] text-center text-ivory-muted/70 flex items-center justify-center gap-1">
                  <span>Opens securely on Google Drive in a new tab</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrollment and Custom Query Banner */}
        <div className="card-celestial p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto border-gold-500/30 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-midnight-900 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-ivory-light">
            Interested in Complete Numerology Masterclasses?
          </h3>
          <p className="text-xs sm:text-sm text-ivory-muted max-w-2xl mx-auto leading-relaxed">
            Smita Singh conducts personalized interactive courses covering Vedic numerology, name correction acoustics, Pythagorean foundations, and life path chart reading. Contact directly to receive upcoming batch schedules and curriculum details.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button
              href={getWhatsAppLink(
                "Hello Smita Singh, I watched the Numerology class demos on your website and would like to inquire about upcoming batch schedules and course curriculum."
              )}
              external
              variant="whatsapp"
              size="md"
              ariaLabel="Inquire about Numerology classes via WhatsApp"
            >
              Inquire About Classes (WhatsApp)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
