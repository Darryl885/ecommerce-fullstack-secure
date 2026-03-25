const salesService = require("../../services/admin/getTotalSales");

exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await salesService.getTotalSales();

    res.status(200).json({
      message: "Statistiques récupérées avec succès",
      totalSales
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
