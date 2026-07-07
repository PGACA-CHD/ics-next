import React from 'react';
import GoogleReviews from './components/GoogleReviews';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Our Customers' Google Reviews</h1>
      </header>
      <main>
        <GoogleReviews />
      </main>
    </div>
  );
}
