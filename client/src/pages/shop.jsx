import React from "react";
import "./shop.css";
import dress1 from "../assets/images/dress1.jpeg";
import dress2 from "../assets/images/dress2.jpeg";
import dress3 from "../assets/images/dress3.jpeg";
import dress4 from "../assets/images/dress4.jpeg";
import { useCart } from "../context/cartContext.jsx";

const products = [
  { id: 1, name: "Floral Summer Dress", price: 799, image: dress1 },
  { id: 2, name: "Pink Anarkali Set", price: 4999, image: dress2 },
  { id: 3, name: "Casual Chic Top", price: 499, image: dress3 },
  { id: 4, name: "Elegant Saree", price: 2499, image: dress4 },
];

const Shop = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const getQty = (id) => {
    const item = cart.find((p) => p.id === id);
    return item ? item.qty : 0;
  };

  return (
    <div className="shop-container">
      <h1>✨ Our Latest Collection ✨</h1>
      <div className="product-grid">
        {products.map((item) => {
          const qty = getQty(item.id);

          return (
            <div key={item.id} className="product-card">
              <div className="img-wrap">
                <img src={item.image} alt={item.name} />
              </div>
              <h2>{item.name}</h2>
              <p className="price">₹{item.price}</p>

              {qty === 0 ? (
                <button className="add-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              ) : (
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => removeFromCart(item)}>
                    -
                  </button>
                  <span className="qty">{qty}</span>
                  <button className="qty-btn" onClick={() => addToCart(item)}>
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
