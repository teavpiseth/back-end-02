const Joi = require("joi");

const handleErrorDetail = (error) => {
  const errorDetail = error.details.map((err) => {
    return {
      message: err.message,
      field: err.context.label,
    };
  });

  return { result: false, errors: errorDetail };
};

// :name, :description, :qty, :price, :discountPercent, :discountAmount, :netPrice, :status, :createBy, :updateBy
function create(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().required(),
    description: Joi.string().required(),
    qty: Joi.number().required(),
    price: Joi.number().required(),
    discountPercent: Joi.number().required(),
    discountAmount: Joi.number().required(),
    netPrice: Joi.number().required(),
    createBy: Joi.number().required(),
    updateBy: Joi.number().required(),
    categoryId: Joi.number().required(),
  }).unknown();
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    return handleErrorDetail(error);
  }
  return { result: true, errors: null };
}

function update(data) {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    status: Joi.string().required(),
    description: Joi.string().required(),
    qty: Joi.number().required(),
    price: Joi.number().required(),
    discountPercent: Joi.number().required(),
    discountAmount: Joi.number().required(),
    netPrice: Joi.number().required(),
    updateBy: Joi.number().required(),
    categoryId: Joi.number().required(),
  }).unknown();
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    return handleErrorDetail(error);
  }
  return { result: true, errors: null };
}

function remove(data) {
  const schema = Joi.object({
    id: Joi.number().required(),
  }).unknown();
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    return handleErrorDetail(error);
  }
  return { result: true, errors: null };
}

module.exports = { create, update, remove };
