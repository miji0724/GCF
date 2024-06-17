//package com.gcf.spring;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//
//import java.time.LocalDate;
//import java.time.LocalTime;
//
//import org.junit.jupiter.api.Test;
//
//import com.gcf.spring.constant.Day_of_week;
//import com.gcf.spring.dto.OffProgramDto;
//import com.gcf.spring.entity.OffProgram;
//import com.gcf.spring.entity.Teacher;
//
//public class OffProgramTest1 {
//
//    @Test
//    public void testCreateOffProgram() {
//        // Given
//        OffProgramDto offProgramDto = new OffProgramDto();
//        offProgramDto.setProgramName("요가 클래스");
//        offProgramDto.setTeacher(new Teacher());
//        offProgramDto.setProgramDetailName("초급 요가 클래스");
//        offProgramDto.setApplication_info("지금 신청하세요!");
//        offProgramDto.setOperatingStartDay(LocalDate.of(2024, 7, 1));
//        offProgramDto.setOperatingEndDay(LocalDate.of(2024, 7, 30));
//        offProgramDto.setApplicationStartDate(LocalDate.of(2024, 6, 1));
//        offProgramDto.setApplicationEndDate(LocalDate.of(2024, 6, 25));
//        offProgramDto.setParticipationFee("무료");
//        offProgramDto.setStartTime(LocalTime.of(9, 0));
//        offProgramDto.setEndTime(LocalTime.of(10, 0));
//        offProgramDto.setMaxParticipants(20);
//        offProgramDto.setCurrentParticipants(0);
//        offProgramDto.setApplicationState("접수중");
//        offProgramDto.setApprovalState("승인대기");
//        offProgramDto.setDayOfWeek(Day_of_week.금요일);
//        offProgramDto.setViews(0);
//        offProgramDto.setLikesCount(0);
//        offProgramDto.setOfflineCategory("교육");
//        offProgramDto.setPlaceName("커뮤니티 센터");
//        offProgramDto.setProgramType("오프라인");
//
//        // When
//        OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);
//
//        // Then
//        assertNotNull(offProgram);
//        assertEquals("요가 클래스", offProgram.getProgramName());
//        assertNotNull(offProgram.getTeacher());
//        assertEquals("초급 요가 클래스", offProgram.getProgramDetailName());
//        assertEquals("지금 신청하세요!", offProgram.getApplication_info());
//        assertEquals(LocalDate.of(2024, 7, 1), offProgram.getOperatingStartDay());
//        assertEquals(LocalDate.of(2024, 7, 30), offProgram.getOperatingEndDay());
//        assertEquals(LocalDate.of(2024, 6, 1), offProgram.getApplicationStartDate());
//        assertEquals(LocalDate.of(2024, 6, 25), offProgram.getApplicationEndDate());
//        assertEquals("무료", offProgram.getParticipationFee());
//        assertEquals(LocalTime.of(9, 0), offProgram.getStartTime());
//        assertEquals(LocalTime.of(10, 0), offProgram.getEndTime());
//        assertEquals(20, offProgram.getMaxParticipants().intValue());
//        assertEquals(0, offProgram.getCurrentParticipants().intValue());
//        assertEquals("접수중", offProgram.getApplicationState());
//        assertEquals("승인대기", offProgram.getApprovalState());
//        assertEquals(Day_of_week.금요일, offProgram.getDayOfWeek());
//        assertEquals(0, offProgram.getViews().intValue());
//        assertEquals(0, offProgram.getLikesCount().intValue());
//        assertEquals("교육", offProgram.getCategory());
//        assertEquals("커뮤니티 센터", offProgram.getPlaceName());
//        assertEquals("오프라인", offProgram.getProgramType());
//    }
//}
