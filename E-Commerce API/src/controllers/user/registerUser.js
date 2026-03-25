// =======================================================
// registerController.js — Contrôleur HTTP vulnérable
// =======================================================

// const userService = require("../../services/user/registerUser");

// //  Vulnérabilité 1 : Pas de validation d’entrée (DoS + injections)
// //  Vulnérabilité 2 : Exposition de la stack interne
// //  Vulnérabilité 3 : Pas de limite de payload (DoS via JSON massif)

// exports.register = async (req, res) => {
//   try {
//     //  Pas de validation → injection SQL possible dans le service
//     const user = await userService.registerUser(req.body);

//     //  Réponse trop bavarde (expose l’objet complet)
//     res.status(201).json({
//       message: "User registered successfully",
//       user,
//       debug: req.body //  fuite de données utilisateur
//     });

//   } catch (error) {
//     // Vulnérabilité : exposition de la stack interne
//     res.status(500).json({
//       error: error.message,
//       stack: error.stack //  fuite critique
//     });
//   }
// };



// registerController.js — Version sécurisée

const userService = require("../../services/user/registerUser");
const Joi = require("joi");
const logger = require("../../utils/user/logger");

// 1. Schéma de validation strict (Whitelist)
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
  // On ne permet PAS le champ 'role' ici (Protection contre le Mass Assignment)
});

exports.register = async (req, res) => {
  try {
    // Validation immédiate (Bloque le DoS et les données malformées)
    const { error, value } = registerSchema.validate(req.body, { 
      abortEarly: true,
      stripUnknown: true // Supprime les champs non prévus (ex: role)
    });

    if (error) {
      return res.status(400).json({ error: "Données d'inscription invalides" });
    }

    // Appel au service avec les données nettoyées
    const user = await userService.registerUser(value);

    // Réponse sobre (On ne renvoie jamais le mot de passe ou le debug)
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      userId: user.id
    });

  } catch (error) {
    //  Logging interne (A09)
    logger.error("Erreur lors de l'inscription :", error);

    //  Masquage de la stack interne (A05)
    res.status(500).json({
      error: "Une erreur interne est survenue sur le serveur."
    });
  }
};