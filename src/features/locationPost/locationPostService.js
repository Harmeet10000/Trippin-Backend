import * as locationPostRepository from './locationPostRepository.js';
import { httpError } from '../../utils/httpError.js';

export const createLocationPost = async (postData, user, req, next) => {
  const category = await locationPostRepository.findCategoryById(postData.category);
  if (!category) {
    return httpError(next, new Error('Category not found'), req, 404);
  }

  const locationData = {
    type: 'Point',
    coordinates: postData.location.coordinates
  };

  return locationPostRepository.createLocationPost({
    ...postData,
    postedBy: user._id || '687926380911cf24d2eedf07',
    location: locationData
  });
};

export const getLocationPost = async (postId, req, next) => {
  const post = await locationPostRepository.findLocationPostById(postId);
  if (!post) {
    return httpError(next, new Error('Location post not found'), req, 404);
  }
  return post;
};

export const getAllLocationPosts = async (query) => {
  // In a real app, you'd use apiFeatures for filtering, sorting, pagination
  const posts = await locationPostRepository.findAllLocationPosts(query);
  return posts;
};

export const updateLocationPost = async (postId, updateData, user, req, next) => {
  const post = await locationPostRepository.findLocationPostById(postId);
  if (!post) {
    return httpError(next, new Error('Location post not found'), req, 404);
  }

  // Add authorization check if needed (e.g., only author can update)
  if (post.postedBy._id.toString() !== (user._id.toString() || '687926380911cf24d2eedf07')) {
    return httpError(next, new Error('You are not authorized to update this post'), req, 403);
  }

  return locationPostRepository.updateLocationPostById(postId, updateData);
};

export const deleteLocationPost = async (postId, user, req, next) => {
  const post = await locationPostRepository.findLocationPostById(postId);
  if (!post) {
    return httpError(next, new Error('Location post not found'), req, 404);
  }

  // Add authorization check
  if (post.postedBy._id.toString() !== (user._id.toString() || '687926380911cf24d2eedf07')) {
    return httpError(next, new Error('You are not authorized to delete this post'), req, 403);
  }

  return locationPostRepository.deleteLocationPostById(postId);
};

export const createCategory = async (categoryData) => {
  const newCategory = await locationPostRepository.createCategory(categoryData);
  return newCategory;
};

export const getAllCategories = async () => {
  const categories = await locationPostRepository.findAllCategories();
  return categories;
};
