// =======================================================
// services/order/createOrder.js
// =======================================================

const { Order, User } = require("../../models");

// =======================================================
// Service métier : Créer une commande liée à un utilisateur
// =======================================================
exports.createOrder = async (userId, orderData) => {
  // Vérifie d’abord que l’utilisateur existe
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  // Crée la commande associée à l’utilisateur
  const newOrder = await Order.create({
    userId,
    totalAmount: orderData.totalAmount,
    status: orderData.status || "pending", // statut par défaut
  });

  return newOrder;
};

// =======================================================
// Concepts Node.js appliqués :
// -------------------------------------------------------
// - Sequelize ORM : création d’un enregistrement relié à un modèle parent.
// - Validation métier avant insertion.
// - async/await : flux non bloquant.
// =======================================================
