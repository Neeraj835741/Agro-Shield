import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

function Navbar() {
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    fontSize: "15px",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "background-color 0.2s"
  };

  return (
    <nav style={{
      backgroundColor: "#166534", // Dark green theme
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // Pushes logo to left, links to right
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 50
    }}>
      
      {/* LEFT SIDE: Logo & App Name */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "white" }}>
        <div style={{ backgroundColor: "white", padding: "6px", borderRadius: "50%", color: "#166534", display: "flex" }}>
          <Sprout size={24} />
        </div>
        <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "0.5px" }}>AgroShield</span>
      </Link>

      {/* RIGHT SIDE: Navigation Links & Login Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        
        {/* Standard Links */}
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/profile" style={linkStyle}>My Farm</Link>
        <Link to="/report" style={linkStyle}>Diagnosis</Link>
        <Link to="/community" style={linkStyle}>Community</Link>
        <Link to="/support" style={linkStyle}>Nearby Support</Link>
        
        {/* THE NEW LOGIN BUTTON (Added right here at the end!) */}
        <Link to="/auth" style={{
          textDecoration: "none",
          color: "#166534",
          backgroundColor: "white", 
          fontWeight: "bold",
          padding: "8px 20px",
          borderRadius: "20px",
          marginLeft: "12px", // Adds a little extra space before the login button
          fontSize: "14px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.2s"
        }}
        onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        >
          Farmer Login
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;