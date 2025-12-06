import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { getUser } from "../utils/auth";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [qtyPrice, setQtyPrice] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const buy = async () => {
    setMessage("");
    try {
      const res = await api.post("/purchases", { eventId: id, purchasePrice: event.price });
      setMessage("Purchase successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Purchase failed");
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={event.imageUrl} alt={event.title} className="w-full md:w-80 h-64 object-cover rounded" />
        <div>
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()} · {event.location}</p>
          <p className="mt-3">{event.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-xl font-semibold">₹{event.price}</div>
            <button onClick={buy} className="bg-blue-600 text-white px-4 py-2 rounded">Buy</button>
          </div>
          {message && <div className="mt-3 p-2 bg-yellow-100 rounded">{message}</div>}
        </div>
      </div>
    </div>
  );
}
