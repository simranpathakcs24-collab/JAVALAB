import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
     <nav className="bg-black shadow">

      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-white">WELCOME TO EVENTS MANAGEMENT SYSTEM</Link>

        <div className="flex items-center gap-3">
          <Link to="/" className="md:inline text-white">HOME</Link>
          {user?.role === "manager" && (
            <Link to="/create" className="px-3 py-1 rounded border">CREATE EVENTS</Link>
          )}
          <Link to="/purchases" className="px-3 py-1 text-white rounded border">MY PURCHASES</Link>
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-1 text-white border rounded">LOGIN</Link>
              <Link to="/register" className="px-3 py-1 bg-red-600 text-white rounded">REGISTER-NEW USER</Link>
            </>
          ) : (
            <>
              <span className="px-3 py-1">Hi, {user.username}</span>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-600 text-black border rounded">LOG OUT</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
