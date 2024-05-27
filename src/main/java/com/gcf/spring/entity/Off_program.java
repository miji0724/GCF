package com.gcf.spring.entity;

import java.sql.Date;
import java.sql.Time;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Target;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "off_program")
@Getter
@Setter
public class Off_program {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "off_program_number", nullable = false)
	private int off_programNumber; // 프로그램 번호

	@Column(name = "off_program_name", nullable = false)
	private String off_program_name; // 프로그램 이름

	@Column(name = "recruitment_start_date", nullable = false)
	private Date recruitmentStartDate; // 모집 시작일

	@Column(name = "recruitment_end_date", nullable = false)
	private Date recruitmentEndDate; // 모집 종료일

	@Column(name = "operating_start_day", nullable = false)
	private Date operatingStartDay; // 운영 시작일

	@Column(name = "operating_end_day", nullable = false)
	private Date operatingEndDay; // 운영 종료일

	@Enumerated(EnumType.STRING)
	@Column(name = "participation_target", nullable = false)
	private Target participationTarget; // 참가 대상

	@Column(name = "participation_fee")
	private int participationFee; // 참가료

	@Column(name = "start_time", nullable = false)
	private Time startTime; // 운영 시작 시간

	@Column(name = "end_time", nullable = false)
	private Time endTime; // 운영 종료 시간

	@Column(name = "max_participants", nullable = false)
	private int maxParticipants; // 참가 제한 인원

	@Column(name = "current_participants")
	private int currentParticipants; // 현재 신청(참가) 인원

	@Enumerated(EnumType.STRING)
	@Column(name = "state")
	private ProgramState state; // 강의 상태

	@Column(name = "day_of_week", nullable = false)
	private String dayOfWeek; // 강의 요일

	@Column(name = "views")
	private int views; // 조회수

	@Column(name = "likes_count", nullable = false)
	private int likesCount; // 좋아요 수

	@Enumerated(EnumType.STRING)
	@Column(name = "offline_category", nullable = false)
	private Off_Category offlineCategory; // 오프라인 카테고리

	@Column(name = "note")
	private String note; // 비고란

	@Enumerated(EnumType.STRING)
	@Column(name = "place_name", nullable = false)
	private Place placeName; // 장소명

	@Column(name = "bookmark")
	private Boolean bookmark; // 북마크 여부

	@Enumerated(EnumType.STRING)
	@Column(name = "program_type", nullable = false)
	private On_or_OFF On_of_Off; // 프로그램 타입 (온라인/오프라인 구분)

	@OneToOne
	@JoinColumn(name = "poster_id")
	private Poster poster; // 포스터 이미지

	// 기본 생성자
	public Off_program(String off_program_name, Date recruitmentStartDate, Date recruitmentEndDate,
			Date operatingStartDay, Date operatingEndDay, Target participationTarget, int participationFee,
			Time startTime, Time endTime, int maxParticipants, int currentParticipants, ProgramState state,
			String dayOfWeek, int views, int likesCount, Off_Category offlineCategory, String note, Place placeName,
			Boolean bookmark, On_or_OFF On_of_Off, Poster poster) {
		this.off_program_name = off_program_name;
		this.recruitmentStartDate = recruitmentStartDate;
		this.recruitmentEndDate = recruitmentEndDate;
		this.operatingStartDay = operatingStartDay;
		this.operatingEndDay = operatingEndDay;
		this.participationTarget = participationTarget;
		this.participationFee = participationFee;
		this.startTime = startTime;
		this.endTime = endTime;
		this.maxParticipants = maxParticipants;
		this.currentParticipants = currentParticipants;
		this.state = state;
		this.dayOfWeek = dayOfWeek;
		this.views = views;
		this.likesCount = likesCount;
		this.offlineCategory = offlineCategory;
		this.note = note;
		this.placeName = placeName;
		this.bookmark = bookmark;
		this.On_of_Off = On_of_Off;
		this.poster = poster;
	}


}
