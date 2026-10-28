import { connectDB } from "../server/src/config/db.js";
import app from "../server/src/app.js";

// Cache database connection across serverless function invocations
let isDbInitialized = false;

export default async function handler(req, res) {
  if (!isDbInitialized) {
    try {
      await connectDB();
      isDbInitialized = true;
    } catch (err) {
      console.warn("Serverless DB connection notice:", err.message);
    }
  }

  return app(req, res);
}
