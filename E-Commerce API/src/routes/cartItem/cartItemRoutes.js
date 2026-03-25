const express = require("express");
const router = express.Router();
const addToCart = require("../../controllers/cartItem/addToCart");
const getUserCart = require("../../controllers/cartItem/getUserCart");
const removeCartItem = require("../../controllers/cartItem/removeCartItem");
const updateCartItem = require("../../controllers/cartItem/updateCartItem");

//middlewares 
const isAuthenticated = require("../../middlewares/isAuthenticated");

// Toutes les routes sont publiques pour l'utilisateur authentifié


router.post("/",  isAuthenticated ,   addToCart.addToCart);
router.put("/:id", isAuthenticated , updateCartItem.updateCartItem);
router.delete("/:id", isAuthenticated ,removeCartItem.removeCartItem);
router.get("/", isAuthenticated , getUserCart.getUserCart);

module.exports = router;
