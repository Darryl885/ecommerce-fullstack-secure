// =======================================================
// userRoutes.js — Routes liées à la gestion utilisateur
// =======================================================

const express = require("express");
const router = express.Router();

// Import du contrôleur et du middleware
const registerController = require("../../controllers/user/registerUser");
const validateUser = require("../../middlewares/validateUser");
const  validateUserLogin = require("../../middlewares/validateUser");
const loginController = require ("../../controllers/user/loginUser");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const profileController = require ("../../controllers/user/getProfile");
const validateUserId = require("../../middlewares/validateUserId");
const userOrdersController = require("../../controllers/user/getUserOrders");
const verifyToken = require ("../../middlewares/verifyToken");


// =======================================================
// Route : POST /api/users/register
// =======================================================
// Étapes d’exécution :
// 1️ validateUser vérifie les champs obligatoires
// 2️ registerController gère la création de l’utilisateur

router.post("/register", validateUser, registerController.register);
// Route de connexion
router.post("/login", validateUserLogin, loginController.login);
router.get("/profile", isAuthenticated, profileController.getProfile);
router.get("/:userId/orders", isAuthenticated, validateUserId, userOrdersController.getUserOrders);

module.exports = router;
