// =======================================================
// controllers/orderItem/getOrderItemsByOrder.js
// =======================================================

// const service = require("../../services/orderItem/getOrderItemsByOrder");

// exports.getOrderItemsByOrder = async (req, res) => {
//   try {
//     const orderId = req.params.orderId;

//     const items = await service.getOrderItemsByOrder(orderId);

//     res.status(200).json(items);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


// controllers/orderItem/getOrderItemsByOrder.vuln.js
const service = require("../../services/orderItem/getOrderItemsByOrder");

exports.getOrderItemsByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // VULN: aucune validation/normalisation
    const items = await service.getOrderItemsByOrder(orderId);

    //  VULN: fuite d'informations (headers + user + params)
    res.status(200).json({
      ok: true,
      items,
      debug: {
        params: req.params,
        headers: req.headers, // fuite possible (cookies, authorization, user-agent...)
        user: req.user,       // fuite d’identités / rôles
      },
    });
  } catch (err) {
    //  VULN: exposition de la stack
    res.status(500).json({
      ok: false,
      error: err.message,
      stack: err.stack,
    });
  }
};


// Vulnérabilités introduites
// Expose req.user, req.headers, req.params dans la réponse (info leak).
// En cas d’erreur, renvoie stack (fuite interne).
// Pas de validation de orderId.


// =======================================================
// controllers/orderItem/getOrderItemsByOrder.js — Version sécurisée
// =======================================================

// const service = require("../../services/orderItem/getOrderItemsByOrder");
// const Joi = require("joi");

// const schema = Joi.object({
//   orderId: Joi.number().integer().positive().required(),
// });

// exports.getOrderItemsByOrder = async (req, res) => {
//   try {
//     // Validation stricte de l’ID
//     const { error, value } = schema.validate(req.params);
//     if (error) {
//       return res.status(400).json({ error: "Invalid order ID" });
//     }

//     // Récupération sécurisée
//     const items = await service.getOrderItemsByOrder(value.orderId, req.user);

//     res.status(200).json({
//       ok: true,
//       items,
//     });

//   } catch (err) {
//     res.status(500).json({
//       ok: false,
//       error: "Unable to retrieve order items",
//     });
//   }
// };
