import { useState } from "react";
import { getRelevantAlerts } from "../utils/alertUtils";

function Alerts() {
  const [season, setSeason] = useState("All");
  const [crop, setCrop] = useState("All");

  const visibleAlerts = getRelevantAlerts(crop, season);

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#14532d" }}>Seasonal Crop Alerts</h1>

      <p style={{ color: "#4b5563" }}>
        Check possible pest and disease risks based on your crop and growing
        season.
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "22px",
        }}
      >
        <select
          value={crop}
          onChange={(event) => setCrop(event.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="All">All crops</option>
          <option value="Rice">Rice</option>
          <option value="Wheat">Wheat</option>
          <option value="Cotton">Cotton</option>
          <option value="Tomato">Tomato</option>
          <option value="Potato">Potato</option>
        </select>

        <select
          value={season}
          onChange={(event) => setSeason(event.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="All">All seasons</option>
          <option value="Kharif">Kharif</option>
          <option value="Rabi">Rabi</option>
          <option value="Zaid">Zaid</option>
        </select>
      </div>

      {visibleAlerts.length === 0 ? (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
          }}
        >
          No active seasonal alerts match this crop and season.
        </div>
      ) : (
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
              key={alert.id}
              style={{
                border: "1px solid #fed7aa",
                backgroundColor: "#fff7ed",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  color: "#9a3412",
                  fontWeight: "bold",
                  marginTop: 0,
                }}
              >
                {alert.level} risk · {alert.season} season
              </p>

              <h2 style={{ margin: "8px 0", color: "#7c2d12" }}>
                {alert.title}
              </h2>

              <p style={{ color: "#6b3b1b" }}>{alert.message}</p>

              <p style={{ fontSize: "13px", color: "#78716c" }}>
                Relevant crops: {alert.crops.join(", ")}
              </p>
            </article>
          ))}
        </div>
      )}

      <p
        style={{
          marginTop: "26px",
          padding: "14px",
          backgroundColor: "#fefce8",
          borderLeft: "4px solid #ca8a04",
          color: "#713f12",
        }}
      >
        These are seasonal risk alerts, not real-time weather alerts. Consult
        an agricultural expert for severe or uncertain crop problems.
      </p>
    </div>
  );
}

export default Alerts;