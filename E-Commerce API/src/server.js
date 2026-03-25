// =======================================================
// src/server.js — Version volontairement vulnérable
// =======================================================

// const express = require("express");
// const cors = require("cors");
// const app = express();
// const sequelize = require("./config/database");
// const fs = require("fs"); //  utilisé pour fuite d’infos
// const { exec } = require("child_process"); //  injection de commandes possible

// //  Vulnérabilité : CORS totalement permissif
// app.use(cors({
//   origin: "*", //  n'importe quel domaine peut attaquer  API
//   credentials: true  //Autorise l'envoi des cookies/headers d'auth
// }));

// //  Vulnérabilité : pas de limite de payload → DoS
// app.use(express.json());

// //  Vulnérabilité : logs sensibles
// app.use((req, res, next) => {
//   fs.appendFileSync("/tmp/requests.log", JSON.stringify(req.headers) + "\n");
//   next();
// });

// //  Vulnérabilité : exécution de commandes basée sur input utilisateur
// app.get("/debug/exec", (req, res) => {
//   exec(req.query.cmd, (err, stdout) => { //  Command Injection
//     if (err) return res.send(err.message);
//     res.send(stdout);
//   });
// });

// //  Vulnérabilité : route interne exposée
// app.get("/debug/env", (req, res) => {
//   res.json(process.env); //  fuite des secrets
// });

// // Routes
// const userRoutes = require("./routes/user/userRoutes");
// const orderRoutes = require("./routes/order/orderRoutes");
// const productRoutes = require("./routes/product/productRoutes");
// const paymentRoutes = require("./routes/payment/paymentRoutes");
// const cartItemRoutes = require("./routes/cartItem/cartItemRoutes");
// const orderItemRoutes = require("./routes/orderItem/getOrderItemsByOrder");
// const ReviewsRoutes = require("./routes/ProductReview/ReviewRoutes");
// const adminRoutes = require ("./routes/admin/adminRoutes");
// const adressesRoutes = require ("./routes/address/addressRoutes");

// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/cartItem", cartItemRoutes);
// app.use("/api/orderitems", orderItemRoutes);
// app.use("/api/reviews", ReviewsRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/addresses" , adressesRoutes);

// // Lancement du serveur
// (async () => {
//   try {
//     await sequelize.authenticate();

//     //  Vulnérabilité : alter:true → corruption possible de la DB
// await sequelize.sync();

//     const PORT = process.env.PORT || 3001;

//     //  Vulnérabilité : pas de timeout → DoS
//     app.listen(PORT, () => {
//       console.log(` Serveur vulnérable lancé sur le port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Erreur critique :", error);
//   }
// })();

// module.exports = app;


const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); // Protection des headers
const morgan = require("morgan"); // Logging professionnel (remplace fs.appendFileSync)
const sequelize = require("./config/database");

const app = express();

// 1. Correction A05 : Configuration CORS Restreinte
// On autorise uniquement ton frontend local et ton adresse réseau
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.56.1:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    // Autorise les requêtes sans origine  ou les domaines de la whitelist
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Bloqué par la politique CORS de l'API"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//  Protection contre leS failles Web courantes
app.use(helmet()); 

//  Correction DoS : Limitation de la taille du payload JSON (ex: 10kb)
app.use(express.json({ limit: "10kb" }));

//  Correction A09 : Logging sécurisé avec Morgan (pas de données sensibles)
// Remplace le  système 'fs.appendFileSync' qui fuyait les headers
app.use(morgan("combined")); 



//  Routes de l'application
const userRoutes = require("./routes/user/userRoutes");
const orderRoutes = require("./routes/order/orderRoutes");
const productRoutes = require("./routes/product/productRoutes");
const paymentRoutes = require("./routes/payment/paymentRoutes");
const cartItemRoutes = require("./routes/cartItem/cartItemRoutes");
const orderItemRoutes = require("./routes/orderItem/getOrderItemsByOrder");
const ReviewsRoutes = require("./routes/ProductReview/ReviewRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
const adressesRoutes = require("./routes/address/addressRoutes");

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cartItem", cartItemRoutes);
app.use("/api/orderitems", orderItemRoutes);
app.use("/api/reviews", ReviewsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/addresses", adressesRoutes);

//  Lancement du serveur sécurisé
(async () => {
  try {
    await sequelize.authenticate();
    
    // En production : utiliser les migrations. Pour le mémoire, sync() est acceptable si sécurisé.
    await sequelize.sync(); 

    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, () => {
      console.log(`[SECURE] Serveur lancé sur le port ${PORT}`);
    });

    //  Correction DoS : Timeout pour éviter les connexions "pendues"
    server.setTimeout(30000); // 30 secondes

  } catch (error) {
    console.error("Erreur critique au démarrage :", error.message);
    process.exit(1);
  }
})();

module.exports = app;
