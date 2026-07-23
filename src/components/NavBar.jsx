import { Link } from "react-router-dom";

function Navbar() {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
  };

  return (
    <nav
      style={{
        backgroundColor: "#166534",
        padding: "16px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        🌿 AgroShield
      </Link>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        <Link to="/profile" style={linkStyle}>
          My Farm
        </Link>

        <Link to="/crop-calendar" style={linkStyle}>
          Crop Calendar
        </Link>

        <Link to="/report-problem" style={linkStyle}>
          Report Problem
        </Link>

        <Link to="/alerts" style={linkStyle}>
            Alerts
        </Link>
        <Link to="/health-history" style={linkStyle}>
          Health History
        </Link>

        <Link to="/experts" style={linkStyle}>
        Experts
        </Link>

        <Link to="/community" style={linkStyle}>
        Community
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;