package com.gcf.spring.dto;

import java.time.LocalDateTime;

public class CommentDto {
    private Long id;
    
    private String content;
    
    private LocalDateTime createdDate;
    
    private Long userId;
    
    private Long parentCommentId;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
