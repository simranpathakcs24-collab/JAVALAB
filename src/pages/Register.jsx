import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newRole, setNewRole] = useState("STUDENT");

  const navigate = useNavigate();
  const adminRole = localStorage.getItem("role");

  const register = async () => {
    const res = await fetch(
      `http://localhost:8080/auth/register?role=${adminRole}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          role: newRole,
        }),
      }
    );

    if (!res.ok) {
      alert("Registration failed");
      return;
    }

    alert("User registered successfully");
    navigate("/admin");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Register New User</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4"
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          onClick={register}
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Register User
        </button>
      </div>
    </div>
  );
}
