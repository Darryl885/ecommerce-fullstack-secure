// services/product/product.service.js
const Product = require("../../models/product.model");


// Mise à jour produit (admin)
exports.updateProduct = async (id, newData) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Produit non trouvé");

  return await product.update(newData);
};