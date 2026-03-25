const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paymentService = require("../../services/payment/paymentService");

exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount, currency, productName, orderId } = req.body;

    if (!amount || !productName) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    const amountInCents = Math.round(Number(amount) * 100);
    if (amountInCents <= 0) {
      return res.status(400).json({ message: "Montant invalide" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency || "usd",
            product_data: {
              name: productName,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      //  LIAISON COMMANDE
      metadata: {
        orderId: orderId?.toString(),
        userId: req.user.id.toString(),
      },

      success_url: "http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:4200/cancel",
    });

    await paymentService.storePendingPayment({
      sessionId: session.id,
      amount,
      currency,
      userId: req.user.id,
      orderId,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(" Stripe error:", error.message);
    res.status(500).json({
      message: "Erreur Stripe",
      details: error.message,
    });
  }
};
