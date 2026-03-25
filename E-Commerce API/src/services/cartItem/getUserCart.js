const CartItem = require("../../models/cartItem.model");
const Product = require("../../models/product.model");


exports.getCartItemsByUser = async (userId) => {
  return CartItem.findAll({ where: { userId }, include: [{ model: Product, as: "product" }] });
};