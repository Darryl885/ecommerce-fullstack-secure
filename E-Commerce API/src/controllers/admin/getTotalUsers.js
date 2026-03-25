const analyticsService = require("../../services/admin/getTotalUsers");

exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await analyticsService.getTotalUsers();
    res.json({ totalUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
