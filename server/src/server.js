import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Security & utility middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// API Route Registry
app.use("/api", apiRoutes);

// In production or when client build exists, serve the static frontend
const clientDistPath = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDistPath));

app.get("*", (req, res, next) => {
  // If request starts with /api, pass to 404 handler
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

// Connect database and launch server
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[Server] Smitaa Divine Vision API listening on port ${PORT}`);
    console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer();
