import { Link } from "react-router-dom";

function Home() {
  const buttonStyle = {
    display: "inline-block",
    textDecoration: "none",
    backgroundColor: "#166534",
    color: "white",
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
  };

  const cardStyle = {
    padding: "20px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    backgroundColor: "white",
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <section
        style={{
          backgroundColor: "#dcfce7",
          borderRadius: "16px",
          padding: "35px",
          marginBottom: "28px",
        }}
      >
        <p style={{ color: "#166534", fontWeight: "bold" }}>
          🌿 Your crop health assistant
        </p>

        <h1 style={{ fontSize: "40px", color: "#14532d", margin: "10px 0" }}>
          Welcome to AgroShield
        </h1>

        <p style={{ fontSize: "18px", maxWidth: "650px" }}>
          Detect crop problems early, get simple guidance, and connect with
          agricultural support.
        </p>

        <Link
          to="/report-problem"
          style={{
            ...buttonStyle,
            marginTop: "12px",
          }}
        >
          Report Crop Problem
        </Link>
      </section>

      <section>
        <h2 style={{ color: "#14532d" }}>Quick Actions</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "18px",
            marginTop: "18px",
          }}
        >
          <div style={cardStyle}>
            <h3>🚜 My Farm</h3>
            <p>Add or update your crop, location, and soil details.</p>
            <Link to="/profile" style={buttonStyle}>
              Add Crop Details
            </Link>
          </div>

          <div style={cardStyle}>
            <h3>📅 Crop Calendar</h3>
            <p>Identify your Rabi, Kharif, or Zaid growing season.</p>
            <Link to="/crop-calendar" style={buttonStyle}>
              View Calendar
            </Link>
          </div>

          <div style={cardStyle}>
            <h3>⚠️ Alerts</h3>
            <p>See seasonal disease and pest risk alerts for your crops.</p>
            <Link to="/alerts" style={buttonStyle}>
              View Alerts
            </Link>
          </div>

          <div style={cardStyle}>
            <h3>👩‍🌾 Get Support</h3>
            <p>Find agricultural experts, medicine shops, and centres.</p>
            <Link to="/experts" style={buttonStyle}>
              Find an Expert
            </Link>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2 style={{ color: "#14532d" }}>Today’s Crop Tip</h2>

        <div
          style={{
            backgroundColor: "#fffbeb",
            borderLeft: "5px solid #f59e0b",
            padding: "18px",
            borderRadius: "8px",
          }}
        >
          Inspect leaves regularly, especially their undersides. Early signs of
          insects, spots, or yellowing can help prevent major crop loss.
        </div>
      </section>
    </div>
  );
}

export default Home;