import React, { useContext } from "react";
import { CartContext } from "../context/cartContext.jsx";

export default function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #ccc",
        marginBottom: "5px",
      }}
    >
      <div>
        <h4>{item.name}</h4>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity || 1}</p>
      </div>
      <button
        onClick={() => removeFromCart(item._id)}
        style={{
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "4px",
          height: "40px",
          alignSelf: "center",
        }}
      >
        Remove
      </button>
    </div>
  );
}
