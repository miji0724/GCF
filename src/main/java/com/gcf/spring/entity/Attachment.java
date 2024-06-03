package com.gcf.spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "attachment")
@Getter
@Setter
public class Attachment {

	// id
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	// 파일 원본 이름
	@Column
	private String original_name;

	// 고유 번호 + 원본 이름
	@Column
	private String file_name;

	// 파일 저장 경로
	@Column
	private String file_path;

	// 파일이 속한 엔티티
	@Column
	private String parent;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "BannerOneId", referencedColumnName = "id")
	private BannerOne bannerOne;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "BannerTwoId", referencedColumnName = "id")
	private BannerTwo bannerTwo;

	// 공지사항 참조(null 허용)
	@ManyToOne
	@JoinColumn(name = "noticeId", referencedColumnName = "id")
	@JsonIgnore
	private Notice noticeId;
}
