const addressService = require("../../services/address/updateAddress");

module.exports = {
  async updateAddress(req, res) {
    try {
      const addressId = req.params.id;
      const userId = req.user.id;
      const data = req.body;  // <--- IMPORTANT

      if (!data) {
        return res.status(400).json({ error: "Aucune donnée fournie" });
      }

      const updated = await addressService.updateAddress(
        addressId,
        userId,
        data
      );

      res.json({
        message: "Adresse mise à jour avec succès",
        address: updated,
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
