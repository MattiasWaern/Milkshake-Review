// achievements

export const ACHIEVEMENTS = [
    {
        id: "first_review",
        label: "Första slurpen",
        icon: "🍦",
        description: "Skriv din första recension",
        check: (reviews) => reviews.length >= 1,
    },
    {
        id: "five_reviews",
        label: "Femte slurpen",
        icon: "🍓",
        description: "Skriv 5 recensioner",
        check: (reviews) => reviews.length >= 5,
    },
    {
        id: "ten_reviews",
        label: "Tionde slurpen",
        icon: "🍓🏆",
        description: "Skriv 10 recensioner",
        check: (reviews) => reviews.length >= 10,
    },
    {
        id: "banger_hunter",
        label: "Banger hunter",
        icon: "⭐🏆",
        description: "Ge 5 stjärnor i minst 3 recensioner",
        check: (reviews) => reviews.filter((r) => r.rating === 5).length >= 3,
    },
    {
        id: "critic",
        label: "Hård kritiker",
        icon: "😤",
        description: "Ge under 2 stjärnor i minst 3 recensioner",
        check: (reviews) => reviews.filter((r) => r.rating < 2).length >= 3,
    },
    {
        id: "karen",
        label: "Karen",
        icon: "👵",
        description: "Ge 0 stjärnor i en recension",
        check: (reviews) => reviews.filter((r) => r.rating < 1),
    },
    {
        id: "loyal",
        label: "Stammis",
        icon: "📍",
        description: "Besök samma ställe minst 3 gånger",
        check: (reviews) =>
            Object.values(
                reviews.reduce((acc, r) => {
                    acc[r.place] = (acc[r.place] || 0) + 1;
                    return acc;
                }, {})
            ).some((count) => count >= 3),
    },
];





function getAchivements(reviews){
    return ACHIEVEMENTS .filter((a) => a.check(reviews));
}



//Komponent

export default function Achivements({reviews}) {
    const unlocked = getAchivements(reviews);
    const locked = ACHIEVEMENTS.filter((a) => !unlocked.includes(a))

    return(
    <div className="profile-achievements">
      <h3 className="achievements-title">Achievements</h3>

      {unlocked.length === 0 ? (
        <p className="no-achievements">Inga ännu – recensera mer! 🥤</p>
      ) : (
        <div className="achievements-grid">
         {unlocked.map((a) => (
          <div key={a.id} className="achievement-badge" title={a.description}>
            <span className="achievement-icon">{a.icon}</span>
            <span className="achievement-label">{a.label}</span>
          </div>
        ))}
        </div>
      )}

      <div className="achievements-grid locked">
       {locked.map((a) => (
          <div key={a.id} className="achievement-badge locked" title={`Krav: ${a.description}`}>
            <span className="achievement-icon">🔒</span>
            <span className="achievement-label">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
    );
}