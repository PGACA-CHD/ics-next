const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
// New Places API endpoint (Places API – New)
const ENDPOINT = `https://places.googleapis.com/v1/places/${PLACE_ID}`;

const axiosInstance = axios.create({ timeout: 8000 });

/** Simple exponential back‑off retry wrapper */
async function retry(fn, attempts = 2, delay = 500) {
  try {
    return await fn();
  } catch (e) {
    if (attempts <= 0) throw e;
    await new Promise((r) => setTimeout(r, delay));
    return retry(fn, attempts - 1, delay * 2);
  }
}

/** Call Google Places API (New) and return formatted data */
async function fetchPlaceDetails() {
  // Ensure required configuration is present
  if (!API_KEY || !PLACE_ID) {
    throw new Error('Google API key or Place ID not set');
  }

  // Perform the request using the new API headers
  const response = await axiosInstance.get(ENDPOINT, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews'
    }
  });

  console.log('Google Response:', response.data);

  // Propagate any API error returned by the new Places service
  if (response.data.error) {
    console.error('Google API error:', response.data);
    throw new Error(response.data.error.message || 'Google API error');
  }

  // Map the response to the shape expected by the controller
  return {
    displayName: { text: response.data.displayName?.text || '' },
    rating: response.data.rating ?? 0,
    userRatingCount: response.data.userRatingCount ?? 0,
    reviews: (response.data.reviews || []).map((r) => ({
      author: {
        displayName: r.authorAttribution?.displayName || '',
        photoUri: r.authorAttribution?.photoUri || ''
      },
      starRating: r.rating ?? 0,
      relativePublishTimeDescription: r.relativePublishTimeDescription || '',
      text: { text: r.text?.text || '' }
    }))
  };
}

module.exports = { fetchPlaceDetails };
