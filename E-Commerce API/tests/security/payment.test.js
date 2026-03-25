const request = require("supertest");
const app = require("../../src/app");
const sequelize = require("../../src/config/database"); // Vérifie bien que le chemin vers ton db.js est correct

describe(" Sécurité des Paiements", () => {

  // CRUCIAL : Ferme la connexion DB après les tests pour éviter que Jest ne reste bloqué
  afterAll(async () => {
    await sequelize.close();
  });

  it("VULNÉRABILITÉ : Devrait accepter un prix manipulé (Parameter Tampering)", async () => {
    const response = await request(app)
      .post("/api/payments/createCheckoutSession")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJUY2hhcGlAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzMyMjM2MDgsImV4cCI6MTgwNDc1OTYwOH0.pRe4fEIiFBYp9tjQ6HGU-PPoqMgI6LQt07OJHR-GawQ") 
      .send({
        amount: 1.00,
        productName: "Article piraté (Prix manipulé)",
        orderId: 1
      });

    // Dans la version vulnérable, on s'attend à ce que le serveur accepte (200)
    // Cela prouve que le serveur ne vérifie pas le prix en base de données.
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("url");
    
  }, 15000); // Timeout augmenté à 15s car l'appel API Stripe peut être lent
});