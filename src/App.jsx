import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Register from "./pages/Register";

const role = localStorage.getItem("role");



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={role === "ADMIN" ? <AdminDashboard /> : <Login />}
/>

<Route path="/student" element={role === "STUDENT" ? <StudentDashboard /> : <Login />}
/>

      </Routes>
    </BrowserRouter>
  );
}
