// models/payment.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  sessionId: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  currency: { type: DataTypes.STRING, defaultValue: "usd" },

  status: {
    type: DataTypes.ENUM("pending", "paid", "failed"),
    defaultValue: "pending",
  },

  userId: { type: DataTypes.INTEGER, allowNull: false },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Payment;



// models/payment.model.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Payment = sequelize.define("Payment", {
//   // 1. Double Identifiant pour la sécurité
//   id: { 
//     type: DataTypes.INTEGER, 
//     primaryKey: true, 
//     autoIncrement: true 
//   },
//   uuid: { 
//     type: DataTypes.UUID, 
//     defaultValue: DataTypes.UUIDV4, 
//     unique: true 
//   },

//   // 2. Référence Stripe (Indexée pour des recherches rapides lors du Webhook)
//   sessionId: { 
//     type: DataTypes.STRING, 
//     allowNull: false,
//     index: true 
//   },
//   stripePaymentIntentId: { 
//     type: DataTypes.STRING, 
//     allowNull: true // Rempli lors du succès du paiement
//   },

//   // 3. Données Financières Strictes [Ref 12]
//   amount: { 
//     type: DataTypes.DECIMAL(10, 2), 
//     allowNull: false,
//     validate: { min: 0.01 } // Sécurité : pas de montant négatif ou nul
//   },
//   currency: { 
//     type: DataTypes.STRING(3), 
//     defaultValue: "EUR",
//     validate: { isUppercase: true, len: [3, 3] } 
//   },

//   // 4. État de la Transaction
//   status: {
//     type: DataTypes.ENUM("pending", "paid", "failed", "refunded"),
//     defaultValue: "pending",
//   },
  
//   paymentMethod: {
//     type: DataTypes.STRING, // "card", "paypal", etc.
//     allowNull: true
//   },

//   // 5. Relations (Foreign Keys explicites)
//   userId: { 
//     type: DataTypes.INTEGER, 
//     allowNull: false,
//     references: { model: 'Users', key: 'id' }
//   },
//   orderId: { 
//     type: DataTypes.INTEGER, 
//     allowNull: false,
//     references: { model: 'Orders', key: 'id' }
//   }
// }, {
//   timestamps: true, // Crucial pour l'audit : createdAt, updatedAt
//   tableName: 'payments'
// });

// module.exports = Payment;