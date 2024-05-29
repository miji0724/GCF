package com.gcf.spring.entity;

import com.gcf.spring.constant.Teacher_category;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "teacher")
@Getter
@Setter
@NoArgsConstructor // 자동 생성자 생성

public class Teacher {
	@Id
	@OneToOne
	@JoinColumn(name = "teacher_id", referencedColumnName = "id")
	private Member member;

	@Column(name = "affiliated_organization")
	private String affiliated_Organization;
	
	@Column(name = "teacher_category")
	private Teacher_category teacher_category;

	@Column(name = "sns_address")
	private String sns_address;
	
	@Column(name = "carrer", nullable = false)
	private String carrer;

	@Column(name = "career_start_year", nullable = false)
	private String career_start_year;

	@Column(name = "career_end_year", nullable = false)
	private String career_end_year;
	
	@Column(name = "license")
	private String license;
	
	@Column(name = "teach_able_field")
	private String teach_able_field;
}