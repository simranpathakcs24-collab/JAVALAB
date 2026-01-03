package com.example.library.entity;

import jakarta.persistence.*;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private int totalCopies;
    private int availableCopies;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public int getAvailableCopies() { return availableCopies; }
     public int getTotalCopies() { return totalCopies; }
    public void setTitle(String title) { this.title = title; }
    public void setAvailableCopies(int availableCopies) {
        this.availableCopies = availableCopies;
    }
    public void setTotalCopies(int totalCopies) {
        this.totalCopies = totalCopies;
    }
}
