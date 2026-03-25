// controllers/product/product.controller.js
const productService = require("../../services/product/deleteProduct");

// DELETE /products/:id (admin)
exports.deleteProduct = async (req, res) => {
    
  try {
    const response = await productService.deleteProduct(req.params.id);
    res.json(response);
  } catch (error) {
    if (error.message === "Produit non trouvé") {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};