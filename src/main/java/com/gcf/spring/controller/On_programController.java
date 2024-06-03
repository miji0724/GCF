package com.gcf.spring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gcf.spring.dto.On_ProgramDTO;
import com.gcf.spring.service.On_programService;

@RestController
@RequestMapping("/api/on_programs")
public class On_programController {

    private final On_programService onProgramService;

    @Autowired
    public On_programController(On_programService onProgramService) {
        this.onProgramService = onProgramService;
    }

    @GetMapping
    public List<On_ProgramDTO> getAllPrograms(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "4") int size) {
        return onProgramService.getAllPrograms(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<On_ProgramDTO> getProgramById(@PathVariable int id) {
        Optional<On_ProgramDTO> program = onProgramService.getProgramById(id);
        return program.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/filter")
    public List<On_ProgramDTO> searchByFilters(
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String name,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "4") int size) {
        return onProgramService.findFilteredPrograms(category, name, page, size);
    }

    @PostMapping("/{id}/updateStats")
    public ResponseEntity<Void> updateProgramStats(
        @PathVariable int id,
        @RequestParam(required = false, defaultValue = "false") boolean incrementViews,
        @RequestParam(required = false, defaultValue = "false") boolean incrementLikes,
        @RequestParam(required = false, defaultValue = "false") boolean toggleBookmark) {
        if (onProgramService.updateProgramStats(id, incrementViews, incrementLikes, toggleBookmark)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
