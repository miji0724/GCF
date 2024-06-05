package com.gcf.spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    
    // 포스터를 가진 오프라인 프로그램
    @OneToOne(mappedBy = "poster")
    private OffProgram offProgramPoster;

    // 포스터를 가진 온라인 프로그램
    @OneToOne(mappedBy = "poster")
    private OnProgram onProgramPoster;
    
    // 프로그램 정보를 가진 오프라인 프로그램
    @ManyToOne
    @JoinColumn(name = "off_program_info_id")
    private OffProgram offProgramInfo;
    
    // 프로그램 정보를 가진 온라인 프로그램
    @ManyToOne
    @JoinColumn(name = "on_program_info_id")
    private OnProgram onProgramInfo;
    
    // 강사 정보를 가진 오프라인 프로그램
    @ManyToOne
    @JoinColumn(name = "off_program_teacher_info_id")
    private OffProgram offProgramTeacherInfo;
    
    // 강사 정보를 가진 온라인 프로그램
    @ManyToOne
    @JoinColumn(name = "on_program_teacher_info_id")
    private OnProgram onProgramTeacherInfo;
    
    // 연관된 온라인 프로그램의 동영상
    @ManyToOne
    @JoinColumn(name = "on_program_video_id")
    private OnProgram onProgramVideo;
}
