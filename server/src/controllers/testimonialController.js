import { Testimonial } from "../models/Testimonial.js";
import { isDbConnected } from "../config/db.js";
import { INITIAL_TESTIMONIALS } from "../data/seedData.js";

/**
 * Fetch approved testimonials
 */
export async function getTestimonials(req, res) {
  try {
    if (!isDbConnected()) {
      return res.status(200).json(INITIAL_TESTIMONIALS);
    }

    // Check count and seed if empty
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      await Testimonial.insertMany(INITIAL_TESTIMONIALS);
    }

    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
    return res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error retrieving testimonials:", error);
    // Graceful fallback to verified initial items
    return res.status(200).json(INITIAL_TESTIMONIALS);
  }
}

/**
 * Create a new testimonial (Protected by admin key)
 */
export async function createTestimonial(req, res) {
  const adminKey = req.headers["x-admin-key"];
  const configuredAdminKey = process.env.ADMIN_API_KEY || "smitaa_admin_dev_secret_key_change_in_production";

  if (adminKey !== configuredAdminKey) {
    return res.status(401).json({ error: "Unauthorized. Valid admin key required." });
  }

  const { quote, reviewerName, platform, category, rating, authorReply, highlight, screenshot } = req.body;

  if (!quote || !reviewerName) {
    return res.status(400).json({ error: "Quote text and reviewer name are required." });
  }

  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        error: "Database is currently offline. Review creation requires active MongoDB connection."
      });
    }

    const newTestimonial = new Testimonial({
      quote,
      reviewerName,
      platform: platform || "Client feedback",
      category: category || "Consultations",
      rating: rating || 5,
      authorReply,
      highlight,
      screenshot,
      isApproved: true,
    });

    await newTestimonial.save();
    return res.status(201).json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return res.status(500).json({ error: "Server error creating testimonial." });
  }
}
