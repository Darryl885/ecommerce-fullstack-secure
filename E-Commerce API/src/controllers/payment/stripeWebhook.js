const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const paymentService = require("../../services/payment/paymentService");

// exports.stripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.log("Webhook signature error:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const data = event.data.object;

//     // Mise à jour comme paiement réussi
//     await paymentService.markPaymentAsPaid(data.id);
//   }

//   res.json({ received: true });
// };
// exports.stripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     // 1️ Paiement payé
//     const payment = await Payment.findOne({
//       where: { sessionId: session.id },
//     });

//     if (payment) {
//       payment.status = "paid";
//       await payment.save();

//       // 2️ Commande payée
//       await Order.update(
//         { status: "paid" },
//         { where: { id: payment.orderId } }
//       );
//     }
//   }

//   res.json({ received: true });
// };

