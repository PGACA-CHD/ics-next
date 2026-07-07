const { fetchPlaceDetails } = require('../services/googlePlaces');

let cache = {
  timestamp: 0,
  data: null,
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const getReviews = async (req, res, next) => {
  try {
    // Return cached data if fresh
    if (cache.data && Date.now() - cache.timestamp < ONE_DAY_MS) {
      return res.json(cache.data);
    }

    const raw = await fetchPlaceDetails();
    const formatted = {
      businessName: raw.displayName?.text || '',
      rating: raw.rating ?? 0,
      totalReviews: raw.userRatingCount ?? 0,
      reviews: (raw.reviews || []).map((r) => ({
        authorName: r.author?.displayName ?? '',
        authorPhotoUrl: r.author?.photoUri ?? '',
        rating: r.starRating ?? 0,
        relativeTimeDescription: r.relativePublishTimeDescription ?? '',
        text: r.text?.text ?? '',
      })),
    };

    cache = { timestamp: Date.now(), data: formatted };
    res.json(formatted);
  } catch (err) {
    next(err);
  }
};

module.exports = { getReviews };
