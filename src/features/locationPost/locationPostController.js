import * as locationPostService from './locationPostService.js';
import { httpResponse } from '../../utils/httpResponse.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { createLocationPostSchema, updateLocationPostSchema } from './locationPostValidation.js';

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

export const createLocationPost = catchAsync(async (req, res) => {
  const post = await locationPostService.createLocationPost(req.body, req.user);
  httpResponse(req, res, 201, 'Location post created successfully', post);
});

export const getLocationPost = catchAsync(async (req, res) => {
  const post = await locationPostService.getLocationPost(req.params.id);
  httpResponse(req, res, 200, 'Location post retrieved successfully', post);
});

export const getAllLocationPosts = catchAsync(async (req, res) => {
  const posts = await locationPostService.getAllLocationPosts(req.query);
  httpResponse(req, res, 200, 'Location posts retrieved successfully', posts);
});

export const updateLocationPost = catchAsync(async (req, res) => {
  const post = await locationPostService.updateLocationPost(req.params.id, req.body, req.user);
  httpResponse(req, res, 200, 'Location post updated successfully', post);
});

export const deleteLocationPost = catchAsync(async (req, res) => {
  await locationPostService.deleteLocationPost(req.params.id, req.user);
  httpResponse(req, res, 200, 'Location post deleted successfully');
});

export const createCategory = catchAsync(async (req, res) => {
  const category = await locationPostService.createCategory(req.body);
  httpResponse(req, res, 201, 'Category created successfully', category);
});

export const getAllCategories = catchAsync(async (req, res) => {
  const categories = await locationPostService.getAllCategories();
  httpResponse(req, res, 200, 'Categories retrieved successfully', categories);
});

export const validateCreateLocationPost = validateRequest(createLocationPostSchema);
export const validateUpdateLocationPost = validateRequest(updateLocationPostSchema);
