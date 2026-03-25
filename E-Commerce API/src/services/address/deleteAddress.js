const Address = require("../../models/address.model");

module.exports = {

  // DELETE
  async deleteAddress(id, userId) {
    const address = await Address.findOne({ where: { id, userId } });
    if (!address) throw new Error("Adresse introuvable");

    return address.destroy();
  },
};