import { Resend } from "resend";

export async function POST(req) {
  try {
    const { name, email, phone, amount, paymentId, date } = await req.json();
    console.log("Received request to send receipt to:", email);

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#0ea5e9;">Donation Receipt</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your generous donation to Sahayata.</p>
        <table style="margin:20px 0;">
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Amount:</strong></td><td>₹${amount}</td></tr>
          <tr><td><strong>Payment ID:</strong></td><td>${paymentId}</td></tr>
          <tr><td><strong>Date:</strong></td><td>${date}</td></tr>
        </table>
        <p>This receipt can be used for your records and tax purposes.</p>
        <p>With gratitude,<br/>Team Sahayata</p>
      </div>
    `;

    const result = await resend.emails.send({
      from: "Sahayata <onboarding@resend.dev>", // Use verified Resend sender
      to: email,
      subject: "Your Donation Receipt - Sahayata",
      html,
    });

    console.log("Email sent successfully:", result);
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("Failed to send email:", err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
