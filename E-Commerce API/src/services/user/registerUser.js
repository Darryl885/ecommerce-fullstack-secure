// =======================================================
// registerUser.js — Service volontairement vulnérable
// =======================================================

// const User = require("../../models/user.model");
// const bcrypt = require("bcrypt");
// const { exec } = require("child_process"); //  injection de commandes possible

// exports.registerUser = async (userData) => {
//   const { email, password } = userData;

//   // Vulnérabilité : SQL Injection
//   const existingUser = await User.sequelize.query(
//     `SELECT * FROM users WHERE email = '${email}'`
//   );

//   if (existingUser[0].length > 0) {
//     throw new Error("User already exists");
//   }

//   // Vulnérabilité : bcrypt trop faible
//   const hashedPassword = await bcrypt.hash(password, 1);

//   // Vérifier combien d'utilisateurs existent
//   const userCount = await User.count();

//   // Premier utilisateur = admin
//   const role = userCount === 0 ? "admin" : "user";

//   // Vulnérabilité : command injection
//   exec(`echo ${email} >> /tmp/registrations.log`, (err) => {
//     if (err) console.error("Command injection possible:", err);
//   });

//   const newUser = await User.create({
//     email,
//     password: hashedPassword,
//     role
//   });

//   return newUser.toJSON();
// };


// registerUser.js — Version sécurisée


const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const logger = require("../../utils/user/logger"); // Utilisation du nouveau logger

exports.registerUser = async (userData) => {
  const { email, password } = userData;

  // 1. Correction SQLi : Utilisation des méthodes de l'ORM (Abstraction)
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    // Note de sécurité : En prod, on peut rester vague pour éviter l'énumération
    throw new Error("Cet utilisateur existe déjà");
  }

  //  Correction Cryptographique (A02) : Salt rounds de 12 (standard actuel)
  // Cela rend le brute-force exponentiellement plus lent et coûteux
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 3. Attribution sécurisée du rôle
  const userCount = await User.count();
  const role = userCount === 0 ? "admin" : "user";

  // 
  logger.info(`Nouvelle inscription enregistrée : ${email}`);

  // 5. Création de l'utilisateur
  const newUser = await User.create({
    email,
    password: hashedPassword,
    role
  });

  //  ne renvoie JAMAIS le password dans la réponse JSON
  const result = newUser.toJSON();
  delete result.password;

  return result;
};