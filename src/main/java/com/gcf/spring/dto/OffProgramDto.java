package com.gcf.spring.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OffProgramDto {
	private String teacherId;
	private Teacher teacher; // 강사 ID
	private String programName; // 프로그램명
	private String programDetailName; // 프로그램 상세명
	private String application_info; // 프로그램 소개
	private LocalDate applicationStartDate; // 프로그램 모집 시작일
	private LocalDate applicationEndDate; // 프로그램 모집 종료일
	private LocalDate operatingStartDay; // 프로그램 운영 시작일
	private LocalDate operatingEndDay; // 프로그램 운영 종료일
	private String participationFee; // 프로그램 참가료(프로그램별 상이, 없음)
	private LocalTime startTime; // 프로그램 시작 시간
	private LocalTime endTime; // 프로그램 종료 시간
	private Integer maxParticipants; // 프로그램 정원 수
	private Integer currentParticipants = 0; // 프로그램 신청 현황 0명
	private String applicationState; // 접수중, 접수마감
	private String approvalState; // 승인, 미승인, 승인대기
	private Day_of_week dayOfWeek; // 프로그램 요일
	private Integer views = 0; // 프로그램 조회 수
	private Integer likesCount = 0; // 프로그램 좋아요 수
	private String category; // 프로그램 카테고리(교육, 체험)
	private String placeName; // 프로그램 장소명
	private String programType; // 프로그램 온/오프라인 구분
	private Attachment poster; // 프로그램 포스터 정보
	private Integer posterId;
	private List<ProgramInfo> programInfos; // 교육 소개 파일
	private List<TeacherInfo> teacherInfos; // 강사 소개 파일
}