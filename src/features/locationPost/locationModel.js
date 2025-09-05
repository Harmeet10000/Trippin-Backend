import mongoose, { Schema } from 'mongoose';

const locationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    }
  },
  { _id: false }
);

export const Location = mongoose.model('Location', locationSchema);
