// models/product.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Product;
