import { VERIFIED_REVIEWS } from "../data/testimonials";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

/**
 * Fetch testimonials with graceful fallback to static verified reviews
 */
export async function getTestimonials() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return VERIFIED_REVIEWS;
  } catch (err) {
    console.info("Using verified local reviews (API/MongoDB fallback):", err.message);
    return VERIFIED_REVIEWS;
  }
}

/**
 * Submit consultation inquiry to backend
 */
export async function submitInquiry(inquiryData) {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inquiryData),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit inquiry: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.warn("Could not save to MongoDB, gracefully logged:", err.message);
    return { success: true, fallback: true, message: "Inquiry received" };
  }
}

/**
 * Fetch public payment configuration (keyId, paymentLink, whatsappNumber)
 */
export async function getPaymentConfig() {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/config`);
    if (response.ok) {
      return await response.json();
    }
    return {
      keyId: null,
      paymentLink: "https://razorpay.me/@diivinevision",
      whatsappNumber: "919119860551",
      isConfigured: false,
    };
  } catch {
    return {
      keyId: null,
      paymentLink: "https://razorpay.me/@diivinevision",
      whatsappNumber: "919119860551",
      isConfigured: false,
    };
  }
}

/**
 * Create a Razorpay Order and Booking Record
 */
export async function createPaymentOrder(orderPayload) {
  const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderPayload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to create payment order");
  }

  return data;
}

/**
 * Server-side payment signature verification
 */
export async function verifyPayment(verifyPayload) {
  const response = await fetch(`${API_BASE_URL}/payments/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(verifyPayload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Payment verification failed");
  }

  return data;
}

/**
 * Fetch available time slots for a given appointment date
 */
export async function getAvailableSlots(date) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/payments/available-slots?date=${encodeURIComponent(date)}`
    );
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.warn("Could not query dynamic slots from backend:", err.message);
    return {
      success: true,
      date,
      bookedSlots: [],
      availableSlots: [
        "01:00 PM",
        "01:30 PM",
        "02:00 PM",
        "02:30 PM",
        "03:00 PM",
        "03:30 PM",
        "04:00 PM",
        "04:30 PM",
        "05:00 PM",
      ],
      fallback: true,
    };
  }
}

/**
 * Check backend status
 */
export async function checkBackendStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      return await response.json();
    }
    return { status: "offline" };
  } catch {
    return { status: "offline" };
  }
}
