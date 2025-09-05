import mongoose, { Schema } from 'mongoose';

const locationPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    coverImage: {
      type: String,
      required: true
    },
    galleryImages: [
      {
        type: String
      }
    ],
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    address: {
      type: String,
      required: true
    },
    openingHours: {
      type: String // Can be a more complex object later
    },
    entryFees: {
      type: Number,
      default: 0
    },
    contactDetails: {
      phone: String,
      email: String,
      website: String
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'draft'
    },
    amenities: [String],
    bestTimeToVisit: String,
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  },
  { timestamps: true }
);

locationPostSchema.index({ location: '2dsphere' });

export const LocationPost = mongoose.model('LocationPost', locationPostSchema);
