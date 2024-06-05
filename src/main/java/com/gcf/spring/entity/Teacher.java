package com.gcf.spring.entity;

import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.gcf.spring.constant.TeacherState;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    @Column(name = "id", nullable = false)
    private String id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "id")
    private Member member;

    @NotEmpty(message = "강의 분야는 최소한 하나 이상 선택해야 합니다.")
    private List<String> teacher_category;

    @NotNull(message = "주요 이력은 필수 입력 값입니다.")
    private String carrer;
    @NotNull(message = "주요 이력 시작일은 필수 입력 값입니다.")
    private String careerStartYear;
    @NotNull(message = "주요 이력 종료일은 필수 입력 값입니다.")
    private String careerEndYear;

	@Column(name = "sns_address")
	private String snsAddress;

	@Column(name = "affiliated_organization")
	private String affiliatedOrganization;

	@Column(name = "license_name")
	private String licenseName;
	
	@Column(name = "teach_able_category")
	private String teachAbleCategory;
	
	@Enumerated(EnumType.STRING)
    @Column(name = "TeacherState")
	@ColumnDefault("'승인대기'")
    private TeacherState TeacherState; // 승인, 미승인, 승인대기
		
	@Override
	public String toString() {
	    return "Teacher{" +
	            "id='" + id + '\'' +
	            ", affiliatedOrganization='" + affiliatedOrganization + '\'' +
	            ", teacherCategory='" + teacher_category + '\'' +
	            ", snsAddress='" + snsAddress + '\'' +
	            ", career='" + carrer + '\'' +
	            ", careerStartYear=" + careerStartYear +
	            ", careerEndYear=" + careerEndYear +
	            ", licenseName='" + licenseName + '\'' +
	            ", TeacherState='" + TeacherState + '\'' +
	            ", teachAbleCategory='" + teachAbleCategory + '\'' +
	            '}';
	}

}