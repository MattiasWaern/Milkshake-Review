import { useState } from "react";

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
        description: "Ge mindre än 2 stjärnor i en recension",
        check: (reviews) => reviews.filter((r) => r.rating < 2).length >= 1,
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
    {
        id: "Lil_Spender",
        label: "Lil Spender",
        icon: "💵",
        description: "Spenderat mer än 200kr på milkshakes",
        check: (reviews) => reviews.reduce((sum, r) => sum + (Number(r.price) || 0), 0) > 200,
    },
    {
        id: "Medium_Spender",
        label: "Medium Spender",
        icon: "💵💵",
        description: "Spenderat mer än 400kr på milkshakes",
        check: (reviews) => reviews.reduce((sum, r) => sum + (Number(r.price) || 0), 0) > 400,
    },
    {
        id: "Big_Spender",
        label: "Big Spender",
        icon: "💰💰",
        description: "Spenderat mer än 800kr på milkshakes",
        check: (reviews) => reviews.reduce((sum, r) => sum + (Number(r.price) || 0), 0) > 800,
    },
    {
        id: "Rikemansbarn",
        label: "Rikemansbarn",
        icon: "💰💰💰💰",
        description: "Spenderat mer än 1200kr på milkshakes",
        check: (reviews) => reviews.reduce((sum, r) => sum + (Number(r.price) || 0), 0) > 1200,
    },
];





function getAchivements(reviews){
    return ACHIEVEMENTS .filter((a) => a.check(reviews));
}



//Komponent

export default function Achivements({ reviews }) {
  const [tooltip, setTooltip] = useState(null);
  const unlocked = getAchivements(reviews);
  const locked = ACHIEVEMENTS.filter((a) => !unlocked.includes(a));

  return (
    <div className="profile-achievements" onClick={() => setTooltip(null)}>
      <h3 className="achievements-title">Achievements</h3>

      {unlocked.length === 0 ? (
        <p className="no-achievements">Inga ännu – recensera mer! 🥤</p>
      ) : (
        <div className="achievements-grid">
          {unlocked.map((a) => (
            <div
              key={a.id}
              className="achievement-badge"
              onClick={(e) => { e.stopPropagation(); setTooltip(tooltip === a.id ? null : a.id); }}
            >
              <span className="achievement-icon">{a.icon}</span>
              <span className="achievement-label">{a.label}</span>
              {tooltip === a.id && (
                <div className="achievement-tooltip">{a.description}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="achievements-grid locked">
        {locked.map((a) => (
          <div
            key={a.id}
            className="achievement-badge locked"
            onClick={(e) => { e.stopPropagation(); setTooltip(tooltip === a.id ? null : a.id); }}
          >
            <span className="achievement-icon">🔒</span>
            <span className="achievement-label">{a.label}</span>
            {tooltip === a.id && (
              <div className="achievement-tooltip">Krav: {a.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}