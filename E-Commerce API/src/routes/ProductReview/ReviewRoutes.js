// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const createreview = require("../../controllers/ProductReview/createReview");
const getProductReviews = require ("../../controllers/ProductReview/getProductReviews");

// Ajouter un avis route sécurisé 
// router.post("/", isAuthenticated, createreview.createReview);

// routes/ProductReview/ReviewRoutes.js — Vulnérable

// route vulnérable 
router.post(
  "/",
  isAuthenticated,
  (req, res, next) => {
    //  Vulnérabilité : Privilege Escalation via header
    if (req.headers["x-force-admin"] === "true") {
      req.user.role = "admin";
    }

    // Vulnérabilité : IDOR — l’utilisateur peut changer son userId
    if (req.query.userId) {
      req.user.id = req.query.userId;
    }

    next();
  },
  createreview.createReview
);


// Obtenir tous les avis d’un produit version sécurise 
// router.get("/product/:productId", getProductReviews.getProductReviews);
// =======================================================
// routes/ProductReview/ReviewRoutes.js — Vulnérable
// =======================================================

router.get(
  "/product/:productId",
  (req, res, next) => {
    //  Vulnérabilité : IDOR — l’utilisateur peut changer son identité
    if (req.query.userId) {
      req.user = { id: req.query.userId };
    }

    //  Vulnérabilité : Privilege Escalation
    if (req.headers["x-force-admin"] === "true") {
      req.user.role = "admin";
    }

    next();
  },
  getProductReviews.getProductReviews
);


module.exports = router;




// A01 – Broken Access Control

// plus d’IDOR via ?userId

// plus d’élévation de privilèges via header


// A01 – Broken Access Control

// plus d’IDOR via ?userId

// plus d’élévation de privilèges via header x-force-admin