import { useState } from "react";

function Experts() {
  const [selectedType, setSelectedType] = useState("All");

  const supportList = [
    {
      type: "Agricultural Expert",
      name: "Dr. Anjali Sharma",
      place: "Krishi Vigyan Kendra, Pune",
      contact: "+91 98765 43210",
    },
    {
      type: "Medicine Shop",
      name: "Green Field Agro Store",
      place: "Market Road, Pune",
      contact: "+91 91234 56789",
    },
    {
      type: "Government Centre",
      name: "Agriculture Department Help Centre",
      place: "District Office, Pune",
      contact: "1800-180-1551",
    },
    {
      type: "Agricultural Expert",
      name: "Mr. Ramesh Patil",
      place: "Farmer Support Office, Nashik",
      contact: "+91 99887 76655",
    },
  ];

  const visibleSupport =
    selectedType === "All"
      ? supportList
      : supportList.filter((item) => item.type === selectedType);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1>Experts & Nearby Support</h1>
      <p>Find agricultural experts, medicine shops, and government centres.</p>

      <select
        value={selectedType}
        onChange={(event) => setSelectedType(event.target.value)}
        style={{
          padding: "12px",
          marginTop: "18px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
        }}
      >
        <option value="All">All support services</option>
        <option value="Agricultural Expert">Agricultural Experts</option>
        <option value="Medicine Shop">Medicine Shops</option>
        <option value="Government Centre">Government Centres</option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "18px",
          marginTop: "25px",
        }}
      >
        {visibleSupport.map((item) => (
          <article
            key={`${item.name}-${item.type}`}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            <p style={{ color: "#166534", fontWeight: "bold" }}>
              {item.type}
            </p>

            <h2 style={{ color: "#14532d", margin: "8px 0" }}>
              {item.name}
            </h2>

            <p>📍 {item.place}</p>
            <p>📞 {item.contact}</p>

            <button
              onClick={() => alert(`Calling ${item.name}: ${item.contact}`)}
              style={{
                backgroundColor: "#166534",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 14px",
                cursor: "pointer",
              }}
            >
              Contact Support
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Experts;