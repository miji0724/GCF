package com.gcf.spring;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.entity.OnVideo;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.repository.OnProgramRepository;
import com.gcf.spring.repository.TeacherRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
public class OnProgramRepositoryTest {

	@Autowired
	private OnProgramRepository onProgramRepository;

	@Autowired
	private TeacherRepository teacherRepository;

	@Test
	@Transactional
	@Rollback(false)
	public void testInsertOffPrograms() {
		for (int i = 1; i <= 30; i++) {
			OnProgramDto onProgramDto = new OnProgramDto();

			Teacher teacher = teacherRepository.findTeacherById("test1");

			onProgramDto.setTeacher(teacher);
			onProgramDto.setProgramName("프로그램명 " + i);
			onProgramDto.setOperatingStartDay(LocalDate.now());
			onProgramDto.setViews(0);
			onProgramDto.setLikesCount(0);
			onProgramDto.setOnlineCategory("음악");
			onProgramDto.setProgramType("온라인");

			System.out.println("teacher.getMember() = "+teacher.getMember());
			System.out.println("teacher.getMember().getName() = "+teacher.getMember().getName());
			
			Attachment poster = new Attachment();

			poster.setOriginal_name("포스터 원본 이름" + i);
			poster.setFile_name("포스터 생성 이름" + i);
			poster.setFile_path("포스터 파일경로" + i);
			poster.setParent("online_poster" + i);

			onProgramDto.setPoster(poster);

			ProgramInfo programInfo1 = new ProgramInfo();
			programInfo1.setDescription("교육소개1" + i);

			Attachment desfile1 = new Attachment();
			desfile1.setOriginal_name("교육소개 이미지 원본이름 1" + i);
			desfile1.setFile_name("교육소개 생성 이름 1" + i);
			desfile1.setFile_path("교육소개 파일경로 1" + i);
			desfile1.setParent("online_program_info");

			programInfo1.setAttachment(desfile1);

			ProgramInfo programInfo2 = new ProgramInfo();
			programInfo2.setDescription("교육소개2" + i);

			Attachment desfile2 = new Attachment();
			desfile2.setOriginal_name("교육소개 이미지 원본이름 2" + i);
			desfile2.setFile_name("교육소개 생성 이름 2" + i);
			desfile2.setFile_path("교육소개 파일경로 2" + i);
			desfile2.setParent("online_program_info");

			programInfo2.setAttachment(desfile2);

			List<ProgramInfo> deslist = new ArrayList<>();
			deslist.add(programInfo1);
			deslist.add(programInfo2);

			onProgramDto.setProgramInfos(deslist); // 강의 정보

			TeacherInfo teacherInfo1 = new TeacherInfo();
			teacherInfo1.setDescription("강사소개1" + i);

			Attachment teafile1 = new Attachment();
			teafile1.setOriginal_name("강사소개 이미지 원본이름 1" + i);
			teafile1.setFile_name("강사소개 생성 이름 1" + i);
			teafile1.setFile_path("강사소개 파일경로 1" + i);
			teafile1.setParent("online_teacher_info");

			teacherInfo1.setAttachment(teafile1);

			TeacherInfo teacherInfo2 = new TeacherInfo();
			teacherInfo2.setDescription("강사소개2" + i);

			Attachment teafile2 = new Attachment();
			teafile2.setOriginal_name("강사소개 이미지 원본이름 2" + i);
			teafile2.setFile_name("강사소개 생성 이름 2" + i);
			teafile2.setFile_path("강사소개 파일경로 2" + i);
			teafile2.setParent("online_teacher_info");

			teacherInfo2.setAttachment(teafile2);

			List<TeacherInfo> tealist = new ArrayList<>();
			tealist.add(teacherInfo1);
			tealist.add(teacherInfo2);

			onProgramDto.setTeacherInfos(tealist); // 강사 정보

			onProgramDto.setComments(null); // 댓글

			OnVideo onegang = new OnVideo();

			onegang.setVideoInfoIndex("1강");
			onegang.setVideoInfoDetail("1강입니다.");
			onegang.setAttachment(null);

			OnVideo onebyone = new OnVideo();

			onebyone.setVideoInfoIndex("1-1");
			onebyone.setVideoInfoDetail("1-1 입니다.");

			Attachment onebyonevid = new Attachment();

			onebyonevid.setOriginal_name("1-1 동영상 원본 이름");
			onebyonevid.setFile_name("1-1 동영상 생성 이름");
			onebyonevid.setFile_path("1-1 동영상 파일경로");
			onebyonevid.setParent("online_video");

			OnVideo twogang = new OnVideo();

			twogang.setVideoInfoIndex("1강");
			twogang.setVideoInfoDetail("1강입니다.");
			twogang.setAttachment(null);

			ArrayList<OnVideo> videos = new ArrayList<>();

			videos.add(onegang);
			videos.add(onebyone);
			videos.add(twogang);

			onProgramDto.setVideos(videos); // 비디오 리스트
			
			onProgramDto.setApprovalState("승인대기");

			OnProgram onProgram = OnProgram.createOnProgram(onProgramDto);

			onProgramRepository.save(onProgram);

			OnProgram savedOnProgram = onProgramRepository.findById(onProgram.getId()).orElse(null);
			assert savedOnProgram != null;
			assert savedOnProgram.getProgramName().equals("프로그램명 " + i);
		}
	}
}