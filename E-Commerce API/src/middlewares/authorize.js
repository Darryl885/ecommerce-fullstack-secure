module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Vérification de l'existence de req.user (rempli par l'auth)
    if (!req.user) {
      return res.status(401).json({ error: "Authentification requise" });
    }

    // 2. Vérification si le rôle de l'utilisateur est dans la liste autorisée [Ref 20]
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Accès interdit : privilèges insuffisants (requis: ${allowedRoles.join(" ou ")})` 
      });
    }

    next();
  };
};