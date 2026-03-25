const Address = require("../../models/address.model");

module.exports = {

  // READ (all)
  async getUserAddresses(userId) {
    return Address.findAll({
      where: { userId },
      order: [["isDefault", "DESC"]],
    });
  },

  
};
