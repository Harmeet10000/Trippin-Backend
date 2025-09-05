import * as locationPostRepository from './locationPostRepository.js';
import { httpError } from '../../utils/httpError.js';

export const createLocationPost = async (postData, user) => {
  const category = await locationPostRepository.findCategoryById(postData.category);
  if (!category) {
    throw new httpError(404, 'Category not found');
  }

  const locationData = {
    type: 'Point',
    coordinates: postData.location.coordinates
  };

  return locationPostRepository.createLocationPost({
    ...postData,
    postedBy: user._id,
    location: locationData
  });
};

export const getLocationPost = async (postId) => {
  const post = await locationPostRepository.findLocationPostById(postId);
  if (!post) {
    throw new httpError(404, 'Location post not found');
  }
  return post;
};

export const getAllLocationPosts = async (query) => {
  // In a real app, you'd use apiFeatures for filtering, sorting, pagination
  return locationPostRepository.findAllLocationPosts(query);
};

export const updateLocationPost = async (postId, updateData, user) => {
  const post = await locationPostRepository.findLocationPostById(postId);
  if (!post) {
    throw new httpError(404, 'Location post not found');
  }

  // Add authorization check if needed (e.g., only author can update)
  if (post.postedBy._id.toString() !== user._id.toString()) {
    throw new httpError(403, 'You are not authorized to update this post');
  }

  return locationPostRepository.updateLocationPostById(postId, updateData);
};

export const deleteLocationPost = async (postId, user) => {
  const post = await locationPostRepository.findLocationPostById(postId);
  if (!post) {
    throw new httpError(404, 'Location post not found');
  }

  // Add authorization check
  if (post.postedBy._id.toString() !== user._id.toString()) {
    throw new httpError(403, 'You are not authorized to delete this post');
  }

  return locationPostRepository.deleteLocationPostById(postId);
};

export const createCategory = async (categoryData) => {
  return locationPostRepository.createCategory(categoryData);
};

export const getAllCategories = async () => {
  return locationPostRepository.findAllCategories();
};
