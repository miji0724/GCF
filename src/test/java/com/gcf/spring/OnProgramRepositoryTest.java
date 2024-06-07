package com.gcf.spring;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.gcf.spring.dto.OnProgramDto;
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
	public void testInsertOffProgram() {
		OnProgramDto onProgramDto = new OnProgramDto();
		
		onProgramDto.setOnProgramName("프로그램명");
		//여기서부터
	}
}

//    @Test
//    @Transactional
//    @Rollback(false)
//    public void testInsertOffProgram() {
//    	OffProgramDto offProgramDto = new OffProgramDto();
//
//    	offProgramDto.setOffProgramName("프로그램명");
//    	offProgramDto.setOffProgramDetailName("프로그램 상세명");
//    	offProgramDto.setApplication_info("프로그램 소개");
//    	offProgramDto.setApplicationStartDate(LocalDate.now());
//    	offProgramDto.setApplicationEndDate(LocalDate.now().plusDays(7));
//    	offProgramDto.setOperatingStartDay(LocalDate.now().plusDays(14));
//    	offProgramDto.setOperatingEndDay(LocalDate.now().plusDays(21));
//    	offProgramDto.setParticipationFee("10000원");
//    	offProgramDto.setStartTime(LocalTime.of(9, 0));
//    	offProgramDto.setEndTime(LocalTime.of(12, 0));
//    	offProgramDto.setMaxParticipants(20);
//    	offProgramDto.setState("모집중");
//    	offProgramDto.setDayOfWeek(Day_of_week.월요일);
//    	offProgramDto.setViews(0);
//    	offProgramDto.setLikesCount(0);
//    	offProgramDto.setOfflineCategory("교육");
//    	offProgramDto.setPlaceName("프로그램 장소명");
//    	offProgramDto.setProgramType("오프라인");
//    	
//    	Teacher teacher = teacherRepository. findTeacherById("test1");
//    	
//    	offProgramDto.setTeacher(teacher);  	
//  
//    	offProgramDto.setPoster(null);
//
//    	OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);
//
//    	offProgramRepository.save(offProgram);
//
//        OffProgram savedOffProgram = offProgramRepository.findById(offProgram.getOffProgramNumber()).orElse(null);
//        assert savedOffProgram != null;
//        assert savedOffProgram.getOffProgramName().equals("프로그램명");
//        // 필요한 경우 다른 필드도 확인할 수 있습니다.
//    }
//}
