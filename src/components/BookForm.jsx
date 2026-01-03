import { useState } from "react";

export default function BookForm({ onBookAdded }) {
  const [title, setTitle] = useState("");
  const [totalCopies, setTotalCopies] = useState("");

  const role = localStorage.getItem("role");

  const addBook = async () => {
    if (!title || !totalCopies) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/books/add?role=${role}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          totalCopies: Number(totalCopies),
        }),
      }
    );

    if (!res.ok) {
      alert("Failed to add book");
      return;
    }

    setTitle("");
    setTotalCopies("");
    onBookAdded(); // refresh list
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-3">Add New Book</h2>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-32"
          type="number"
          placeholder="Copies"
          value={totalCopies}
          onChange={(e) => setTotalCopies(e.target.value)}
        />

        <button
          onClick={addBook}
          className="bg-green-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
