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
