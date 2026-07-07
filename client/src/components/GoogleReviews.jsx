import React, { useEffect, useState } from 'react';
import { fetchReviews } from '../services/googleReviews';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './GoogleReviews.css';
import { formatDistanceToNow } from 'date-fns';

/* ── Star rating ── */
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const stars = [];

  for (let i = 0; i < full; i++) {
    stars.push(
      <svg key={`f${i}`} className="star" viewBox="0 0 20 20" fill="#e8a400" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.561-.954L10 0l3.439 5.956L20 6.91l-5.245 4.635 1.123 6.545z" />
      </svg>
    );
  }
  if (half) {
    stars.push(
      <svg key="h" className="star" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`hg-${rating}`}>
            <stop offset="50%" stopColor="#e8a400" />
            <stop offset="50%" stopColor="#ddd0bb" />
          </linearGradient>
        </defs>
        <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.561-.954L10 0l3.439 5.956L20 6.91l-5.245 4.635 1.123 6.545z" fill={`url(#hg-${rating})`} />
      </svg>
    );
  }
  for (let i = 0; i < empty; i++) {
    stars.push(
      <svg key={`e${i}`} className="star" viewBox="0 0 20 20" fill="#ddd0bb" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.561-.954L10 0l3.439 5.956L20 6.91l-5.245 4.635 1.123 6.545z" />
      </svg>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

/* ── Summary stars (small, for header) ── */
const SummaryStars = ({ rating }) => (
  <span className="gr-summary-stars">
    {[1, 2, 3, 4, 5].map(n => (
      <svg key={n} className="star" viewBox="0 0 20 20" fill={n <= Math.round(rating) ? '#e8a400' : '#ddd0bb'} xmlns="http://www.w3.org/2000/svg">
        <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.561-.954L10 0l3.439 5.956L20 6.91l-5.245 4.635 1.123 6.545z" />
      </svg>
    ))}
  </span>
);

/* ── Main component ── */
export default function GoogleReviews() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchReviews();
      setData(res);
    } catch (e) {
      console.error(e);
      setError('Failed to load reviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <section className="gr-section">
        <div className="gr-skeleton">
          <p>Loading reviews…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="gr-section">
        <div className="gr-error">
          <p>{error}</p>
          <button onClick={load}>Retry</button>
        </div>
      </section>
    );
  }

  const { businessName, rating, totalReviews, reviews } = data;

  return (
    <section className="gr-section">

      {/* ── Head ── */}
      <div className="gr-head">
        {/* <span className="gr-eyebrow">Customer reviews</span> */}
        <h2 className="gr-heading">What Our Clients Say</h2>
        <p className="gr-subheading">Real words. Real results.</p>
        <p className="gr-summary">
          <SummaryStars rating={rating} />
          <strong>{rating?.toFixed(1)}</strong> out of 5 &nbsp;·&nbsp; {totalReviews} reviews on Google
        </p>
      </div>

      {/* ── Grid layout – show all reviews at once ── */}
      <div className="gr-grid">
        {reviews.map((rev, idx) => (
          <div key={idx} className="gr-card">
            {/* Header */}
            <div className="gr-card__header">
              {rev.authorPhotoUrl ? (
                <img src={rev.authorPhotoUrl} alt={rev.authorName} className="gr-avatar" />
              ) : (
                <div className="gr-avatar-placeholder">
                  {rev.authorName?.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="gr-author-info">
                <span className="gr-author-name">{rev.authorName}</span>
                <StarRating rating={rev.rating} />
              </div>

              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                className="gr-google-logo"
              />
            </div>

            {/* Time */}
            <p className="gr-time">
              {rev.relativeTimeDescription ||
                formatDistanceToNow(new Date(rev.time * 1000 || Date.now()), { addSuffix: true })}
            </p>

            {/* Review text */}
            <p className="gr-text">{rev.text}</p>
          </div>
        ))}
      </div>

      {/* ── View More Button ── */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
        <a href="https://www.google.com/search?q=pga+and+co.+reviews" target="_blank" rel="noopener noreferrer" className="ics-btn ics-btn-outline" style={{ textDecoration: 'none', padding: '12px 28px', fontSize: '13.5px', fontWeight: '600', borderRadius: '50px', background: '#fff', border: '1px solid #dcdcdc', color: '#0B3D2E', transition: 'all 0.2s ease', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
          View more reviews →
        </a>
      </div>

    </section>
  );
}