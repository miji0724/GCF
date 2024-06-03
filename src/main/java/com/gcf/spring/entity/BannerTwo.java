package com.gcf.spring.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

//배너2
@Entity
@Table(name = "bannerTwo")
@Getter
@Setter
public class BannerTwo {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// ID에 해당하는 Url을 저장하는 컬럼이다.
	@Column
	private String url;

	// ID에 해당하는 그림을 저장하는 컬럼이다.
	@OneToOne(mappedBy = "bannerTwo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Attachment attachment;
}
