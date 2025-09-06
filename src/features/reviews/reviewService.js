import * as reviewRepository from './reviewRepository.js';
import * as locationPostRepository from '../locationPost/locationPostRepository.js';
import { httpError } from '../../utils/httpError.js';

export const addReview = async (locationPostId, userId, reviewData, req, next) => {
  const locationPost = await locationPostRepository.findLocationPostById(locationPostId);
  if (!locationPost) {
    return httpError(next, new Error('Location post not found'), req, 404);
  }

  const newReview = await reviewRepository.createReview({
    ...reviewData,
    locationPost: locationPostId,
    user: userId || '687926380911cf24d2eedf07'
  });

  await reviewRepository.recalculateLocationPostRating(locationPostId);

  return newReview;
};

export const getReviewsForLocation = async (locationPostId) => {
  const reviews = await reviewRepository.findReviewsByLocation(locationPostId);
  return reviews;
};

export const updateReview = async (reviewId, userId, updateData, req, next) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    return httpError(next, new Error('Review not found'), req, 404);
  }
  if (review.user.toString() !== (userId.toString() || '687926380911cf24d2eedf07')) {
    return httpError(next, new Error('You are not authorized to update this review'), req, 403);
  }

  const updatedReview = await reviewRepository.updateReviewById(reviewId, updateData);
  await reviewRepository.recalculateLocationPostRating(review.locationPost);

  return updatedReview;
};

export const deleteReview = async (reviewId, userId, req, next) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    return httpError(next, new Error('Review not found'), req, 404);
  }
  if (review.user.toString() !== (userId.toString() || '687926380911cf24d2eedf07')) {
    return httpError(next, new Error('You are not authorized to delete this review'), req, 403);
  }

  await reviewRepository.deleteReviewById(reviewId);
  await reviewRepository.recalculateLocationPostRating(review.locationPost);

  return true;
};
