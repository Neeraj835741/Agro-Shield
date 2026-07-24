import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    fontSize: "15px",
    padding: "6px 8px",
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
        gap: "10px",
        flexWrap: "nowrap",
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

        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          {t("appName")}
        </span>
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          flexWrap: "nowrap",
          marginLeft: "auto",
        }}
      >
        <Link to="/" style={linkStyle}>{t("home")}</Link>
        <Link to="/profile" style={linkStyle}>{t("profile")}</Link>
        <Link to="/report" style={linkStyle}>{t("reportProblem")}</Link>
        <Link to="/community" style={linkStyle}>{t("community")}</Link>
        <Link to="/support" style={linkStyle}>{t("experts")}</Link>
        <Link to="/history" style={linkStyle}>{t("history")}</Link>

        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          aria-label={t("language")}
          style={{
            padding: "7px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
            color: "#14532d",
          }}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>

        {user ? (
          <button
            onClick={handleLogout}
            style={{
              border: "none",
              cursor: "pointer",
              color: "#b91c1c",
              backgroundColor: "white",
              fontWeight: "bold",
              padding: "8px 14px",
              borderRadius: "20px",
              fontSize: "14px",
            }}
          >
            {t("logout")}
          </button>
        ) : (
          <Link
            to="/auth"
            style={{
              textDecoration: "none",
              color: "#166534",
              backgroundColor: "white",
              fontWeight: "bold",
              padding: "8px 14px",
              borderRadius: "20px",
              fontSize: "14px",
            }}
          >
            {t("login")}
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;