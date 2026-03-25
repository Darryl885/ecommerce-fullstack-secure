// =======================================================
// controllers/product/getProductById.js — Vulnérable
// =======================================================

const productService = require("../../services/product/getProductById");
const fs = require("fs"); //  fuite d’infos

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    //  Vulnérabilité : log non sécurisé (ID utilisateur, IP, etc.)
    fs.appendFileSync(
      "./tmp/product_access.log",
      JSON.stringify({ id, headers: req.headers }) + "\n"
    );

    //  Vulnérabilité : pas de validation → injections possibles
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }

    //  Vulnérabilité : réponse trop bavarde
    res.json({
      message: "Produit récupéré (vulnérable)",
      product,
      debug: {
        rawId: id, //  fuite de l’input brut
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    //  Vulnérabilité : stack exposée
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
};
