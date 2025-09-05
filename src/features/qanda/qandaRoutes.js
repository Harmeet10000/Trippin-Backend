import express from 'express';

import { protect } from '../auth/authMiddleware.js';
import {
  askQuestion,
  answerQuestion,
  getQandasForLocation
} from 'src/features/qanda/qandaController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Q&A
 *   description: Endpoints for asking and answering questions about location posts.
 */
router.use(protect);
/**
 * @swagger
 * /location-posts/{locationPostId}/questions:
 *   post:
 *     summary: Ask a question about a location post
 *     tags: [Q&A]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - { in: path, name: locationPostId, required: true, schema: { type: string }, description: "ID of the location post" }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [questionText]
 *             properties:
 *               questionText: { type: string, example: "Is there wheelchair access?" }
 *     responses:
 *       201: { description: "Question asked successfully" }
 *       401: { description: "Unauthorized" }
 *       404: { description: "Location post not found" }
 *       422: { description: "Validation error" }
 */
router.post('/location-posts/:locationPostId/questions', askQuestion);

/**
 * @swagger
 * /location-posts/{locationPostId}/questions:
 *   get:
 *     summary: Get all Q&As for a location post
 *     tags: [Q&A]
 *     parameters:
 *       - { in: path, name: locationPostId, required: true, schema: { type: string }, description: "ID of the location post" }
 *     responses:
 *       200: { description: "List of Q&As for the location post" }
 *       404: { description: "Location post not found" }
 */
router.get('/location-posts/:locationPostId/questions', getQandasForLocation);

/**
 * @swagger
 * /questions/{questionId}/answers:
 *   post:
 *     summary: Answer a specific question
 *     tags: [Q&A]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - { in: path, name: questionId, required: true, schema: { type: string }, description: "ID of the question to answer" }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [answerText]
 *             properties:
 *               answerText: { type: string, example: "Yes, there is a ramp at the main entrance." }
 *     responses:
 *       201: { description: "Answer posted successfully" }
 *       401: { description: "Unauthorized" }
 *       404: { description: "Question not found" }
 *       422: { description: "Validation error" }
 */
router.post('/questions/:questionId/answers', answerQuestion);

export default router;
