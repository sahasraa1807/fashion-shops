import React from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const { cart, addToCart, removeFromCart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty">Your cart is empty 💕</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="meta">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <div className="qty-control">
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <div>{item.qty}</div>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹{getTotal()}</h2>
            <button className="checkout" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
            <button className="clear" onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}
