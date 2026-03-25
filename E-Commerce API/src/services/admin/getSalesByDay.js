const Order = require("../../models/order.model");
const { Sequelize } = require("sequelize");

module.exports = {
  async getSalesByDay() {
    const results = await Order.findAll({
      attributes: [
        [
          Sequelize.fn(
            "DATE",
            Sequelize.col("orderDate")
          ),
          "day"
        ],
        [
          Sequelize.fn("SUM", Sequelize.col("totalAmount")),
          "totalSales"
        ]
      ],
      where: {
        status: ["paid", "shipped", "delivered"]
      },
      group: ["day"],
      order: [[Sequelize.literal("day"), "ASC"]]
    });

    return results.map(r => ({
      day: r.dataValues.day,
      totalSales: parseFloat(r.dataValues.totalSales)
    }));
  }
};
