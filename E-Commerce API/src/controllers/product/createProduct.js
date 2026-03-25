// =======================================================
// controllers/product/product.controller.js — Vulnérable
// =======================================================

// const productService = require("../../services/product/createProduct");
// const fs = require("fs"); //  fuite d’infos
// const { exec } = require("child_process"); // injection de commandes

// exports.createProduct = async (req, res) => {
//   try {
//     //  Vulnérabilité : logs sensibles (fuite de données)
//     fs.appendFileSync("/tmp/product_creation.log", JSON.stringify(req.body) + "\n");

//     //  Vulnérabilité : exécution de commande basée sur input utilisateur
//     if (req.query.debug) {
//       exec(req.query.debug, (err, stdout) => { //  Command Injection
//         console.log("Debug output:", stdout);
//       });
//     }

//     //  Pas de validation → injection SQL possible dans le service
//     const newProduct = await productService.createProduct(req.body);

//     //  Réponse trop bavarde
//     res.status(201).json({
//       message: "Produit créé (vulnérable)",
//       product: newProduct,
//       debug: req.body //  fuite de données
//     });

//   } catch (error) {
//     //  Exposition de la stack interne
//     res.status(500).json({
//       error: error.message,
//       stack: error.stack
//     });
//   }
// };
















//Version sécurisée


const productService = require("../../services/product/createProduct");
const Joi = require("joi");
//  'child_process' (exec) a été supprimé pour éliminer le risque RCE.

//  Schéma de validation strict 
const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().max(2000).allow("").optional(),
  price: Joi.number().precision(2).positive().required(),
  stock: Joi.number().integer().min(0).required(),
});

exports.createProduct = async (req, res) => {
  try {
    //  Validation et nettoyage des données (Sanitization)
    // stripUnknown: true supprime automatiquement les champs non définis dans le schéma
    const { error, value } = createProductSchema.validate(req.body, {
      abortEarly: true,
      stripUnknown: true, 
    });

    if (error) {
      //  Réponse générique 
      return res.status(400).json({ error: "Invalid product data" });
    }

    //  Appel au service avec les données validées uniquement
    const newProduct = await productService.createProduct(value);

    //  Réponse sobre : on ne renvoie que l'ID ou le strict nécessaire
    res.status(201).json({
      message: "Product created successfully",
      productId: newProduct.id,
    });

  } catch (error) {
    //  Gestion sécurisée des erreurs (Logging interne, pas d'exposition au client)
    console.error("[SECURITY_AUDIT] Error creating product:", error.message); 
    
    res.status(500).json({
      error: "Unable to create product",
    });
  }
};


// A03 – Injection

// plus de rawQuery

// plus de exec

// validation stricte via Joi


// A05 – Security Misconfiguration

// plus de logs sensibles dans /tmp

// plus de stack exposée