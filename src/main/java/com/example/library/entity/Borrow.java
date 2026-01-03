package com.example.library.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
public class Borrow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Book book;

    private LocalDate borrowDate;
    private LocalDate returnDate;
    private boolean returned;
    private double fine;

    // GETTERS
    public Long getId() { return id; }
    public Student getStudent() { return student; }
    public Book getBook() { return book; }
    public LocalDate getBorrowDate() { return borrowDate; }
    public LocalDate getReturnDate() { return returnDate; }
    public boolean isReturned() { return returned; }
    public double getFine() { return fine; }

    // SETTERS
    public void setStudent(Student student) { this.student = student; }
    public void setBook(Book book) { this.book = book; }
    public void setBorrowDate(LocalDate borrowDate) { this.borrowDate = borrowDate; }
    public void setReturnDate(LocalDate returnDate) { this.returnDate = returnDate; }
    public void setReturned(boolean returned) { this.returned = returned; }
    public void setFine(double fine) { this.fine = fine; }
}
