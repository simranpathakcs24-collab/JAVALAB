import React, { useState } from "react";
import api from "../api";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
        role,
      });

      saveAuth(res.data);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.errors?.[0]?.msg || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

      {err && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded border border-red-300">
          {err}
        </div>
      )}

      <form onSubmit={submit} className="flex flex-col gap-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username (min 3 chars)"
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 8 chars)"
          type="password"
          className="w-full p-2 border rounded-lg"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="customer">Customer</option>
          <option value="manager">Manager</option>
        </select>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
