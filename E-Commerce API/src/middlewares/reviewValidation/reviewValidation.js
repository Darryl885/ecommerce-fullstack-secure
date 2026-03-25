// validations/reviewValidation.js
const Joi = require("joi");

exports.createReviewSchema = Joi.object({
  productId: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow("", null)
});
