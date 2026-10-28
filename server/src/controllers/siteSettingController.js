import { SiteSetting } from "../models/SiteSetting.js";
import { isDbConnected } from "../config/db.js";
import { INITIAL_SITE_INFO } from "../data/seedData.js";

/**
 * Get public site information and practitioner notes
 */
export async function getSiteInfo(req, res) {
  try {
    if (!isDbConnected()) {
      return res.status(200).json(INITIAL_SITE_INFO);
    }

    const settings = await SiteSetting.find();
    if (!settings || settings.length === 0) {
      return res.status(200).json(INITIAL_SITE_INFO);
    }

    const configMap = {};
    settings.forEach((s) => {
      configMap[s.key] = s.value;
    });

    return res.status(200).json({ ...INITIAL_SITE_INFO, ...configMap });
  } catch (error) {
    console.error("Error retrieving site info:", error);
    return res.status(200).json(INITIAL_SITE_INFO);
  }
}

/**
 * Update a site setting (Protected)
 */
export async function updateSiteSetting(req, res) {
  const adminKey = req.headers["x-admin-key"];
  const configuredAdminKey = process.env.ADMIN_API_KEY || "smitaa_admin_dev_secret_key_change_in_production";

  if (adminKey !== configuredAdminKey) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const { key, value, description } = req.body;
  if (!key || value === undefined) {
    return res.status(400).json({ error: "Key and value are required." });
  }

  try {
    if (!isDbConnected()) {
      return res.status(503).json({ error: "MongoDB is not connected." });
    }

    const updated = await SiteSetting.findOneAndUpdate(
      { key },
      { key, value, description },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, setting: updated });
  } catch (error) {
    console.error("Error updating setting:", error);
    return res.status(500).json({ error: "Failed to update setting." });
  }
}
