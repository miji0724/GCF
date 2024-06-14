package com.gcf.spring.dto;

import java.time.LocalDate;
import java.util.List;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Comment;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OnVideo;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OnProgramDto {
    private Member member;
    private Teacher teacher;
    private String programName;
    private LocalDate operatingStartDay;
    private Integer views;
    private Integer likesCount;
    private String category;
    private String programType;
    private String approvalState;
    private Attachment poster;
    private List<ProgramInfo> programInfos;
    private List<TeacherInfo> teacherInfos;
    private List<Comment> comments;
    private List<OnVideo> videos;
    private String userId; // 새로 추가된 필드
	public String getTeacherId() {
		// TODO Auto-generated method stub
		return null;
	}
}
