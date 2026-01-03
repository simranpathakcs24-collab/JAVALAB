import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookList from "../components/BookList";

export default function StudentDashboard() {
  const [books, setBooks] = useState([]);
  const role = localStorage.getItem("role");
  const studentId = localStorage.getItem("studentId");



  const loadBooks = async () => {
    const res = await fetch("http://localhost:8080/books/all");
    setBooks(await res.json());
  };

  const borrow = async (bookId) => {
    await fetch(
      `http://localhost:8080/borrow/take?studentId=${studentId}&bookId=${bookId}&role=${role}`,
      { method: "POST" }
    );
    loadBooks();
  };

  useEffect(() => {
    loadBooks();
  }, []);
<>
  <Navbar />
  <div className="p-6"><BookList books={books} isAdmin={false} />

    {/* existing student content */}
  </div>
</>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      {books.map((b) => (
        <div key={b.id} className="border p-2 mb-2 flex justify-between">
          {b.title} ({b.availableCopies})
          <button
            disabled={b.availableCopies === 0}
            onClick={() => borrow(b.id)}
            className="bg-blue-500 text-white px-2 rounded disabled:opacity-50"
          >
            Borrow
          </button>
        </div>
      ))}
    </div>
  );
}
