package com.gcf.spring.controller;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.service.OffProgramService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OffProgramController {

    private final OffProgramService offProgramService;

    @GetMapping("/createOffProgram")
    public ResponseEntity<String> createTestOffProgram() {
        OffProgram offProgram = new OffProgram();
        
        offProgram.setOffProgramNumber(1);
        offProgram.setOffProgramName("모담골 노는 학당");
        offProgram.setOffProgramDetailName("모담골 노는 학당 상세");
        offProgram.setApplicationInfo("프로그램 소개입니다.");
        offProgram.setApplicationStartDate(LocalDate.now());
        offProgram.setApplicationEndDate(LocalDate.now().plusWeeks(4));
        offProgram.setOperatingStartDay(LocalDate.now().plusWeeks(5));
        offProgram.setOperatingEndDay(LocalDate.now().plusDays(20));
        offProgram.setParticipationFee("무료");
        offProgram.setStartTime(LocalTime.of(10, 0));
        offProgram.setEndTime(LocalTime.of(16, 0));
        offProgram.setMaxParticipants(30);
        offProgram.setCurrentParticipants(0);
        offProgram.setState("접수중");
        offProgram.setDayOfWeek(Day_of_week.목요일);
        offProgram.setViews(0);
        offProgram.setLikesCount(0);
        offProgram.setOfflineCategory("체험");
        offProgram.setPlaceName("김포아트빌리지한옥마을");
        offProgram.setProgramType("오프라인");
        
        // Teacher, Poster 등 설정 생략

        offProgramService.makeOffProgram(offProgram);
        return ResponseEntity.ok("오프라인 프로그램이 성공적으로 생성되었습니다.");
    }
}
