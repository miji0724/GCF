package com.gcf.spring.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
public class MainController {
    @GetMapping("/home")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("home");
    }
}
