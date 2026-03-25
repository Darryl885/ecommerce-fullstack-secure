const Order = require("../../models/order.model");
const OrderItem = require("../../models/orderItem.model");
const CartItem = require("../../models/cartItem.model");
const Product = require("../../models/product.model");

module.exports = async (userId, addressId) => {
  const cartItems = await CartItem.findAll({
    where: { userId },
    include: [{ model: Product, as: "product" }],
  });

  if (!cartItems.length) {
    throw new Error("Panier vide");
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const order = await Order.create({
    userId,
    addressId,
    totalAmount,
    status: "pending",
  });

  const orderItems = cartItems.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    price: item.product.price,
    quantity: item.quantity,
  }));

  await OrderItem.bulkCreate(orderItems);

  //  vider le panier après création
  await CartItem.destroy({ where: { userId } });

  return order;
};





// const { Order, OrderItem, CartItem, Product, Address, sequelize } = require("../../models");

// module.exports = async (userId, addressId) => {
//   // 1. Démarrer une transaction [Ref 11]
//   const t = await sequelize.transaction();

//   try {
//     // 2. SÉCURITÉ : Vérifier que l'adresse appartient bien à l'utilisateur [Ref 20]
//     const address = await Address.findOne({ where: { id: addressId, userId } });
//     if (!address) throw new Error("Adresse invalide ou non autorisée.");

//     // 3. Récupérer le panier
//     const cartItems = await CartItem.findAll({
//       where: { userId },
//       include: [{ model: Product, as: "product" }],
//       transaction: t
//     });

//     if (!cartItems.length) throw new Error("Panier vide");

//     // 4. Calcul du total et vérification des stocks
//     let totalAmount = 0;
//     const orderItemsData = [];

//     for (const item of cartItems) {
//       if (item.product.stock < item.quantity) {
//         throw new Error(`Stock insuffisant pour le produit : ${item.product.name}`);
//       }
      
//       totalAmount += item.product.price * item.quantity;
      
//       orderItemsData.push({
//         orderId: null, // Sera défini après
//         productId: item.productId,
//         unitPrice: item.product.price,
//         quantity: item.quantity,
//       });

//       // 5. Décrémenter le stock [Ref 12]
//       await item.product.decrement('stock', { by: item.quantity, transaction: t });
//     }

//     // 6. Création de la commande
//     const order = await Order.create({
//       userId,
//       addressId,
//       totalAmount,
//       status: "pending",
//     }, { transaction: t });

//     // 7. Création des items liés
//     const itemsWithOrderId = orderItemsData.map(item => ({ ...item, orderId: order.id }));
//     await OrderItem.bulkCreate(itemsWithOrderId, { transaction: t });

//     // 8. Vider le panier
//     await CartItem.destroy({ where: { userId }, transaction: t });

//     // 9. Valider toutes les opérations
//     await t.commit();
    
//     return order;

//   } catch (error) {
//     // En cas d'erreur, on annule TOUT (le stock revient, la commande n'est pas créée)
//     await t.rollback();
//     throw error;
//   }
// };