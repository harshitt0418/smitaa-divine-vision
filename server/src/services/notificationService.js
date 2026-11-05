import nodemailer from "nodemailer";

/**
 * Send notification to the website owner with complete appointment & payment details.
 * Supports:
 * 1. Email via SMTP / Nodemailer (configured via OWNER_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM)
 * 2. Webhook notification (configured via OWNER_NOTIFICATION_WEBHOOK_URL)
 * 3. Graceful fallback logging when credentials are not yet configured.
 *
 * Idempotency safeguard: Checks booking.ownerNotified to ensure duplicate notifications are NEVER sent.
 */
export async function notifyOwnerOfBooking(booking) {
  if (!booking) return { sent: false, reason: "No booking data provided" };

  // Strict safeguard: Prevent duplicate notifications on webhooks or callback retries
  if (booking.ownerNotified) {
    return {
      sent: true,
      alreadyNotified: true,
      notifiedAt: booking.ownerNotifiedAt,
    };
  }

  const {
    clientName,
    clientPhone,
    clientEmail,
    serviceName,
    serviceType,
    appointmentDate,
    appointmentTime,
    amount,
    currency = "INR",
    status,
    bookingReference,
    reference,
    razorpayPaymentId,
    razorpayOrderId,
    notes,
    paidAt,
  } = booking;

  const refCode = bookingReference || reference || "N/A";

  const formattedAmount = `₹${Number(amount).toLocaleString("en-IN")}`;
  const ownerEmail = process.env.OWNER_EMAIL || "contact@smitaadivinevision.com";
  const webhookUrl = process.env.OWNER_NOTIFICATION_WEBHOOK_URL;

  const subject = `[Confirmed Booking] ${serviceName} - ${clientName} (${appointmentDate || "Recorded Class"} ${appointmentTime || ""})`.trim();

  const textBody = [
    "===========================================================",
    "🌟 NEW VERIFIED APPOINTMENT BOOKING - SMITAA DIVINE VISION",
    "===========================================================",
    `• Customer Name:       ${clientName}`,
    `• Mobile Number:       ${clientPhone}`,
    `• Email Address:       ${clientEmail || "Not provided"}`,
    `• Service / Topic:     ${serviceName}`,
    `• Category / Type:     ${serviceType === "recorded-class" ? "Online Recorded Class" : "Consultation Session"}`,
    `• Appointment Date:    ${appointmentDate || "N/A (Recorded Class)"}`,
    `• Appointment Time:    ${appointmentTime ? appointmentTime + " IST" : "N/A"}`,
    `• Amount Paid:         ${formattedAmount} (${currency})`,
    `• Payment Status:      ${status} (Verified)`,
    `• Booking Reference:   ${refCode}`,
    `• Razorpay Payment ID: ${razorpayPaymentId || "N/A"}`,
    `• Razorpay Order ID:   ${razorpayOrderId || "N/A"}`,
    `• Paid At:             ${paidAt ? new Date(paidAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : new Date().toLocaleString()}`,
    `• Booking Notes:       ${notes || "None"}`,
    "===========================================================",
    "Action Required: Please schedule the meeting link or confirm with the client on WhatsApp.",
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #070B19; color: #F5EFEB; border: 1px solid #D4AF37; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #0E162F, #18254A); padding: 24px; text-align: center; border-bottom: 2px solid #D4AF37;">
        <h2 style="margin: 0; color: #D4AF37; font-size: 22px; letter-spacing: 1px;">Smitaa Divine Vision</h2>
        <p style="margin: 6px 0 0; color: #E8DCC4; font-size: 14px;">Confirmed & Verified Appointment Booking</p>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #A0AEC0; width: 40%;">Customer Name:</td>
            <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${clientName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A0AEC0;">Mobile Number:</td>
            <td style="padding: 8px 0; color: #D4AF37; font-weight: bold;">
              <a href="https://wa.me/${clientPhone.replace(/[^0-9]/g, "")}" style="color: #D4AF37; text-decoration: underline;">${clientPhone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A0AEC0;">Email Address:</td>
            <td style="padding: 8px 0; color: #FFFFFF;">${clientEmail || "Not provided"}</td>
          </tr>
          <tr style="border-top: 1px solid #2D3748;">
            <td style="padding: 8px 0; color: #A0AEC0;">Service / Topic:</td>
            <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A0AEC0;">Appointment Date:</td>
            <td style="padding: 8px 0; color: #D4AF37; font-weight: bold;">${appointmentDate || "N/A (Recorded Class)"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A0AEC0;">Appointment Time:</td>
            <td style="padding: 8px 0; color: #D4AF37; font-weight: bold;">${appointmentTime ? appointmentTime + " IST" : "N/A"}</td>
          </tr>
          <tr style="border-top: 1px solid #2D3748;">
            <td style="padding: 8px 0; color: #A0AEC0;">Amount Paid:</td>
            <td style="padding: 8px 0; color: #10B981; font-weight: bold; font-size: 16px;">${formattedAmount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A0AEC0;">Payment Status:</td>
            <td style="padding: 8px 0; color: #10B981; font-weight: bold;">${status} (Verified)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A0AEC0;">Booking Reference:</td>
            <td style="padding: 8px 0; font-family: monospace; color: #E8DCC4;">${refCode}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A0AEC0;">Razorpay Payment ID:</td>
            <td style="padding: 8px 0; font-family: monospace; color: #A0AEC0;">${razorpayPaymentId || "N/A"}</td>
          </tr>
          ${
            notes
              ? `<tr><td style="padding: 8px 0; color: #A0AEC0;">Customer Notes:</td><td style="padding: 8px 0; color: #E2E8F0;">${notes}</td></tr>`
              : ""
          }
        </table>
      </div>
      <div style="background: #0E162F; padding: 16px 24px; text-align: center; border-top: 1px solid #2D3748; font-size: 12px; color: #A0AEC0;">
        Smitaa Divine Vision Automated Booking Dispatcher
      </div>
    </div>
  `;

  let emailSent = false;
  let webhookSent = false;

  // Channel 1: SMTP Email Notification
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Smitaa Divine Vision" <${process.env.SMTP_USER}>`,
        to: ownerEmail,
        subject,
        text: textBody,
        html: htmlBody,
      });

      emailSent = true;
      console.log(`[Owner Notification] Email successfully sent to ${ownerEmail} for booking ${refCode}`);
    } catch (emailErr) {
      console.error("[Owner Notification Email Error]", emailErr.message);
    }
  } else {
    console.info(
      `[Owner Notification - Email Setup Pending] SMTP credentials not provided in .env. Booking details for ${refCode}:\n${textBody}`
    );
  }

  // Channel 2: Webhook / Automation Forwarder (WhatsApp API, Zapier, Make, Slack)
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "appointment.booked",
          bookingReference: refCode,
          clientName,
          clientPhone,
          clientEmail,
          serviceName,
          serviceType,
          appointmentDate,
          appointmentTime,
          amount,
          currency,
          status,
          razorpayPaymentId,
          razorpayOrderId,
          paidAt: paidAt || new Date(),
          notes,
        }),
      });
      webhookSent = response.ok;
      console.log(`[Owner Notification] Webhook dispatched to ${webhookUrl} (status: ${response.status})`);
    } catch (whErr) {
      console.error("[Owner Notification Webhook Error]", whErr.message);
    }
  }

  return {
    sent: emailSent || webhookSent,
    emailSent,
    webhookSent,
    details: textBody,
  };
}
