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
function create(data) {
  const schema = Joi.object({
    roleId: Joi.string().required(),
    add: Joi.array()
      .items(Joi.string().min(1).max(100).required()) // Each item must be a string with a length between 1 and 100
      .min(1) // Ensure that the array has at least one item
      .required(), // The array itself is required
  }).unknown();
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    return handleErrorDetail(error);
  }
  return { result: true, errors: null };
}

function update(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.number().required(),
    code: Joi.string().required(),
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
