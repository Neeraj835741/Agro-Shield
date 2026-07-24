import { useState } from "react";
import { Leaf, Mail, Lock, User, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggles between Login and Register modes
  const navigate = useNavigate();

  // State to hold input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Updates state when user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // TEAMMATE HANDOFF: They will replace this with Firebase code tomorrow
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting ${isLogin ? "Login" : "Register"} for:`, formData);
    
    // For now, pretend login is successful and go to dashboard
    alert(`${isLogin ? "Signing in" : "Creating account"} demo... (Teammate will connect this tomorrow!)`);
    navigate("/");
  };

  // Shared styles
  const inputContainerStyle = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    padding: "10px 14px",
    marginBottom: "16px",
    transition: "border-color 0.2s",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    width: "100%",
    fontSize: "16px",
    color: "#1f2937",
    fontFamily: "inherit",
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#f0fdf4", // Light green background
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }}>
      
      <div style={{
        backgroundColor: "white",
        width: "100%",
        maxWidth: "450px",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 10px 30px rgba(22, 101, 52, 0.1)",
        border: "1px solid #e5e7eb",
        animation: "fadeIn 0.5s ease-in-out"
      }}>
        
        {/* LOGO & HEADER */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px", textAlign: "center" }}>
          <div style={{ 
            backgroundColor: "#dcfce7", 
            padding: "16px", 
            borderRadius: "50%", 
            color: "#166534", 
            marginBottom: "16px",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
          }}>
            {isLogin ? <Sprout size={40} /> : <Leaf size={40} />}
          </div>
          <h1 style={{ color: "#14532d", margin: "0 0 4px 0", fontSize: "32px", fontWeight: "800" }}>
            AgroShield
          </h1>
          <p style={{ color: "#4b5563", margin: 0, fontSize: "16px" }}>
            {isLogin ? "Welcome back, Farmer! Sign in to continue." : "Start protectng your crops. Create an account."}
          </p>
        </div>

        {/* AUTH FORM */}
        <form onSubmit={handleSubmit}>
          
          {/* Name Input (Only shows for Registration) */}
          {!isLogin && (
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "6px", color: "#374151" }}>Full Name</label>
              <div style={inputContainerStyle}>
                <User size={18} color="#9ca3af" style={{ marginRight: "12px" }} />
                <input 
                  type="text" 
                  name="name"
                  required 
                  placeholder="e.g., Ravi Kumar" 
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyle} 
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "6px", color: "#374151" }}>Email Address</label>
            <div style={inputContainerStyle}>
              <Mail size={18} color="#9ca3af" style={{ marginRight: "12px" }} />
              <input 
                type="email" 
                name="email"
                required 
                placeholder="farmer@example.com" 
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyle} 
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: isLogin ? "10px" : "0" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "6px", color: "#374151" }}>Password</label>
            <div style={inputContainerStyle}>
              <Lock size={18} color="#9ca3af" style={{ marginRight: "12px" }} />
              <input 
                type="password" 
                name="password"
                required 
                placeholder="Minimum 6 characters" 
                value={formData.password}
                onChange={handleInputChange}
                minLength={6}
                style={inputStyle} 
              />
            </div>
          </div>

          {/* Forgot Password Link (Only shows for Login) */}
          {isLogin && (
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
              <button type="button" style={{ background: "none", border: "none", color: "#166534", fontSize: "14px", cursor: "pointer", fontWeight: "500", padding: 0 }}>
                Forgot Password?
              </button>
            </div>
          )}

          {/* Main Action Button */}
          <button type="submit" style={{
            width: "100%",
            backgroundColor: "#166534",
            color: "white",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: !isLogin ? "10px" : "0",
            transition: "all 0.2s",
            boxShadow: "0 4px 10px rgba(22, 101, 52, 0.2)"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#14532d"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#166534"}
          >
            {isLogin ? "Sign In to Dashboard" : "Create Farmer Account"}
          </button>
        </form>

        {/* TOGGLE LOGIN/REGISTER */}
        <p style={{ textAlign: "center", marginTop: "24px", color: "#6b7280", fontSize: "14px" }}>
          {isLogin ? "New to AgroShield?" : "Already have an account?"}
          {" "}
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              // Clear password when switching
              setFormData({...formData, password: ""});
            }}
            style={{ background: "none", border: "none", color: "#166534", fontWeight: "bold", cursor: "pointer", padding: 0, textDecoration: "underline" }}
          >
            {isLogin ? "Sign up now" : "Log in here"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default Auth;