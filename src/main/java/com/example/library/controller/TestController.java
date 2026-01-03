package com.example.library.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
@RestController
@RequestMapping("/")
public class TestController {
    @GetMapping
    public String home() {
        return "Library Management System is running.";
    }
    
}
