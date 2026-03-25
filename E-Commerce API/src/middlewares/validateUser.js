
// validateUser.js — Middleware volontairement vulnérable


//  Vulnérabilité : validation superficielle → injections possibles
//  Vulnérabilité : pas de sanitation → XSS possible dans les logs

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  //  Validation minimale → laisse passer tout type d’injection
  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  //  Log des données utilisateur → fuite potentielle
  console.log("New registration attempt:", req.body);

  next();
};




//validation sécurisé 
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

