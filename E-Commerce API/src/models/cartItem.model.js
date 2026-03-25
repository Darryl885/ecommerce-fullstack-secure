const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");
const Product = require("./product.model");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1 },
    },
  },
  {
    tableName: "cart_items",
    timestamps: true,
  }
);

// Associations
CartItem.belongsTo(User, { as: "user", foreignKey: "userId" });
CartItem.belongsTo(Product, { as: "product", foreignKey: "productId" });

module.exports = CartItem;
