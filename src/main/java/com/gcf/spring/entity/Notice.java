package com.gcf.spring.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="notice")
@Getter
@Setter
public class Notice {
    
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    @Column(name="author")
    private String author = "작성자";
    
    @Column(name="title")
    private String title = "제목";
    
    @Column(name="content")
    private String content = "내용";
    
    @Column(name = "created_at")
    private Date created_at;
    
    @Column(name="views")
    private int views;
    
    // PrePersist를 사용하여 created_at 필드 설정
    @PrePersist
    protected void onCreate() {
        this.created_at = new Date(); // 현재 시간으로 설정
    }
    
    //첨부파일 엔티티 추후 삽입 예정
}
