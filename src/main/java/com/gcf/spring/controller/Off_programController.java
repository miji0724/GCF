package com.gcf.spring.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.dto.Off_ProgramDTO;
import com.gcf.spring.service.Off_programService;

@RestController
@RequestMapping("/api/off_programs")
public class Off_programController {

    private final Off_programService offProgramService;
    private final ObjectMapper objectMapper; // ObjectMapper를 Bean으로 주입받음

    @Autowired
    public Off_programController(Off_programService offProgramService, ObjectMapper objectMapper) {
        this.offProgramService = offProgramService;
        this.objectMapper = objectMapper;
    }


    
    @GetMapping
    public List<Off_ProgramDTO> getAllPrograms(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "4") int size) {
        return offProgramService.getAllPrograms(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Off_ProgramDTO> getProgramById(@PathVariable int id) {
        Optional<Off_ProgramDTO> program = offProgramService.getProgramById(id);
        return program.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/filter")
    public List<Off_ProgramDTO> searchByFilters(
        @RequestParam(required = false) ProgramState state,
        @RequestParam(required = false) Place placeName,
        @RequestParam(required = false) Off_Category category,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "4") int size) {
        return offProgramService.findFilteredPrograms(state, placeName, category, name, date, page, size);
    }

    @PostMapping("/{id}/updateStats")
    public ResponseEntity<Void> updateProgramStats(
        @PathVariable int id,
        @RequestParam(required = false, defaultValue = "false") boolean incrementViews,
        @RequestParam(required = false, defaultValue = "false") boolean incrementLikes,
        @RequestParam(required = false, defaultValue = "false") boolean toggleBookmark) {
        if (offProgramService.updateProgramStats(id, incrementViews, incrementLikes, toggleBookmark)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
