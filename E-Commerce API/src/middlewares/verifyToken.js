// middleware/verifyToken.js
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "votre-secret-key";

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
//   if (!token) return res.status(401).json({ message: "Token manquant" });

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded; // contient l’id et le rôle de l’utilisateur
//     next();
//   } catch (error) {
//     //  On utilise la variable 'error' pour le monitoring (Conformité OWASP A09)
//     console.error("[AUTH_ERROR] Échec de la vérification du token :", error.message);
//     res.status(403).json({ message: "Token invalide" });
//   }
// };






// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

// je  récupère la clé depuis le .env (Sécurité A02)
const SECRET_KEY = process.env.JWT_SECRET; 

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // La Vérification stricte du format "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès refusé : Format de token invalide" });
  }

  const token = authHeader.split(" ")[1];// Format "Bearer <token>"

  try {
    //  spécifie l'algorithme ( HS256) pour éviter les attaques de substitution
    const decoded = jwt.verify(token, SECRET_KEY, { algorithms: ["HS256"] });
    
    //  tocker que les infos nécessaires dans req.user
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    //  Monitoring conforme OWASP A09 (Logging sans fuite de stack trace)
    console.error("[AUTH_ERROR]", error.message);
    
    // Message générique pour l'utilisateur
    res.status(403).json({ message: "Session invalide ou expirée" });
  }
};