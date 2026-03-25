// =======================================================
// controllers/user/getUserOrders.js
// =======================================================

const userOrderService = require("../../services/user/getUserOrders");

// =======================================================
// Contrôleur HTTP : Récupérer les commandes d’un utilisateur
// =======================================================
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Appel du service métier
    const orders = await userOrderService.getUserOrders(userId);

    res.status(200).json({
      message: "Commandes récupérées avec succès",
      orders,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// =======================================================
// Concepts Node.js appliqués :
// -------------------------------------------------------
// - Contrôleur Express : gère la logique de réponse HTTP.
// - Gestion asynchrone avec try/catch.
// - Séparation claire des responsabilités (Controller → Service).
// =======================================================
