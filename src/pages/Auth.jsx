import { useState } from "react";
import { useNavigate } from "react-router-dom";
// 👉 Adjust this import path if Person 2 named the file differently!
import { signIn, signUp } from "../services/authService"; 

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggles between login and signup
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      // Navigate to profile upon successful login/register as per instructions
      navigate("/"); 
    } catch (error) {
      console.error("Auth Error:", error);
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{isLogin ? "Farmer Login" : "Create Account"}</h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: "10px" }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: "10px" }}
        />
        
        <button type="submit" style={{ padding: "10px", backgroundColor: "#166534", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p style={{ marginTop: "20px", cursor: "pointer", color: "blue" }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Sign up here." : "Already have an account? Login here."}
      </p>
    </div>
  );
}

export default Auth;