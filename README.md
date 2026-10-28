# Smitaa Divine Vision — MERN Web Platform

A conversion-focused, accessible, full-stack web application designed for Smitaa's astrology, numerology, and Vastu practice under the brand name **Smitaa Divine Vision** (and **Numeros Miita**).

---

## 🌟 Overview & Art Direction

- **Brand Philosophy**: A refined, warm, contemporary Indian spiritual practice. Grounded guidance and reflective inquiry rather than fatalism or guaranteed fortune-telling.
- **Visual Palette**: Deep midnight-indigo & ink background (`#070913`, `#0d1124`, `#161c36`) balanced with warm ivory (`#fdfbf7`, `#eae5d9`), restrained muted gold (`#d4af37`, `#e6ca65`, `#997c2c`), and celestial accents.
- **Typography**: Editorial serif typography for headings (*Cinzel / Cormorant Garamond*) paired with clean, highly readable modern sans-serif (*Plus Jakarta Sans / Inter*) for body copy.
- **Motion & Accessibility**: Performance-friendly celestial particle/starfield effects, subtle micro-interactions, full keyboard navigation, WCAG AA contrast compliance, and full `prefers-reduced-motion` support.

---

## 📁 Project Structure

```
astrology/
├── client/                     # Frontend (React 19, Vite, Tailwind CSS, Lucide)
│   ├── public/
│   │   └── assets/            # Optimized images (book cover, event photo, reviews)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── layout/        # Navbar, Footer, MobileNav
│   │   │   ├── sections/      # Hero, Astrology, Numerology, Vastu, Book, About, Reviews, BookingCTA
│   │   │   ├── ui/            # Button, Badge, Modal, CelestialBackground
│   │   │   └── common/        # WhatsAppButton, RatingStars
│   │   ├── data/              # Static & fallback content (services, verified reviews, book details)
│   │   ├── hooks/             # Custom React hooks (useTestimonials, useScrollReveal)
│   │   ├── services/          # API client for backend communication
│   │   ├── App.jsx            # Main application layout & state
│   │   ├── index.css          # Tailwind CSS & custom celestial themes
│   │   └── main.jsx           # React DOM entrypoint
│   ├── .env.example
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Backend API (Express.js, Node.js, MongoDB/Mongoose)
│   ├── src/
│   │   ├── config/            # DB connection & environment setup
│   │   ├── controllers/       # Testimonial & consultation inquiry controllers
│   │   ├── models/            # Mongoose Schemas (Testimonial, Inquiry)
│   │   ├── routes/            # Express route handlers
│   │   ├── data/              # Curated seed & fallback database items
│   │   └── server.js          # Express app entrypoint & middleware
│   ├── .env.example
│   └── package.json
│
├── package.json               # Root scripts (run client & server concurrently)
└── README.md
```

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)
- Optional: MongoDB running locally (`mongodb://127.0.0.1:27017`) or MongoDB Atlas URI. *(Note: The entire site works seamlessly with pre-curated fallback content and direct WhatsApp integration even when MongoDB is offline).*

### 1. Installation
Clone the repository and install all dependencies:

```bash
# In the root folder:
npm run install:all
```

Or install separately:
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 2. Environment Configuration
Copy `.env.example` in both `client/` and `server/`:

```bash
# Client
cp client/.env.example client/.env

# Server
cp server/.env.example server/.env
```

### 3. Running in Development Mode
Run both frontend and backend concurrently from the root directory:

```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`
- **API Health Check**: `http://localhost:5000/api/health`

Alternatively, you can run them in separate terminals:
- Frontend: `npm run client` (or `cd client && npm run dev`)
- Backend: `npm run server` (or `cd server && npm run dev`)

---

## 📲 Direct WhatsApp Booking Integration

All booking actions are pre-configured with service-specific, polite inquiry text directed to Smitaa's verified phone number (**+91 91198 60551**):
- **Astrology Consultation**: Pre-filled birth chart inquiry
- **Numerology Consultation**: Pre-filled name and birth date numerology inquiry
- **Vastu Consultation**: Pre-filled home/workplace space alignment inquiry

---

## 📚 Featured Book & Verified Retailers

- **Book Title**: *The Divine Digits: Mastering Life Through Digits*
- **Author**: Dr. Smiita Siingh
- **Retailers**:
  - [Amazon India](https://www.amazon.in/dp/9374065185)
  - [Flipkart](https://www.flipkart.com/product/p/itme?pid=9789374065181)
  - [Google Play Books](https://play.google.com/store/books/details?id=zcu9EQAAQBAJ)

---

## 🛡️ Privacy & Authenticity Guarantee

- No birth charts or sensitive horoscope data are collected without explicit booking interaction.
- All reviews and event images reflect authentic materials provided without artificial fabrication.
