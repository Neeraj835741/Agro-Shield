import { useState, useEffect } from "react";

function FarmerProfile() {
  // 1. Set up the state for the exact fields requested
  const [formData, setFormData] = useState({
    farmerName: "",
    language: "",
    location: "", // For State and district
    crop: "",
    sowingDate: "",
    soilPh: "",
  });

  const [isSaved, setIsSaved] = useState(false);

  // 2. When the page loads, check localStorage for existing data
  useEffect(() => {
    const savedData = localStorage.getItem("farmerProfile");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // 3. Handle input changes dynamically
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // 4. Save to localStorage when the form is submitted
  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("farmerProfile", JSON.stringify(formData));
    
    setIsSaved(true);
    // Hide the success message after 3 seconds
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
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
          <input 
            required 
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
            placeholder="Enter your full name" 
            style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} 
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Preferred Language</label>
          <select 
            required 
            name="language"
            value={formData.language}
            onChange={handleChange}
            style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>State & District</label>
          <input 
            required 
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Maharashtra, Pune" 
            style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} 
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Crop</label>
          <input 
            required 
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            placeholder="e.g., Wheat, Rice, Tomato" 
            style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} 
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Sowing Date</label>
          <input
            required
            type="date"
            name="sowingDate"
            value={formData.sowingDate}
            onChange={handleChange}
            style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Soil pH (Optional)</label>
          <input 
            type="number"
            step="0.1"
            name="soilPh"
            value={formData.soilPh}
            onChange={handleChange}
            placeholder="e.g., 6.5" 
            style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} 
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Save Farm Profile
        </button>

        {isSaved && (
          <div style={{ backgroundColor: "#dcfce7", color: "#166534", padding: "12px", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>
            Profile saved to local storage successfully!
          </div>
        )}
      </form>
    </div>
  );
}

export default FarmerProfile;