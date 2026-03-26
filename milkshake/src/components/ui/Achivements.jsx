export const ACHIEVEMENTS = [
    {
        id: "first_review",
        label: "Första slurpen",
        icon: "🥛",
        check: (reviews) => reviews.length >= 1,
    }
]

function getAchivements(reviews){
    return ACHIEVEMENTS .filter((a) => a.check(reviews));
}

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
            <div key={a.id} className="achievement-badge">
              <span className="achievement-icon">{a.icon}</span>
              <span className="achievement-label">{a.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="achievements-grid locked">
        {locked.map((a) => (
          <div key={a.id} className="achievement-badge locked">
            <span className="achievement-icon">🔒</span>
            <span className="achievement-label">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
    );
}