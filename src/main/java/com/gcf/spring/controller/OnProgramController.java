package com.gcf.spring.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.service.OnProgramService;

@RestController
@RequestMapping("/api/on_programs")
public class OnProgramController {

    private final OnProgramService onProgramService;

    @Autowired
    public OnProgramController(OnProgramService onProgramService) {
        this.onProgramService = onProgramService;
    }

    @GetMapping
    public List<OnProgramDto> getAllPrograms(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "4") int size) {
        return onProgramService.getAllPrograms(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OnProgramDto> getProgramById(@PathVariable int id) {
        Optional<OnProgramDto> program = onProgramService.getProgramById(id);
        return program.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/filter")
    public List<OnProgramDto> searchByFilters(
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
        @RequestParam(required = false, defaultValue = "false") boolean incrementLikes) {
        if (onProgramService.updateProgramStats(id, incrementViews, incrementLikes)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/createOnProgram")
    public ResponseEntity<String> createOnProgram(@RequestBody OnProgram onProgram) {
        onProgramService.saveOnProgram(onProgram);
        return ResponseEntity.ok("온라인 프로그램이 생성되었습니다.");
    }
    
    @GetMapping("/createOnProgramSample")
    public ResponseEntity<String> createOnProgramSample() {
        OnProgram onProgram = new OnProgram();
        onProgram.setOnProgramName("예시 온라인 프로그램");
        onProgram.setOperatingStartDay(LocalDate.now());
        onProgram.setViews(0);
        onProgram.setLikesCount(0);
        onProgram.setOnlineCategory("카테고리1, 카테고리2");
        onProgram.setProgramType("온라인");

        onProgramService.saveOnProgram(onProgram);
        return ResponseEntity.ok("예시 온라인 프로그램이 생성되었습니다.");
    }
}
