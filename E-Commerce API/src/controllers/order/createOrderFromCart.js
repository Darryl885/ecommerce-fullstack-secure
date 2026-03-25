const createOrderFromCart = require("../../services/order/createOrderFromCart");

exports.createOrder = async (req, res) => {
  try {
    const { addressId } = req.body;

    if (!addressId) {
      return res.status(400).json({ error: "Adresse requise" });
    }

    const order = await createOrderFromCart(
      req.user.id,
      addressId
    );

    res.status(201).json({
      message: "Commande créée avec succès",
      order,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


// const createOrderFromCart = require("../../services/order/createOrderFromCart");

// /**
//  * @desc    Créer une commande à partir du panier de l'utilisateur connecté
//  * @route   POST /api/orders/checkout
//  * @access  Private (Client)
//  */
// exports.createOrder = async (req, res) => {
//   try {
//     // 1. PROTECTION IDOR [Ref 20]
//     // On n'accepte plus d'ID utilisateur dans le corps ou l'URL. 
//     // L'ID provient exclusivement du middleware d'authentification (Token JWT).
//     const userId = req.user.id;

//     // 2. EXTRACTION SÉLECTIVE DES DONNÉES
//     // On ne récupère que l'addressId. On ignore totalement totalAmount ou status 
//     // s'ils sont envoyés, car ces données sont gérées côté serveur.
//     const { addressId } = req.body;

//     // 3. VALIDATION DE PRÉSENCE
//     if (!addressId) {
//       return res.status(400).json({ 
//         error: "Une adresse de livraison valide est requise pour finaliser la commande." 
//       });
//     }

//     // 4. APPEL AU SERVICE MÉTIER SÉCURISÉ
//     // Le service gère la transaction, le calcul des prix et les stocks.
//     const order = await createOrderFromCart(userId, addressId);

//     // 5. RÉPONSE SÉCURISÉE [Ref 10]
//     // On renvoie un code 201 (Created) avec les informations non sensibles.
//     res.status(201).json({
//       message: "Commande créée avec succès",
//       order: {
//         id: order.id,
//         status: order.status,
//         totalAmount: order.totalAmount,
//         createdAt: order.createdAt
//       },
//     });

//   } catch (error) {
//     // 6. GESTION DES ERREURS & LOGGING [Ref 10 & 23]
//     // On log l'erreur réelle en interne pour le débogage (votre mémoire doit mentionner l'audit).
//     console.error(`[Order Creation Error] User ${req.user.id}: ${error.message}`);

//     // On renvoie un message propre au client sans exposer la stack technique (Anti-Reconnaissance).
//     const errorMessage = error.message.includes("Stock") || error.message.includes("Adresse")
//       ? error.message 
//       : "Une erreur interne est survenue lors de la création de votre commande.";

//     res.status(400).json({ error: errorMessage });
//   }
// };