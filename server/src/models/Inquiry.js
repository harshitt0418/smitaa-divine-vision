import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: 100,
    },
    phone: {
      type: String,
      required: [true, "Phone or WhatsApp contact is required"],
      trim: true,
      maxLength: 30,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxLength: 120,
    },
    service: {
      type: String,
      enum: ["Astrology", "Numerology", "Vastu", "Multiple", "General"],
      default: "Astrology",
    },
    message: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "scheduled", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = mongoose.model("Inquiry", inquirySchema);
