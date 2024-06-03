package com.gcf.spring.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    @Column(name = "teacher_category")
    private List<String> teacherCategory;

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

}