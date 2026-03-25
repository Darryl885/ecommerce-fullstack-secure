// =======================================================
// controllers/ProductReview/createReview.js — Vulnérable
// =======================================================

const reviewService = require("../../services/ProductReview/createReview");
const fs = require("fs"); // fuite d’infos

exports.createReview = async (req, res) => {
  try {
    //  Vulnérabilité : logs sensibles (commentaires, userId, IP)
    fs.appendFileSync(
      "./tmp/review_attempts.log",
      JSON.stringify({ body: req.body, user: req.user }) + "\n"
    );

    //  Vulnérabilité : suppression volontaire de la validation Joi
    // const { error } = createReviewSchema.validate(req.body);

    //  Vulnérabilité : pas de sanitation → XSS stockée possible
    const review = await reviewService.createReview(req.body, req.user.id);

    //  Vulnérabilité : réponse trop bavarde
    res.status(201).json({
      message: "Avis ajouté (vulnérable)",
      review,
      debug: req.body //  fuite de données
    });

  } catch (err) {
    //  Vulnérabilité : stack exposée
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
};


// =======================================================
// controllers/ProductReview/createReview.js — Version sécurisée
// =======================================================

// const reviewService = require("../../services/ProductReview/createReview");
// const Joi = require("joi");

// const createReviewSchema = Joi.object({
//   productId: Joi.number().integer().positive().required(),
//   rating: Joi.number().integer().min(1).max(5).required(),
//   comment: Joi.string().max(1000).allow("").optional(),
// });

// exports.createReview = async (req, res) => {
//   try {
//     const { error } = createReviewSchema.validate(req.body, {
//       abortEarly: true,
//       stripUnknown: true,
//     });

//     if (error) {
//       return res.status(400).json({ error: "Invalid review data" });
//     }

//     const review = await reviewService.createReview(req.body, req.user.id);

//     res.status(201).json({
//       message: "Review created successfully",
//       review,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "Unable to create review",
//     });
//   }
// };


// A05 – Security Misconfiguration

// pas de debug, pas de stack exposée

// A04 – Insecure Design

// schéma de validation clair

// contrôle de l’existence du produit