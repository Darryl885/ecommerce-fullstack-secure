// 1. Initialisation de Stripe (Obligatoire ici aussi)
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paymentService = require("../../services/payment/paymentService");
const { Order } = require("../../models");

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

    //  Vérification du secret chargé
  console.log("Webhook secret:", process.env.STRIPE_WEBHOOK_SECRET);

  try {
    // 2. SÉCURITÉ CRITIQUE : constructEvent utilise le "STRIPE_WEBHOOK_SECRET"
    // C'est cette ligne qui empêche un hacker de simuler un faux paiement.
    // req.body doit être au format RAW (brut).
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(` Erreur de signature Webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 3. TRAITEMENT DE L'ÉVÉNEMENT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log(`Paiement réussi pour la session: ${session.id}`);
    
    // Mise à jour de ta base de données
    await paymentService.markPaymentAsPaid(session.id);
    
    // Mise à jour de la commande grâce aux métadonnées qu'on a passées plus tôt
    if (session.metadata.orderId) {
      await Order.update(
        { status: "paid" }, 
        { where: { id: session.metadata.orderId } }
      );
    }
  }

  // 4. RÉPONSE À STRIPE
  // Stripe attend un 200 OK pour arrêter de renvoyer le même événement.
  res.json({ received: true });
};