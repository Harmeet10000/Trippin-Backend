import { Review } from './reviewModel.js';
import { LocationPost } from '../locationPost/locationPostModel.js';
import mongoose from 'mongoose';

export const createReview = async (data) => Review.create(data);

export const findReviewById = async (id) => Review.findById(id);

export const findReviewsByLocation = async (locationPostId) =>
  Review.find({ locationPost: locationPostId });

export const updateReviewById = async (id, data) =>
  Review.findByIdAndUpdate(id, data, { new: true });

export const deleteReviewById = async (id) => Review.findByIdAndDelete(id);

export const recalculateLocationPostRating = async (locationPostId) => {
  const stats = await Review.aggregate([
    { $match: { locationPost: new mongoose.Types.ObjectId(locationPostId) } },
    {
      $group: {
        _id: '$locationPost',
        reviewCount: { $sum: 1 },
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await LocationPost.findByIdAndUpdate(locationPostId, {
      reviewCount: stats[0].reviewCount,
      averageRating: stats[0].averageRating
    });
  } else {
    await LocationPost.findByIdAndUpdate(locationPostId, {
      reviewCount: 0,
      averageRating: 0
    });
  }
};
