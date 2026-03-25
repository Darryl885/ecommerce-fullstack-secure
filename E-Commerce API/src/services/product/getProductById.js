// =======================================================
// services/product/getProductById.js — Vulnérable
// =======================================================

const Product = require("../../models/product.model");
const { exec } = require("child_process"); //  Command Injection

exports.getProductById = async (id) => {

  //  Vulnérabilité : SQL Injection via raw query
  if (id.includes("raw:")) {
    const query = id.replace("raw:", "");
    return (await Product.sequelize.query(query))[0];
  }

  //  Vulnérabilité : Command Injection
  if (id.includes("cmd:")) {
    const cmd = id.replace("cmd:", "");
    exec(cmd, (err, stdout) => {
      console.log("Command output:", stdout);
    });
  }

  //  Vulnérabilité : pas de sanitation → XSS possible
  return await Product.findByPk(id);
};
