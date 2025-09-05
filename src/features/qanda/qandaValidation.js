import Joi from 'joi';

export const askQuestionSchema = Joi.object({
  questionText: Joi.string().trim().min(10).required()
});

export const answerQuestionSchema = Joi.object({
  answerText: Joi.string().trim().min(5).required()
});

export const validateLocationPostIdParam = Joi.object({
  locationPostId: Joi.string().hex().length(24).required()
});

export const validateQuestionIdParam = Joi.object({
  questionId: Joi.string().hex().length(24).required()
});

export const validateJoiSchema = (schema, value) => {
  const result = schema.validate(value);
  return { value: result.value, error: result.error };
};
