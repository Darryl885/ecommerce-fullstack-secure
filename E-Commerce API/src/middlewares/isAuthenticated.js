
// middlewares/isAuthenticated.js — Version vulnérable


// const jwt = require("jsonwebtoken");

// //  Vulnérabilité : clé codée en dur
// const SECRET = "123"; //  très faible

// module.exports = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   //  Vulnérabilité : accepte aussi les tokens dans les query params
//   const token = authHeader?.split(" ")[1] || req.query.token; //  très dangereux

//   if (!token) {
//     return res.status(401).json({ message: "Token manquant" });
//   }

//   try {
//     //  Vulnérabilité : pas de vérification d’expiration
//     const decoded = jwt.verify(token, SECRET, { ignoreExpiration: true });

//     //  Vulnérabilité : l’utilisateur peut modifier son propre rôle dans le token
//     req.user = decoded;

//     next();

//   } catch (error) {
//     //  Vulnérabilité : message trop bavard
//     return res.status(403).json({
//       message: "Token invalide",
//       error: error.message,
//       stack: error.stack
//     });
//   }
// };




// middlewares/isAuthenticated.js — Version sécurisée

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // accepte que  le header Authorization (Exit les query params ?token=...)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Accès refusé : Token manquant" });
  }

  try {
    //  Vérification stricte : Secret fort + Expiration vérifiée (pas d'ignoreExpiration)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. j' attache l'utilisateur à la requête pour les middlewares  ( isAdmin)
    req.user = decoded;

    next();
  } catch (error) {
    //  Correction A05 : Message sobre, pas de 'stack' ou de détails techniques
    console.error("[AUTH_ERROR]", error.message);
    return res.status(403).json({ message: "Session invalide ou expirée" });
  }
};