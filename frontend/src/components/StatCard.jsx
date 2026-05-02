function StatCard({ title, value, hint, icon }) {
  return (
    <div className="statCard">
      <div className="statIcon">{icon}</div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{hint}</span>
      </div>
    </div>
  );
}

export default StatCard;