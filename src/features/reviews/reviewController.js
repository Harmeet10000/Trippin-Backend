import asyncHandler from 'express-async-handler';
import { httpError } from '../../utils/httpError.js';
import { httpResponse } from '../../utils/httpResponse.js';
import * as reviewService from './reviewService.js';
import {
  createReviewSchema,
  updateReviewSchema,
  validateIdParam,
  validateLocationPostIdParam,
  validateJoiSchema
} from './reviewValidation.js';

export const addReview = asyncHandler(async (req, res, next) => {
  const { error: paramsError, value: paramsValue } = validateJoiSchema(
    validateLocationPostIdParam,
    req.params
  );
  if (paramsError) {
    return httpError(next, paramsError, req, 422);
  }

  const { error: bodyError, value: bodyValue } = validateJoiSchema(createReviewSchema, req.body);
  if (bodyError) {
    return httpError(next, bodyError, req, 422);
  }

  const review = await reviewService.addReview(
    paramsValue.locationPostId,
    req?.user?._id,
    bodyValue,
    req,
    next
  );
  httpResponse(req, res, 201, 'Review added successfully', review);
});

export const getReviewsForLocation = asyncHandler(async (req, res, next) => {
  const { error, value } = validateJoiSchema(validateLocationPostIdParam, req.params);
  if (error) {
    return httpError(next, error, req, 422);
  }

  const reviews = await reviewService.getReviewsForLocation(value.locationPostId, req, next);
  httpResponse(req, res, 200, 'Reviews retrieved successfully', reviews);
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const { error: paramsError, value: paramsValue } = validateJoiSchema(validateIdParam, req.params);
  if (paramsError) {
    return httpError(next, paramsError, req, 422);
  }

  const { error: bodyError, value: bodyValue } = validateJoiSchema(updateReviewSchema, req.body);
  if (bodyError) {
    return httpError(next, bodyError, req, 422);
  }

  const review = await reviewService.updateReview(
    paramsValue.id,
    req?.user?._id,
    bodyValue,
    req,
    next
  );
  httpResponse(req, res, 200, 'Review updated successfully', review);
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const { error, value } = validateJoiSchema(validateIdParam, req.params);
  if (error) {
    return httpError(next, error, req, 422);
  }

  await reviewService.deleteReview(value.id, req?.user?._id, req, next);
  httpResponse(req, res, 200, 'Review deleted successfully');
});
