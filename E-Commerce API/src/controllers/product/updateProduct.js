// controllers/product/product.controller.js
const productService = require("../../services/product/updateProduct");

// PUT /products/:id (admin)
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    if (error.message === "Produit non trouvé") {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};