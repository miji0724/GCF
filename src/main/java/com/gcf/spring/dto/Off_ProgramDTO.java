package com.gcf.spring.dto;

import java.sql.Date;
import java.sql.Time;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Target;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Off_ProgramDTO {
    private int off_program_number; // 프로그램 번호
    private String off_program_name; // 프로그램 이름
    private Date recruitment_start_date; // 모집 시작일
    private Date recruitment_end_date; // 모집 종료일
    private Date operating_start_day; // 운영 시작일
    private Date operating_end_day; // 운영 종료일
    private Target participation_target; // 참가 대상
    private int participation_fee; // 참가료
    private Time start_time; // 운영 시작 시간
    private Time end_time; // 운영 종료 시간
    private int max_participants; // 참가 제한 인원
    private int current_participants; // 현재 신청(참가) 인원
    private ProgramState state; // 강의 상태
    private String day_of_week; // 강의 요일
    private int views; // 조회수
    private int likes_count; // 좋아요 수
    private Off_Category offline_category; // 오프라인 카테고리
    private String note; // 비고란
    private Place place_name; // 장소명
    private Boolean bookmark; // 북마크 여부
    private On_or_OFF program_type; // 프로그램 타입 (온라인/오프라인 구분)
    private PosterDTO poster; // 포스터 정보
}
