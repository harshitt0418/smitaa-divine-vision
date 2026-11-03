import React, { useState } from "react";
import {
  Hash,
  Calendar,
  User,
  Sparkles,
  RotateCcw,
  Info,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  MessageCircle,
  HelpCircle,
  Compass,
  Star
} from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import {
  calculateMulank,
  calculateBhagyank,
  calculateNamank,
  NUMBER_ARCHETYPES
} from "../../utils/numerologyCalc";
import { getWhatsAppLink } from "../../data/siteContent";

export default function NumerologyCalculator() {
  const [formData, setFormData] = useState({
    day: "24",
    month: "8",
    year: "1995",
    fullName: "Smita Singh",
    system: "chaldean"
  });

  const [results, setResults] = useState(() => {
    try {
      return {
        mulank: calculateMulank(24),
        bhagyank: calculateBhagyank(24, 8, 1995),
        namank: calculateNamank("Smita Singh", "chaldean")
      };
    } catch {
      return null;
    }
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!formData.fullName || !formData.fullName.trim()) {
        throw new Error("Please enter your name to reveal your core numbers.");
      }

      const d = parseInt(formData.day, 10);
      const m = parseInt(formData.month, 10);
      const y = parseInt(formData.year, 10);

      if (isNaN(d) || d < 1 || d > 31) {
        throw new Error("Please select a valid day of birth (1 - 31).");
      }
      if (isNaN(m) || m < 1 || m > 12) {
        throw new Error("Please select a valid birth month.");
      }
      if (isNaN(y) || y < 1920 || y > 2026) {
        throw new Error("Please enter a valid birth year between 1920 and 2026.");
      }

      const testDate = new Date(y, m - 1, d);
      if (testDate.getMonth() !== m - 1 || testDate.getDate() !== d) {
        throw new Error("The selected date does not exist in the calendar. Please verify the day and month.");
      }

      const mulankResult = calculateMulank(d);
      const bhagyankResult = calculateBhagyank(d, m, y);
      const namankResult = calculateNamank(formData.fullName, "chaldean");

      setResults({
        mulank: mulankResult,
        bhagyank: bhagyankResult,
        namank: namankResult
      });
    } catch (err) {
      setError(err.message || "An error occurred during calculation. Please verify your inputs.");
    }
  };

  const handleReset = () => {
    setFormData({
      day: "",
      month: "",
      year: "",
      fullName: "",
      system: "chaldean"
    });
    setResults(null);
    setError(null);
  };

  // Generate personalized WhatsApp message with calculated numbers
  const getPersonalizedWhatsAppMessage = () => {
    if (!results) {
      return "Hello Smita Singh, I am interested in booking a personal Numerology consultation session. Please share available timings.";
    }
    const name = formData.fullName.trim() || "Client";
    const m = results.mulank.mulank;
    const b = results.bhagyank.bhagyank;
    const n = results.namank.namank;
    return `Hello Smita Singh, my name is ${name}. I calculated my core numbers on your website: Mulank ${m}, Bhagyank ${b}, Namank ${n}. I would like to schedule a personal Numerology consultation to explore their deeper alignment.`;
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { num: 1, name: "January" },
    { num: 2, name: "February" },
    { num: 3, name: "March" },
    { num: 4, name: "April" },
    { num: 5, name: "May" },
    { num: 6, name: "June" },
    { num: 7, name: "July" },
    { num: 8, name: "August" },
    { num: 9, name: "September" },
    { num: 10, name: "October" },
    { num: 11, name: "November" },
    { num: 12, name: "December" }
  ];

  return (
    <section id="calculator" className="py-20 sm:py-28 relative overflow-hidden border-t border-white/5 reveal-on-scroll">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="gold" size="sm" icon={Sparkles} className="animate-pulse-subtle">
            Interactive Numerical Resonance
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-3">
            Discover Your Core Numbers
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300">
            Personalized vibrational profile for your Mulank, Bhagyank, and Namank.
          </p>
          <p className="text-xs text-ivory-muted mt-2 max-w-xl mx-auto">
            Instant reflection based on your birth details and signature name vibration. Private and confidential.
          </p>
        </div>

        {/* Two-Column Grid: Form on Left, Results on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Interactive Input Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-celestial p-6 sm:p-8 rounded-2xl relative border-gold-500/30 shadow-card">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-ivory-light">
                    Enter Your Details
                  </h3>
                  <p className="text-xs text-ivory-muted mt-0.5">
                    Personal Birth & Name Profile
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-ivory-muted hover:text-gold-300 hover:bg-white/5 transition-colors text-xs flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  title="Reset form"
                  aria-label="Reset calculator inputs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in"
                >
                  <Info className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleCalculate} className="space-y-5">
                {/* Full Name Input */}
                <div>
                  <label
                    htmlFor="calc-full-name"
                    className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1.5"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-ivory-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      id="calc-full-name"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Smita Singh"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-midnight-950/80 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/40 transition-colors"
                    />
                  </div>
                  <span className="text-[11px] text-ivory-muted/70 mt-1 block">
                    Determines your Namank (Name Acoustic Vibration).
                  </span>
                </div>

                {/* Date of Birth Inputs */}
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-1.5">
                    Date of Birth *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Day */}
                    <div>
                      <label htmlFor="calc-day" className="sr-only">
                        Day of birth
                      </label>
                      <select
                        id="calc-day"
                        name="day"
                        required
                        value={formData.day}
                        onChange={handleInputChange}
                        className="w-full px-2.5 py-2.5 rounded-xl bg-midnight-950/80 border border-white/15 focus:border-gold-500 text-ivory text-xs transition-colors"
                      >
                        <option value="">Day</option>
                        {days.map((d) => (
                          <option key={d} value={d}>
                            {String(d).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Month */}
                    <div>
                      <label htmlFor="calc-month" className="sr-only">
                        Month of birth
                      </label>
                      <select
                        id="calc-month"
                        name="month"
                        required
                        value={formData.month}
                        onChange={handleInputChange}
                        className="w-full px-2.5 py-2.5 rounded-xl bg-midnight-950/80 border border-white/15 focus:border-gold-500 text-ivory text-xs transition-colors"
                      >
                        <option value="">Month</option>
                        {months.map((m) => (
                          <option key={m.num} value={m.num}>
                            {m.name.substring(0, 3)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Year */}
                    <div>
                      <label htmlFor="calc-year" className="sr-only">
                        Year of birth
                      </label>
                      <input
                        type="number"
                        id="calc-year"
                        name="year"
                        required
                        min="1920"
                        max="2026"
                        value={formData.year}
                        onChange={handleInputChange}
                        placeholder="Year (e.g. 1995)"
                        className="w-full px-2.5 py-2.5 rounded-xl bg-midnight-950/80 border border-white/15 focus:border-gold-500 text-ivory text-xs placeholder:text-ivory-muted/40 transition-colors"
                      />
                    </div>
                  </div>
                  <span className="text-[11px] text-ivory-muted/70 mt-1 block">
                    Day reveals Mulank; complete date reveals Bhagyank.
                  </span>
                </div>

                {/* Calculate CTA */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={Sparkles}
                    className="w-full shadow-gold-glow hover:scale-[1.02] transition-transform duration-300"
                    ariaLabel="Calculate your core numbers"
                  >
                    Discover My Core Numbers
                  </Button>
                </div>
              </form>
            </div>

            {/* Core Framework Meaning */}
            <div className="p-4 rounded-xl bg-midnight-900/50 border border-white/5 space-y-2 text-xs text-ivory-muted">
              <span className="font-semibold text-gold-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold-400" />
                The Three Pillars of Your Numbers
              </span>
              <ul className="space-y-1.5 text-[11px] text-ivory-muted/90">
                <li>
                  <strong className="text-ivory-light">Mulank (Birth Core):</strong> Represents your innate instincts, natural strengths, and core temperament.
                </li>
                <li>
                  <strong className="text-ivory-light">Bhagyank (Destiny Path):</strong> Illuminates your life purpose, major lessons, and career growth arc.
                </li>
                <li>
                  <strong className="text-ivory-light">Namank (Name Vibration):</strong> Governs your social projection, public acoustics, and relationship harmony.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Calculated Results & Archetype Guidance */}
          <div className="lg:col-span-7 space-y-6">
            {results ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                {/* 3 Core Result Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Mulank Card */}
                  <div className="card-celestial p-5 rounded-2xl text-center space-y-2 border-gold-500/30 hover:border-gold-400 transition-all hover:scale-102">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20">
                      Mulank
                    </span>
                    <div className="font-cinzel text-4xl sm:text-5xl font-bold text-gold-gradient py-1">
                      {results.mulank.mulank}
                    </div>
                    <div className="text-xs font-semibold text-ivory-light">
                      {results.mulank.archetype.planet}
                    </div>
                    <p className="text-[10px] text-gold-400/90 font-medium">
                      {results.mulank.archetype.ruler}
                    </p>
                    <div className="pt-2 border-t border-white/10 text-[10px] text-ivory-muted">
                      Birth Core Energy
                    </div>
                  </div>

                  {/* Bhagyank Card */}
                  <div className="card-celestial p-5 rounded-2xl text-center space-y-2 border-gold-500/30 hover:border-gold-400 transition-all hover:scale-102">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      Bhagyank
                    </span>
                    <div className="font-cinzel text-4xl sm:text-5xl font-bold text-gold-gradient py-1">
                      {results.bhagyank.bhagyank}
                    </div>
                    <div className="text-xs font-semibold text-ivory-light">
                      {results.bhagyank.archetype.planet}
                    </div>
                    <p className="text-[10px] text-gold-400/90 font-medium">
                      {results.bhagyank.archetype.ruler}
                    </p>
                    <div className="pt-2 border-t border-white/10 text-[10px] text-ivory-muted">
                      Destiny Life Path
                    </div>
                  </div>

                  {/* Namank Card */}
                  <div className="card-celestial p-5 rounded-2xl text-center space-y-2 border-gold-500/30 hover:border-gold-400 transition-all hover:scale-102">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      Namank
                    </span>
                    <div className="font-cinzel text-4xl sm:text-5xl font-bold text-gold-gradient py-1">
                      {results.namank.namank}
                    </div>
                    <div className="text-xs font-semibold text-ivory-light">
                      {results.namank.archetype.planet}
                    </div>
                    <p className="text-[10px] text-gold-400/90 font-medium">
                      {results.namank.archetype.ruler}
                    </p>
                    <div className="pt-2 border-t border-white/10 text-[10px] text-ivory-muted">
                      Acoustic Vibration
                    </div>
                  </div>
                </div>

                {/* Archetype Synthesis Card */}
                <div className="card-celestial p-6 sm:p-7 rounded-2xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="font-cinzel text-base font-bold text-ivory-light flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold-400" />
                      Core Numerical Resonance & Archetypal Guidance
                    </h4>
                    <span className="text-[10px] text-gold-400 font-medium">
                      Vedic Resonance
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-midnight-950/70 border border-white/5 space-y-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-gold-300 block">
                        Innate Strengths (Mulank {results.mulank.mulank})
                      </span>
                      <p className="text-ivory-soft/90 leading-relaxed text-[11px]">
                        {results.mulank.archetype.strengths}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {results.mulank.archetype.keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-midnight-950/70 border border-white/5 space-y-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-gold-300 block">
                        Destiny Lessons (Bhagyank {results.bhagyank.bhagyank})
                      </span>
                      <p className="text-ivory-soft/90 leading-relaxed text-[11px]">
                        {results.bhagyank.archetype.growthAreas}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {results.bhagyank.archetype.keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Personal Consultation Action Callout */}
                  <div className="pt-2">
                    <Button
                      href={getWhatsAppLink(getPersonalizedWhatsAppMessage())}
                      external
                      variant="whatsapp"
                      size="md"
                      icon={MessageCircle}
                      className="w-full shadow-gold-glow hover:scale-[1.01] transition-transform duration-300"
                      ariaLabel="Discuss your calculated numbers with Smita Singh on WhatsApp"
                    >
                      Discuss My Numbers with Smita Singh
                    </Button>
                  </div>
                </div>

                {/* Mandatory Reflective Disclaimer */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-midnight-950/80 border border-gold-500/20 text-[11px] text-ivory-muted leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gold-300 block mb-0.5">Reflective Guidance:</span>
                    Numerology is an interpretive and reflective discipline. These core numbers illuminate innate tendencies and archetypal patterns for self-reflection.
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-celestial p-8 sm:p-12 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-midnight-900 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center animate-pulse-glow">
                  <Hash className="w-6 h-6" />
                </div>
                <h4 className="font-cinzel text-lg font-bold text-ivory-light">
                  Awaiting Your Date & Name
                </h4>
                <p className="text-xs text-ivory-muted max-w-sm mx-auto leading-relaxed">
                  Enter your birth date and name on the left to reveal your personalized core numbers and archetypal guidance.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
