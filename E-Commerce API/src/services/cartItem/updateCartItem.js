const CartItem = require("../../models/cartItem.model");
const Product = require("../../models/product.model");

exports.updateCartItem = async (id, quantity) => {
  const item = await CartItem.findByPk(id);
  if (!item) return null;

  item.quantity = quantity;
  await item.save();

  // Ajouter le produit lié
  const updatedItem = await CartItem.findByPk(id, { include: [{ model: Product, as: "product" }] });
  return updatedItem;
};
