/**
 * Core site metadata, verified links, and brand constants
 * Consistent identity: Smita Singh | Smitaa Divine Vision & Numeros Miita
 */
export const SITE_CONFIG = {
  practitionerName: "Smita Singh",
  brandName: "Smitaa Divine Vision",
  alternateBrandName: "Numeros Miita",
  tagline: "Grounded Celestial Wisdom for Life's Pivotal Decisions",
  phoneNumberDisplay: "+91 91198 60551",
  whatsappNumber: "919119860551", // E.164 formatted for wa.me
  email: "contact@smitaadivinevision.com",
  brandEmblem: "/assets/official-logo-dv.jpg",
  officialLogo: "/assets/official-logo-dv.jpg",
  socialLinks: {
    facebook: "https://www.facebook.com/share/1Da48RwW55/",
    instagram: "https://www.instagram.com/smitaa.divinevision?utm_source=qr&igsi=eWZ3dWw1dWttNDRr",
    youtube: "https://youtube.com/@numerosmiita?si=ElLrckrMmzrlZZSK",
    googleMapsSearch: "Smita Singh Astrologer Lucknow"
  },
  book: {
    title: "The Divine Digits",
    subtitle: "Mastering Life Through Digits",
    promotionalHeadline: "Discover Your Life Path Through Numerology",
    author: "Dr. Smiita Siingh", // Preserved as published on the book cover and official listings
    coverImage: "/assets/book-cover.jpg",
    description: "An empowering, systematic exploration of numerological frameworks. Learn how birth dates and name vibrations illuminate life themes, natural tendencies, and timing for meaningful personal and professional choices.",
    retailers: [
      {
        name: "Amazon India",
        url: "https://www.amazon.in/dp/9374065185",
        badge: "Paperback / Kindle",
        icon: "BookOpen"
      },
      {
        name: "Flipkart",
        url: "https://www.flipkart.com/product/p/itme?pid=9789374065181",
        badge: "Official Listing",
        icon: "ShoppingBag"
      },
      {
        name: "Google Play Books",
        url: "https://play.google.com/store/books/details?id=zcu9EQAAQBAJ",
        badge: "E-Book Edition",
        icon: "Tablet"
      }
    ]
  },
  recognition: {
    leadQuote: "Smita Singh is an astrology and numerology expert associated with recognised astrology events and platforms, including Navbharat Astro Mahasangam and Navbharat Times/NBT Times.",
    items: [
      {
        id: "nbt-astro-mahasangam-stage",
        type: "photo",
        title: "Navbharat Astro+ Mahasangam Felicitation",
        subtitle: "Astro Mahasangam Conclave & Expo — Times Group / Navbharat Times",
        image: "/assets/recognition/nbt-astro-mahasangam-stage.jpg",
        caption: "Smita Singh on stage receiving the Astro महासंगम trophy shield from dignitaries at the Navbharat Times Astro+ Mahasangam Conclave & Expo.",
        badge: "Featured Expert"
      },
      {
        id: "nbt-astro-event-video",
        type: "video",
        title: "Times Internet Presents Astro+ Event",
        subtitle: "Official Stage Event Coverage",
        videoUrl: "/assets/recognition/nbt-astro-event-video.mp4",
        poster: "/assets/recognition/nbt-astro-event-poster.jpg",
        caption: "Smita Singh at a recognised astrology and numerology event (Times Internet presents Astro+).",
        badge: "Event Footage"
      },
      {
        id: "nbt-profile-doc",
        type: "doc",
        title: "Times Group / NBT Verified Expert Profile",
        subtitle: "Astrology, Numerology & Corporate Transition",
        image: "/assets/recognition/nbt-astro-profile-doc.jpg",
        caption: "Documented profile highlighting Smita Singh's MBA background, transition from corporate executive and teaching into astrology, and participation in Navbharat Times conclaves.",
        badge: "Verified Profile"
      },
      {
        id: "destiny-science-mumbai",
        type: "photo",
        title: "Numerology Professional Success Program",
        subtitle: "Mumbai Felicitation by Arviend Sud (Destiny Sscience)",
        image: "/assets/event-award.jpg",
        caption: "Smita Singh receiving professional certification and recognition at the Destiny Sscience Numerology Professional Success Program, Mumbai.",
        badge: "Certification"
      },
      {
        id: "google-maps-instagram-reference",
        type: "doc",
        title: "Digital Footprint & Conclave Media Handles",
        subtitle: "Google Maps Lucknow & Verified Social Handles",
        image: "/assets/recognition/google-maps-instagram-reference.jpg",
        caption: "Official identity footprints including Google Local Map search 'Smita Singh Astrologer Lucknow' and Instagram @smitaa.divinevision.",
        badge: "Digital Footprint"
      }
    ]
  },
  classDemos: [
    {
      id: "demo-part-1",
      part: "Part 1",
      title: "Numerology Class Demo — Part 1",
      subtitle: "Foundational Vibrations & Life Path Principles",
      description: "An introductory masterclass lecture introducing Mulank (Birth Number), core single-digit resonances, and how numerical archetypes manifest in daily decision-making.",
      driveUrl: "https://drive.google.com/file/d/1UYztXf94v3i5Iqs0L3YM2t0bkYCN35wD/view?usp=drivesdk",
      duration: "Video Lecture",
      topics: ["Mulank vs Bhagyank", "Planetary Archetypes", "Numerical Cycles"]
    },
    {
      id: "demo-part-2",
      part: "Part 2",
      title: "Numerology Class Demo — Part 2",
      subtitle: "Name Number Decoding & Vibrational Balance",
      description: "Detailed walkthrough of Namank calculation, examining how name spelling acoustics interplay with destiny numbers to support career and interpersonal goals.",
      driveUrl: "https://drive.google.com/file/d/1KXtMUQ3ym4i5aSJI2BxU_dHweiXfr3Zt/view?usp=drivesdk",
      duration: "Practical Analysis",
      topics: ["Chaldean Name Tables", "Vowel vs Consonant Analysis", "Professional Timing"]
    },
    {
      id: "demo-part-3",
      part: "Part 3",
      title: "Numerology Class Demo — Part 3",
      subtitle: "Interactive Student Q&A & Practical Case Studies",
      description: "A live workshop recording addressing common questions on personal year forecasting (Varshik Ank), date compatibility, and ethical client counseling.",
      driveUrl: "https://drive.google.com/file/d/1GhAYSN68Dm6_UxXnaz-xV64ccXF4rZWL/view?usp=drivesdk",
      duration: "Q&A Session",
      topics: ["Personal Year Trends", "Compatibility Nuances", "Client Guidance Practice"]
    }
  ]
};

/**
 * WhatsApp Link Helper with proper URL encoding
 */
export const getWhatsAppLink = (message) => {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
};
