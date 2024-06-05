package com.gcf.spring.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.gcf.spring.constant.Fee;
import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Teacher;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Off_ProgramDTO {
    private int offProgramNumber; // 프로그램 번호
    private String offProgramName; // 프로그램 이름
    private LocalDate recruitmentstartDate; // 모집 시작일
    private LocalDate recruitmentendDate; // 모집 종료일
    private LocalDate operatingStartDay; // 운영 시작일
    private LocalDate operatingendDay; // 운영 종료일
    private Fee participationFee; // 참가료
    private LocalTime startTime; // 운영 시작 시간
    private LocalTime endTime; // 운영 종료 시간
    private int maxParticipants; // 참가 제한 인원
    private int currentParticipants; // 현재 신청(참가) 인원
    private ProgramState state; // 강의 상태
    private List<String> dayOfWeek; // 강의 요일
    private int views; // 조회수
    private int likesCount; // 좋아요 수
    private Off_Category offlineCategory; // 오프라인 카테고리
    private Place placeName; // 장소명
    private On_or_OFF programType; // 프로그램 타입 (온라인/오프라인 구분)
    private Attachment poster; // 포스터 정보
    private List<Attachment> programInfos; // 프로그램 정보
    private List<Attachment> teacherInfos; // 강사 소개 파일
    private Teacher teacher; // 강사 ID
    

}
