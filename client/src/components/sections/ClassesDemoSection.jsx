import React, { useState } from "react";
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
  HardDrive,
  MessageCircle,
  Calendar,
  Award,
  Users,
  Compass,
  ArrowRight
} from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { SITE_CONFIG, getWhatsAppLink } from "../../data/siteContent";

export default function ClassesDemoSection() {
  const { classDemos, classPrograms } = SITE_CONFIG;
  const [activeTab, setActiveTab] = useState("programs"); // 'programs' | 'demos'

  const generalClassInquiry = getWhatsAppLink(
    "Hello Smita Singh, I visited the classes section on your website and would like to inquire about upcoming Numerology batch schedules, syllabus, and enrollment details."
  );

  return (
    <section id="classes" className="py-20 sm:py-28 relative overflow-hidden bg-midnight-950/70 border-t border-white/5 reveal-on-scroll">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="gold" size="sm" icon={GraduationCap} className="animate-pulse-subtle">
            Educational Academy & Masterclasses
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-3">
            Numerology Classes & Masterclasses
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300">
            Preview recorded lecture demos on Google Drive and book your seat in upcoming live certification batches.
          </p>
          <p className="text-xs text-ivory-muted mt-2 max-w-2xl mx-auto leading-relaxed">
            Smita Singh conducts mentor-led, structured Numerology training combining classical Vedic systems, Chaldean acoustics, and practical client case studies.
          </p>
        </div>

        {/* Interactive Workflow Switcher: Book Classes vs Access Google Drive Demos */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-midnight-900 border border-gold-500/30 shadow-card">
            <button
              type="button"
              onClick={() => setActiveTab("programs")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "programs"
                  ? "bg-gold-500 text-midnight-950 shadow-gold-glow scale-[1.02]"
                  : "text-ivory-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Book Class Programs (3 Batches)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("demos")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === "demos"
                  ? "bg-gold-500 text-midnight-950 shadow-gold-glow scale-[1.02]"
                  : "text-ivory-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <HardDrive className="w-4 h-4" />
              <span>Watch Drive Demos (3 Parts)</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CLASS PROGRAMS & BOOKING (Like Consultancy)       */}
        {/* ======================================================== */}
        {activeTab === "programs" && (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-400">
            {/* Quick Helper / Reassurance Banner */}
            <div className="p-4 rounded-xl bg-midnight-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-muted max-w-5xl mx-auto">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>
                  <strong>Want to preview the teaching style first?</strong> You can access recorded class demos on Google Drive anytime.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("demos")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-midnight-950 border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 transition-colors shrink-0 text-xs font-medium"
              >
                <span>Switch to Drive Demos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Structured Class Booking Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
              {classPrograms.map((program, index) => {
                const programWhatsAppLink = getWhatsAppLink(program.whatsAppMessage);
                return (
                  <div
                    key={program.id}
                    className="card-celestial p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-6 hover:border-gold-500/50 hover:shadow-card transition-all duration-300 group"
                  >
                    <div className="space-y-5">
                      {/* Top Header Pill */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-[10px] font-cinzel font-bold text-gold-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                          {program.level}
                        </span>
                        <span className="text-[11px] text-ivory-muted">
                          Batch Option 0{index + 1}
                        </span>
                      </div>

                      {/* Course Title & Subtitle */}
                      <div>
                        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-ivory-light group-hover:text-gold-300 transition-colors leading-snug">
                          {program.title}
                        </h3>
                        <p className="text-xs text-gold-400 font-medium mt-1">
                          {program.subtitle}
                        </p>
                      </div>

                      {/* Duration & Format Badge */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-midnight-950/70 border border-white/5 text-[11px]">
                        <div className="flex items-center gap-2 text-ivory-light">
                          <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-ivory-muted">
                          <Users className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span>{program.format}</span>
                        </div>
                      </div>

                      {/* Curriculum Highlights */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-300 block">
                          Curriculum Highlights:
                        </span>
                        <ul className="space-y-2 text-xs text-ivory-soft/90">
                          {program.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* WhatsApp Inquiry Preview */}
                      <div className="p-3 rounded-xl bg-midnight-950/60 border border-white/5 text-[11px] text-ivory-muted space-y-1">
                        <span className="font-medium text-gold-300 block text-[10px] uppercase tracking-wider">
                          Direct WhatsApp Booking:
                        </span>
                        <p className="italic text-[10px] text-ivory-muted/80 line-clamp-2">
                          &ldquo;{program.whatsAppMessage}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Action Button: Book via WhatsApp */}
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <Button
                        href={programWhatsAppLink}
                        external
                        variant="whatsapp"
                        size="md"
                        icon={MessageCircle}
                        className="w-full shadow-gold-glow hover:scale-[1.02] transition-transform duration-300"
                        ariaLabel={`Book ${program.title} via WhatsApp`}
                      >
                        Book Class on WhatsApp
                      </Button>
                      <p className="text-[10px] text-center text-ivory-muted/70">
                        Redirects directly to WhatsApp with pre-filled batch inquiry
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ACCESS DEMO CLASSES (Google Drive)                */}
        {/* ======================================================== */}
        {activeTab === "demos" && (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-400">
            {/* Top Drive Notice Banner */}
            <div className="p-4 rounded-xl bg-midnight-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-muted max-w-5xl mx-auto">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0">
                  <HardDrive className="w-4 h-4" />
                </div>
                <span>
                  <strong>Official Google Drive Access:</strong> Stream actual recorded classroom sessions in HD without downloading.
                </span>
              </div>
              <Button
                href="https://drive.google.com/file/d/1UYztXf94v3i5Iqs0L3YM2t0bkYCN35wD/view?usp=drivesdk"
                external
                variant="outline"
                size="sm"
                icon={HardDrive}
                className="shrink-0 text-xs"
              >
                Open Google Drive Folder
              </Button>
            </div>

            {/* 3 Demo Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {classDemos.map((demo) => (
                <div
                  key={demo.id}
                  className="card-celestial p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:border-gold-500/50 hover:shadow-card transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Visual Preview / Thumbnail Container */}
                    <div className="relative rounded-xl overflow-hidden border border-gold-500/30 bg-midnight-900 aspect-video flex items-center justify-center group-hover:border-gold-400 transition-colors">
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

                      {/* Google Drive Pill */}
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

                  {/* Actions: Watch on Drive & Book via WhatsApp */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <Button
                      href={demo.driveUrl}
                      external
                      variant="primary"
                      size="md"
                      icon={ExternalLink}
                      iconPosition="right"
                      className="w-full text-xs shadow-gold-glow"
                      ariaLabel={`Watch ${demo.title} on Google Drive (opens in a new tab)`}
                    >
                      {demo.ctaText || "Watch Demo on Drive"}
                    </Button>

                    <Button
                      href={getWhatsAppLink(
                        demo.whatsAppMessage ||
                          `Hello Smita Singh, I watched ${demo.title} on Google Drive and would like to book my seat for the upcoming class cohort.`
                      )}
                      external
                      variant="whatsapp"
                      size="sm"
                      icon={MessageCircle}
                      className="w-full text-xs"
                      ariaLabel={`Inquire about classes after watching ${demo.title}`}
                    >
                      {demo.badgeType === "Review" ? "Inquire About Classes (WhatsApp)" : "Book Class After Demo"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* OVERARCHING ENROLLMENT & BATCH INQUIRY CARD               */}
        {/* ======================================================== */}
        <div className="mt-14 card-celestial p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto border-gold-500/30 text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-midnight-900 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center animate-pulse-glow">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-ivory-light">
              Ready to Begin Your Numerological Mastery?
            </h3>
            <p className="font-cormorant italic text-base sm:text-lg text-gold-300 mt-1">
              Personalized interactive batches with direct mentor feedback.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left py-2 border-y border-white/10 text-xs">
            <div className="p-2.5 rounded-xl bg-midnight-950/60 border border-white/5 space-y-1">
              <span className="font-semibold text-gold-300 block text-[11px]">Live Sessions</span>
              <p className="text-[10px] text-ivory-muted">Interactive live classes with live Q&A</p>
            </div>
            <div className="p-2.5 rounded-xl bg-midnight-950/60 border border-white/5 space-y-1">
              <span className="font-semibold text-gold-300 block text-[11px]">Drive Archive</span>
              <p className="text-[10px] text-ivory-muted">Full lifetime lecture video access</p>
            </div>
            <div className="p-2.5 rounded-xl bg-midnight-950/60 border border-white/5 space-y-1">
              <span className="font-semibold text-gold-300 block text-[11px]">Study Guides</span>
              <p className="text-[10px] text-ivory-muted">Comprehensive charts & worksheets</p>
            </div>
            <div className="p-2.5 rounded-xl bg-midnight-950/60 border border-white/5 space-y-1">
              <span className="font-semibold text-gold-300 block text-[11px]">Certification</span>
              <p className="text-[10px] text-ivory-muted">Official completion certificate</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ivory-muted max-w-2xl mx-auto leading-relaxed">
            Contact Smita Singh directly on WhatsApp to receive the next batch start date, class timings, and secure enrollment link.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button
              href={generalClassInquiry}
              external
              variant="whatsapp"
              size="lg"
              icon={MessageCircle}
              className="shadow-gold-glow hover:scale-105 transition-all duration-300"
              ariaLabel="Inquire about Numerology classes via WhatsApp"
            >
              Inquire & Book Batch on WhatsApp
            </Button>
            <Button
              href="https://drive.google.com/file/d/1UYztXf94v3i5Iqs0L3YM2t0bkYCN35wD/view?usp=drivesdk"
              external
              variant="outline"
              size="lg"
              icon={HardDrive}
              ariaLabel="Open demo lecture on Google Drive"
            >
              Access Drive Demos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
