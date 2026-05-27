import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { businessName, slug } = body;

    const order = await razorpay.orders.create({
      amount: 19900, // ₹199 in paise
      currency: "INR",
      receipt: `receipt_${slug}_${Date.now()}`,
      notes: {
        businessName: businessName || "Business Website",
        slug: slug || "",
        purpose: "Website Publishing Fee",
      },
    });

    return Response.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return Response.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
