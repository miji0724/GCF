package com.gcf.spring.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.constant.Fee;
import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_Off;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.service.Off_programService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class Off_programController {
	
	private final Off_programService off_programService;
	
	  @GetMapping("/createOffProgram")
	  public ResponseEntity<String> test() {
	      OffProgram offProgram = new OffProgram();
	      List<String> dayOfWeek = new ArrayList<>();
	      dayOfWeek.add("월요일");
	      dayOfWeek.add("수요일");

	    	offProgram.setOffProgramNumber(1);
	    	offProgram.setOffProgramName("모담골 노는 학당");
	        offProgram.setRecruitmentstartDate(LocalDate.now());
	        offProgram.setRecruitmentendDate(LocalDate.now().plusWeeks(4));
	        offProgram.setOperatingStartDay(LocalDate.now().plusWeeks(5));
	        offProgram.setOperatingendDay(LocalDate.now().plusDays(20));
	        offProgram.setParticipationFee(Fee.무료);
	        offProgram.setStartTime(LocalTime.of(10, 0));
	        offProgram.setEndTime(LocalTime.of(16, 0));
	        offProgram.setMaxParticipants(30);
	        offProgram.setCurrentParticipants(0);
	        offProgram.setState(ProgramState.접수중);
	        offProgram.setDayOfWeek(dayOfWeek);
	        offProgram.setViews(0);
	        offProgram.setLikesCount(0);
	        offProgram.setOfflineCategory(Off_Category.체험);
	        offProgram.setPlaceName(Place.김포아트빌리지한옥마을);
	        offProgram.setProgramType(On_or_Off.오프라인);
	        offProgram.setTeacher("teacher1");
	
	      off_programService.makeOffProgram(offProgram);
	      return ResponseEntity.ok("테스트 유저");
	  }
}
