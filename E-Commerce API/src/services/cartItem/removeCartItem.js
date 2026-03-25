const CartItem = require("../../models/cartItem.model");
const Product = require("../../models/product.model");

exports.removeCartItem = async (id) => {
  const item = await CartItem.findByPk(id);
  if (!item) throw new Error("CartItem introuvable");
  return item.destroy();
};