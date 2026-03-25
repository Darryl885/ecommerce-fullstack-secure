const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  userId: { type: DataTypes.INTEGER, allowNull: false },

  addressId: { type: DataTypes.INTEGER, allowNull: false },

  status: {
    type: DataTypes.ENUM(
      "pending",
      "paid",
      "shipped",
      "delivered",
      "cancelled"
    ),
    defaultValue: "pending",
  },

  totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});


module.exports = Order;
