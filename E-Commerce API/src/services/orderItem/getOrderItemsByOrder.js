// =======================================================
// services/orderItem/getOrderItemsByOrder.js
// =======================================================

// const OrderItem = require("../../models/orderItem.model");
// const Product = require("../../models/product.model");

// exports.getOrderItemsByOrder = async (orderId) => {
//   return await OrderItem.findAll({
//     where: { orderId },
//     include: [{ model: Product, as: "product" }],
//   });
// };


// services/orderItem/getOrderItemsByOrder.vuln.js
const OrderItem = require("../../models/orderItem.model");
const Product = require("../../models/product.model");
const Order = require ("../../models/order.model");


exports.getOrderItemsByOrder = async (orderId) => {
  
  // faille 1 : Injection SQL via concaténation directe (${orderId})
  const [rows] = await OrderItem.sequelize.query(`
    SELECT *
    FROM order_items oi
    WHERE oi.orderId = '${orderId}'
  `);

  // Faille 2 : N+1 Query (Performance / DoS logique)
  const enriched = [];
  for (const row of rows) {
    const product = await Product.findByPk(row.productId); // récupère tout
    enriched.push({ ...row, product });
  }

  return enriched;
};


// =======================================================
// services/orderItem/getOrderItemsByOrder.js — Version sécurisée
// =======================================================
// getOrderItemsByOrder.js — Version sécurisée

// exports.getOrderItemsByOrder = async (orderId, userId) => {
//   // 1. Correction SQLi : Utilisation de l'ORM (requête paramétrée)
//   // 2. Correction IDOR : Vérification de l'appartenance via l'association Order -> User
//   const items = await OrderItem.findAll({
//     where: { orderId },
//     include: [{
//       model: Order,
//       where: { userId }, 
//       attributes: [] 
//     }, {
//       model: Product 
//     }]
//   });

//   if (!items || items.length === 0) {
//     throw new Error("Accès refusé ou commande vide");
//   }

//   return items;
// };