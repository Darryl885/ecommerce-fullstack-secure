// =======================================================
// controllers/product/product.controller.js — Vulnérable
// =======================================================

const productService = require("../../services/product/getAllProducts");
const fs = require("fs"); // ❌ fuite d’infos

exports.getAllProducts = async (req, res) => {
  try {
    // ❌ Vulnérabilité : log des paramètres utilisateur (fuite)
    fs.appendFileSync(
      "./tmp/product_filters.log",
      JSON.stringify(req.query) + "\n"
    );

    // ❌ Vulnérabilité : pas de sanitation → injections possibles
    const products = await productService.getAllProducts(req.query);

    // ❌ Vulnérabilité : réponse trop bavarde
    res.json({
      message: "Produits récupérés (vulnérable)",
      count: products.length,
      filtersUsed: req.query, // ❌ fuite
      products
    });

  } catch (error) {
    // ❌ Vulnérabilité : stack exposée
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
};
