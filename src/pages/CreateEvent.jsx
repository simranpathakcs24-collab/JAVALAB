import React, { useState } from "react";
import api from "../api";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "", description: "", date: "", price: 0, location: "", capacity: 1, imageUrl: ""
  });
  const [msg, setMsg] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", form);
      setMsg("Event created successfully");
      setForm({ title: "", description: "", date: "", price: 0, location: "", capacity: 1, imageUrl: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to create");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg=red p-6 rounded shadow">
     <p style={{color:"red"}}><h2 className="text-3xl font-semibold mb-4 text-red">CREATE EVENTS</h2> </p>
      {msg && <div className="mb-3 p-2 bg-green-100 rounded">{msg}</div>}
      <form style={{backgroundColor:"#0aedff",padding:'20px',borderRadius:'10px'}} onSubmit={submit} className="grid gap-3">
        <input name="title" value={form.title} onChange={handle} placeholder="Title" className="p-2 border rounded" required />
        <input name="location" value={form.location} onChange={handle} placeholder="Location" className="p-2 border rounded" required />
        <input type="datetime-local" name="date" value={form.date} onChange={handle} className="p-2 border rounded" required />
        <input type="number" step="0.01" name="price" value={form.price} onChange={handle} className="p-2 border rounded" required />
        <input type="number" name="capacity" value={form.capacity} onChange={handle} className="p-2 border rounded" required />
        <input name="imageUrl" value={form.imageUrl} onChange={handle} placeholder="Image URL (optional)" className="p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handle} placeholder="Description" className="p-2 border rounded" />
        <button className="bg-red-600 text-white py-2 rounded">CREATE EVENT</button>
      </form>
     
    </div>
     
  );
}
