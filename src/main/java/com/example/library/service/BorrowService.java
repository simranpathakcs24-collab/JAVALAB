package com.example.library.service;
import com.example.library.entity.Book;
import com.example.library.entity.Borrow;
import com.example.library.entity.Student;
import com.example.library.repository.BookRepository;
import com.example.library.repository.BorrowRepository;
import com.example.library.repository.StudentRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class BorrowService {

    private final BorrowRepository borrowRepo;
    private final BookRepository bookRepo;
    private final StudentRepository studentRepo;

    public BorrowService(BorrowRepository b,
                         BookRepository bk,
                         StudentRepository s) {
        borrowRepo = b;
        bookRepo = bk;
        studentRepo = s;
    }

    public Borrow borrowBook(Long studentId, Long bookId) {

        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getAvailableCopies() <= 0) {
            throw new RuntimeException("Book not available");
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepo.save(book);

        Borrow borrow = new Borrow();
        borrow.setStudent(student);
        borrow.setBook(book);
        borrow.setBorrowDate(LocalDate.now());
        borrow.setReturned(false);
        borrow.setFine(0);

        return borrowRepo.save(borrow);
    }

    public Borrow returnBook(Long borrowId) {

        Borrow borrow = borrowRepo.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        if (borrow.isReturned()) {
            throw new RuntimeException("Already returned");
        }

        LocalDate today = LocalDate.now();
        long days = ChronoUnit.DAYS.between(borrow.getBorrowDate(), today);

        if (days > 7) {
            borrow.setFine((days - 7) * 10);
        }

        borrow.setReturned(true);
        borrow.setReturnDate(today);

        Book book = borrow.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepo.save(book);

        return borrowRepo.save(borrow);
    }
}
