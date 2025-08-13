// src/pages/Orders.tsx
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

interface Order {
  id: string;
  amount: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoading) return;

    if (!auth.isAuthenticated) {
      auth.signinRedirect();
      return;
    }

    const idToken = auth.user?.id_token;
    if (!idToken) {
      console.error("⛔ No ID token found after login");
      return;
    }

    // Log ID Token length & string to verify in console
    console.log("🛡️ ID Token (length " + idToken.length + "):", idToken);

    // Optional: store token in localStorage for debugging
    localStorage.setItem("id_token", idToken);

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://7cokfkswfh.execute-api.ap-south-1.amazonaws.com/prod/orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 401) {
          console.error("❌ Unauthorized (401) — Check API Gateway Authorizer setup");
          console.log("Error body:", await res.text());
          return;
        }

        if (!res.ok) {
          console.error("❌ API error:", res.status);
          return;
        }

        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("🌐 Network error:", err);
      }
    };

    fetchOrders();
  }, [auth.isLoading, auth.isAuthenticated, auth.user]);

  return (
    <div>
      <h2>📦 Orders List</h2>
      {orders.length === 0 ? <p>Loading orders…</p> : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order #{order.id} — ₹{order.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;


