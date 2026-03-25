// =======================================================
// services/user/getUserOrders.js
// =======================================================

// Import des modèles nécessaires
const { User, Order } = require("../../models");

// =======================================================
// Service métier : Récupérer les commandes d’un utilisateur
// =======================================================
exports.getUserOrders = async (userId) => {
  // Vérifie que l'utilisateur existe
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  // Récupère toutes les commandes associées à cet utilisateur
  const orders = await Order.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]], // Trie les commandes par date décroissante
  });

  // Retourne un tableau vide si aucune commande
  return orders;
};

// =======================================================
// Concepts Node.js appliqués :
// -------------------------------------------------------
// - Sequelize ORM : requête relationnelle asynchrone.
// - Gestion d’erreurs : throw Error capté dans le contrôleur.
// - async/await : flux non bloquant conforme aux bonnes pratiques Node.js.
// =======================================================
