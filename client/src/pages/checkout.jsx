import React from "react";
import { useCart } from "../context/cartContext";
import "./checkout.css";

export default function Checkout() {
  const { cart, getTotal, clearCart } = useCart();

  const handleConfirm = () => {
    alert("Order placed! Thank you 💖");
    clearCart();
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <p>Total: ₹{getTotal()}</p>
      <button onClick={handleConfirm} className="confirm-btn">Confirm Order</button>
    </div>
  );
}
