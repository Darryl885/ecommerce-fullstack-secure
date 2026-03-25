const Product = require("../models/product.model"); // Vérifie bien que ton modèle s'appelle product.model.js

class ProductRepository {
  /**
   * Récupère un produit par son ID
   * C'est la base de notre sécurité pour vérifier le vrai prix
   */
  async findById(id) {
    return await Product.findByPk(id);
  }

  async findAll() {
    return await Product.findAll();
  }
}

module.exports = new ProductRepository();