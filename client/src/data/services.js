import { getWhatsAppLink } from "./siteContent";

export const SERVICES = [
  {
    id: "astrology",
    discipline: "Vedic Astrology (Jyotish)",
    headline: "A Reflective Framework for Navigating Timing, Relationships & Purpose",
    subtitle: "A thoughtful chart reading is not fatalism—it is an illuminating map of planetary archetypes and seasonal cycles in your life.",
    philosophy: "We approach Vedic Astrology as a mirror for self-inquiry rather than rigid fortune-telling. A birth chart (Kundali) maps the celestial configurations at the exact moment of your birth, providing a language to examine your intrinsic inclinations, pivotal career shifts, relational dynamics, and seasonal phases.",
    sessionIncludes: [
      "In-depth analysis of planetary placements, Dashas (planetary periods), and significant transits",
      "Examination of career strengths, timing of transitions, and entrepreneurial inclinations",
      "Clarity on relationship patterns, emotional temperaments, and interpersonal dynamics",
      "Grounded, reflective guidance to align major decisions with favorable temporal cycles",
      "Practical, non-dogmatic lifestyle remedies focused on mindfulness and balance"
    ],
    whoIsItFor: "Individuals standing at major life crossroads—considering career transitions, evaluating business timing, navigating personal relationships, or seeking self-understanding through a classical reflective tradition.",
    ethicalNote: "Sessions offer interpretive insight and reflective counsel. We do not claim fatalistic certainty, unalterable predictions, or guaranteed external outcomes.",
    ctaLabel: "Book Astrology Consultation",
    whatsAppMessage: "Hello Smitaa, I’m interested in booking an Astrology consultation. Please share the available timings and what details you need from me.",
    get whatsAppLink() {
      return getWhatsAppLink(this.whatsAppMessage);
    },
    iconName: "Compass",
    symbolText: "ज्योतिष",
    accentGlow: "from-amber-500/20 via-gold-500/10 to-transparent",
    keyInquiryItems: ["Date, exact time & place of birth", "Primary focus questions (Career, Relationships, Relocation)"]
  },
  {
    id: "numerology",
    discipline: "Vedic & Pythagorean Numerology",
    headline: "Decoding the Vibrational Architecture of Your Name & Birth Numbers",
    subtitle: "Every digit holds an intrinsic resonance. Discover how your life path, destiny number, and name vibrations align.",
    philosophy: "In numerological traditions, numbers are archetypal symbols reflecting patterns of thought, expression, and developmental cycles. Through the analysis of your Mulank (birth number), Bhagyank (destiny number), and Namank (name vibration), a numerology session offers an objective lens to evaluate your innate gifts and recurring life motifs.",
    sessionIncludes: [
      "Comprehensive calculation of Core Numbers: Life Path, Expression, and Soul Urge",
      "Name vibration analysis and gentle phonetic alignment suggestions where appropriate",
      "Annual and monthly personal year cycles (Varshik Ank) to understand current focus",
      "Compatibility review for partnerships, joint ventures, and brand name acoustics",
      "Actionable recommendations to align day-to-day focus with your primary numerical strengths"
    ],
    whoIsItFor: "Seekers wanting a clear, structured analytical perspective on their personal tendencies, professionals exploring name or brand optimization, and anyone curious about the numerical cycles governing their current chapter of life.",
    ethicalNote: "Numerology is an interpretive symbolic discipline that facilitates self-reflection. We do not claim scientific proof or promise automatic financial or personal results.",
    ctaLabel: "Book Numerology Session",
    whatsAppMessage: "Hello Smitaa, I’m interested in booking a Numerology session. Please share the available timings and what details you need from me.",
    get whatsAppLink() {
      return getWhatsAppLink(this.whatsAppMessage);
    },
    iconName: "Hash",
    symbolText: "अंकशास्त्र",
    accentGlow: "from-blue-500/20 via-indigo-500/10 to-transparent",
    keyInquiryItems: ["Full legal name & commonly used signatures", "Complete date of birth (Day, Month, Year)"]
  },
  {
    id: "vastu",
    discipline: "Vastu Shastra & Space Harmonization",
    headline: "Sensible, Practical Spatial Alignment for Homes & Workplaces",
    subtitle: "Harmonizing elemental zones, orientation, and functional flow without demanding structural demolition.",
    philosophy: "Vastu Shastra is the traditional Indian wisdom of spatial design and directional balance. We believe your living and working environment deeply influences mental clarity, calm, and functional efficiency. Our consultations focus on mindful, practical adjustments that respect your actual architectural constraints.",
    sessionIncludes: [
      "Directional mapping and functional review of the 16 cardinal and intercardinal zones",
      "Evaluation of primary active zones: main entry, kitchen, workspace, and sleeping quarters",
      "Identification of spatial imbalances with non-destructive corrective suggestions",
      "Practical placement guidance for elemental remedies, light, air flow, and focal points",
      "Tailored recommendations for both residential sanctuaries and commercial productivity"
    ],
    whoIsItFor: "Homeowners, tenants, and business leaders seeking a serene, balanced environment, whether moving into a new property, renovating, or resolving persistent feelings of restlessness in a current layout.",
    ethicalNote: "Our Vastu consultations are grounded, sensible, and architectural. We strictly avoid fear-based superstitions, costly demolition mandates, or promises of guaranteed instant wealth.",
    ctaLabel: "Book Vastu Consultation",
    whatsAppMessage: "Hello Smitaa, I’m interested in booking a Vastu consultation. Please share the available timings and what details you need from me.",
    get whatsAppLink() {
      return getWhatsAppLink(this.whatsAppMessage);
    },
    iconName: "Home",
    symbolText: "वास्तुशास्त्र",
    accentGlow: "from-emerald-500/20 via-teal-500/10 to-transparent",
    keyInquiryItems: ["Floor plan or rough directional sketch", "Property compass orientation (North direction)", "Photographs/video walkthrough of key zones"]
  }
];
