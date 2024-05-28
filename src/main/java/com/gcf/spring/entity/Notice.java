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
	
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String author = "관리자";

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "VARCHAR(3000)")
    private String content;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created_at;

    @Column(nullable = false)
    private Integer views = 0;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Attachment> attachments;
    
    // 생성 시간 자동 설정
    @PrePersist
    protected void onCreate() {
        this.created_at = LocalDateTime.now();
    }
}