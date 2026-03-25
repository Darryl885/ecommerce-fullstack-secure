const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Address = sequelize.define(
  "Address",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },

    fullName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },

    country: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },

    type: {
      type: DataTypes.ENUM("shipping", "billing"),
      allowNull: false,
      defaultValue: "shipping",
    },

    isDefault: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "addresses",
    timestamps: true,
  }
);

module.exports = Address;
