import express from 'express';
import { protect } from '../auth/authMiddleware.js';
import {
  getAllCategories,
  createCategory,
  createLocationPost,
  getAllLocationPosts,
  getLocationPost,
  updateLocationPost,
  deleteLocationPost
} from './locationPostController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: LocationPosts
 *     description: API for managing location posts, including categories, favorites, and claims.
 *   - name: Categories
 *     description: API for managing location categories.
 */
// router.use(protect);
// Category Routes
/**
 * @swagger
 * /location-posts/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "Historic" }
 *               description: { type: string, example: "Locations of historical significance." }
 *     responses:
 *       201: { description: "Category created successfully" }
 *       401: { description: "Unauthorized" }
 *       422: { description: "Validation error" }
 */
router.post('/categories', createCategory);

/**
 * @swagger
 * /location-posts/categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]
 *     responses:
 *       200: { description: "A list of categories." }
 */
router.get('/categories', getAllCategories);

// LocationPost Routes
/**
 * @swagger
 * /location-posts:
 *   post:
 *     summary: Create a new location post
 *     tags: [LocationPosts]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LocationPost' }
 *     responses:
 *       201: { description: "Location post created successfully." }
 *       401: { description: "Unauthorized." }
 *       422: { description: "Validation error." }
 */
router.post('/', createLocationPost);

/**
 * @swagger
 * /location-posts:
 *   get:
 *     summary: Retrieve all location posts
 *     tags: [LocationPosts]
 *     parameters:
 *       - { in: query, name: search, schema: { type: string }, description: "Search term" }
 *       - { in: query, name: category, schema: { type: string }, description: "Filter by category ID" }
 *     responses:
 *       200: { description: "A list of location posts." }
 */
router.get('/', getAllLocationPosts);

/**
 * @swagger
 * /location-posts/{id}:
 *   get:
 *     summary: Get a single location post by ID
 *     tags: [LocationPosts]
 *     parameters: [ { in: path, name: id, required: true, schema: { type: string }, description: "The location post ID" } ]
 *     responses:
 *       200: { description: "Location post data." }
 *       404: { description: "Location post not found." }
 */
router.get('/:id', getLocationPost);

/**
 * @swagger
 * /location-posts/{id}:
 *   patch:
 *     summary: Update a location post
 *     tags: [LocationPosts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters: [ { in: path, name: id, required: true, schema: { type: string }, description: "The location post ID" } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LocationPost' }
 *     responses:
 *       200: { description: "Update successful." }
 *       403: { description: "Forbidden." }
 *       404: { description: "Location post not found." }
 */
router.patch('/:id', updateLocationPost);

/**
 * @swagger
 * /location-posts/{id}:
 *   delete:
 *     summary: Delete a location post
 *     tags: [LocationPosts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters: [ { in: path, name: id, required: true, schema: { type: string }, description: "The location post ID" } ]
 *     responses:
 *       200: { description: "Location post deleted successfully." }
 *       403: { description: "Forbidden." }
 *       404: { description: "Location post not found." }
 */
router.delete('/:id', deleteLocationPost);

export default router;
