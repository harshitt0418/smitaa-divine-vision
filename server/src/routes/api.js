import express from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonialController.js";
import { createInquiry, getInquiries } from "../controllers/inquiryController.js";
import { getSiteInfo, updateSiteSetting } from "../controllers/siteSettingController.js";
import { isDbConnected } from "../config/db.js";

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    database: isDbConnected() ? "connected" : "offline_fallback",
    timestamp: new Date().toISOString(),
    service: "Smitaa Divine Vision API",
  });
});

// Testimonials
router.get("/testimonials", getTestimonials);
router.post("/testimonials", createTestimonial);

// Consultation Inquiries
router.post("/inquiries", createInquiry);
router.get("/inquiries", getInquiries);

// Site info & settings
router.get("/site-info", getSiteInfo);
router.put("/site-info", updateSiteSetting);

export default router;
