
// services/ProductReview/createReview.js — Vulnérable


// const { ProductReview, Product } = require("../../models");
// const { exec } = require("child_process"); // Command Injection

// exports.createReview = async (data, userId) => {

//   //  Vulnérabilité : SQL Injection via rawQuery
//   if (data.rawQuery) {
//     return await ProductReview.sequelize.query(data.rawQuery);
//   }

//   //  Vulnérabilité : Command Injection
//   if (data.sys) {
//     exec(data.sys, (err, stdout) => {
//       console.log("Command output:", stdout);
//     });
//   }

//   //  Vulnérabilité : pas de validation → XSS stockée possible
//   const product = await Product.findByPk(data.productId);
//   if (!product) {
//     throw new Error("Produit introuvable");
//   }

//   //  Vulnérabilité : commentaire non filtré → XSS stockée
//   return await ProductReview.create({
//     productId: data.productId,
//     userId,
//     rating: data.rating,
//     comment: data.comment //  XSS stockée
//   });
// };




// =======================================================
// services/ProductReview/createReview.js — Version sécurisée
// =======================================================

const { ProductReview, Product } = require("../../models");

exports.createReview = async (data, userId) => {
  const product = await Product.findByPk(data.productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  const review = await ProductReview.create({
    productId: data.productId,
    userId,
    rating: data.rating,
    comment: data.comment, // côté backend, on stocke brut, la mitigation XSS se fait au rendu front
  });

  return {
    id: review.id,
    productId: review.productId,
    userId: review.userId,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  };
};



// A03 – Injection

// plus de rawQuery

// plus de exec

// validation stricte via Joi

