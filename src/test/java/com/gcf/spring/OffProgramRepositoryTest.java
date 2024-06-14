//package com.gcf.spring;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.time.LocalDate;
//import java.time.LocalTime;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.gcf.spring.constant.Day_of_week;
//import com.gcf.spring.entity.OffProgram;
//import com.gcf.spring.repository.OffProgramRepository;
//
//@SpringBootTest
//@Transactional
//@Rollback(false)
//public class OffProgramRepositoryTest {
//
//    @Autowired
//    private OffProgramRepository offProgramRepository;
//
//    private OffProgram createOffProgram() {
//        OffProgram offProgram = new OffProgram();
//        offProgram.setProgramName("프로그램명");
//        offProgram.setProgramDetailName("프로그램 상세명");
//        offProgram.setApplication_info("모집안내");
//        offProgram.setApplicationStartDate(LocalDate.now());
//        offProgram.setApplicationEndDate(LocalDate.now().plusDays(10));
//        offProgram.setOperatingStartDay(LocalDate.now().plusDays(20));
//        offProgram.setOperatingEndDay(LocalDate.now().plusDays(30));
//        offProgram.setParticipationFee("10000");
//        offProgram.setStartTime(LocalTime.of(10, 0));
//        offProgram.setEndTime(LocalTime.of(12, 0));
//        offProgram.setMaxParticipants(20);
//        offProgram.setCurrentParticipants(0);
//        offProgram.setApplicationState("접수중");
//        offProgram.setApprovalState("승인대기");
//        offProgram.setDayOfWeek(Day_of_week.월요일);
//        offProgram.setViews(0);
//        offProgram.setLikesCount(0);
//        offProgram.setCategory("교육");
//        offProgram.setPlaceName("장소명");
//        offProgram.setProgramType("오프라인");
//        return offProgram;
//    }
//
//    @BeforeEach
//    public void setup() {
//        OffProgram offProgram = createOffProgram();
//        offProgramRepository.save(offProgram);
//    }
//
//    @Test
//    public void testSaveAndFind() {
//        OffProgram savedProgram = offProgramRepository.findAll().get(0);
//        assertThat(savedProgram).isNotNull();
//        assertThat(savedProgram.getProgramName()).isEqualTo("프로그램명");
//        assertThat(savedProgram.getProgramDetailName()).isEqualTo("프로그램 상세명");
//        assertThat(savedProgram.getApplication_info()).isEqualTo("모집안내");
//        assertThat(savedProgram.getApplicationStartDate()).isEqualTo(LocalDate.now());
//        assertThat(savedProgram.getApplicationEndDate()).isEqualTo(LocalDate.now().plusDays(10));
//        assertThat(savedProgram.getOperatingStartDay()).isEqualTo(LocalDate.now().plusDays(20));
//        assertThat(savedProgram.getOperatingEndDay()).isEqualTo(LocalDate.now().plusDays(30));
//        assertThat(savedProgram.getParticipationFee()).isEqualTo("10000");
//        assertThat(savedProgram.getStartTime()).isEqualTo(LocalTime.of(10, 0));
//        assertThat(savedProgram.getEndTime()).isEqualTo(LocalTime.of(12, 0));
//        assertThat(savedProgram.getMaxParticipants()).isEqualTo(20);
//        assertThat(savedProgram.getCurrentParticipants()).isEqualTo(0);
//        assertThat(savedProgram.getApplicationState()).isEqualTo("접수중");
//        assertThat(savedProgram.getApprovalState()).isEqualTo("승인대기");
//        assertThat(savedProgram.getDayOfWeek()).isEqualTo(Day_of_week.월요일);
//        assertThat(savedProgram.getViews()).isEqualTo(0);
//        assertThat(savedProgram.getLikesCount()).isEqualTo(0);
//        assertThat(savedProgram.getCategory()).isEqualTo("교육");
//        assertThat(savedProgram.getPlaceName()).isEqualTo("장소명");
//        assertThat(savedProgram.getProgramType()).isEqualTo("오프라인");
//    }
//}
