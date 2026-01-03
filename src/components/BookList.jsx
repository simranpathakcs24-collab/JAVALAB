export default function BookList({ books, onDelete, isAdmin }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Book List</h2>

      {books.length === 0 && (
        <p className="text-gray-500">No books available</p>
      )}

      <ul className="space-y-2">
        {books.map((book) => (
          <li
            key={book.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              <strong>{book.title}</strong>{" "}
              <span className="text-sm text-gray-600">
                ({book.availableCopies}/{book.totalCopies})
              </span>
            </span>

            {isAdmin && (
              <button
                onClick={() => onDelete(book.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
