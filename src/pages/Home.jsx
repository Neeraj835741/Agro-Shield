import { Link } from "react-router-dom";
import { 
  Camera, 
  Map, 
  CalendarDays, 
  AlertTriangle, 
  Stethoscope, 
  Sprout, 
  Info 
} from "lucide-react";
import ScarecrowCanvas from "../components/Scarecrow3D";

function Home() {
  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    backgroundColor: "#166534", 
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
    marginTop: "10px",
    width: "max-content",
    transition: "transform 0.2s",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  };

  const cardStyle = {
    padding: "24px",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    backgroundColor: "white", 
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", 
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  const iconStyle = {
    color: "#166534",
    padding: "8px",
    backgroundColor: "#dcfce7",
    borderRadius: "10px",
    width: "fit-content",
  };

  return (
    <div style={{ minHeight: "80vh", maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      
      {/* Hero Section - Flex Row Layout */}
      <section
        style={{
          backgroundColor: "#166534",
          color: "white", 
          borderRadius: "20px",
          padding: "40px",
          marginBottom: "32px",
          display: "flex",
          flexDirection: "row", // Aligns items side-by-side
          justifyContent: "space-between",
          alignItems: "center",
          gap: "30px",
          flexWrap: "wrap", // Allows it to stack on mobile phones
          boxShadow: "0 10px 20px rgba(22, 101, 52, 0.2)"
        }}
      >
        {/* Left Side: Text and Buttons */}
        <div style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Sprout size={32} color="#4ade80" />
            <p style={{ fontWeight: "bold", margin: 0, color: "#4ade80", fontSize: "18px" }}>
              AgroShield Assistant
            </p>
          </div>

          <h1 style={{ fontSize: "42px", margin: 0, lineHeight: "1.2" }}>
            Protect your crops.<br />Maximize your yield.
          </h1>

          <p style={{ fontSize: "18px", maxWidth: "550px", margin: 0, color: "#dcfce7" }}>
            Detect crop diseases early, access real-time seasonal alerts, and connect with agricultural experts instantly.
          </p>

          <Link
            to="/report-problem"
            style={{
              ...buttonStyle,
              backgroundColor: "white", 
              color: "#166534",
              fontSize: "18px"
            }}
          >
            <Camera size={20} />
            Scan Crop Now
          </Link>
        </div>

        {/* Right Side: 3D Scarecrow Mascot */}
        <div style={{ width: "250px", height: "250px", flexShrink: 0 }}>
          <ScarecrowCanvas />
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section>
        <h2 style={{ color: "#14532d", marginBottom: "20px" }}>
          Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Card 1 */}
          <div style={cardStyle}>
            <div style={iconStyle}><Map size={24} /></div>
            <h3 style={{ margin: "5px 0", color: "#14532d" }}>My Farm</h3>
            <p style={{ margin: 0, color: "#374151" }}>Update your location, soil type, and current crops.</p>
            <Link to="/profile" style={{...buttonStyle, marginTop: "auto"}}>Update Details</Link>
          </div>

          {/* Card 2 */}
          <div style={cardStyle}>
            <div style={iconStyle}><CalendarDays size={24} /></div>
            <h3 style={{ margin: "5px 0", color: "#14532d" }}>Crop Calendar</h3>
            <p style={{ margin: 0, color: "#374151" }}>Track Kharif, Rabi, and Zaid growing seasons.</p>
            <Link to="/crop-calendar" style={{...buttonStyle, marginTop: "auto"}}>View Calendar</Link>
          </div>

          {/* Card 3 */}
          <div style={cardStyle}>
            <div style={{...iconStyle, backgroundColor: "#fee2e2", color: "#b91c1c"}}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ margin: "5px 0", color: "#b91c1c" }}>Seasonal Alerts</h3>
            <p style={{ margin: 0, color: "#374151" }}>Check active pest and disease warnings in your area.</p>
            <Link to="/alerts" style={{...buttonStyle, backgroundColor: "#b91c1c", marginTop: "auto"}}>
              Check Alerts
            </Link>
          </div>

          {/* Card 4 */}
          <div style={cardStyle}>
            <div style={{...iconStyle, backgroundColor: "#e0f2fe", color: "#0369a1"}}>
              <Stethoscope size={24} />
            </div>
            <h3 style={{ margin: "5px 0", color: "#0369a1" }}>Get Support</h3>
            <p style={{ margin: 0, color: "#374151" }}>Contact nearby experts and medicine shops.</p>
            <Link to="/experts" style={{...buttonStyle, backgroundColor: "#0369a1", marginTop: "auto"}}>
              Find Experts
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Tip Section */}
      <section style={{ marginTop: "40px" }}>
        <div
          style={{
            backgroundColor: "#fffbeb", 
            border: "1px solid #fef3c7",
            borderLeft: "6px solid #f59e0b",
            padding: "20px",
            borderRadius: "16px",
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
          }}
        >
          <Info size={28} color="#d97706" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ margin: "0 0 8px 0", color: "#92400e" }}>Today’s Crop Tip</h3>
            <p style={{ margin: 0, color: "#78350f" }}>
              Inspect leaves regularly, especially their undersides. Early signs of insects, spots, or yellowing can help prevent major crop loss before it spreads to the rest of the field.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;