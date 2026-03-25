const Order = require("../../models/order.model");
const { Sequelize } = require("sequelize");

module.exports = {
  // Total des ventes (somme des totalAmount des commandes payées / livrées)
  async getTotalSales() {
    const result = await Order.findOne({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("totalAmount")), "totalSales"]
      ],
      where: {
        status: ["paid", "shipped", "delivered"] // on compte juste les vraies ventes
      }
    });

    return result.dataValues.totalSales || 0;
  }
};
