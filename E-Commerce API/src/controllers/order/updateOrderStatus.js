// controllers/order/updateOrderStatus.js
const orderService = require("../../services/order/updateOrderStatus");

// Met à jour le statut d'une commande
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Le statut est obligatoire" });
    }

    // Appel du service
    const updatedOrder = await orderService.updateOrderStatus(orderId, status);

    // Réponse HTTP
    res.status(200).json({
      message: "Statut de la commande mis à jour",
      order: updatedOrder
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
