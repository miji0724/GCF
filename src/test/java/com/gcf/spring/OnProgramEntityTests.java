//package com.gcf.spring;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.time.LocalDate;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.ActiveProfiles;
//
//import com.gcf.spring.dto.OnProgramDto;
//import com.gcf.spring.entity.OnProgram;
//
//@SpringBootTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@ActiveProfiles("test")
//@DataJpaTest
//public class OnProgramEntityTests {
//
//    @Autowired
//    private TestEntityManager entityManager;
//
//    @Test
//    public void testCreateOnProgram() {
//        OnProgramDto onProgramDto = new OnProgramDto();
//        onProgramDto.setUserId("testUser");
//        onProgramDto.setProgramName("Test Program");
//        onProgramDto.setOperatingStartDay(LocalDate.now());
//        onProgramDto.setViews(0);
//        onProgramDto.setLikesCount(0);
//        onProgramDto.setCategory("Test Category");
//        onProgramDto.setProgramType("온라인");
//        onProgramDto.setApprovalState("승인대기");
//
//        OnProgram onProgram = OnProgram.createOnProgram(onProgramDto);
//        OnProgram savedProgram = entityManager.persistFlushFind(onProgram);
//
//        assertThat(savedProgram.getUserId()).isEqualTo(onProgramDto.getUserId());
//        assertThat(savedProgram.getProgramName()).isEqualTo(onProgramDto.getProgramName());
//        assertThat(savedProgram.getOperatingStartDay()).isEqualTo(onProgramDto.getOperatingStartDay());
//        assertThat(savedProgram.getViews()).isEqualTo(onProgramDto.getViews());
//        assertThat(savedProgram.getLikesCount()).isEqualTo(onProgramDto.getLikesCount());
//        assertThat(savedProgram.getCategory()).isEqualTo(onProgramDto.getCategory());
//        assertThat(savedProgram.getProgramType()).isEqualTo(onProgramDto.getProgramType());
//        assertThat(savedProgram.getApprovalState()).isEqualTo(onProgramDto.getApprovalState());
//    }
//}
