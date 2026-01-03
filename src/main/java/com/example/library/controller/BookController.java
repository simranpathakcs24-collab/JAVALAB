package com.example.library.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.library.entity.Book;
import com.example.library.service.BookService;

@RestController
@RequestMapping("/books")
@CrossOrigin
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    // ADMIN ONLY
    @PostMapping("/add")
    public Book add(@RequestBody Book book, @RequestParam String role) {
        if (!role.equals("ADMIN")) {
            throw new RuntimeException("Access denied");
        }
        return service.addBook(book);
    }

    // ADMIN ONLY
    @PutMapping("/update/{id}")
    public Book update(@PathVariable Long id,
                       @RequestBody Book book,
                       @RequestParam String role) {
        if (!role.equals("ADMIN")) {
            throw new RuntimeException("Access denied");
        }
        return service.updateBook(id, book);
    }

    // ADMIN ONLY
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id,
                       @RequestParam String role) {
        if (!role.equals("ADMIN")) {
            throw new RuntimeException("Access denied");
        }
        service.deleteBook(id);
    }

    // STUDENT & ADMIN
    @GetMapping("/all")
    public List<Book> all() {
        return service.getAll();
    }
}
