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
	private int off_program_number; // 프로그램 번호

	@Column(name = "off_program_name", nullable = false)
	private String off_program_name; // 프로그램 이름

	@Column(name = "recruitment_start_date", nullable = false)
	private Date recruitment_start_date; // 모집 시작일

	@Column(name = "recruitment_end_date", nullable = false)
	private Date recruitment_end_date; // 모집 종료일

	@Column(name = "operating_start_day", nullable = false)
	private Date operating_start_day; // 운영 시작일

	@Column(name = "operating_end_day", nullable = false)
	private Date operating_end_day; // 운영 종료일

	@Enumerated(EnumType.STRING)
	@Column(name = "participation_target", nullable = false)
	private Target participation_target; // 참가 대상

	@Column(name = "participation_fee")
	private int participation_fee; // 참가료

	@Column(name = "start_time", nullable = false)
	private Time start_time; // 운영 시작 시간

	@Column(name = "end_time", nullable = false)
	private Time end_time; // 운영 종료 시간

	@Column(name = "max_participants", nullable = false)
	private int max_participants; // 참가 제한 인원

	@Column(name = "current_participants")
	private int current_participants; // 현재 신청(참가) 인원

	@Enumerated(EnumType.STRING)
	@Column(name = "state")
	private ProgramState state; // 강의 상태

	@Column(name = "day_of_week", nullable = false)
	private String day_of_week; // 강의 요일

	@Column(name = "views")
	private int views; // 조회수

	@Column(name = "likes_count", nullable = false)
	private int likes_count; // 좋아요 수

	@Enumerated(EnumType.STRING)
	@Column(name = "offline_category", nullable = false)
	private Off_Category offline_category; // 오프라인 카테고리

	@Column(name = "note")
	private String note; // 비고란

	@Enumerated(EnumType.STRING)
	@Column(name = "place_name", nullable = false)
	private Place place_name; // 장소명

	@Column(name = "bookmark")
	private Boolean bookmark; // 북마크 여부

	@Enumerated(EnumType.STRING)
	@Column(name = "program_type", nullable = false)
	private On_or_OFF program_type; // 프로그램 타입 (온라인/오프라인 구분)

	@OneToOne
	@JoinColumn(name = "poster_id")
	private Poster poster; // 포스터 이미지

	// 기본 생성자
	public Off_program() {
	}

	// 매개변수를 가진 생성자
	public Off_program(String off_program_name, Date recruitment_start_date, Date recruitment_end_date,
			Date operating_start_day, Date operating_end_day, Target participation_target, int participation_fee,
			Time start_time, Time end_time, int max_participants, int current_participants, ProgramState state,
			String day_of_week, int views, int likes_count, Off_Category offline_category, String note,
			Place place_name, Boolean bookmark, On_or_OFF program_type, Poster poster) {
		this.off_program_name = off_program_name;
		this.recruitment_start_date = recruitment_start_date;
		this.recruitment_end_date = recruitment_end_date;
		this.operating_start_day = operating_start_day;
		this.operating_end_day = operating_end_day;
		this.participation_target = participation_target;
		this.participation_fee = participation_fee;
		this.start_time = start_time;
		this.end_time = end_time;
		this.max_participants = max_participants;
		this.current_participants = current_participants;
		this.state = state;
		this.day_of_week = day_of_week;
		this.views = views;
		this.likes_count = likes_count;
		this.offline_category = offline_category;
		this.note = note;
		this.place_name = place_name;
		this.bookmark = bookmark;
		this.program_type = program_type;
		this.poster = poster;
	}
}
