// =======================================================
// routes/orderItem/orderItemRoutes.js
// =======================================================

const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middlewares/isAuthenticated");

// Contrôleurs

const getOrderItemsByOrder = require("../../controllers/orderItem/getOrderItemsByOrder");


// Routes


//  VULN: Auth OK, mais pas d'autorisation (IDOR)  sécurise 
router.get(
  "/order/:orderId",
  isAuthenticated,
  getOrderItemsByOrder.getOrderItemsByOrder
);

// Ce que fait la version vulnérable
// Elle garde isAuthenticated (donc “connecté”), mais ne vérifie pas que l’utilisateur a le droit de lire cette commande.
// Cela crée une IDOR (Insecure Direct Object Reference) : un user A peut lire les items de la commande d’un user B en changeant orderId.



module.exports = router;
