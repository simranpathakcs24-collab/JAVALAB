import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const fullDate = new Date(event.date).toLocaleString();

  return (
    <div className="bg-white shadow-soft rounded-xl p-4
  hover:shadow-xl hover:scale-[1.03]
  transition-all duration-300 cursor-pointer">

      <img src={event.imageUrl} alt={event.title} className="w-full md:w-48 h-40 object-cover rounded" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.location} · {fullDate}</p>
        <p className="mt-2">{event.description?.slice(0, 120)}...</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold">₹{event.price}</div>
          <Link to={`/events/${event._id}`} className="text-sm px-3 py-1 bg-blue-600 text-white rounded">View</Link>
        </div>
      </div>
    </div>
  );
}
