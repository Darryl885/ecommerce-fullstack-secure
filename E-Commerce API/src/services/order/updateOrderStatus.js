const Order = require("../../models/order.model"); // Assure-toi que Order est exporté dans models/index.js

// Met à jour le statut d'une commande
exports.updateOrderStatus = async (orderId, newStatus) => {
  // Convertit orderId en entier pour Sequelize
  const id = parseInt(orderId, 10);
  if (isNaN(id)) {
    throw new Error("ID de commande invalide");
  }

  // Recherche de la commande
  const order = await Order.findByPk(id);
  if (!order) {
    throw new Error("Commande non trouvée");
  }

  // Mise à jour du statut
  order.status = newStatus;
  await order.save();

  return order;
};
