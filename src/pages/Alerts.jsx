import { useState } from "react";

function Alerts() {
  const [season, setSeason] = useState("All");

  const alerts = [
    {
      season: "Kharif",
      crop: "Rice",
      problem: "Brown planthopper risk",
      advice: "Check the lower part of rice plants regularly and avoid excessive nitrogen fertilizer.",
    },
    {
      season: "Kharif",
      crop: "Cotton",
      problem: "Pink bollworm risk",
      advice: "Inspect flowers and bolls. Use pheromone traps and contact an expert if damage increases.",
    },
    {
      season: "Rabi",
      crop: "Wheat",
      problem: "Yellow rust risk",
      advice: "Look for yellow stripes on leaves. Remove severely affected leaves and consult an expert.",
    },
    {
      season: "Rabi",
      crop: "Potato",
      problem: "Late blight risk",
      advice: "Avoid excess moisture and check leaves for dark patches after cloudy or rainy weather.",
    },
    {
      season: "Zaid",
      crop: "Tomato",
      problem: "Whitefly risk",
      advice: "Inspect leaf undersides, remove badly affected leaves, and seek appropriate treatment guidance.",
    },
  ];

  const visibleAlerts =
    season === "All"
      ? alerts
      : alerts.filter((alert) => alert.season === season);

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto" }}>
      <h1>Seasonal Crop Alerts</h1>
      <p>Stay informed about common crop diseases and pest risks.</p>

      <select
        value={season}
        onChange={(event) => setSeason(event.target.value)}
        style={{
          padding: "12px",
          marginTop: "18px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
        }}
      >
        <option value="All">All seasons</option>
        <option value="Kharif">Kharif</option>
        <option value="Rabi">Rabi</option>
        <option value="Zaid">Zaid</option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "18px",
          marginTop: "25px",
        }}
      >
        {visibleAlerts.map((alert) => (
          <article
            key={`${alert.crop}-${alert.problem}`}
            style={{
              border: "1px solid #fed7aa",
              backgroundColor: "#fff7ed",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <p style={{ color: "#9a3412", fontWeight: "bold" }}>
              {alert.season} season
            </p>
            <h2 style={{ margin: "8px 0" }}>{alert.crop}</h2>
            <h3 style={{ color: "#b45309" }}>{alert.problem}</h3>
            <p>{alert.advice}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Alerts;