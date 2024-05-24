package com.gcf.spring.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Builder;
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
    }
    
    @Builder
    public Notice(String title, String content, Integer views, String author,LocalDateTime created_at) {
        this.title = title;
        this.content = content;
        this.views = views = 0;
        this.author = author = "관리자";
        this.created_at=created_at;
    }
	
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String author = "작성자";

    @Column(nullable = false)
    private String title = "제목";

    @Column(nullable = false, columnDefinition = "VARCHAR(3000)")
    private String content = "내용";

    @Column(nullable = false)
    private LocalDateTime created_at;

    @Column(nullable = false)
    private Integer views;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Attachment> attachments;
    
    // 생성 시간 자동 설정
    @PrePersist
    protected void onCreate() {
        this.created_at = LocalDateTime.now();
    }
}
