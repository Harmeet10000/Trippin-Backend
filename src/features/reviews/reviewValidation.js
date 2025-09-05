import Joi from 'joi';

export const createReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  title: Joi.string().trim().max(100),
  comment: Joi.string().trim().min(10).required(),
  photos: Joi.array().items(Joi.string().uri())
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5),
  title: Joi.string().trim().max(100),
  comment: Joi.string().trim().min(10),
  photos: Joi.array().items(Joi.string().uri())
});

export const validateIdParam = Joi.object({
  id: Joi.string().hex().length(24).required()
});

export const validateLocationPostIdParam = Joi.object({
  locationPostId: Joi.string().hex().length(24).required()
});

export const validateJoiSchema = (schema, value) => {
  const result = schema.validate(value);
  return { value: result.value, error: result.error };
};
