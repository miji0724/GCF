package com.gcf.spring;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.ProgramInfo;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.entity.TeacherInfo;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.TeacherRepository;

@SpringBootTest
public class OffProgramRepositoryTest {

   @Autowired
   private OffProgramRepository offProgramRepository;

   @Autowired
   private TeacherRepository teacherRepository;

   @Test
   @Transactional
   @Rollback(false)
   public void testInsertOffProgram() {
      for (int i = 0; i < 10; i++) {
         OffProgramDto offProgramDto = new OffProgramDto();

         offProgramDto.setProgramName("프로그램명"+ i);
         offProgramDto.setProgramDetailName("프로그램 상세명"+ i);
         offProgramDto.setApplication_info("프로그램 소개"+ i);
         offProgramDto.setApplicationStartDate(LocalDate.now());
         offProgramDto.setApplicationEndDate(LocalDate.now().plusDays(7));
         offProgramDto.setOperatingStartDay(LocalDate.now().plusDays(14));
         offProgramDto.setOperatingEndDay(LocalDate.now().plusDays(21));
         offProgramDto.setParticipationFee("무료");
         offProgramDto.setStartTime(LocalTime.of(9, 0));
         offProgramDto.setEndTime(LocalTime.of(12, 0));
         offProgramDto.setMaxParticipants(20);
         offProgramDto.setApplicationState("접수중");
         offProgramDto.setApprovalState("승인대기");
         offProgramDto.setDayOfWeek(Day_of_week.월요일);
         offProgramDto.setViews(0);
         offProgramDto.setLikesCount(0);
         offProgramDto.setOfflineCategory("교육");
         offProgramDto.setPlaceName("월곶생활문화센터");
         offProgramDto.setProgramType("오프라인");
         

         Teacher teacher = teacherRepository.findTeacherById("test1");

         offProgramDto.setTeacher(teacher);
         
         Attachment poster = new Attachment();
            poster.setOriginal_name("포스터 원본 이름" + i);
            poster.setFile_name("포스터 생성 이름" + i);
            poster.setFile_path("포스터 파일경로" + i);
            poster.setParent("offline_poster" + i);

            offProgramDto.setPoster(poster);

            List<ProgramInfo> deslist = new ArrayList<>();
            
            ProgramInfo programInfo1 = new ProgramInfo();
            programInfo1.setDescription("교육소개1" + i);

            Attachment desfile1 = new Attachment();
            desfile1.setOriginal_name("교육소개 이미지 원본이름 1" + i);
            desfile1.setFile_name("교육소개 생성 이름 1" + i);
            desfile1.setFile_path("교육소개 파일경로 1" + i);
            desfile1.setParent("offline_program_info");
            
            programInfo1.setAttachment(desfile1);

            ProgramInfo programInfo2 = new ProgramInfo();
            programInfo2.setDescription("교육소개2" + i);

            Attachment desfile2 = new Attachment();
            desfile2.setOriginal_name("교육소개 이미지 원본이름 2" + i);
            desfile2.setFile_name("교육소개 생성 이름 2" + i);
            desfile2.setFile_path("교육소개 파일경로 2" + i);
            desfile2.setParent("offline_program_info");

            programInfo2.setAttachment(desfile2);

            deslist.add(programInfo1);
            deslist.add(programInfo2);

            offProgramDto.setProgramInfos(deslist); // 강의 정보

            List<TeacherInfo> tealist = new ArrayList<>();
            
            TeacherInfo teacherInfo1 = new TeacherInfo();
            teacherInfo1.setDescription("강사소개1" + i);

            Attachment teafile1 = new Attachment();
            teafile1.setOriginal_name("강사소개 이미지 원본이름 1" + i);
            teafile1.setFile_name("강사소개 생성 이름 1" + i);
            teafile1.setFile_path("강사소개 파일경로 1" + i);
            teafile1.setParent("offline_teacher_info");

            teacherInfo1.setAttachment(teafile1);

            TeacherInfo teacherInfo2 = new TeacherInfo();
            teacherInfo2.setDescription("강사소개2" + i);

            Attachment teafile2 = new Attachment();
            teafile2.setOriginal_name("강사소개 이미지 원본이름 2" + i);
            teafile2.setFile_name("강사소개 생성 이름 2" + i);
            teafile2.setFile_path("강사소개 파일경로 2" + i);
            teafile2.setParent("offline_teacher_info");

            teacherInfo2.setAttachment(teafile2);

            tealist.add(teacherInfo1);
            tealist.add(teacherInfo2);

            offProgramDto.setTeacherInfos(tealist); // 강사 정보
            
         OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);
         
         // Set the relationship from the child side
            for (ProgramInfo pi : offProgram.getProgramInfos()) {
                pi.setOffProgram(offProgram);
            }

            for (TeacherInfo ti : offProgram.getTeacherInfos()) {
                ti.setOffProgram(offProgram);
            }
            
         offProgramRepository.save(offProgram);

         OffProgram savedOffProgram = offProgramRepository.findById(offProgram.getId()).orElse(null);
         assert savedOffProgram != null;
         assert savedOffProgram.getProgramName().equals("프로그램명"+ i);
         // 필요한 경우 다른 필드도 확인할 수 있습니다.
      }
   }
}
