import { useState, useMemo } from 'react';
import MilkshakeCard from './components/MilkshakeCard';
import AddMilkshakeForm from './components/AddMilkshakeForm';
import './style.css';

function App() {
  const [milkshakes, setMilkshakes] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  const addMilkshake = (milkshake) => {
    setMilkshakes(prev => [
      ...prev,
      {
        ...milkshake,
        id: crypto.randomUUID(),
        date: new Date().toISOString()
      }
    ]);
  };

  const milkshakesByPlace = useMemo(() => {
    const groups = {};

    for (const m of milkshakes) {
      if (!groups[m.place]) groups[m.place] = [];
      groups[m.place].push(m);
    }

    return Object.entries(groups).map(([place, reviews]) => ({
      place,
      reviews: reviews.sort((a, b) => b.date.localeCompare(a.date))
    }));
  }, [milkshakes]);

  const averageRating = (reviews) =>
    reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : '–';

  const sortedMilkshakes = useMemo(() => {
    if (!selectedPlace) return [];
    
    const filtered = milkshakes.filter(m => m.place === selectedPlace);
    
    if (sortBy === 'rating') {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }
    return [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  }, [milkshakes, selectedPlace, sortBy]);

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <div className="logo">🥤</div>
          <div>
            <h1>Milkshake Reviews</h1>
            <p>Din guide till de bästa milkshakesen</p>
          </div>
        </div>
      </header>

      {!selectedPlace ? (
        <>
          <AddMilkshakeForm onAdd={addMilkshake} />

          {milkshakesByPlace.length > 0 && (
            <>
              <h2 className="section-title">Våra ställen ({milkshakesByPlace.length})</h2>
              <div className="places-grid">
                {milkshakesByPlace.map(group => (
                  <button
                    key={group.place}
                    className="place-card"
                    onClick={() => setSelectedPlace(group.place)}
                  >
                    <div className="place-icon">📍</div>
                    <h3>{group.place}</h3>
                    <div className="place-stats">
                      <span className="avg-rating">{averageRating(group.reviews)} ★</span>
                      <span className="review-count">{group.reviews.length} recensioner</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {milkshakesByPlace.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🍓</div>
              <h3>Inga recensioner än</h3>
              <p>Bli den första att lägga till en milkshake-recension!</p>
            </div>
          )}
        </>
      ) : (
        <div className="place-detail-view">
          <div className="detail-header">
            <button
              className="back-button"
              onClick={() => setSelectedPlace(null)}
            >
              ← Tillbaka
            </button>

            <div className="sort-controls">
              <label>Sortera:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Senaste först</option>
                <option value="rating">Högsta betyg</option>
              </select>
            </div>
          </div>

          <h2>{selectedPlace}</h2>

          <div className="milkshake-grid">
            {sortedMilkshakes.map(m => (
              <MilkshakeCard key={m.id} milkshake={m} />
            ))}
          </div>
        </div>
      )}

      <footer>
        <p>Gjord med ❤️ och milkshakes</p>
      </footer>
    </div>
  );
}

export default App;