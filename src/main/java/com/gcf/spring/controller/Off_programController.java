package com.gcf.spring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Place;
import com.gcf.spring.dto.Off_programDto;
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
    public List<Off_programDto> getAllPrograms() {
        return offProgramService.getAllPrograms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Off_programDto> getProgramById(@PathVariable int id) {
        Optional<Off_programDto> program = offProgramService.getProgramById(id);
        return program.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @GetMapping("/filter")
    public List<Off_programDto> searchByFilters(
        @RequestParam(required = false) ProgramState state,
        @RequestParam(required = false) Place placeName,
        @RequestParam(required = false) Off_Category category,
        @RequestParam(required = false) String name
    ) {
        return offProgramService.findFilteredPrograms(
            state,
            placeName,
            category,
            name
        );
    }
}
