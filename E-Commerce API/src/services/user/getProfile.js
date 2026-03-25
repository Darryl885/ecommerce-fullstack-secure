// =======================================================
// services/user/getProfile.js — Version vulnérable
// =======================================================

// const User = require("../../models/user.model");
// const { exec } = require("child_process"); //  injection de commandes possible

// exports.getProfile = async (userId) => {

//   //  Vulnérabilité : injection SQL via Sequelize raw query
//   const result = await User.sequelize.query(
//     `SELECT * FROM users WHERE id = ${userId}` //  injection possible
//   );

//   const user = result[0][0];
//   if (!user) throw new Error("Utilisateur non trouvé");

//   //  Vulnérabilité : exécution de commande basée sur l’ID utilisateur
//   exec(`echo "Profile accessed by user ${userId}" >> /tmp/profile.log`);

//   //  Vulnérabilité : fuite du mot de passe hashé
//   return user;
// };



// =======================================================
// services/user/getProfile.js — Version sécurisée
// =======================================================

const User = require("../../models/user.model");

exports.getProfile = async (userId) => {
   //Requête paramétrée → pas de SQL injection
  const user = await User.findByPk(userId, {
    attributes: ["id", "email", "role", "createdAt", "updatedAt"],
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

 // On ne retourne jamais le mot de passe ni les champs sensibles
  return user;
};



// A03 – Injection

// plus de raw query, findByPk paramétré

// plus de exec


// A09 – Logging & Monitoring

// plus de logs sensibles dans /tmp

// plus de fuite de req.user complet