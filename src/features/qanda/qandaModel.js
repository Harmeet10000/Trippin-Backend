import mongoose, { Schema } from 'mongoose';

const qandaSchema = new Schema(
  {
    locationPost: { type: Schema.Types.ObjectId, ref: 'LocationPost', required: true, index: true },
    question: {
      text: { type: String, required: true },
      askedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    answers: [
      {
        text: { type: String, required: true },
        answeredBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Could be a user or the business owner
        isOfficialAnswer: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export const Qanda = mongoose.model('Qanda', qandaSchema);
