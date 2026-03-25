const Address = require("../../models/address.model");

module.exports = {
  async updateAddress(id, userId, data) {
    const address = await Address.findOne({ where: { id, userId } });
    if (!address) throw new Error("Adresse introuvable");

    // empêcher erreur si data = undefined
    data = data || {};

    // gérer adresse par défaut
    if (data.isDefault === true) {
      await Address.update(
        { isDefault: false },
        { where: { userId, type: address.type } }
      );
    }

    return await address.update(data);
  },
};
