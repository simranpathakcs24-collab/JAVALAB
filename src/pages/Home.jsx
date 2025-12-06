import React, { useEffect, useState } from "react";
import api from "../api";
import EventCard from "../components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div bg-black p-6 rounded shadow>
      <h1 className="text-2xl font-bold mb-4 ">LIST OF EVENTS SCHEDULED</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {events.map(ev => <EventCard key={ev._id} event={ev} />)}
        </div>
      )}
    </div>
  );
}
