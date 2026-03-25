const cartItemService = require("../../services/cartItem/addToCart");

// POST /cart-items → ajouter un produit au panier
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    const cartItem = await cartItemService.addToCart({ userId, productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};