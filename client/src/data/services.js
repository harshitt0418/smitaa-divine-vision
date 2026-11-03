import { getWhatsAppLink } from "./siteContent";

/**
 * Exact Consultation and Healing Services (Names & Prices Specified by Client)
 */
export const CONSULTATION_SERVICES = [
  {
    id: "numerology-consultation",
    name: "Numerology Consultation",
    price: 2100,
    formattedPrice: "₹2,100",
    category: "Numerology",
    duration: "45–60 mins",
    description: "Detailed vibrational analysis of your name, Mulank (birth number), and Bhagyank (destiny number).",
    tagline: "Vibrational name tuning and core number alignment",
    iconName: "Hash",
    badge: "Popular",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Mulank & Bhagyank analysis", "Name vibration acoustics", "Current Personal Year cycle"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book a Numerology Consultation (₹2,100). Please let me know the appointment procedure.",
  },
  {
    id: "astrology-consultation",
    name: "Astrology Consultation",
    price: 2100,
    formattedPrice: "₹2,100",
    category: "Astrology",
    duration: "45–60 mins",
    description: "Personalized birth chart (Kundali) reading, current planetary period (Dasha), and timing of transitions.",
    tagline: "Comprehensive birth chart and planetary cycles analysis",
    iconName: "Compass",
    badge: "Popular",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Kundali planetary placements", "Vimshottari Dasha timing", "Grounded reflective guidance"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book an Astrology Consultation (₹2,100). Please let me know the appointment procedure.",
  },
  {
    id: "personal-in-person-consultation",
    name: "Personal / In-Person Consultation",
    price: 3500,
    formattedPrice: "₹3,500",
    category: "In-Person",
    duration: "60–75 mins",
    description: "One-on-one in-person consultation session with Smita Singh for in-depth personal or family guidance.",
    tagline: "Dedicated in-person consultation & holistic guidance",
    iconName: "Users",
    badge: "In-Person",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Face-to-face personalized review", "Astrology + Numerology synthesis", "Private consultation room"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book a Personal / In-Person Consultation (₹3,500). Please let me know the available in-person slots.",
  },
  {
    id: "online-consultation-report",
    name: "Online Consultation with Detailed Report",
    price: 2100,
    formattedPrice: "₹2,100",
    category: "Astrology",
    duration: "Session + Written Report",
    description: "Comprehensive live consultation accompanied by an official personalized written summary report.",
    tagline: "Live consultation with prepared written report",
    iconName: "FileText",
    badge: "Includes Report",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Live interactive consultation", "Written summary PDF report", "Remedial recommendations"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book an Online Consultation with Detailed Report (₹2,100).",
  },
  {
    id: "vastu-consultation",
    name: "Vastu Consultation",
    price: 5100,
    formattedPrice: "₹5,100",
    category: "Vastu",
    duration: "Comprehensive Review",
    description: "Directional mapping and functional review of 16 spatial zones for residential homes or workspaces.",
    tagline: "16-direction spatial balance & architectural harmony",
    iconName: "Home",
    badge: "Spatial Alignment",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Directional floor-plan mapping", "Non-demolition elemental remedies", "Home & office energization"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book a Vastu Consultation (₹5,100). Please share the details needed for space analysis.",
  },
  {
    id: "sound-healing-session",
    name: "Sound Healing Session — 45 minutes",
    price: 1500,
    formattedPrice: "₹1,500",
    category: "Healing",
    duration: "45 minutes",
    description: "Deep meditative sound frequency therapy using singing bowls to calm the nervous system and clear blockages.",
    tagline: "45-minute harmonic chakra resonance therapy",
    iconName: "Sparkles",
    badge: "Healing",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Acoustic resonance frequencies", "Chakra balancing & stress release", "Meditative restorative space"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book a Sound Healing Session — 45 minutes (₹1,500).",
  },
  {
    id: "basic-astrology-service",
    name: "Basic Astrology",
    price: 5500,
    formattedPrice: "₹5,500",
    category: "Astrology",
    duration: "Extended Guidance",
    description: "Foundational astrological assessment covering planetary positions, core strengths, and pivotal life cycles.",
    tagline: "Foundational astrological assessment & life patterns",
    iconName: "Compass",
    badge: "Foundational",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Core Kundali analysis", "Planetary strengths & weaknesses", "Essential life timing"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book the Basic Astrology session (₹5,500).",
  },
  {
    id: "advanced-vedic-astrology-service",
    name: "Advanced Vedic Astrology",
    price: 11000,
    formattedPrice: "₹11,000",
    category: "Astrology",
    duration: "Master Analysis",
    description: "Master-level reading examining Divisional Charts (Vargas), intricate Dasha transits, and karmic life themes.",
    tagline: "Deep divisional chart study & advanced predictive insights",
    iconName: "Award",
    badge: "Master Level",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Navamsha (D9) & Dashamsha (D10)", "Deep transit & yoga examination", "Holistic remedial blueprint"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book the Advanced Vedic Astrology consultation (₹11,000).",
  },
  {
    id: "basic-vastu-service",
    name: "Basic Vastu",
    price: 2500,
    formattedPrice: "₹2,500",
    category: "Vastu",
    duration: "Essential Review",
    description: "Key directional review of entrance, master bedroom, and kitchen with straightforward non-demolition adjustments.",
    tagline: "Essential directional zoning & energy balance",
    iconName: "Home",
    badge: "Essential Review",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Primary zones & entrance check", "Elemental balance remedies", "Budget-friendly non-structural tips"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book the Basic Vastu review (₹2,500).",
  },
  {
    id: "advanced-vastu-service",
    name: "Advanced Vastu",
    price: 11000,
    formattedPrice: "₹11,000",
    category: "Vastu",
    duration: "Full Space Architecture",
    description: "Exhaustive energy scanning, commercial/estate mapping, geopathic stress review, and advanced remedial grid work.",
    tagline: "Commercial/estate mapping & multi-zone energy remediation",
    iconName: "Layers",
    badge: "Full Architecture",
    scheduleNote: "Mon–Fri, 1:00 PM – 5:00 PM IST",
    focusPointers: ["Commercial & residential full grid", "Geopathic stress & energy balancing", "Comprehensive remedial yantras & remedies"],
    defaultWhatsAppMessage:
      "Hello Smita Singh, I would like to book the Advanced Vastu consultation (₹11,000).",
  },
];

/**
 * Three Core Pillars for Educational and Informational UI Sections
 */
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
    ctaLabel: "Book Astrology Consultation — ₹2,100",
    defaultServiceId: "astrology-consultation",
    whatsAppMessage: "Hello Smita Singh, I’m interested in booking an Astrology consultation (₹2,100). Please share the appointment schedule.",
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
    ctaLabel: "Book Numerology Session — ₹2,100",
    defaultServiceId: "numerology-consultation",
    whatsAppMessage: "Hello Smita Singh, I’m interested in booking a Numerology session (₹2,100). Please share the appointment schedule.",
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
    ctaLabel: "Book Vastu Consultation — ₹5,100",
    defaultServiceId: "vastu-consultation",
    whatsAppMessage: "Hello Smita Singh, I’m interested in booking a Vastu consultation (₹5,100). Please share the appointment schedule.",
    get whatsAppLink() {
      return getWhatsAppLink(this.whatsAppMessage);
    },
    iconName: "Home",
    symbolText: "वास्तुशास्त्र",
    accentGlow: "from-emerald-500/20 via-teal-500/10 to-transparent",
    keyInquiryItems: ["Floor plan or rough directional sketch", "Property compass orientation (North direction)", "Photographs/video walkthrough of key zones"]
  }
];

export function getConsultationById(id) {
  return CONSULTATION_SERVICES.find((s) => s.id === id) || CONSULTATION_SERVICES[0];
}
