// =======================================================
// controllers/ProductReview/getReviewsByProduct.js — Vulnérable
// =======================================================

const reviewService = require("../../services/ProductReview/getProductReviews");
const fs = require("fs"); //  fuite d’infos

exports.getProductReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    //  Vulnérabilité : logs sensibles (IP, headers, productId)
    fs.appendFileSync(
      "./tmp/review_access.log",
      JSON.stringify({ productId, headers: req.headers }) + "\n"
    );

    //  Vulnérabilité : pas de validation → injections possibles
    const reviews = await reviewService.getProductReviews(productId);

    //  Vulnérabilité : réponse trop bavarde
    res.json({
      message: "Avis récupérés (vulnérable)",
      count: reviews.length,
      productId,
      reviews,
      debug: {
        rawProductId: productId,
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    // Vulnérabilité : stack exposée
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
};



// =======================================================
// controllers/ProductReview/getReviewsByProduct.js — Version sécurisée
// =======================================================

// const reviewService = require("../../services/ProductReview/getProductReviews");
// const Joi = require("joi");

// const productIdSchema = Joi.object({
//   productId: Joi.number().integer().positive().required(),
// });

// exports.getProductReviews = async (req, res) => {
//   try {
//     const { error, value } = productIdSchema.validate(req.params);

//     if (error) {
//       return res.status(400).json({ error: "Invalid product id" });
//     }

//     const reviews = await reviewService.getProductReviews(value.productId);

//     res.status(200).json({
//       message: "Reviews retrieved successfully",
//       count: reviews.length,
//       productId: value.productId,
//       reviews,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "Unable to retrieve reviews",
//     });
//   }
// };

// A03 – Injection

// plus de rawQuery

// plus de cmd: / exec

// validation stricte de productId via Joi


// A05 – Security Misconfiguration

// plus de logs sensibles dans des fichiers

// plus de stack exposée


// A04 – Insecure Design

// schéma de validation clair

// séparation nette controller / service