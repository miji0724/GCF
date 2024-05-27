package com.gcf.spring.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.gcf.spring.dto.NoticeDto;

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
    private Integer id;

    @Column(nullable = false)
    private String author = "관리자";

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "VARCHAR(3000)")
    private String content;

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
    
    public static Notice createNotice(NoticeDto noticeDto) {
       Notice notice = new Notice();
       notice.setTitle(noticeDto.getTitle());
       notice.setContent(noticeDto.getContent());
       notice.setAuthor("관리자");
       notice.setCreated_at(noticeDto.getCreated_at());
       notice.setTitle(noticeDto.getTitle());
       return notice;
    }
}