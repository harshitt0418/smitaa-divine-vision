import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: [true, "Review quote text is required"],
      trim: true,
    },
    reviewerName: {
      type: String,
      required: [true, "Reviewer name is required"],
      trim: true,
    },
    platform: {
      type: String,
      default: "Client feedback",
      trim: true,
    },
    category: {
      type: String,
      enum: ["Consultations", "Numerology & Courses", "Social Community", "Other"],
      default: "Consultations",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    authorReply: {
      type: String,
      trim: true,
    },
    highlight: {
      type: String,
      trim: true,
    },
    screenshot: {
      type: String,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
