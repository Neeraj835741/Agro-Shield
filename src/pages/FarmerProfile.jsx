import { useState } from "react";
import { saveFarmProfile } from "../services/farmService";

function FarmerProfile() {
  const [formData, setFormData] = useState({
    farmerName: "",
    language: "",
    location: "", 
    crop: "",
    sowingDate: "",
    soilPh: "",
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Connects to your teammate's Firebase function
  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      // This now sends the data directly to Firestore!
      await saveFarmProfile(formData);
      
      setStatus("success");
      setMessage("Profile saved to Firestore successfully!");
      
      // Clear the form after a successful save
      setFormData({
        farmerName: "", language: "", location: "", crop: "", sowingDate: "", soilPh: ""
      });
    } catch (error) {
      console.error("Firebase Error:", error);
      setStatus("error");
      setMessage("Failed to save profile. Please try again.");
    }
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#14532d" }}>My Farm Profile</h1>
      <p style={{ color: "#4b5563" }}>Add your farm details to receive better crop guidance.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "16px",
          marginTop: "25px",
          padding: "24px",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Farmer Name</label>
          <input required name="farmerName" value={formData.farmerName} onChange={handleChange} placeholder="Enter your full name" style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Preferred Language</label>
          <select required name="language" value={formData.language} onChange={handleChange} style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}>
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>State & District</label>
          <input required name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Maharashtra, Pune" style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Crop</label>
          <input required name="crop" value={formData.crop} onChange={handleChange} placeholder="e.g., Wheat, Rice, Tomato" style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Sowing Date</label>
          <input required type="date" name="sowingDate" value={formData.sowingDate} onChange={handleChange} style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Soil pH (Optional)</label>
          <input type="number" step="0.1" name="soilPh" value={formData.soilPh} onChange={handleChange} placeholder="e.g., 6.5" style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            backgroundColor: status === "loading" ? "#4ade80" : "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            marginTop: "10px"
          }}
        >
          {status === "loading" ? "Saving to Database..." : "Save Farm Profile"}
        </button>

        {/* Dynamic Success/Error Message */}
        {message && (
          <div style={{ 
            backgroundColor: status === "success" ? "#dcfce7" : "#fee2e2", 
            color: status === "success" ? "#166534" : "#b91c1c", 
            padding: "12px", 
            borderRadius: "6px", 
            textAlign: "center", 
            fontWeight: "bold" 
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default FarmerProfile;