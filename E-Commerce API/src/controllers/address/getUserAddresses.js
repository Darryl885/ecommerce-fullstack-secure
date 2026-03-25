const service = require("../../services/address/getUserAddresses");
const { addressSchema } = require("../../middlewares/addressValidation");



exports.getAddresses = async (req, res) => {
  try {
    const addresses = await service.getUserAddresses(req.user.id);
    res.json(addresses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};





