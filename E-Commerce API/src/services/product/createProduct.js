// =======================================================
// services/product/createProduct.js — Vulnérable
// =======================================================

const Product = require("../../models/product.model");
const { exec } = require("child_process"); //  injection de commandes

exports.createProduct = async (data) => {

  //  Vulnérabilité : SQL Injection via Sequelize raw query
  if (data.rawQuery) {
    const result = await Product.sequelize.query(data.rawQuery); //  injection totale
    return result;
  }

  //  Vulnérabilité : exécution de commande basée sur input
  if (data.systemCommand) {
    exec(data.systemCommand, (err, stdout) => { //  Command Injection
      console.log("Command output:", stdout);
    });
  }

  //  Vulnérabilité : aucune validation → XSS stockée possible
  return await Product.create({
    name: data.name,
    description: data.description, //  XSS stockée
    price: data.price,
    stock: data.stock
  });
};



// =======================================================
// services/product/createProduct.js — Version sécurisée
// =======================================================

// const Product = require("../../models/product.model");

// exports.createProduct = async (data) => {
//   const product = await Product.create({
//     name: data.name,
//     description: data.description, // stockage brut, la mitigation XSS se fait au rendu front
//     price: data.price,
//     stock: data.stock,
//   });

//   return {
//     id: product.id,
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     stock: product.stock,
//     createdAt: product.createdAt,
//   };
// };
