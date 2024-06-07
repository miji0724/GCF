package com.gcf.spring.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.DynamicInsert; // 엔티티를 삽입할 때, 지정된 컬럼만 삽입 쿼리에 포함
import org.hibernate.annotations.DynamicUpdate; // 엔티티를 업데이트할 때, 변경된 컬럼만 업데이트 쿼리에 포함

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comment")
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert // 엔티티를 삽입할 때, 지정된 컬럼만 삽입 쿼리에 포함
@DynamicUpdate // 엔티티를 업데이트할 때, 변경된 컬럼만 업데이트 쿼리에 포함
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer commentNumber; 

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private Member member;

    @Column(nullable = false)
    private String content;

    @JoinColumn(nullable = false)
    @ManyToOne
    private OnProgram postId;

    // 댓글 작성 날짜
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdDate = LocalDate.now(); // 지금 날짜

    // 댓글 수정 날짜
    @Column(name = "modified_date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifiedDate;

    // 댓글 삭제 여부
    @Column(nullable = false)
    private boolean isDeleted = false;

    // 답글 기능을 위한 부모 댓글
    @ManyToOne
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    // 답글 기능을 위한 자식 댓글 리스트
    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL)
    private List<Comment> replies;

    // 댓글 수정 메서드
    public void updateContent(String newContent) {
        this.content = newContent;
        this.modifiedDate = LocalDateTime.now();
    }

    // 댓글 삭제 메서드
    public void deleteComment() {
        this.isDeleted = true;
    }
}
