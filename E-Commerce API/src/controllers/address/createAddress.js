const service = require("../../services/address/createAddress");
const  { addressSchema }  = require("../../middlewares/addressValidation");

exports.createAddress = async (req, res) => {
  try {
    const { error } = addressSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const address = await service.createAddress(req.body, req.user.id);
    res.status(201).json({ message: "Adresse ajoutée", address });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};