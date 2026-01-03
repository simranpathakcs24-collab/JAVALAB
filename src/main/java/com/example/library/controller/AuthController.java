package com.example.library.controller;
import com.example.library.entity.User;
import com.example.library.repository.StudentRepository;
import com.example.library.repository.UserRepository;
import com.example.library.entity.Student;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository repo;
    private final StudentRepository studentRepo;

    public AuthController(UserRepository repo, StudentRepository studentRepo) {
        this.repo = repo;
        this.studentRepo = studentRepo;
    }
    @PostMapping("/register")
public User register(@RequestBody User user,
                     @RequestParam String role) {

    // ONLY ADMIN CAN REGISTER USERS
    if (!role.equals("ADMIN")) {
        throw new RuntimeException("Only admin can register users");
    }

    repo.findByUsername(user.getUsername())
        .ifPresent(u -> {
            throw new RuntimeException("Username already exists");
        });

    if (!user.getRole().equals("ADMIN") && !user.getRole().equals("STUDENT")) {
        throw new RuntimeException("Invalid role");
    }
    
if (user.getRole().equals("STUDENT")) {
    Student s = new Student();
    s.setName(user.getUsername());
    studentRepo.save(s);
    user.setStudent(s);   
}

    return repo.save(user);
}


    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return repo.findByUsernameAndPassword(
                user.getUsername(), user.getPassword()
        ).orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
