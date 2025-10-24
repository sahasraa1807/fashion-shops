// src/components/productCard.jsx
import React from "react";
import "./productCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="img-wrapper">
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
