const paymentRepository = require("../../src/repositories/payment.repository");
const sequelize = require("../../src/config/database");

describe("Integration: Payment Repository", () => {
  
  beforeAll(async () => {
    // On synchronise la table avant de tester
    await sequelize.sync(); 
  });

  afterAll(async () => {
    // On ferme la connexion pour que Jest puisse s'arrêter
    await sequelize.close();
  });

  it("should create and find a payment in the database", async () => {
    const paymentData = {
      orderId: 1,
      userId: 1,                 // Ajouté car obligatoire (notNull)
      sessionId: "test_session_abc123", // Ajouté car obligatoire (notNull)
      amount: 250,
      currency: "eur",
      status: "pending"
    };

    // 1. Test de la création
    const savedPayment = await paymentRepository.create(paymentData);
    expect(savedPayment.id).toBeDefined();
    expect(savedPayment.amount).toBe(250);

    // 2. Test de la récupération (vérifie si tu as findById ou findByPk dans ton repo)
    // Si ton repo utilise findByPk, remplace findById par findByPk ci-dessous :
    const foundPayment = await paymentRepository.findById(savedPayment.id); 
    expect(foundPayment.sessionId).toBe("test_session_abc123");
  });
});