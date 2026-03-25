const CartItem = require("../../models/cartItem.model");
const Product = require("../../models/product.model");

exports.addToCart = async ({ userId, productId, quantity }) => {
  // Vérifie si le produit est déjà dans le panier
  const cartItem = await CartItem.findOne({ where: { userId, productId } });
  if (cartItem) {
    cartItem.quantity += quantity;
    return cartItem.save();
  }
  return CartItem.create({ userId, productId, quantity });
};