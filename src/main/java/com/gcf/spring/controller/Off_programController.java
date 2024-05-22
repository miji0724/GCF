package com.gcf.spring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gcf.spring.entity.Off_program;
import com.gcf.spring.service.Off_programService;

@RestController
@RequestMapping("/api/off_programs")
public class Off_programController {

    private final Off_programService offProgramService;

    @Autowired
    public Off_programController(Off_programService offProgramService) {
        this.offProgramService = offProgramService;
    }

    @GetMapping
    public List<Off_program> getAllPrograms() {
        return offProgramService.getAllPrograms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Off_program> getProgramById(@PathVariable int id) {
        Optional<Off_program> program = offProgramService.getProgramById(id);
        return program.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

  
}
