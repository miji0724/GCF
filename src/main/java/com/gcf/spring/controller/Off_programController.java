package com.gcf.spring.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.dto.Off_ProgramDTO;
import com.gcf.spring.constant.Place;
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
    public List<Off_ProgramDTO> getAllPrograms() {
        return offProgramService.getAllPrograms();
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
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date
    ) {
        return offProgramService.findFilteredPrograms(state, placeName, category, name, date);
    }

}
