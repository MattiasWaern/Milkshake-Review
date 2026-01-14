import { useState, useMemo } from 'react';
import MilkshakeCard from './components/MilkshakeCard';
import AddMilkshakeForm from './components/AddMilkshakeForm';
import './App.css';

function App() {
  const [milkshakes, setMilkshakes] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

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
      reviews: reviews.sort((a, b) =>
        b.date.localeCompare(a.date)
      )
    }));
  }, [milkshakes]);

  const averageRating = (reviews) =>
    reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : '–';

  return (
    <div className="app">
      <header>🍓 Milkshake Reviews</header>

      {!selectedPlace ? (
        <>
          <AddMilkshakeForm onAdd={addMilkshake} />

          <h2 className="section-title">Våra ställen</h2>
          <div className="places-grid">
            {milkshakesByPlace.map(group => (
              <button
                key={group.place}
                className="place-card"
                onClick={() => setSelectedPlace(group.place)}
              >
                <h3>{group.place}</h3>
                <div className="place-stats">
                  <span>{averageRating(group.reviews)} ★</span>
                  <span>{group.reviews.length} recensioner</span>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="place-detail-view">
          <button
            className="back-button"
            onClick={() => setSelectedPlace(null)}
          >
            ← Tillbaka
          </button>

          <h2>{selectedPlace}</h2>

          <div className="milkshake-grid">
            {milkshakes
              .filter(m => m.place === selectedPlace)
              .map(m => (
                <MilkshakeCard key={m.id} milkshake={m} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
