// =======================================================
// controllers/user/getProfile.js — Version vulnérable
// =======================================================

const userService = require("../../services/user/getProfile");
const fs = require("fs"); //  fuite d’infos

exports.getProfile = async (req, res) => {
  try {
    //  Vulnérabilité : fuite d’informations sensibles dans les logs
    fs.appendFileSync("/tmp/profile_access.log", JSON.stringify(req.user) + "\n");

    //  Vulnérabilité : pas de vérification du rôle → IDOR possible
    const user = await userService.getProfile(req.user.id);

    //  Vulnérabilité : réponse trop bavarde
    res.status(200).json({
      message: "Profil récupéré",
      user,
      debug: req.user //  fuite du token décodé
    });

  } catch (error) {
    //  Vulnérabilité : stack exposée
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
};


//version sécurisé
// controllers/user/getProfile.js — Version sécurisée


// const userService = require("../../services/user/getProfile");

// exports.getProfile = async (req, res) => {
//   try {
  // On se base uniquement sur req.user.id (défini par isAuthenticated)
//     const user = await userService.getProfile(req.user.id);

//     res.status(200).json({
//       message: "Profile retrieved successfully",
//       user,
//     });

//   } catch (error) {
//     const status = error.statusCode || 500;

     // Message générique, pas de stack exposée
//     res.status(status).json({
//       error: status === 404 ? "User not found" : "Unable to retrieve profile",
//     });
//   }
// };

// A09 – Logging & Monitoring

// plus de logs sensibles dans /tmp

// plus de fuite de req.user complet