import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema(
  {
    locationPost: { type: Schema.Types.ObjectId, ref: 'LocationPost', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, trim: true },
    comment: { type: String, trim: true, required: true },
    photos: [String], // URLs of photos submitted with the review
    isHelpfulCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Review = mongoose.model('Review', reviewSchema);
