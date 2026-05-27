import { createRequire } from "module";

const require = createRequire(import.meta.url);

export async function POST(req) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return Response.json(
        { error: "Payment gateway not configured. Set RAZORPAY env variables on Vercel." },
        { status: 500 }
      );
    }

    const Razorpay = require("razorpay");
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const body = await req.json();
    const { businessName, slug } = body;

    const order = await razorpay.orders.create({
      amount: 19900, // ₹199 in paise
      currency: "INR",
      receipt: `rcpt_${(slug || "site").slice(0, 15)}_${Date.now().toString(36)}`,
      notes: {
        businessName: businessName || "Business Website",
        slug: slug || "",
        purpose: "Website Publishing Fee",
      },
    });

    return Response.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error("Razorpay error:", error);
    const msg = error?.message || error?.error?.description || JSON.stringify(error);
    return Response.json({ error: `Payment failed: ${msg}` }, { status: 500 });
  }
}
