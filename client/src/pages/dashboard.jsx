import React from "react";
import { useAuth } from "../context/authContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div style={{ padding:40 }}>
      <h1>Welcome, {user?.name || "Lovely"} 💕</h1>
      <p>Admin / user controls can go here.</p>
    </div>
  );
}
