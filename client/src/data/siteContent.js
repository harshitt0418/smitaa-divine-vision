/**
 * Core site metadata, verified links, and brand constants
 */
export const SITE_CONFIG = {
  brandName: "Smitaa Divine Vision",
  alternateBrandName: "Numeros Miita",
  tagline: "Grounded Celestial Wisdom for Life's Pivotal Decisions",
  phoneNumberDisplay: "+91 91198 60551",
  whatsappNumber: "919119860551", // E.164 formatted for wa.me
  email: "contact@smitaadivinevision.com", // clearly editable contact placeholder
  socialLinks: {
    facebook: "https://www.facebook.com/share/1Da48RwW55/",
    instagram: "https://www.instagram.com/smitaa.divinevision?utm_source=qr&igsi=eWZ3dWw1dWttNDRr",
    youtube: "https://youtube.com/@numerosmiita?si=ElLrckrMmzrlZZSK"
  },
  book: {
    title: "The Divine Digits",
    subtitle: "Mastering Life Through Digits",
    promotionalHeadline: "Discover Your Life Path Through Numerology",
    author: "Dr. Smiita Siingh",
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
  eventCredibility: {
    image: "/assets/event-award.jpg",
    title: "Numerology Professional Success Program",
    location: "Mumbai, India",
    date: "May 2024",
    caption: "Smitaa receiving formal certificate recognition at the Destiny Sscience Numerology Professional Success Program, Mumbai.",
    mentor: "Felicitation by Arviend Sud (Destiny Sscience)"
  }
};

/**
 * WhatsApp Link Helper with proper URL encoding
 */
export const getWhatsAppLink = (message) => {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
};
