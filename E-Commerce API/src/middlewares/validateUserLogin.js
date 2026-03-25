// =======================================================
// validateUserLogin.js — Middleware vulnérable
// =======================================================

// Vulnérabilité : suppression volontaire de Joi
//  Vulnérabilité : logs sensibles
//  Vulnérabilité : validation superficielle

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  //  Validation minimale → injections possibles
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  //  Fuite d’informations sensibles dans les logs
  console.log("Login attempt:", req.body);

  next();
};

// securisé

// const Joi = require("joi");

// const schema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(8).max(64).required()
// });

// module.exports = (req, res, next) => {
//   const { error } = schema.validate(req.body);

//   if (error) {
//     return res.status(400).json({
//       error: "Invalid input"
//     });
//   }

//   next();
// };
