package com.gcf.spring;

import java.time.LocalDate;
import java.time.LocalTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.entity.Teacher;
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
		for (int i = 0; i < 30; i++) {
			OffProgramDto offProgramDto = new OffProgramDto();

			offProgramDto.setProgramName("프로그램명"+ i);
			offProgramDto.setProgramDetailName("프로그램 상세명"+ i);
			offProgramDto.setApplication_info("프로그램 소개"+ i);
			offProgramDto.setApplicationStartDate(LocalDate.now());
			offProgramDto.setApplicationEndDate(LocalDate.now().plusDays(7));
			offProgramDto.setOperatingStartDay(LocalDate.now().plusDays(14));
			offProgramDto.setOperatingEndDay(LocalDate.now().plusDays(21));
			offProgramDto.setParticipationFee("10000원");
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
			offProgramDto.setTeacherName(teacher.getMember().getName());
			offProgramDto.setPoster(null);

			OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);

			offProgramRepository.save(offProgram);

			OffProgram savedOffProgram = offProgramRepository.findById(offProgram.getId()).orElse(null);
			assert savedOffProgram != null;
			assert savedOffProgram.getProgramName().equals("프로그램명"+ i);
			// 필요한 경우 다른 필드도 확인할 수 있습니다.
		}
	}
}
