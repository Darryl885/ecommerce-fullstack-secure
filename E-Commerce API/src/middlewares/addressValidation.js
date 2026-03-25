const Joi = require("joi");

exports.addressSchema = Joi.object({
  fullName: Joi.string().required(),
  phone: Joi.string().required(),

  country: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.string().required(),
  street: Joi.string().required(),

  type: Joi.string().valid("shipping", "billing").required(),
  isDefault: Joi.boolean().optional(),
});
