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
        for (int i = 1; i <= 10; i++) {
            OnProgramDto onProgramDto = new OnProgramDto();

            Teacher teacher = teacherRepository.findTeacherById("test1");

            onProgramDto.setTeacher(teacher);
            onProgramDto.setProgramName("프로그램명 " + i);
            onProgramDto.setOperatingStartDay(LocalDate.now());
            onProgramDto.setViews(0);
            onProgramDto.setLikesCount(0);
            onProgramDto.setCategory("음악");
            onProgramDto.setProgramType("온라인");

            Attachment poster = new Attachment();
            poster.setOriginal_name("포스터 원본 이름" + i);
            poster.setFile_name("포스터 생성 이름" + i);
            poster.setFile_path("포스터 파일경로" + i);
            poster.setParent("online_poster" + i);

            onProgramDto.setPoster(poster);

            List<ProgramInfo> deslist = new ArrayList<>();
            
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

            deslist.add(programInfo1);
            deslist.add(programInfo2);

            onProgramDto.setProgramInfos(deslist); // 강의 정보

            List<TeacherInfo> tealist = new ArrayList<>();
            
            TeacherInfo teacherInfo1 = new TeacherInfo();
            teacherInfo1.setDescription("강사소개1" + i);

            Attachment teafile1 = new Attachment();
            teafile1.setOriginal_name("강사소개 이미지 원본이름 1" + i);
            teafile1.setFile_name("강사소개 생성 이름 1" + i);
            teafile1.setFile_path("https://storage.googleapis.com/gcf_attachment_storage_bucket/banner/0784a15e-fb64-4b2e-8888-bb652497359d_%EB%B3%B4%EA%B5%AC%EA%B3%B6.jpg");
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

            tealist.add(teacherInfo1);
            tealist.add(teacherInfo2);

            onProgramDto.setTeacherInfos(tealist); // 강사 정보

            onProgramDto.setComments(null); // 댓글

            ArrayList<OnVideo> videos = new ArrayList<>();

            OnVideo onegang = new OnVideo();
            onegang.setVideoInfoIndex("1강");
            onegang.setVideoInfoDetail("1강입니다.");

            OnVideo onebyone = new OnVideo();
            onebyone.setVideoInfoIndex("1-1");
            onebyone.setVideoInfoDetail("1-1 입니다.");

            Attachment onebyonevid = new Attachment();
            onebyonevid.setOriginal_name("1-1 동영상 원본 이름");
            onebyonevid.setFile_name("1-1 동영상 생성 이름");
            onebyonevid.setFile_path("https://storage.googleapis.com/gcf_attachment_storage_bucket/Online_mp4.mp4");
            onebyonevid.setParent("online_video");

            onebyone.setAttachment(onebyonevid);

            OnVideo twogang = new OnVideo();
            twogang.setVideoInfoIndex("2강");
            twogang.setVideoInfoDetail("2강입니다.");

            videos.add(onegang);
            videos.add(onebyone);
            videos.add(twogang);

            onProgramDto.setVideos(videos); // 비디오 리스트

            onProgramDto.setApprovalState("승인대기");
            
            OnProgram onProgram = OnProgram.createOnProgram(onProgramDto);
            
            // Set the relationship from the child side
            for (ProgramInfo pi : onProgram.getProgramInfos()) {
                pi.setOnProgram(onProgram);
            }

            for (TeacherInfo ti : onProgram.getTeacherInfos()) {
                ti.setOnProgram(onProgram);
            }
            
            for (OnVideo vi : onProgram.getVideos()) {
            	vi.setOnProgram(onProgram);
            }

            onProgramRepository.save(onProgram);

            // 테스트를 위해 저장된 OnProgram 객체를 출력합니다.
            System.out.println("Program Name: " + onProgram.getProgramName());
            System.out.println("Operating Start Day: " + onProgram.getOperatingStartDay());
            System.out.println("Views: " + onProgram.getViews());
            System.out.println("Likes Count: " + onProgram.getLikesCount());
            System.out.println("Online Category: " + onProgram.getCategory());
            System.out.println("Program Type: " + onProgram.getProgramType());
            System.out.println("Approval State: " + onProgram.getApprovalState());

            Attachment savedPoster = onProgram.getPoster();
            System.out.println("Poster Original Name: " + savedPoster.getOriginal_name());
            System.out.println("Poster File Name: " + savedPoster.getFile_name());
            System.out.println("Poster File Path: " + savedPoster.getFile_path());
            System.out.println("Poster Parent: " + savedPoster.getParent());

            List<ProgramInfo> savedProgramInfos = onProgram.getProgramInfos();
            for (ProgramInfo programInfo : savedProgramInfos) {
                System.out.println("Program Info Description: " + programInfo.getDescription());
                Attachment savedDesfile = programInfo.getAttachment();
                System.out.println("Program Info Attachment Original Name: " + savedDesfile.getOriginal_name());
                System.out.println("Program Info Attachment File Name: " + savedDesfile.getFile_name());
                System.out.println("Program Info Attachment File Path: " + savedDesfile.getFile_path());
                System.out.println("Program Info Attachment Parent: " + savedDesfile.getParent());
            }

            List<TeacherInfo> savedTeacherInfos = onProgram.getTeacherInfos();
            for (TeacherInfo teacherInfo : savedTeacherInfos) {
                System.out.println("Teacher Info Description: " + teacherInfo.getDescription());
                Attachment savedTeafile = teacherInfo.getAttachment();
                System.out.println("Teacher Info Attachment Original Name: " + savedTeafile.getOriginal_name());
                System.out.println("Teacher Info Attachment File Name: " + savedTeafile.getFile_name());
                System.out.println("Teacher Info Attachment File Path: " + savedTeafile.getFile_path());
                System.out.println("Teacher Info Attachment Parent: " + savedTeafile.getParent());
            }

            List<OnVideo> savedVideos = onProgram.getVideos();
            System.out.println(savedVideos);
            for (OnVideo video : savedVideos) {
                System.out.println("Video Info Index: " + video.getVideoInfoIndex());
                System.out.println("Video Info Detail: " + video.getVideoInfoDetail());
                Attachment savedVideoAttachment = video.getAttachment();
                if (savedVideoAttachment != null) {
                    System.out.println("Video Attachment Original Name: " + savedVideoAttachment.getOriginal_name());
                    System.out.println("Video Attachment File Name: " + savedVideoAttachment.getFile_name());
                    System.out.println("Video Attachment File Path: " + savedVideoAttachment.getFile_path());
                    System.out.println("Video Attachment Parent: " + savedVideoAttachment.getParent());
                }
            }
        }
    }

}
