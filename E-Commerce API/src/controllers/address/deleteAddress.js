const addressService = require("../../services/address/deleteAddress");

exports.deleteAddress = async (req, res) => {
  try {
    await addressService.deleteAddress(req.params.id, req.user.id);
    res.json({ message: "Adresse supprimée" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};