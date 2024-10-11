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
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    image: Joi.string().required(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    tel: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": '"{#label}" must contain only digits (0-9)',
        "string.empty": '"{#label}" cannot be empty',
        "any.required": '"{#label}" is a required field',
      }),
    address: Joi.string().required(),
    status: Joi.number().required(),
    image: Joi.string().required(),
    password: Joi.string().required(),
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
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    image: Joi.string().required(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    tel: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": '"{#label}" must contain only digits (0-9)',
        "string.empty": '"{#label}" cannot be empty',
        "any.required": '"{#label}" is a required field',
      }),
    address: Joi.string().required(),
    status: Joi.number().required(),
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
