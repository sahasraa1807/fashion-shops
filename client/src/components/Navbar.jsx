import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const goCart = () => navigate("/cart");

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">Slice<span className="dot">.</span></Link>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <button className="cart-btn" onClick={goCart}>
          Cart ({cart.reduce((s, p) => s + p.qty, 0)})
        </button>

        {user ? (
          <>
            <span className="username">Hi, {user.name?.split(" ")[0] || "Lovely"}</span>
            <button className="logout-btn" onClick={() => { logout(); navigate("/"); }}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
