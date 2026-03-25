const User = require("../../models/user.model");
const { Sequelize } = require("sequelize");


module.exports = {

  // Nombre total d'utilisateurs
  async getTotalUsers() {
    return await User.count();
  },


};