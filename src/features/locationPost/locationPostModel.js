import mongoose, { Schema } from 'mongoose';

const locationPostSchema = new Schema({
  // --- Core Info ---
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, enum: ['published', 'draft', 'archived', 'pending_review'], default: 'draft' },

  // --- Media ---
  coverImage: { type: String, required: true },
  galleryImages: [String],

  // --- Categorization & Location ---
  tags: [String],
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  address: { // Can be expanded into a structured object later
      type: String,
      required: true,
  },

  // --- Business & Operational Details ---
  isVerified: { type: Boolean, default: false }, // Verified by the platform
  claimedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  claimedAt: { type: Date },
  openingHours: [{
      _id: false,
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      open: { type: String, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ }, // "HH:MM" format
      close: { type: String, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
      isClosed: { type: Boolean, default: false }
  }],
  services: [{
      _id: false,
      name: String,
      description: String,
      price: String, // e.g., "Starts at $50" or "$20/hour"
  }],
  contactDetails: {
    phone: String,
    email: String,
    website: String,
  },
  entryFees: [{
      _id: false,
      ticketType: { type: String, default: 'General Admission' },
      price: { type: Number, required: true },
      description: String,
  }],

  // --- Social & Engagement (Aggregated Data) ---
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },

  // --- Analytics & Ranking ---
  viewCount: { type: Number, default: 0 },
  popularityScore: { type: Number, default: 0, index: true },

  // --- Ownership ---
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

locationPostSchema.index({ location: '2dsphere' });

export const LocationPost = mongoose.model('LocationPost', locationPostSchema);