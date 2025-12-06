import React, { useState, useEffect } from "react";
import api from "../api";

export default function MyPurchases() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/purchases/me")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Purchases</h1>
      {orders.length === 0 && <div>No purchases found.</div>}
      <div className="grid gap-3">
        {orders.map(o => (
          <div key={o._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{o.eventId?.title}</div>
                <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div>₹{o.purchasePrice}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
