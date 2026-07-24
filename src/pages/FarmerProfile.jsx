import { useState, useEffect } from "react";
// 👉 Notice we imported the new getFarmProfile function
import { saveFarmProfile, getFarmProfile } from "../services/farmService";
import { auth } from "../firebase"; 
import { onAuthStateChanged } from "firebase/auth"; 

function FarmerProfile() {
  const [user, setUser] = useState(null); 
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // Tracks if they already have a profile

  const [formData, setFormData] = useState({
    farmerName: "",
    language: "",
    location: "", 
    crop: "",
    sowingDate: "",
    soilPh: "",
  });

  const [status, setStatus] = useState("idle"); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // 👉 MAGIC HAPPENS HERE: Fetch existing data when they log in
        const existingData = await getFarmProfile();
        
        if (existingData && existingData.farmerName) {
          // Fill the form with their saved data
          setFormData({
            farmerName: existingData.farmerName || "",
            language: existingData.language || "",
            location: existingData.location || "",
            crop: existingData.crop || "",
            sowingDate: existingData.sowingDate || "",
            soilPh: existingData.soilPh || "",
          });
          setIsUpdating(true); // Changes button text to "Update"
        }
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!user) return; 

    setStatus("loading");
    setMessage("");

    try {
      
      await saveFarmProfile(formData);
      
      setStatus("success");
      setMessage(isUpdating ? "Profile updated successfully!" : "Profile securely saved!");
      setIsUpdating(true);
      
    } catch (error) {
      console.error("Firebase Error:", error);
      setStatus("error");
      setMessage("Failed to save profile. Please try again.");
    }
  }

  if (loadingAuth) {
    return <p style={{ padding: "20px", textAlign: "center" }}>Loading profile...</p>;
  }

  if (!user) {
    return (
      <div style={{ maxWidth: "700px", margin: "50px auto", padding: "20px", textAlign: "center" }}>
        <h1 style={{ color: "#14532d" }}>Access Denied</h1>
        <p style={{ color: "#4b5563" }}>Please log in to view and edit your private farm profile.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#14532d" }}>{isUpdating ? "Update Farm Profile" : "My Farm Profile"}</h1>
      <p style={{ color: "#4b5563" }}>
        {isUpdating ? "Keep your details up to date for the best guidance." : "Add your farm details to receive better crop guidance."}
      </p>

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
          {status === "loading" ? "Saving..." : (isUpdating ? "Update Farm Profile" : "Save Farm Profile")}
        </button>

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