package com.gcf.spring.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "notice")
@DynamicInsert
@DynamicUpdate 
@Getter
@Setter
public class Notice {

	public Notice() {
        this.attachments = new ArrayList<>();
    }
	
	//id
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer id;

    //작성자 고정(관리자)
    @Column(nullable = false)
    private String author = "관리자";

    //공지사항 제목
    @Column(nullable = false)
    private String title;

    //공지사항 내용
    @Column(nullable = false, columnDefinition = "VARCHAR(3000)")
    private String content;

    //공지사항 작성일
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;

    //공지사항 조회수
    @Column(nullable = false)
    private Integer views = 0;

    //공지사항 첨부파일
    @OneToMany(cascade = CascadeType.ALL)
    private List<Attachment> attachments;
    
    // 생성 시간 자동 설정
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}