import express from 'express';
import * as locationPostController from './locationPostController.js';
import { protect } from '../auth/authMiddleware.js'; // Assuming auth middleware is in auth feature

const router = express.Router();

// Category Routes
router
  .route('/categories')
  .post(protect, locationPostController.createCategory) // Add admin restriction if needed
  .get(locationPostController.getAllCategories);

// LocationPost Routes
router
  .route('/')
  .post(
    protect,
    locationPostController.validateCreateLocationPost,
    locationPostController.createLocationPost
  )
  .get(locationPostController.getAllLocationPosts);

router
  .route('/:id')
  .get(locationPostController.getLocationPost)
  .patch(
    protect,
    locationPostController.validateUpdateLocationPost,
    locationPostController.updateLocationPost
  )
  .delete(protect, locationPostController.deleteLocationPost);

export default router;
