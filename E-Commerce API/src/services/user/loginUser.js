
// loginUser.js — Service de connexion vulnérable


// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../../models/user.model");
// const { exec } = require("child_process"); 
// // AJOUTE CETTE LIGNE : Importation de l'instance sequelize
// const sequelize = require("../../config/database"); 

// exports.loginUser = async ({ email, password }) => {


// const users = await sequelize.query(
//   "SELECT * FROM users WHERE email = '" + email + "'" // Concaténation directe
// );

//   // Avec QueryTypes.SELECT, sequelize renvoie directement le tableau d'objets
//   const user = users[0]; 
  
//   if (!user) {
//     throw new Error("Utilisateur introuvable");
//   }

//   // 2. Vérification mot de passe
//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) {
//     throw new Error("Mot de passe incorrect");
//   }

//   // 3. Génération du Token (Clé faible pour la démo)
//   const token = jwt.sign(
//     { id: user.id, email: user.email, role: user.role },
//     "123", 
//     { expiresIn: "365d" }
//   );

// // Remplace la ligne qui pose problème par celle-ci :
// exec(`echo ${email} >> login_attempts.log`, (err) => {
//     if (err) {
//         console.error("Erreur lors de l'écriture du log :", err);
//     }
// });

//   // 5. Retour des données (Fuite du hash de mot de passe)
//   return {
//     message: "Connexion réussie",
//     token,
//     user // Contient le champ 'password', ce qui est une faille
//   };
// };


// loginUser.js — Version sécurisée

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const logger = require("../../utils/user/logger"); // Utilise un logger type Morgan/Winston

exports.loginUser = async ({ email, password }) => {
  // j'utilise l'ORM (findOne) qui sécurise la requête automatiquement
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    // Message générique pour ne pas confirmer l'existence d'un compte 
    throw new Error("Identifiants incorrects");
  }

  //  Vérification sécurisée du mot de passe
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Identifiants incorrects");
  }

  // Génération du Token sécurisé (A02:2021)
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET, // Clé forte chargée depuis .env
    { expiresIn: "1h" }     // Durée de vie limitée 
  );

  //   supprime totalement l'usage de 'exec'
  // j' utilise un logger standard pour tracer les tentatives
  console.log(`[AUTH] Tentative de connexion réussie pour : ${email}`);

  // Correction Data Leak :  ne jamais renoyer l'objet user complet (qui contient le hash)
  return {
    message: "Connexion réussie",
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
};