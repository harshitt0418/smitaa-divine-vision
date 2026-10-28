import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Security & utility middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      // Allow localhost or any Vercel preview/production URLs
      if (
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        origin.endsWith(".vercel.app") ||
        origin === CLIENT_URL
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for public API
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],
  })
);

app.use(express.json({ limit: "1mb" }));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// API Route Registry (mounted on /api, and also root for serverless/multi-service resilience)
app.use("/api", apiRoutes);
app.use("/", apiRoutes);

// In production or when client build exists, serve the static frontend
const clientDistPath = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDistPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  const indexPath = path.join(clientDistPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).json({
        brand: "Smitaa Divine Vision",
        role: "Backend API Service",
        endpoints: {
          health: "/api/health",
          testimonials: "/api/testimonials",
          inquiries: "/api/inquiries",
          siteInfo: "/api/site-info",
        },
      });
    }
  });
});

// 404 Handler for undefined API routes
app.use((req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("[Server Error]", err.stack);
  res.status(500).json({
    error: "An unexpected internal server error occurred.",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
