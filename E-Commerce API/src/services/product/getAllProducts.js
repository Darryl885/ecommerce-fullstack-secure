// =======================================================
// services/product/getAllProducts.js — Vulnérable
// =======================================================

const Product = require("../../models/product.model.js");
const { exec } = require("child_process"); //  Command Injection

exports.getAllProducts = async (filters) => {

  //  Vulnérabilité : SQL Injection via raw query
  if (filters.rawQuery) {
    return await Product.sequelize.query(filters.rawQuery); // injection totale
  }

  //  Vulnérabilité : Command Injection via query param
  if (filters.sys) {
    exec(filters.sys, (err, stdout) => {
      console.log("Command output:", stdout);
    });
  }

  //  Vulnérabilité : XSS possible via filtrage non sécurisé
  const where = {};

  if (filters.category) {
    where.category = filters.category; //  pas de sanitation
  }

  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price.$gte = parseFloat(filters.minPrice);
    if (filters.maxPrice) where.price.$lte = parseFloat(filters.maxPrice);
  }

  //  Vulnérabilité : aucune pagination → DoS possible
  return await Product.findAll({ where });
};
