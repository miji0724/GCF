package com.gcf.spring.dto;

import java.sql.Date;
import java.sql.Time;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Target;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Off_programDto {

    
    @NotNull
    private int off_programNumber; //프로그램 번호
    
    @NotBlank(message="프로그램 이름은 필수 입력 값입니다.")
    private String off_program_name; //프로그램 이름
    
    @NotBlank(message="모집 시작/종료 일은 필수 입력 값입니다.")
    private Date recruitmentStartDate; //모집 시작
    
    @NotBlank(message="모집 시작/종료 일은 필수 입력 값입니다.")
    private Date recruitmentEndDate; //모집 종료
    
    @NotBlank(message="운영 시작/종료 일은 필수 입력 값입니다.")
    private Date operatingStartDay; //운영 시작
    
    @NotBlank(message="운영 시작/종료 일은 필수 입력 값입니다.")
    private Date operatingEndDay; //운영 종료
    
    @NotBlank(message="장소명은 필수 입력 값입니다.")
    private Place placeName; //장소명
    
    @NotBlank(message="참가대상은 필수 입력 값입니다.")
    private Target participationTarget; //참가대상
    
    @NotBlank(message="오프라인 카테고리는 필수 입력 값입니다.")
    private Off_Category offlineCategory; // 오프라인 카테고리
    
    @NotBlank(message="운영 시작/종료 시간은 필수 입력 값입니다.")
    private Time startTime; //운영 시작 시간
    
    @NotBlank(message="운영 시작/종료 시간은 필수 입력 값입니다.")
    private Time endTime; //운영 종료 시간
    
    @NotBlank(message="참가 제한 인원은 필수 입력 값입니다.")
    private int maxParticipants; //참가 제한 인원
    
    private int currentParticipants; // 현재 신청(참가) 인원
    
    private ProgramState state; //강의 상태
    
    private String dayOfWeek; // 강의 요일
    
    private int views; //조회수
    
    private int likesCount; //좋아요 수
    
    private String note; //비고란
    
    private Boolean bookmark; //북마크 여부
    
    private int participationFee; //참가료
}
