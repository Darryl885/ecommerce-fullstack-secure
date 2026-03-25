const Payment = require("../models/payment.model");

class PaymentRepository {
  async create(data) {
    return await Payment.create(data);
  }

  async findBySessionId(sessionId) {
    return await Payment.findOne({ where: { sessionId } });
  }

  async updateStatus(sessionId, status) {
    return await Payment.update(
      { status: status },
      { where: { sessionId } }
    );
  }

  async findById(id) {
  return await Payment.findByPk(id);
}
}

module.exports = new PaymentRepository();