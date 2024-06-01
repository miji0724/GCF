package com.gcf.spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="attachment")
@Getter
@Setter
public class Attachment {
    
	//id
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    //파일 원본 이름
    @Column
    private String original_name;
    
    //고유 번호 + 원본 이름
    @Column
    private String file_name;
    
    //파일 저장 경로
    @Column
    private String file_path;
    
    //공지사항 참조(null 허용)
    @ManyToOne
    @JoinColumn(name = "noticeId", referencedColumnName = "id")
    @JsonIgnore
    private Notice noticeId; 
    
    
    //파일이 속한 엔티티
    @Column
    private String parent;
    
    @ManyToOne
    @JoinColumn(name = "off_program_id")
    private OffProgram offProgram; // 연관된 오프라인 프로그램

    @ManyToOne
    @JoinColumn(name = "on_program_id")
    private OnProgram onProgram; // 연관된 온라인 프로그램
    
    
    
//    @Override
//    public String toString() {
//        return "Attachment{" +
//                "fileName='" + this.file_name + '\'' +
//                ", filePath='" + this.file_path + '\'' +
//                ",notice_id='" + (this. noticeId!= null ? this.noticeId.getId() : null) + '\'' +
//                ", Type='" + this.parent + '\'' +
//                '}';
//    }
}