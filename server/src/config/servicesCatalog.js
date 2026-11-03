/**
 * Authoritative Services & Classes Catalog for Smitaa Divine Vision
 * Strict pricing, names, and appointment schedule bounds.
 */

export const CONSULTATION_SERVICES = [
  {
    id: "numerology-consultation",
    name: "Numerology Consultation",
    price: 2100,
    category: "Numerology",
    description: "Detailed vibrational analysis of your name, Mulank, and Bhagyank.",
    duration: "45-60 mins",
  },
  {
    id: "astrology-consultation",
    name: "Astrology Consultation",
    price: 2100,
    category: "Astrology",
    description: "Personalized birth chart (Kundali) reading and planetary period (Dasha) analysis.",
    duration: "45-60 mins",
  },
  {
    id: "personal-in-person-consultation",
    name: "Personal / In-Person Consultation",
    price: 3500,
    category: "In-Person",
    description: "One-on-one personal consultation session in person with Smita Singh.",
    duration: "60-75 mins",
  },
  {
    id: "online-consultation-report",
    name: "Online Consultation with Detailed Report",
    price: 2100,
    category: "Astrology & Numerology",
    description: "Comprehensive online reading accompanied by a prepared written summary report.",
    duration: "Session + Report",
  },
  {
    id: "vastu-consultation",
    name: "Vastu Consultation",
    price: 5100,
    category: "Vastu",
    description: "Complete spatial and directional evaluation for residential or workspace harmony.",
    duration: "Comprehensive Review",
  },
  {
    id: "sound-healing-session",
    name: "Sound Healing Session — 45 minutes",
    price: 1500,
    category: "Healing",
    description: "Deep meditative sound frequency resonance session for calm, alignment, and stress relief.",
    duration: "45 minutes",
  },
  {
    id: "basic-astrology-service",
    name: "Basic Astrology",
    price: 5500,
    category: "Astrology Consultation & Guidance",
    description: "Foundational astrological assessment covering planetary placements and key tendencies.",
    duration: "Extended Guidance",
  },
  {
    id: "advanced-vedic-astrology-service",
    name: "Advanced Vedic Astrology",
    price: 11000,
    category: "Astrology Consultation & Guidance",
    description: "Comprehensive astrological deep-dive covering Divisional Charts (Vargas), Dasha analysis, and lifetime transits.",
    duration: "Master Analysis",
  },
  {
    id: "basic-vastu-service",
    name: "Basic Vastu",
    price: 2500,
    category: "Vastu Consultation & Guidance",
    description: "Essential directional zoning check, entrance review, and non-destructive spatial remedies.",
    duration: "Essential Review",
  },
  {
    id: "advanced-vastu-service",
    name: "Advanced Vastu",
    price: 11000,
    category: "Vastu Consultation & Guidance",
    description: "Detailed 16-zone architectural energy mapping, elemental balance, and comprehensive space remediation.",
    duration: "Full Space Architecture",
  },
];

export const RECORDED_CLASSES = [
  {
    id: "recorded-class-numerology",
    name: "Numerology",
    price: 2999,
    order: 1,
    subtitle: "Complete Foundation to Professional Numerology",
    badge: "Recorded Masterclass",
    topics: ["Core Numbers (1-9)", "Lo Shu & Vedic Grids", "Name Acoustics", "Personal Year Forecasting"],
  },
  {
    id: "recorded-class-basic-astrology",
    name: "Basic Astrology",
    price: 3999,
    order: 2,
    subtitle: "Planets, Houses & Signs Fundamental Framework",
    badge: "Recorded Masterclass",
    topics: ["12 Houses & 12 Signs", "Planetary Archetypes", "Reading a Kundali", "Core Life Transits"],
  },
  {
    id: "recorded-class-advanced-vedic-astrology",
    name: "Advanced Vedic Astrology",
    price: 7999,
    order: 3,
    subtitle: "Divisional Charts, Dashas & Professional Synthesis",
    badge: "Advanced Cohort",
    topics: ["Navamsha (D9) & Vargas", "Vimshottari Dasha Mechanics", "Rajyogas & Remedial Systems", "Case Studies"],
  },
  {
    id: "recorded-class-basic-vastu",
    name: "Basic Vastu",
    price: 2999,
    order: 4,
    subtitle: "Directional Zones, Elements & Home Harmony",
    badge: "Recorded Masterclass",
    topics: ["16 Directions & 5 Elements", "Kitchen & Entry Placement", "Non-Destructive Corrections", "Workstation Flow"],
  },
  {
    id: "recorded-class-advanced-vastu",
    name: "Advanced Vastu",
    price: 7999,
    order: 5,
    subtitle: "Commercial Layouts, Energy Mapping & Remediation",
    badge: "Advanced Cohort",
    topics: ["Commercial & Factory Vastu", "Aura & Earth Energy Harmonization", "Advanced Remedial Grids", "Client Consultation Practice"],
  },
];

/**
 * Find service by ID (either consultation or recorded class)
 */
export function findServiceOrClass(serviceId) {
  const consultation = CONSULTATION_SERVICES.find(
    (s) => s.id === serviceId || s.name.toLowerCase() === (serviceId || "").toLowerCase()
  );
  if (consultation) {
    return { ...consultation, serviceType: "consultation" };
  }

  const recorded = RECORDED_CLASSES.find(
    (c) => c.id === serviceId || c.name.toLowerCase() === (serviceId || "").toLowerCase()
  );
  if (recorded) {
    return { ...recorded, serviceType: "recorded-class" };
  }

  return null;
}

/**
 * Validate appointment schedule:
 * Rule 1: Monday through Friday only (no Saturday or Sunday)
 * Rule 2: 1:00 PM to 5:00 PM IST only
 * Rule 3: Must not be a past date
 */
export function validateAppointmentSchedule(appointmentDate, appointmentTime) {
  if (!appointmentDate) {
    return { valid: false, error: "Please select an appointment date." };
  }

  if (!appointmentTime) {
    return { valid: false, error: "Please select an appointment time between 1:00 PM and 5:00 PM." };
  }

  // Parse YYYY-MM-DD
  const dateParts = appointmentDate.split("-");
  if (dateParts.length !== 3) {
    return { valid: false, error: "Invalid date format. Expected YYYY-MM-DD." };
  }

  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // 0-indexed
  const day = parseInt(dateParts[2], 10);

  // Using noon local time to avoid timezone day shifts
  const targetDate = new Date(year, month, day, 12, 0, 0);
  if (isNaN(targetDate.getTime())) {
    return { valid: false, error: "Invalid appointment date selected." };
  }

  // Check day of week: 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat
  const dayOfWeek = targetDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return {
      valid: false,
      error: "Appointments are only available Monday through Friday. Please select a weekday (Monday to Friday).",
    };
  }

  // Check date is not in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(year, month, day, 0, 0, 0);
  if (checkDate < today) {
    return { valid: false, error: "Appointment date cannot be in the past." };
  }

  // Validate time: Between 1:00 PM (13:00) and 5:00 PM (17:00)
  // Accepted formats: "01:00 PM", "1:00 PM", "13:00", etc.
  const timeUpper = appointmentTime.trim().toUpperCase();
  const timeMatch = timeUpper.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/);

  if (!timeMatch) {
    return { valid: false, error: "Invalid time format. Please select a time between 1:00 PM and 5:00 PM." };
  }

  let hours = parseInt(timeMatch[1], 10);
  const minutes = parseInt(timeMatch[2], 10);
  const period = timeMatch[3];

  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  // Total minutes from midnight
  const totalMinutes = hours * 60 + minutes;
  const startMinutes = 13 * 60; // 1:00 PM = 780
  const endMinutes = 17 * 60;   // 5:00 PM = 1020

  if (totalMinutes < startMinutes || totalMinutes > endMinutes) {
    return {
      valid: false,
      error: "Appointments are strictly available between 1:00 PM and 5:00 PM. Please choose a slot within this window.",
    };
  }

  return { valid: true };
}
