package com.example.library;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.library.entity.User;
import com.example.library.repository.UserRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadAdmin(UserRepository repo) {
        return args -> {

            if (repo.findByUsername("admin").isEmpty()) {

                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword("admin123");
                admin.setRole("ADMIN");

                repo.save(admin);
            }
        };
    }
}

