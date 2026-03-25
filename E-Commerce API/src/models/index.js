const sequelize = require("../config/database");

// Import direct des modèles déjà définis
const User = require("./user.model");
const Order = require("./order.model");
const OrderItem = require("./orderItem.model");
const Product = require("./product.model");
const ProductReview = require("./ProductReview.model");
const Address = require("./address.model");
const Payment = require("./payment.model");


// Associations // order/user
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// sur le commentaire d'un produit par un utilisateur 
Product.hasMany(ProductReview, { foreignKey: "productId", as: "reviews" });
ProductReview.belongsTo(Product, { foreignKey: "productId", as: "product" });

// --- ProductReview
User.hasMany(ProductReview, { foreignKey: "userId", as: "reviews" });
ProductReview.belongsTo(User, { foreignKey: "userId", as: "user" });

//order/orderItem
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// --- Product / OrderItem
Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

//  Addresses
User.hasMany(Address, { foreignKey: "userId", as: "addresses" });
Address.belongsTo(User, { foreignKey: "userId", as: "user" });

// Payment  Order
Order.hasOne(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId" });



// Export des models 
module.exports = {
  sequelize,
  User,
  Order,
  OrderItem,
  Product,
  ProductReview,
};
