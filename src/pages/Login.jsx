import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("Invalid login");
      return;
    }

    const user = await res.json();
    localStorage.setItem("role", user.role);
    
if (user.role === "STUDENT") {
  localStorage.setItem("studentId", user.student.id);
}

    localStorage.setItem("userId", user.id);

    user.role === "ADMIN" ? navigate("/admin") : navigate("/student");
  };
<>
  <Navbar />
  <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
    {/* existing student content */}
  </div>
</>

  return (


    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
