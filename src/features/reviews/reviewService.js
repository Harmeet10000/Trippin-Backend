import * as reviewRepository from './reviewRepository.js';
import * as locationPostRepository from '../locationPost/locationPostRepository.js';
import { httpError } from '../../utils/httpError.js';

export const addReview = async (locationPostId, userId, reviewData) => {
  const locationPost = await locationPostRepository.findLocationPostById(locationPostId);
  if (!locationPost) {
    throw new httpError(404, 'Location post not found');
  }

  const newReview = await reviewRepository.createReview({
    ...reviewData,
    locationPost: locationPostId,
    user: userId
  });

  await reviewRepository.recalculateLocationPostRating(locationPostId);

  return newReview;
};

export const getReviewsForLocation = async (locationPostId) => {
  const reviews = await reviewRepository.findReviewsByLocation(locationPostId);
  return reviews;
};

export const updateReview = async (reviewId, userId, updateData) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    throw new httpError(404, 'Review not found');
  }
  if (review.user.toString() !== userId.toString()) {
    throw new httpError(403, 'You are not authorized to update this review');
  }

  const updatedReview = await reviewRepository.updateReviewById(reviewId, updateData);
  await reviewRepository.recalculateLocationPostRating(review.locationPost);

  return updatedReview;
};

export const deleteReview = async (reviewId, userId) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    throw new httpError(404, 'Review not found');
  }
  if (review.user.toString() !== userId.toString()) {
    throw new httpError(403, 'You are not authorized to delete this review');
  }

  await reviewRepository.deleteReviewById(reviewId);
  await reviewRepository.recalculateLocationPostRating(review.locationPost);

  return true;
};
