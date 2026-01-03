package com.example.library.controller;
import com.example.library.entity.Borrow;
import com.example.library.service.BorrowService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/borrow")
@CrossOrigin
public class BorrowController {

    private final BorrowService service;

    public BorrowController(BorrowService service) {
        this.service = service;
    }

    // STUDENT ONLY
    @PostMapping("/take")
    public Borrow borrow(@RequestParam Long studentId,
                         @RequestParam Long bookId,
                         @RequestParam String role) {
        if (!role.equals("STUDENT")) {
            throw new RuntimeException("Only students can borrow books");
        }
        return service.borrowBook(studentId, bookId);
    }

    // STUDENT ONLY
    @PostMapping("/return/{borrowId}")
    public Borrow returnBook(@PathVariable Long borrowId,
                             @RequestParam String role) {
        if (!role.equals("STUDENT")) {
            throw new RuntimeException("Only students can return books");
        }
        return service.returnBook(borrowId);
    }
}
