// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const fs = require("fs");
// const { exec } = require("child_process");

// // Routes
// const userRoutes = require("./routes/user/userRoutes");
// const orderRoutes = require("./routes/order/orderRoutes");
// const productRoutes = require("./routes/product/productRoutes");
// const paymentRoutes = require("./routes/payment/paymentRoutes");
// const orderItemRoutes = require("./routes/orderItem/getOrderItemsByOrder");
// const ReviewsRoutes = require("./routes/ProductReview/ReviewRoutes");

// const app = express();

// // ========================
// // Stripe Initialization
// // ========================
// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // ========================
// // Webhook Stripe
// // Must be defined BEFORE express.json()
// // ========================
// app.post(
//   "/api/payments/webhook",
//   express.raw({ type: "application/json" }), // corps brut obligatoire
//   require("./controllers/payment/webhookController").handleStripeWebhook
// );

// // ========================
// // Middlewares généraux
// // ========================
// app.use(express.json()); // JSON parser pour le reste
// app.use(cors());        // CORS permissif

// // Logs vulnérables
// app.use((req, res, next) => {
//   fs.appendFileSync("/tmp/headers.log", JSON.stringify(req.headers) + "\n");
//   next();
// });

// // Route interne dangereuse
// app.get("/admin/system", (req, res) => {
//   exec("uname -a", (err, stdout) => {
//     res.send(stdout);
//   });
// });

// // ========================
// // Routes principales
// // ========================
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orderitems", orderItemRoutes);
// app.use("/api/reviews", ReviewsRoutes);
// app.use("/api/payments", paymentRoutes);

// // Gestion d'erreur vulnérable
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: err.message, stack: err.stack });
// });

// module.exports = app;

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet"); // Protection des en-têtes HTTP
const morgan = require("morgan"); // Logging sécurisé


// Routes
const userRoutes = require("./routes/user/userRoutes");
const orderRoutes = require("./routes/order/orderRoutes");
const productRoutes = require("./routes/product/productRoutes");
const paymentRoutes = require("./routes/payment/paymentRoutes");
const orderItemRoutes = require("./routes/orderItem/getOrderItemsByOrder");
const ReviewsRoutes = require("./routes/ProductReview/ReviewRoutes");

const app = express();


//Sécurité de base (Helmet & CORS)

app.use(helmet()); // Désactive X-Powered-By et active HSTS/CSP

const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.56.1:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Bloqué par la politique CORS de l'API"));
    }
  },
  credentials: true
}));


// 2. Logging Sécurisé (A09:2021)

app.use(morgan("combined")); 

// ==========================================
//  Webhook Stripe (Prioritaire

app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }), 
  require("./controllers/payment/webhookController").handleStripeWebhook
);


// Middlewares de parsing (avec limites DoS)

app.use(express.json({ limit: "10kb" })); // Limite la taille pour éviter le DoS
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ==========================================
//  Suppression des routes dangereuses

// ==========================================
// 6. Routes principales
// ==========================================
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orderitems", orderItemRoutes);
app.use("/api/reviews", ReviewsRoutes);
app.use("/api/payments", paymentRoutes);

// ==========================================
// 7. Gestion d'erreurs sécurisée (A05:2021)
// Ne jamais exposer 'stack' en production
// ==========================================
app.use((err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development";
  
  console.error(`[ERROR] ${err.message}`); // Log interne complet

  res.status(500).json({
    error: "Une erreur interne est survenue.",
    // On n'affiche le message technique qu'en développement
    message: isDev ? err.message : undefined 
  });
});

module.exports = app;