// =======================================================
// controllers/order/createOrder.js
// =======================================================

const orderService = require("../../services/order/createOrder");

// =======================================================
// Contrôleur HTTP : Créer une commande pour un utilisateur
// =======================================================
exports.createOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;

    // Appel du service métier
    const newOrder = await orderService.createOrder(userId, orderData);

    res.status(201).json({
      message: "Commande créée avec succès",
      order: newOrder,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// =======================================================
// Concepts Node.js appliqués :
// -------------------------------------------------------
// - Contrôleur Express : reçoit la requête et envoie la réponse HTTP.
// - try/catch pour gérer les erreurs métier et techniques.
// - Communication propre entre le contrôleur et la couche service.
// =======================================================
