import express from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonialController.js";
import { createInquiry, getInquiries } from "../controllers/inquiryController.js";
import { getSiteInfo, updateSiteSetting } from "../controllers/siteSettingController.js";
import {
  getPaymentConfig,
  getCatalog,
  createOrder,
  verifyPayment,
  getAvailableSlots,
} from "../controllers/paymentController.js";
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

// Payments & Booking Endpoints
router.get("/payments/config", getPaymentConfig);
router.get("/payments/catalog", getCatalog);
router.get("/payments/available-slots", getAvailableSlots);
router.post("/payments/create-order", createOrder);
router.post("/payments/verify-payment", verifyPayment);

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
