import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewCard from '../ui/ReviewCard'; 

export default function PlaceDetail({ reviews }) {
  const { id } = useParams();
  const review = reviews.find(r => r.id === id);

  if (!review) return <div className="container">Hittade inte recensionen...</div>;

  return (
    <main className="container" style={{ paddingTop: '2rem' }}>
      <Link to="/" className="btn btn-outline" style={{ marginBottom: '2rem' }}>
         Tillbaka till listan
      </Link>
      
      <div className="review-detail-hero">
        <ReviewCard review={review} />
        <div className="card" style={{ marginTop: '1rem', padding: '1.5rem', background: 'white' }}>
          <h3>Om denna milkshake (Kanske lägger till bilder?)</h3>
          <p>{review.review || "Ingen beskrivning angiven."} </p>
        </div>
      </div>
    </main>
  );
}