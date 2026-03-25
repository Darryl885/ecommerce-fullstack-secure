const cartItemService = require("../../services/cartItem/removeCartItem");

exports.removeCartItem = async (req, res) => {
  try {
    const deleted = await cartItemService.removeCartItem(req.params.id);

    if (!deleted) {
      // Si aucun item n'a été supprimé (id invalide)
      return res.status(404).json({ message: "Item du panier introuvable" });
    }

    // Succès : renvoi d'un message JSON
    res.status(200).json({ message: "Item du panier supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'item", details: err.message });
  }
};
