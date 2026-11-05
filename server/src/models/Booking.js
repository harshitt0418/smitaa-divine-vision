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
      index: true,
    },
    appointmentTime: {
      type: String, // e.g. "02:00 PM"
      index: true,
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
    ownerNotified: {
      type: Boolean,
      default: false,
      index: true,
    },
    ownerNotifiedAt: {
      type: Date,
    },
    notificationChannel: {
      type: String,
    },
    notificationError: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to quickly query booked slots for availability management
bookingSchema.index({ appointmentDate: 1, appointmentTime: 1, status: 1 });

export const Booking = mongoose.model("Booking", bookingSchema);
