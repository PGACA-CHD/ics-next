import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import googleReviewsRouter from './routes/googleReviews.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS – only allow from Vite dev server (or set your production domain)
app.use(
  cors({
    origin: process.env.VITE_API_URL || 'http://localhost:3000',
    methods: ['GET'],
  })
);

// Rate limiting – 60 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use('/api/google-reviews', googleReviewsRouter);

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
