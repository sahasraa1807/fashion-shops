import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./login.css";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/shop";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    // call backend login
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.message || "Invalid credentials");
        return;
      }
      // backend returns token + user info — adjust based on your backend
      // if your backend returns user object directly, use that
      // here we expect data contains name, email, token, etc.
      login(data); // store in context
      navigate(from, { replace: true });
    } catch (error) {
      setErr("Network error — try again");
      console.error(error);
    }
  };

  return (
    <div className="login-outer">
      <div className="login-box">
        <h2>Welcome Back 💖</h2>
        <p>Login to continue shopping</p>
        <form onSubmit={handleSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
          <button type="submit">Login</button>
        </form>
        {err && <div className="error">{err}</div>}
      </div>
    </div>
  );
}
