function MilkshakeCard({ milkshake }) {
  const filledStars = Math.round(milkshake.rating);
  const starString = '★'.repeat(filledStars) + '☆'.repeat(10 - filledStars);
  const formattedDate = new Date(milkshake.date).toLocaleDateString('sv-SE');

  return (
    <article className="milkshake-card">
      {milkshake.imageUrl && (
        <div className="card-image">
          <img src={milkshake.imageUrl} alt={milkshake.name} loading="lazy" />
        </div>
      )}

      <div className="card-content">
        <h3>{milkshake.name}</h3>
        <div className="place">{milkshake.place}</div>

        <div className="meta-info">
          <span>Av {milkshake.reviewer || 'Anonym'}</span>
          <span>{formattedDate}</span>
        </div>

        <div className="rating">
          <strong>{milkshake.rating.toFixed(1)}</strong>
          <span className="stars">{starString}</span>
        </div>

        {milkshake.comment && (
          <p className="comment">"{milkshake.comment}"</p>
        )}
      </div>
    </article>
  );
}

export default MilkshakeCard;