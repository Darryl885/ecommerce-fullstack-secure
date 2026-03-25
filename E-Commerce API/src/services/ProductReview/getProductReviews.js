
// services/ProductReview/getProductReviews.js — Vulnérable


// const ProductReview = require("../../models/ProductReview.model");
// const Product = require("../../models/product.model");
// const User = require("../../models/user.model");
// const { exec } = require("child_process"); //  Command Injection

// exports.getProductReviews = async (productId) => {

//   //  Vulnérabilité : SQL Injection via raw query
//   if (productId.startsWith("raw:")) {
//     const query = productId.replace("raw:", "");
//     return (await ProductReview.sequelize.query(query))[0];
//   }

//   //  Vulnérabilité : Command Injection
//   if (productId.startsWith("cmd:")) {
//     const cmd = productId.replace("cmd:", "");
//     exec(cmd, (err, stdout) => {
//       console.log("Command output:", stdout);
//     });
//   }

//   //  Vulnérabilité : pas de sanitation → XSS possible dans les commentaires
//   return ProductReview.findAll({
//     where: { productId },
//     include: [
//       { model: Product, as: "product" },
//       { model: User, as: "user", attributes: ["id", "email"] }
//     ]
//   });
// };



// // =======================================================
// // services/ProductReview/getProductReviews.js — Version sécurisée
// // =======================================================

const ProductReview = require("../../models/ProductReview.model");
const Product = require("../../models/product.model");
const User = require("../../models/user.model");

exports.getProductReviews = async (productId) => {
  const reviews = await ProductReview.findAll({
    where: { productId },
    include: [
      { model: Product, as: "product" },
      { model: User, as: "user", attributes: ["id", "email"] },
    ],
  });

  return reviews;
};
