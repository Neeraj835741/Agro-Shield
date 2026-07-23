import { useState } from "react";

function FarmerProfile() {
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1>My Farm Profile</h1>
      <p>Add your farm details to receive better crop guidance.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "16px",
          marginTop: "25px",
          padding: "24px",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
        }}
      >
        <input required placeholder="Farmer name" style={{ padding: "12px" }} />

        <select required style={{ padding: "12px" }}>
          <option value="">Select language</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
          <option>Telugu</option>
        </select>

        <input required placeholder="State" style={{ padding: "12px" }} />
        <input required placeholder="District" style={{ padding: "12px" }} />
        <input required placeholder="Crop name" style={{ padding: "12px" }} />

        <label>
          Sowing date
          <input
            required
            type="date"
            style={{ padding: "12px", display: "block", marginTop: "6px" }}
          />
        </label>

        <select required style={{ padding: "12px" }}>
          <option value="">Select soil type</option>
          <option>Black soil</option>
          <option>Red soil</option>
          <option>Alluvial soil</option>
          <option>Sandy soil</option>
        </select>

        <button
          type="submit"
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
          Save Farm Profile
        </button>

        {saved && (
          <p style={{ color: "#166534", fontWeight: "bold" }}>
            Profile saved successfully!
          </p>
        )}
      </form>
    </div>
  );
}

export default FarmerProfile;