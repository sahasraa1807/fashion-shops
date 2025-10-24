import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import heroImage from "../assets/hero.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-hero">
      <div className="hero-inner">
        {/* Left side: Text and button */}
        <div className="hero-content">
          <h1>Unleash Your Inner Glow ✨</h1>
          <p>Trendy, elegant, and exclusively for you.</p>
          <button className="hero-btn" onClick={() => navigate("/shop")}>
            Shop Now
          </button>
        </div>

        {/* Right side: Hero image */}
        <div className="hero-image">
          <img src={heroImage} alt="Hero" />
        </div>
      </div>
    </div>
  );
}
