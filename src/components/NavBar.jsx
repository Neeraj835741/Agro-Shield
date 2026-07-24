import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust this path if your firebase configuration file is located elsewhere

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen to Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);

  // Handle logging out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to homepage after logging out
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    fontSize: "15px",
    padding: "8px 12px",
    borderRadius: "8px",
    whiteSpace: "nowrap",
  };

  return (
    <nav
      style={{
        backgroundColor: "#166534",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          color: "white",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "6px",
            borderRadius: "50%",
            color: "#166534",
            display: "flex",
          }}
        >
          <Sprout size={24} />
        </div>

        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          AgroShield
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/profile" style={linkStyle}>My Farm</Link>
        <Link to="/report" style={linkStyle}>Diagnosis</Link>
        <Link to="/community" style={linkStyle}>Community</Link>
        <Link to="/support" style={linkStyle}>Nearby Support</Link>
        <Link to="/history" style={linkStyle}>Health History</Link>

        {/* CONDITIONAL RENDER: Show Logout if logged in, otherwise show Login */}
        {user ? (
          <button
            onClick={handleLogout}
            style={{
              border: "none",
              cursor: "pointer",
              color: "#ef4444", // Red text to indicate logout
              backgroundColor: "white",
              fontWeight: "bold",
              padding: "8px 20px",
              borderRadius: "20px",
              marginLeft: "12px",
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            style={{
              textDecoration: "none",
              color: "#166534",
              backgroundColor: "white",
              fontWeight: "bold",
              padding: "8px 20px",
              borderRadius: "20px",
              marginLeft: "12px",
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}
          >
            Farmer Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;