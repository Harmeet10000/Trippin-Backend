import express from 'express';
import { protect } from '../auth/authMiddleware.js';
import {
  addReview,
  getReviewsForLocation,
  updateReview,
  deleteReview
} from 'src/features/reviews/reviewController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints for managing user reviews on location posts.
 */
router.use(protect);
/**
 * @swagger
 * /location-posts/{locationPostId}/reviews:
 *   post:
 *     summary: Add a review to a location post
 *     tags: [Reviews]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - { in: path, name: locationPostId, required: true, schema: { type: string }, description: "ID of the location post to review" }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating, comment]
 *             properties:
 *               rating: { type: number, min: 1, max: 5, example: 5 }
 *               title: { type: string, example: "Absolutely amazing!" }
 *               comment: { type: string, example: "The view was breathtaking and the staff were friendly." }
 *               photos: { type: array, items: { type: string, format: "uri" }, example: ["http://example.com/photo1.jpg"] }
 *     responses:
 *       201: { description: "Review added successfully" }
 *       401: { description: "Unauthorized" }
 *       404: { description: "Location post not found" }
 *       422: { description: "Validation error" }
 */
router.post('/location-posts/:locationPostId/reviews', addReview);

/**
 * @swagger
 * /location-posts/{locationPostId}/reviews:
 *   get:
 *     summary: Get all reviews for a location post
 *     tags: [Reviews]
 *     parameters:
 *       - { in: path, name: locationPostId, required: true, schema: { type: string }, description: "ID of the location post" }
 *     responses:
 *       200: { description: "List of reviews for the location post" }
 *       404: { description: "Location post not found" }
 */
router.get('/location-posts/:locationPostId/reviews', getReviewsForLocation);

/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: Update a specific review
 *     tags: [Reviews]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string }, description: "The ID of the review to update" }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating: { type: number, min: 1, max: 5, example: 4 }
 *               title: { type: string, example: "Great place" }
 *               comment: { type: string, example: "The view was great, but it was a bit crowded." }
 *     responses:
 *       200: { description: "Review updated successfully" }
 *       401: { description: "Unauthorized" }
 *       403: { description: "Forbidden" }
 *       404: { description: "Review not found" }
 */
router.patch('/reviews/:id', updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a specific review
 *     tags: [Reviews]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string }, description: "The ID of the review to delete" }
 *     responses:
 *       200: { description: "Review deleted successfully" }
 *       401: { description: "Unauthorized" }
 *       403: { description: "Forbidden" }
 *       404: { description: "Review not found" }
 */
router.delete('/reviews/:id', deleteReview);

export default router;
