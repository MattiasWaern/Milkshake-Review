import React from 'react';
import { ArrowLeft, Trophy, Heart } from 'lucide-react';

export default function StatsView({ reviews, localFavorites, onBack }) {
  // Topplistan baseras fortfarande på alla recensioner (Firebase)
  const topRated = [...reviews].sort((a, b) => b.rating - a.rating).slice(0, 5);
  
  // Favoritlistan baseras nu på de ID:n du har sparat lokalt
  const favorites = reviews.filter(r => localFavorites.includes(r.id));

  return (
    <div className="container">
      <button onClick={onBack} className="btn btn-outline" style={{marginBottom: '1rem'}}>
        <ArrowLeft size={18}/> Tillbaka
      </button>
      
      <h1 className="title-gradient">Statistik & Topplistor</h1>
      
      {/* Topp 5 - Visar de som har högst betyg i hela databasen */}
      <div className="form-card" style={{marginTop: '2rem'}}>
        <h2 style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <Trophy color="#fbbf24"/> Topp 5
        </h2>
        {topRated.map((r, i) => (
          <div key={r.id} style={{display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee'}}>
            <span>#{i+1} {r.flavor} ({r.place}) - {r.reviewer}</span>
            <span style={{fontWeight: 'bold'}}> {r.rating}/5 ⭐</span>
          </div>
        ))}
      </div>

      {/* Personliga favoriter - Visar bara de du har hjärtat */}
      {favorites.length > 0 && (
        <div className="form-card" style={{marginTop: '2rem'}}>
          <h2 style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Heart color="#ef4444" fill="#ef4444"/>
            Dina personliga <strong>Favoriter</strong>
          </h2>
          <div style={{display: 'grid', gap: '10px', marginTop: '1rem'}}>
            {favorites.map(r => (
              <div key={r.id} style={{padding: '12px', background: '#fff1f2', borderRadius: '12px', border: '1px solid #fecdd3', display: 'flex', justifyContent: 'space-between'}}>
                <span style={{fontWeight: '500'}}>{r.flavor}</span>
                <span style={{color: '#e11d48', fontSize: '0.9rem'}}>{r.place}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}