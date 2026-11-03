/**
 * Numerology Calculation Engine
 * Supports Mulank (Birth Number), Bhagyank (Destiny/Life Path Number),
 * and Namank (Name Number) with transparent Chaldean and Pythagorean mapping.
 *
 * All calculations are 100% transparent and deterministic.
 */

// Chaldean letter vibration mapping (Standard in Indian Vedic Numerology; 9 omitted as sacred)
export const CHALDEAN_MAP = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

// Pythagorean letter vibration mapping (Standard Western sequential 1-9)
export const PYTHAGOREAN_MAP = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  // Note: letters mapped sequentially
};

// Complete 1-9 Archetypal Profiles (Reflective, Psychological & Spiritual Framework)
export const NUMBER_ARCHETYPES = {
  1: {
    number: 1,
    planet: "Sun (Surya)",
    ruler: "The Initiator & Pioneer",
    element: "Fire / Vitality",
    coreTraits: "Leadership, autonomy, self-determination, originality, clarity of intent",
    strengths: "Decisive action, resilience, setting visionary benchmarks, authentic self-expression",
    growthAreas: "Cultivating patience with collaborative pacing; balancing willpower with empathy",
    keywords: ["Initiative", "Vision", "Self-Reliance", "Courage"]
  },
  2: {
    number: 2,
    planet: "Moon (Chandra)",
    ruler: "The Harmonizer & Intuitive",
    element: "Water / Intuition",
    coreTraits: "Sensitivity, diplomacy, partnership, perceptive listening, emotional rhythm",
    strengths: "De-escalating friction, intuitive synthesis, supportive teamwork, deep empathy",
    growthAreas: "Preserving healthy boundaries; trusting personal perspective amidst collective mood",
    keywords: ["Diplomacy", "Intuition", "Receptivity", "Harmony"]
  },
  3: {
    number: 3,
    planet: "Jupiter (Guru / Brihaspati)",
    ruler: "The Mentor & Creative Communicator",
    element: "Ether / Expansion",
    coreTraits: "Wisdom, creative expression, optimism, pedagogical insight, broad perspective",
    strengths: "Inspiring others, articulate speaking/writing, philosophical clarity, joyful curiosity",
    growthAreas: "Channeling scattered energies into disciplined execution; avoiding over-commitment",
    keywords: ["Expression", "Wisdom", "Teaching", "Creative Spark"]
  },
  4: {
    number: 4,
    planet: "Rahu / Uranus",
    ruler: "The Strategic Builder & Architect",
    element: "Earth / Structure",
    coreTraits: "Methodical analysis, perseverance, strategic organization, unconventional insight",
    strengths: "Building robust foundations, attention to detail, reliability under complexity",
    growthAreas: "Embracing spontaneous pivots; releasing rigidity when circumstances evolve",
    keywords: ["Foundation", "Discipline", "Strategy", "Endurance"]
  },
  5: {
    number: 5,
    planet: "Mercury (Budha)",
    ruler: "The Versatile Catalyst & Communicator",
    element: "Air / Adaptability",
    coreTraits: "Intellectual agility, versatility, commerce, rapid assimilation of ideas, curiosity",
    strengths: "Adaptive networking, effective messaging, bridging differing mindsets, swift problem-solving",
    growthAreas: "Deep sustained focus; honoring commitments before transitioning to new ventures",
    keywords: ["Agility", "Communication", "Versatility", "Curiosity"]
  },
  6: {
    number: 6,
    planet: "Venus (Shukra)",
    ruler: "The Nurturer & Aesthetic Balancer",
    element: "Water & Earth / Harmony",
    coreTraits: "Aesthetic refinement, communal responsibility, restorative care, balance, loyalty",
    strengths: "Creating welcoming environments, counseling, design harmony, steadfast dedication",
    growthAreas: "Allowing others their self-directed path without over-managing; self-care balance",
    keywords: ["Harmony", "Nurturing", "Aesthetics", "Responsibility"]
  },
  7: {
    number: 7,
    planet: "Ketu / Neptune",
    ruler: "The Contemplative Seeker & Analyst",
    element: "Ether / Introspection",
    coreTraits: "Philosophical depth, rigorous inquiry, spiritual discernment, introspective clarity",
    strengths: "Uncovering underlying truths, independent research, contemplative calm, spiritual insight",
    growthAreas: "Translating inner discoveries into worldly dialogue; avoiding aloof isolation",
    keywords: ["Introspection", "Discernment", "Depth", "Inner Truth"]
  },
  8: {
    number: 8,
    planet: "Saturn (Shani)",
    ruler: "The Master of Balance & Enterprise",
    element: "Earth / Manifestation",
    coreTraits: "Organizational mastery, karmic equity, long-term stewardship, material balance",
    strengths: "Navigating heavy responsibility, endurance through adversity, structural stewardship",
    growthAreas: "Balancing material drive with inner stillness; extending grace to self and colleagues",
    keywords: ["Endurance", "Stewardship", "Karmic Balance", "Execution"]
  },
  9: {
    number: 9,
    planet: "Mars (Mangal)",
    ruler: "The Universal Humanitarian & Warrior of Purpose",
    element: "Fire / Compassion",
    coreTraits: "Universal empathy, courage, broader human perspective, transformative completion",
    strengths: "Championing humanitarian principles, fearless resilience, inspiring collective purpose",
    growthAreas: "Releasing past chapters cleanly; channeling fiery passion toward constructive healing",
    keywords: ["Courage", "Universal Vision", "Transformation", "Integrity"]
  }
};

/**
 * Reduce any integer to a single digit (1-9) with full step recording
 */
export function reduceToSingleDigit(num) {
  const steps = [num];
  let current = Math.abs(num);

  while (current > 9) {
    const digits = String(current).split("").map(Number);
    const sum = digits.reduce((acc, d) => acc + d, 0);
    steps.push({
      from: current,
      digits,
      sum
    });
    current = sum;
  }

  return {
    finalNumber: current,
    steps
  };
}

/**
 * Calculate Mulank (Birth / Psychic Number)
 * Determined strictly by the day of the birth month (1 - 31)
 */
export function calculateMulank(day) {
  const parsedDay = parseInt(day, 10);
  if (isNaN(parsedDay) || parsedDay < 1 || parsedDay > 31) {
    throw new Error("Invalid day of birth. Please provide a valid day between 1 and 31.");
  }

  if (parsedDay <= 9) {
    return {
      mulank: parsedDay,
      inputDay: parsedDay,
      isCompound: false,
      breakdownText: `Day ${parsedDay} (Single digit: directly ${parsedDay})`,
      archetype: NUMBER_ARCHETYPES[parsedDay]
    };
  }

  const digits = String(parsedDay).split("").map(Number);
  const sum = digits.reduce((acc, d) => acc + d, 0);

  if (sum <= 9) {
    return {
      mulank: sum,
      inputDay: parsedDay,
      isCompound: true,
      breakdownText: `Day ${parsedDay} → ${digits.join(" + ")} = ${sum}`,
      archetype: NUMBER_ARCHETYPES[sum]
    };
  }

  // Second reduction (e.g. Day 29 -> 2 + 9 = 11 -> 1 + 1 = 2)
  const secondDigits = String(sum).split("").map(Number);
  const secondSum = secondDigits.reduce((acc, d) => acc + d, 0);

  return {
    mulank: secondSum,
    inputDay: parsedDay,
    isCompound: true,
    breakdownText: `Day ${parsedDay} → ${digits.join(" + ")} = ${sum} → ${secondDigits.join(" + ")} = ${secondSum}`,
    archetype: NUMBER_ARCHETYPES[secondSum]
  };
}

/**
 * Calculate Bhagyank (Destiny / Life Path Number)
 * Calculated from the sum of all digits in Day + Month + Year
 */
export function calculateBhagyank(day, month, year) {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  if (isNaN(d) || isNaN(m) || isNaN(y) || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) {
    throw new Error("Please enter a valid complete date (Day 1-31, Month 1-12, Year 1900-2100).");
  }

  // Format as strings with leading zeros
  const dayStr = String(d).padStart(2, "0");
  const monthStr = String(m).padStart(2, "0");
  const yearStr = String(y);

  const allDigits = `${dayStr}${monthStr}${yearStr}`.split("").map(Number);
  const totalSum = allDigits.reduce((acc, digit) => acc + digit, 0);

  const reduced = reduceToSingleDigit(totalSum);

  // Build clean visual step breakdown
  const digitFormula = allDigits.join(" + ");
  let stepExplanation = `${dayStr}/${monthStr}/${yearStr} → ${digitFormula} = ${totalSum}`;

  if (totalSum > 9) {
    const sumDigits = String(totalSum).split("").map(Number);
    const secondSum = sumDigits.reduce((acc, n) => acc + n, 0);
    stepExplanation += ` → ${sumDigits.join(" + ")} = ${secondSum}`;

    if (secondSum > 9) {
      const thirdDigits = String(secondSum).split("").map(Number);
      const thirdSum = thirdDigits.reduce((acc, n) => acc + n, 0);
      stepExplanation += ` → ${thirdDigits.join(" + ")} = ${thirdSum}`;
    }
  }

  return {
    bhagyank: reduced.finalNumber,
    rawSum: totalSum,
    dateFormatted: `${dayStr}/${monthStr}/${yearStr}`,
    breakdownText: stepExplanation,
    archetype: NUMBER_ARCHETYPES[reduced.finalNumber]
  };
}

/**
 * Calculate Namank (Name Number)
 * System: 'chaldean' (default Vedic standard) or 'pythagorean'
 */
export function calculateNamank(fullName, system = "chaldean") {
  if (!fullName || typeof fullName !== "string") {
    throw new Error("Please enter a name with alphabetic letters.");
  }

  const cleanName = fullName.trim().toUpperCase();
  if (!cleanName.replace(/[^A-Z]/g, "")) {
    throw new Error("Name must contain letters A through Z.");
  }

  const map = system === "pythagorean" ? PYTHAGOREAN_MAP : CHALDEAN_MAP;
  const words = cleanName.split(/\s+/).filter(Boolean);

  let totalRawSum = 0;
  const wordBreakdowns = [];

  for (const word of words) {
    const letters = word.split("").filter((char) => /[A-Z]/.test(char));
    const letterValues = letters.map((char) => ({
      char,
      val: map[char] || 0
    }));

    const wordSum = letterValues.reduce((acc, item) => acc + item.val, 0);
    totalRawSum += wordSum;

    wordBreakdowns.push({
      word,
      letterValues,
      wordSum,
      wordReduced: reduceToSingleDigit(wordSum).finalNumber
    });
  }

  const finalReduction = reduceToSingleDigit(totalRawSum);

  return {
    namank: finalReduction.finalNumber,
    rawSum: totalRawSum,
    system: system === "pythagorean" ? "Pythagorean (Western)" : "Chaldean (Vedic / Cheiro Standard)",
    systemKey: system,
    cleanName,
    wordBreakdowns,
    breakdownText: `${words.map((w) => w).join(" ")} = Total ${totalRawSum} → ${finalReduction.finalNumber}`,
    archetype: NUMBER_ARCHETYPES[finalReduction.finalNumber]
  };
}
