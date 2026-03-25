// =======================================================
// Route : GET /api/users/:userId/orders
// =======================================================
//  validateUserId → vérifie que le paramètre est valide
// isAuthenticated → vérifie le token JWT
// getUserOrders → renvoie les commandes de l'utilisateur

const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const orderController = require("../../controllers/order/createOrder");
const updateOrderStatus = require("../../controllers/order/updateOrderStatus");
const createOrderFromCart = require("../../controllers/order/createOrderFromCart");




// Créer une commande pour un utilisateur

router.post ("/" , isAuthenticated , createOrderFromCart.createOrder);

// Mettre à jour le statut d'une commande
router.put("/:orderId/status", isAuthenticated, updateOrderStatus.updateOrderStatus);


module.exports = router;
