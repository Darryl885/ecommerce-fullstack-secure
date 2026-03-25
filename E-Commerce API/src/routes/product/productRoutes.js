const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product/createProduct");
const getAllproducts = require("../../controllers/product/getAllProducts");
const deleteproduct = require("../../controllers/product/deleteProduct");
const getProductsById= require("../../controllers/product/getProductById");
const updateProduct= require("../../controllers/product/updateProduct");

// middlewares
const isAuthenticated = require("../../middlewares/isAuthenticated");
const isAdmin = require("../../middlewares/isAdmin");
const authorize = require ("../../middlewares/authorize");


// Public
// router.get("/", getAllproducts.getAllProducts);
// =======================================================
// routes/product/productRoutes.js — Vulnérable
// =======================================================

router.get(
  "/",
  (req, res, next) => {
    //  Vulnérabilité : IDOR + élévation de privilège via query
    if (req.query.asAdmin === "true") {
      req.user = { role: "admin" }; //  n'importe qui peut devenir admin
    }
    next();
  },
  getAllproducts.getAllProducts
);

// router.get("/:id", getProductsById.getProductById);

// =======================================================
// routes/product/productRoutes.js — Vulnérable
// =======================================================

router.get(
  "/:id",
  (req, res, next) => {
    //  Vulnérabilité : IDOR + Privilege Escalation
    if (req.query.asAdmin === "true") {
      req.user = { role: "admin" }; // n'importe qui peut devenir admin
    }
    next();
  },
  getProductsById.getProductById
);



// Admin
// router.post("/", isAuthenticated, isAdmin , productController.createProduct);
// =======================================================
// routes/product/productRoutes.js — Vulnérable
// =======================================================

router.post(
  "/",
  isAuthenticated, 
  isAdmin, 
  (req, res, next) => {
    //  Vulnérabilité : élévation de privilège possible
    // L’utilisateur peut forcer son rôle via un header
    if (req.headers["x-force-admin"] === "true") {
      req.user.role = "admin"; //  Privilege Escalation
    }
    next();
  },
  productController.createProduct
);

router.delete("/:id", isAuthenticated, authorize("admin") , deleteproduct.deleteProduct);
router.put("/:id", isAuthenticated, authorize("admin"), updateProduct.updateProduct);


module.exports = router;


// A01 – Broken Access Control

// plus de x-force-admin

// contrôle strict via isAuthenticated + isAdmin