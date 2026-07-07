import axios from 'axios';

// Use Next.js public env var for API URL (e.g., http://localhost:5002)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

/** Fetch Google reviews from backend */
export const fetchReviews = async () => {
  const { data } = await api.get('/api/google-reviews');
  return data;
};
