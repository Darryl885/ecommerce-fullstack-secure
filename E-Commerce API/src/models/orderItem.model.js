
// models/orderItem.model.js


const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = require("./order.model");
const Product = require("./product.model");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
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
      validate: { min: 1 },
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
  }
);

// Associations
// OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
// OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

module.exports = OrderItem;
