package com.gcf.spring.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.Teacher;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OffProgramDto {
	private String programName;
	private Member member; // Member 추가
	private Teacher teacher;
	private String programDetailName;
	private String application_info;
	private LocalDate applicationStartDate;
	private LocalDate applicationEndDate;
	private LocalDate operatingStartDay;
	private LocalDate operatingEndDay;
	private String participationFee;
	private LocalTime startTime;
	private LocalTime endTime;
	private Integer maxParticipants;
	private Integer currentParticipants;
	private String applicationState;
	private String approvalState;
	private Day_of_week dayOfWeek;
	private Integer views;
	private Integer likesCount;
	private String offlineCategory;
	private String placeName;
	private String programType;
}
