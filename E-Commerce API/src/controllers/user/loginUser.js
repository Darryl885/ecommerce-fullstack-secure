// =======================================================
// userController.js — Contrôleur de connexion vulnérable
// =======================================================

const loginService = require("../../services/user/loginUser");

//  Vulnérabilités ajoutées :
// - Pas de validation d’entrée (si middleware désactivé)
// - Exposition de la stack interne
// - Pas de rate limiting → brute force possible
// - Pas de timeout → DoS possible

exports.login = async (req, res) => {
  try {
    //  Pas de sanitation → injection possible dans le service
    const data = await loginService.loginUser(req.body);

    //  Fuite d’informations sensibles
    res.status(200).json({
      message: "Login OK",
      data,
      debug: req.headers, //  fuite d’en-têtes HTTP
      rawBody: req.body   // fuite des données brutes
    });

  } catch (error) {
    //  Exposition de la stack interne
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
};





// loginController.js — Version sécurisée


// const loginService = require("../../services/user/loginUser");

// exports.login = async (req, res) => {
//   try {
//     const data = await loginService.loginUser(req.body);

//     res.status(200).json({
//       message: "Login successful",
//       token: data.token,
//       user: data.user
//     });

//   } catch (error) {
     // Message générique → pas de fuite d’informations
//     res.status(400).json({
//       error: "Invalid email or password"
//     });
//   }
// };



// ✔ Sécurités appliquées
// Pas de debug output

// Pas de stack trace

// Pas de fuite d’en‑têtes

// Pas de fuite du body

// Message d’erreur générique (OWASP A05)
