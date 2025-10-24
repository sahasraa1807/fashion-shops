import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { AuthContext } from "../context/authContext.jsx";

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                Order ID: {order._id} | Total: ${order.total} | Items:{" "}
                {order.items.map((i) => i.name).join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}
