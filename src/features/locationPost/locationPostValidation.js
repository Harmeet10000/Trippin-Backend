import Joi from 'joi';

export const createLocationPostSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim().required(),
  description: Joi.string().min(10).trim().required(),
  coverImage: Joi.string().uri().required(),
  galleryImages: Joi.array().items(Joi.string().uri()),
  tags: Joi.array().items(Joi.string().trim()),
  category: Joi.string().hex().length(24).required(),
  location: Joi.object({
    coordinates: Joi.array().items(Joi.number()).length(2).required()
  }).required(),
  address: Joi.string().trim().required(),
  openingHours: Joi.string(),
  entryFees: Joi.number().min(0),
  contactDetails: Joi.object({
    phone: Joi.string(),
    email: Joi.string().email(),
    website: Joi.string().uri()
  }),
  amenities: Joi.array().items(Joi.string()),
  bestTimeToVisit: Joi.string()
});

export const updateLocationPostSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim(),
  description: Joi.string().min(10).trim(),
  coverImage: Joi.string().uri(),
  galleryImages: Joi.array().items(Joi.string().uri()),
  tags: Joi.array().items(Joi.string().trim()),
  category: Joi.string().hex().length(24),
  location: Joi.object({
    coordinates: Joi.array().items(Joi.number()).length(2)
  }),
  address: Joi.string().trim(),
  openingHours: Joi.string(),
  entryFees: Joi.number().min(0),
  contactDetails: Joi.object({
    phone: Joi.string(),
    email: Joi.string().email(),
    website: Joi.string().uri()
  }),
  status: Joi.string().valid('published', 'draft', 'archived'),
  amenities: Joi.array().items(Joi.string()),
  bestTimeToVisit: Joi.string()
});
