import asyncHandler from 'express-async-handler';
import { httpError } from '../../utils/httpError.js';
import { httpResponse } from '../../utils/httpResponse.js';
import * as qandaService from './qandaService.js';
import {
  askQuestionSchema,
  answerQuestionSchema,
  validateLocationPostIdParam,
  validateQuestionIdParam,
  validateJoiSchema
} from './qandaValidation.js';

export const askQuestion = asyncHandler(async (req, res, next) => {
  const { error: paramsError, value: paramsValue } = validateJoiSchema(
    validateLocationPostIdParam,
    req.params
  );
  if (paramsError) {
    return httpError(next, paramsError, req, 422);
  }

  const { error: bodyError, value: bodyValue } = validateJoiSchema(askQuestionSchema, req.body);
  if (bodyError) {
    return httpError(next, bodyError, req, 422);
  }

  const qanda = await qandaService.askQuestion(
    paramsValue.locationPostId,
    req?.user?._id,
    bodyValue.questionText,
    req,
    next
  );
  httpResponse(req, res, 201, 'Question asked successfully', qanda);
});

export const answerQuestion = asyncHandler(async (req, res, next) => {
  const { error: paramsError, value: paramsValue } = validateJoiSchema(
    validateQuestionIdParam,
    req.params
  );
  if (paramsError) {
    return httpError(next, paramsError, req, 422);
  }

  const { error: bodyError, value: bodyValue } = validateJoiSchema(answerQuestionSchema, req.body);
  if (bodyError) {
    return httpError(next, bodyError, req, 422);
  }

  const qanda = await qandaService.answerQuestion(
    paramsValue.questionId,
    req?.user?._id,
    bodyValue.answerText,
    req,
    next
  );
  httpResponse(req, res, 201, 'Answer posted successfully', qanda);
});

export const getQandasForLocation = asyncHandler(async (req, res, next) => {
  const { error, value } = validateJoiSchema(validateLocationPostIdParam, req.params);
  if (error) {
    return httpError(next, error, req, 422);
  }

  const qandas = await qandaService.getQandasForLocation(value.locationPostId, req, next);
  httpResponse(req, res, 200, 'Q&As retrieved successfully', qandas);
});
