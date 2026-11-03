import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      maxLength: 120,
    },
    clientPhone: {
      type: String,
      required: [true, "Client phone/WhatsApp number is required"],
      trim: true,
      maxLength: 30,
    },
    clientEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxLength: 120,
    },
    serviceId: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["consultation", "recorded-class"],
      default: "consultation",
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    appointmentDate: {
      type: String, // YYYY-MM-DD
    },
    appointmentTime: {
      type: String, // e.g. "02:00 PM"
    },
    notes: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },
    razorpayOrderId: {
      type: String,
      index: true,
    },
    razorpayPaymentId: {
      type: String,
      index: true,
    },
    razorpaySignature: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model("Booking", bookingSchema);
