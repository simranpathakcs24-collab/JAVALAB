import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [copies, setCopies] = useState("");

  const role = localStorage.getItem("role");

  const loadBooks = async () => {
    const res = await fetch("http://localhost:8080/books/all");
    setBooks(await res.json());
  };

  const addBook = async () => {
    await fetch(`http://localhost:8080/books/add?role=${role}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        totalCopies: copies,
      }),
    });
    loadBooks();
  };

  const deleteBook = async (id) => {
    await fetch(
      `http://localhost:8080/books/delete/${id}?role=${role}`,
      { method: "DELETE" }
    );
    loadBooks();
  };

  useEffect(() => {
    loadBooks();
  }, []);


  return (<>
  <Navbar />
  <div className="p-6">
    {/* existing admin content */}
  </div>
    <div className="p-6 bg-gray-100 min-h-screen">
        <BookForm onBookAdded={loadBooks} />
        <BookList books={books} onDelete={deleteBook} isAdmin={true} />
      </div>

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-4">
        <input
          placeholder="Book Title"
          className="border p-2 mr-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Copies"
          type="number"
          className="border p-2 mr-2"
          onChange={(e) => setCopies(e.target.value)}
        />
        <button
          onClick={addBook}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Book
        </button>
      </div>

      <ul>
        {books.map((b) => (
          <li key={b.id} className="flex justify-between border p-2 mb-2">
            {b.title} ({b.availableCopies}/{b.totalCopies})
            <button
              onClick={() => deleteBook(b.id)}
              className="bg-red-500 text-white px-2 rounded"
            >
              Delete
            </button>
            <button
  onClick={() => window.location.href = "/register"}
  className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
>
  Register New User
</button>

          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
