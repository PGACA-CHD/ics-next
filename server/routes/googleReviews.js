import express from 'express';
import { getReviews } from '../controllers/googleReviewsController.js';

const router = express.Router();
router.get('/', getReviews);
export default router;
