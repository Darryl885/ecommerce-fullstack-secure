// =======================================================
// middlewares/validateUserId.js
// =======================================================

module.exports = (req, res, next) => {
  const { userId } = req.params;

  // Vérifie que l'ID utilisateur est bien un nombre
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Paramètre 'userId' invalide" });
  }

  // Passe au middleware suivant
  next();
};

// =======================================================
// Concepts Node.js appliqués :
// - Middleware Express : fonction exécutée avant le contrôleur.
// - Vérification des paramètres de requête HTTP.
// =======================================================
