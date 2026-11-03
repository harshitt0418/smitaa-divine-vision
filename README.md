# Smitaa Divine Vision — Full-Stack MERN Platform

A conversion-focused, accessible, full-stack web application designed for **Smita Singh's** astrology, numerology, and Vastu practice under the brand name **Smitaa Divine Vision** (and **Numeros Miita**).

---

## 🌟 Overview & Brand Identity

- **Practitioner**: **Smita Singh** (MBA, former corporate executive and educator transitioned into Vedic astrology, numerology, Vastu Shastra, and spiritual counseling).
- **Featured Platform Recognition**: Associated with and felicitated at prominent national conclaves, including the **Navbharat Astro+ Mahasangam Conclave & Expo** (organized by the Times Group / Navbharat Times).
- **Brand Identity**: **Smitaa Divine Vision** &bull; **Numeros Miita** &bull; *The Divine Digits*.
- **Visual Palette**: Deep midnight-indigo & ink background (`#080B16`, `#0E1324`, `#141B33`) balanced with warm ivory (`#F7F4EC`), restrained muted gold (`#D4AF37`, `#F5E0A0`), and celestial accents.
- **Typography**: Editorial serif typography for headings (*Cinzel / Cormorant Garamond*) paired with clean, readable modern sans-serif (*Plus Jakarta Sans*) for body text.
- **Motion & Accessibility**: Performance-friendly celestial starfield canvas, square responsive event video container, keyboard navigation, WCAG AA contrast compliance, and full `prefers-reduced-motion` support.

---

## 📁 Project Structure

```
astrology/
├── client/                              # Frontend Application (React 19, Vite, Tailwind CSS, Lucide)
│   ├── public/
│   │   ├── assets/
│   │   │   ├── brand-emblem.jpg         # Celestial "Diivine Vision" brand mark
│   │   │   ├── book-cover.jpg           # "The Divine Digits" cover
│   │   │   ├── event-award.jpg          # Mumbai May 2024 felicitation
│   │   │   ├── recognition/             # Media & conclave assets
│   │   │   │   ├── nbt-astro-mahasangam-stage.jpg      # Stage felicitation photo
│   │   │   │   ├── nbt-astro-event-video.mp4           # Times Internet Astro+ video
│   │   │   │   ├── nbt-astro-event-poster.jpg          # Video poster frame
│   │   │   │   ├── nbt-astro-profile-doc.jpg           # NBT verified profile screenshot
│   │   │   │   └── google-maps-instagram-reference.jpg # Search footprint reference
│   │   │   └── reviews/                 # Verified client feedback screenshots
│   │   │       ├── review-rajiv-kumar-whatsapp.jpg    # Rajiv Kumar WhatsApp review
│   │   │       ├── review-whatsapp-1.jpg
│   │   │       └── review-course-1..4.jpg
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/                  # Header.jsx (sticky blur nav), Footer.jsx
│   │   │   ├── sections/
│   │   │   │   ├── Hero.jsx             # Hero with conclave badge & dual CTAs
│   │   │   │   ├── RecognitionSection.jsx # Featured at Recognised Astrology Platforms
│   │   │   │   ├── AstrologySection.jsx # Vedic Astrology (Jyotish)
│   │   │   │   ├── NumerologySection.jsx# Numerology principles & framework
│   │   │   │   ├── NumerologyCalculator.jsx # "Discover Your Core Numbers" (Mulank, Bhagyank, Namank)
│   │   │   │   ├── ClassesDemoSection.jsx# "Numerology Classes Demo" (Google Drive lectures)
│   │   │   │   ├── VastuSection.jsx     # Practical, non-demolition space alignment
│   │   │   │   ├── AboutSection.jsx     # Smita Singh MBA background & approach
│   │   │   │   ├── BookSection.jsx      # The Divine Digits with Amazon, Flipkart, Play Books
│   │   │   │   ├── ReviewsSection.jsx   # Filterable verbatim reviews with "View original feedback"
│   │   │   │   └── BookingCTA.jsx       # WhatsApp options & Web Inquiry form
│   │   │   └── ui/                      # Button, Badge, Modal, CelestialBackground, SocialIcons
│   │   ├── data/
│   │   │   ├── siteContent.js           # Central metadata, media paths, and demo links
│   │   │   ├── services.js              # Consultation disciplines & WhatsApp messages
│   │   │   └── testimonials.js          # Verbatim transcribed reviews
│   │   ├── utils/
│   │   │   └── numerologyCalc.js        # Deterministic Mulank, Bhagyank, and Chaldean/Pythagorean Namank
│   │   ├── services/
│   │   │   └── api.js                   # Client API connector with seamless offline fallback
│   │   ├── App.jsx                      # Structured single-page application flow
│   │   ├── index.css                    # Tailwind CSS directives & gold theme tokens
│   │   └── main.jsx
│   ├── .env.example
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                              # Backend API (Node.js, Express.js, MongoDB/Mongoose)
│   ├── src/
│   │   ├── config/                      # db.js (MongoDB connection with graceful fallback)
│   │   ├── controllers/                 # Testimonial, inquiry, and site setting controllers
│   │   ├── models/                      # Testimonial.js, Inquiry.js, SiteSetting.js
│   │   ├── routes/                      # api.js (/health, /testimonials, /inquiries, /site-info)
│   │   ├── data/                        # seedData.js
│   │   ├── app.js                       # Express app configuration
│   │   └── server.js                    # Server startup entrypoint
│   ├── .env.example
│   └── package.json
│
├── vercel.json                          # Multi-service configuration for Vercel deployment
├── package.json                         # Root workspace scripts (runs client and server concurrently)
└── README.md
```

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)
- Optional: MongoDB running locally (`mongodb://127.0.0.1:27017`) or MongoDB Atlas. *(The entire platform operates seamlessly with verified fallback data even when MongoDB is offline).*

### 1. Installation
Install all dependencies:

```bash
npm run install:all
```

### 2. Environment Configuration
Copy `.env.example` in both `client/` and `server/`:

```bash
# Client
cp client/.env.example client/.env

# Server
cp server/.env.example server/.env
```

### 3. Run in Development Mode
Run both frontend and backend concurrently from the project root:

```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`
- **API Health Check**: `http://localhost:5000/api/health`

---

## 🧮 Interactive Numerology Logic

The website includes a live interactive calculator in `client/src/components/sections/NumerologyCalculator.jsx`:
- **Mulank (Birth / Psychic Number)**: Calculated strictly from the day of birth (1-31) and reduced to single digit 1-9 (e.g. `24 → 2 + 4 = 6` or `29 → 2 + 9 = 11 → 1 + 1 = 2`).
- **Bhagyank (Destiny / Life Path Number)**: Calculated from the full date of birth (Day + Month + Year) with step-by-step reduction breakdown (e.g. `24/08/1995 → 2 + 4 + 0 + 8 + 1 + 9 + 9 + 5 = 38 → 3 + 8 = 11 → 1 + 1 = 2`).
- **Namank (Name Vibration)**: Dual-mode mapping supporting **Chaldean (Vedic / Indian Classical)** and **Pythagorean (Western Modern)** with full letter-by-letter table breakdown.
- **Privacy Assurance**: All computations run 100% in browser memory; no birth or name data is stored or logged.

---

## 🎓 Managing Numerology Class Demos & Links

The class demo cards are configured in **`client/src/data/siteContent.js`** under `classDemos`.

To replace placeholder titles, descriptions, or Google Drive links in the future:
1. Open `client/src/data/siteContent.js`.
2. Locate the `classDemos` array:
   ```javascript
   {
     id: "demo-part-1",
     part: "Part 1",
     title: "Numerology Class Demo — Part 1", // <-- Replace with final class topic
     subtitle: "Foundational Vibrations & Life Path Principles",
     description: "...",
     driveUrl: "https://drive.google.com/file/d/...", // <-- Replace with new Google Drive URL
     topics: ["Mulank vs Bhagyank", "Planetary Archetypes"]
   }
   ```
3. To add custom thumbnail images: Place an image in `client/public/assets/classes/` and add a `thumbnail: "/assets/classes/filename.jpg"` property to the card object.

> [!NOTE]
> **Google Drive Permissions**: Ensure that any video file linked on Google Drive has its link sharing set to **"Anyone with the link can view"** so visitors can stream it without access request prompts.

---

## 📲 Direct WhatsApp Booking Integration

All booking actions are pre-configured with service-specific, polite inquiry text directed to Smita Singh's verified phone number (**+91 91198 60551**):
- **Astrology Consultation**: Pre-filled birth chart inquiry
- **Numerology Consultation**: Pre-filled name and birth date numerology inquiry
- **Vastu Consultation**: Pre-filled home/workplace space alignment inquiry
- **Calculator Result Inquiries**: Dynamically generated message containing the visitor's calculated Mulank, Bhagyank, and Namank.

---

## 📚 Featured Book & Verified Retailers

- **Book Title**: *The Divine Digits: Mastering Life Through Digits*
- **Author**: Dr. Smiita Siingh (as registered on official listings)
- **Retailers**:
  - [Amazon India](https://www.amazon.in/dp/9374065185)
  - [Flipkart](https://www.flipkart.com/product/p/itme?pid=9789374065181)
  - [Google Play Books](https://play.google.com/store/books/details?id=zcu9EQAAQBAJ)

---

## 🌐 Deployment on Vercel

The repository includes a ready-to-deploy [`vercel.json`](./vercel.json) leveraging Vercel's multi-service architecture:
- Frontend client built from `client/` using Vite.
- Backend Express server routed via `/api/(.*)`.
- Automatic CI/CD on every push to the `main` branch.
