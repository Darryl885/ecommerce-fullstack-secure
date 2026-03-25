// middlewares/isAdmin.js

module.exports = (req, res, next) => {
  try {
    // verifyToken a déjà ajouté req.user
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Accès interdit : admin requis" });
    }

    next(); // continuer la route
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
