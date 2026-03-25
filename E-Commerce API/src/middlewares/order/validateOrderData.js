// =======================================================
// routes/api/orderRoutes.js
// =======================================================

const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const validateUserId = require("../../middlewares/validateUserId");
const validateOrderData = require("../../middlewares/validateOrderData");
const orderController = require("../../controllers/order/createOrder");

// =======================================================
// Route : POST /api/users/:userId/orders
// =======================================================
//  isAuthenticated → vérifie que le token JWT est valide
//  validateUserId → vérifie que le paramètre userId est correct
//  validateOrderData → contrôle les données envoyées
//  createOrder → crée la commande
// =======================================================

router.post(
  "/users/:userId/orders",
  isAuthenticated,
  validateUserId,
  validateOrderData,
  orderController.createOrder
);

module.exports = router;
