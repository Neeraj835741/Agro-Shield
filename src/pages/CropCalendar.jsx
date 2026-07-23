import { useState } from "react";

function CropCalendar() {
  const [crop, setCrop] = useState("");
  const [sowingDate, setSowingDate] = useState("");
  const [season, setSeason] = useState("");

  function findSeason() {
    if (!sowingDate) {
      setSeason("Please select a sowing date.");
      return;
    }

    const month = new Date(`${sowingDate}T00:00:00`).getMonth() + 1;

    if (month >= 6 && month <= 10) {
      setSeason("Kharif Season");
    } else if (month === 4 || month === 5) {
      setSeason("Zaid Season");
    } else {
      setSeason("Rabi Season");
    }
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1>Crop Calendar</h1>
      <p>Find the crop season based on your sowing date.</p>

      <div
        style={{
          marginTop: "25px",
          padding: "24px",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          display: "grid",
          gap: "16px",
        }}
      >
        <select
          value={crop}
          onChange={(event) => setCrop(event.target.value)}
          style={{ padding: "12px" }}
        >
          <option value="">Select crop</option>
          <option>Rice</option>
          <option>Wheat</option>
          <option>Maize</option>
          <option>Cotton</option>
          <option>Tomato</option>
          <option>Potato</option>
        </select>

        <label>
          Sowing date
          <input
            type="date"
            value={sowingDate}
            onChange={(event) => setSowingDate(event.target.value)}
            style={{ padding: "12px", display: "block", marginTop: "6px" }}
          />
        </label>

        <button
          onClick={findSeason}
          style={{
            backgroundColor: "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Identify Season
        </button>

        {season && (
          <div
            style={{
              backgroundColor: "#dcfce7",
              color: "#166534",
              padding: "16px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            {crop && <p>Selected crop: {crop}</p>}
            <p>{season}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropCalendar;