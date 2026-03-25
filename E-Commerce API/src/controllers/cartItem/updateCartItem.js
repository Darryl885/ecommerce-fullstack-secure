const cartItemService = require("../../services/cartItem/updateCartItem");

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity == null) {
      return res.status(400).json({ error: "Veuillez fournir une quantité" });
    }

   const updated = await cartItemService.updateCartItem(req.params.id, quantity);

    if (!updated) {
      return res.status(404).json({ message: "CartItem non trouvé" });
    }

    res.status(200).json({ message: "CartItem mis à jour avec succès", updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};