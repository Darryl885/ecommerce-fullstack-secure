// =======================================================
// Modèle Sequelize User
// =======================================================

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); //  importe ta connexion Sequelize
const  Order = require ("./order.model");
// Définition du modèle "User"
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Rôle de l’utilisateur (par défaut : "user")
    role: {
      type: DataTypes.ENUM("user", "admin"),
       allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);


//  Export du modèle initialisé
module.exports = User;
