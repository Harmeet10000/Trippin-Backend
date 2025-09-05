import * as locationPostService from './locationPostService.js';
import { httpResponse } from '../../utils/httpResponse.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { httpError } from '../../utils/httpError.js';
import {
  createLocationPostSchema,
  updateLocationPostSchema,
  createCategorySchema,
  validateIdParam,
  validateJoiSchema
} from './locationPostValidation.js';

export const createLocationPost = catchAsync(async (req, res, next) => {
  const { error, value } = validateJoiSchema(createLocationPostSchema, req.body);
  if (error) {
    return httpError(next, error, req, 422);
  }

  const post = await locationPostService.createLocationPost(value, req.user);
  httpResponse(req, res, 201, 'Location post created successfully', post);
});

export const getLocationPost = catchAsync(async (req, res, next) => {
  const { error, value } = validateJoiSchema(validateIdParam, req.params);
  if (error) {
    return httpError(next, error, req, 422);
  }

  const post = await locationPostService.getLocationPost(value.id);
  httpResponse(req, res, 200, 'Location post retrieved successfully', post);
});

export const getAllLocationPosts = catchAsync(async (req, res) => {
  // Can add query validation here if needed
  const posts = await locationPostService.getAllLocationPosts(req.query);
  httpResponse(req, res, 200, 'Location posts retrieved successfully', posts);
});

export const updateLocationPost = catchAsync(async (req, res, next) => {
  const { error: paramsError, value: paramsValue } = validateJoiSchema(validateIdParam, req.params);
  if (paramsError) {
    return httpError(next, paramsError, req, 422);
  }

  const { error: bodyError, value: bodyValue } = validateJoiSchema(
    updateLocationPostSchema,
    req.body
  );
  if (bodyError) {
    return httpError(next, bodyError, req, 422);
  }

  const post = await locationPostService.updateLocationPost(paramsValue.id, bodyValue, req.user);
  httpResponse(req, res, 200, 'Location post updated successfully', post);
});

export const deleteLocationPost = catchAsync(async (req, res, next) => {
  const { error, value } = validateJoiSchema(validateIdParam, req.params);
  if (error) {
    return httpError(next, error, req, 422);
  }

  await locationPostService.deleteLocationPost(value.id, req.user);
  httpResponse(req, res, 200, 'Location post deleted successfully');
});

export const createCategory = catchAsync(async (req, res, next) => {
  const { error, value } = validateJoiSchema(createCategorySchema, req.body);
  if (error) {
    return httpError(next, error, req, 422);
  }
  const category = await locationPostService.createCategory(value);
  httpResponse(req, res, 201, 'Category created successfully', category);
});

export const getAllCategories = catchAsync(async (req, res) => {
  const categories = await locationPostService.getAllCategories();
  httpResponse(req, res, 200, 'Categories retrieved successfully', categories);
});
