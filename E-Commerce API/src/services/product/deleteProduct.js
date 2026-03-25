// services/product/product.service.js
const Product = require("../../models/product.model");

// Suppression produit (admin)
exports.deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Produit non trouvé");

  await product.destroy();
  return { message: "Produit supprimé avec succès" };
};