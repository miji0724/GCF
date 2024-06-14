package com.gcf.spring.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.Teacher;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OffProgramDto {
    private Integer id; // 프로그램 번호
    private Member member; // 멤버들
    private Teacher teacher; // 강사 ID
    private String programName; // 프로그램명
    private String programDetailName; // 프로그램 상세명
    private String applicationInfo; // 모집안내
    private LocalDate applicationStartDate; // 프로그램 모집 시작일
    private LocalDate applicationEndDate; // 프로그램 모집 종료일
    private LocalDate operatingStartDay; // 프로그램 운영 시작일
    private LocalDate operatingEndDay; // 프로그램 운영 종료일
    private String participationFee; // 프로그램 참가료(프로그램별 상이, 없음)
    private LocalTime startTime; // 프로그램 시작 시간
    private LocalTime endTime; // 프로그램 종료 시간
    private Integer maxParticipants; // 프로그램 정원 수
    private Integer currentParticipants; // 프로그램 신청 현황
    private String applicationState; // 접수중, 접수마감
    private String approvalState; // 승인대기, 승인, 미승인
    private Day_of_week dayOfWeek; // 프로그램 요일
    private Integer views; // 프로그램 조회 수
    private Integer likesCount; // 프로그램 좋아요 수
    private String offlineCategory; // 프로그램 카테고리(교육, 체험)
    private String placeName; // 프로그램 장소명
    private String programType; // 프로그램 온/오프라인 구분
}