// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));
app.use(express.json());

// ✅ Mock user database (replace with real DB later)
const mockUser = {
  name: "Test User",
  email: "test@example.com",
  password: "123456", // NEVER store plain passwords in real apps
  token: "fake-jwt-token-123"
};

// ✅ Routes

// Login route
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (email === mockUser.email && password === mockUser.password) {
    return res.json({
      name: mockUser.name,
      email: mockUser.email,
      token: mockUser.token
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// Example test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
