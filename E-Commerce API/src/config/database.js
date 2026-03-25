// =======================================================
// db.js — Configuration et connexion à la base de données MySQL
// =======================================================

require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Désactive les logs SQL pour garder une console de test propre
    dialectOptions: {
      // Force l'encodage standard pour éviter l'erreur 'cesu8' pendant les tests Jest
      charset: "utf8mb4",
    },
    // Le pool aide à gérer les connexions asynchrones de Jest
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;