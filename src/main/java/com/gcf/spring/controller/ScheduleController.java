package com.gcf.spring.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.entity.Off_program;
import com.gcf.spring.service.ScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ScheduleController {
	
	private final ScheduleService scheduleService;
	
	// 날짜를 입력받아서, 운영 기간 내에 입력받은 날짜가 포함되는 프로그램 가져오기
    @GetMapping("/programsByDate")
    public String getProgramsByDate(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            Model model) {
        List<Off_program> programs = scheduleService.getProgramsByDate(date);
        model.addAttribute("programs", programs);
        model.addAttribute("date", date);
        return "programsByDate";
    }
}
