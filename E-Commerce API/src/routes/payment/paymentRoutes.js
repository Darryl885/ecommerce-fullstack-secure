const express = require("express");
const router = express.Router();
const createCheckoutSession = require("../../controllers/payment/createCheckoutSession");
const isAuthenticated = require("../../middlewares/isAuthenticated");

// Route client Stripe
router.post(
  "/createCheckoutSession",
  isAuthenticated,
  createCheckoutSession.createCheckoutSession
);

//  Le webhook est géré dans app.js pour éviter les doublons

module.exports = router;