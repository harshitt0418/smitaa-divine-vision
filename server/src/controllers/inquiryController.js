import { Inquiry } from "../models/Inquiry.js";
import { isDbConnected } from "../config/db.js";

/**
 * Submit consultation inquiry
 * Note: Never collects sensitive horoscope or private birth information.
 */
export async function createInquiry(req, res) {
  const { name, phone, email, service, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone number are required." });
  }

  try {
    if (isDbConnected()) {
      const inquiry = new Inquiry({
        name,
        phone,
        email: email || "",
        service: service || "Astrology",
        message: message || "",
      });
      await inquiry.save();
      console.log(`[Inquiry] Saved new inquiry from ${name} for ${service}`);
      return res.status(201).json({
        success: true,
        message: "Your inquiry has been received. Smitaa will connect with you shortly.",
        id: inquiry._id,
      });
    }

    // Graceful in-memory / console logging fallback when DB is unconfigured
    console.log(`[Inquiry - Offline Fallback] Received from ${name} (${phone}) for ${service}: ${message}`);
    return res.status(201).json({
      success: true,
      fallback: true,
      message: "Your inquiry has been received. Smitaa will connect with you shortly.",
    });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    return res.status(500).json({ error: "Failed to process inquiry request." });
  }
}

/**
 * List inquiries (Protected by admin key)
 */
export async function getInquiries(req, res) {
  const adminKey = req.headers["x-admin-key"];
  const configuredAdminKey = process.env.ADMIN_API_KEY || "smitaa_admin_dev_secret_key_change_in_production";

  if (adminKey !== configuredAdminKey) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    if (!isDbConnected()) {
      return res.status(200).json([]);
    }
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.status(200).json(inquiries);
  } catch (error) {
    console.error("Error retrieving inquiries:", error);
    return res.status(500).json({ error: "Failed to retrieve inquiries." });
  }
}
