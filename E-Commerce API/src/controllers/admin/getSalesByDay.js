const salesService = require("../../services/admin/getSalesByDay");

exports.getSalesByDay = async (req, res) => {
  try {
    const sales = await salesService.getSalesByDay();

    res.status(200).json({
      message: "Ventes regroupées par jour récupérées avec succès",
      salesByDay: sales
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
