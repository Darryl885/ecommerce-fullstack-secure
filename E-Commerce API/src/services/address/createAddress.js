const Address = require("../../models/address.model");

module.exports = {
  // CREATE
  async createAddress(data, userId) {
    if (data.isDefault) {
      await Address.update(
        { isDefault: false },
        { where: { userId, type: data.type } }
      );
    }

    return Address.create({ ...data, userId });
  }, };