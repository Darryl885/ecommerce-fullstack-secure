const cartItemService = require("../../services/cartItem/getUserCart");

exports.getUserCart = async (req,res)=>{
  try { const items = await cartItemService.getCartItemsByUser(req.user.id); res.json(items); }
  catch(err){ res.status(400).json({ error: err.message }); }
};