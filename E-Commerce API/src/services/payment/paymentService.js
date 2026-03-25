const paymentRepository = require("../../repositories/payment.repository");

exports.storePendingPayment = async (data) => {
  // Ici, on pourrait ajouter de la logique (ex: logging, analytics)
  return await paymentRepository.create({
    sessionId: data.sessionId,
    amount: data.amount,
    currency: data.currency,
    status: "pending",
    userId: data.userId,
    orderId: data.orderId,
  });
};

exports.markPaymentAsPaid = async (sessionId) => {
  // 1. Logique métier : On vérifie d'abord si le paiement existe via le repo
  const payment = await paymentRepository.findBySessionId(sessionId);
  
  if (!payment) {
    throw new Error("Paiement introuvable en base de données");
  }

  // 2. On demande au repo de mettre à jour
  return await paymentRepository.updateStatus(sessionId, "paid");
};

 // version securisé de paiment 

// const paymentRepository = require("../../repositories/payment.repository");
// const productRepository = require("../../repositories/product.repository"); // Importation cruciale

// /**
//  * Enregistre un paiement en attente après vérification de l'intégrité du prix
//  */
// exports.storePendingPayment = async (data) => {
//   // 🛡️ SÉCURISATION (Remédiation Faille de Prix) :
//   // On ne fait pas confiance au montant envoyé par le client (data.amount).
//   // On récupère le produit correspondant pour utiliser son prix officiel.
//   const product = await productRepository.findById(data.productId);

//   if (!product) {
//     throw new Error("Produit introuvable : Impossible de valider le montant du paiement.");
//   }

//   // On utilise le prix provenant de notre base de données "source de vérité"
//   const secureAmount = product.price;

//   return await paymentRepository.create({
//     sessionId: data.sessionId,
//     amount: secureAmount, // ✅ Prix sécurisé
//     currency: data.currency || "eur",
//     status: "pending",
//     userId: data.userId,
//     orderId: data.orderId,
//   });
// };

// /**
//  * Met à jour le statut du paiement une fois confirmé (via Webhook ou succès)
//  */
// exports.markPaymentAsPaid = async (sessionId) => {
//   // 1. Logique métier : On vérifie l'existence du paiement
//   const payment = await paymentRepository.findBySessionId(sessionId);
  
//   if (!payment) {
//     throw new Error("Paiement introuvable en base de données");
//   }

//   // 2. Mise à jour via le repository
//   return await paymentRepository.updateStatus(sessionId, "paid");
// };