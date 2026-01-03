package com.example.library.service;
import com.example.library.entity.Book;
import com.example.library.repository.BookRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {

    private final BookRepository repo;

    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public Book addBook(Book b) {
        b.setAvailableCopies(b.getTotalCopies());
        return repo.save(b);
    }

    public Book updateBook(Long id, Book updated) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(updated.getTitle());
        book.setTotalCopies(updated.getTotalCopies());
        book.setAvailableCopies(updated.getAvailableCopies());

        return repo.save(book);
    }

    public void deleteBook(Long id) {
        repo.deleteById(id);
    }

    public List<Book> getAll() {
        return repo.findAll();
    }
}
