package com.gcf.spring.controller;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.service.OnProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/onProgram")
public class OnProgramController {

    @Autowired
    private OnProgramService onProgramService;

    @PostMapping
    public ResponseEntity<OnProgram> createOnProgram(@RequestBody OnProgramDto onProgramDto) {
        OnProgram createdOnProgram = onProgramService.createOnProgram(onProgramDto);
        return ResponseEntity.ok(createdOnProgram);
    }

    // 추가적인 엔드포인트가 필요하면 여기에 작성할 수 있습니다.
}
