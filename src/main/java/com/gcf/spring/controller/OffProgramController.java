package com.gcf.spring.controller;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.service.OffProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/offProgram")
public class OffProgramController {

    @Autowired
    private OffProgramService offProgramService;

    @PostMapping
    public ResponseEntity<OffProgram> createOffProgram(@RequestBody OffProgramDto offProgramDto) {
        OffProgram newOffProgram = offProgramService.createOffProgram(offProgramDto);
        return ResponseEntity.ok(newOffProgram);
    }
}
