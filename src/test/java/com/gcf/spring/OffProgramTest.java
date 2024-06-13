package com.gcf.spring;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.gcf.spring.constant.Day_of_week;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.repository.OffProgramRepository;

@SpringBootTest
@ActiveProfiles("test")
public class OffProgramTest {

    @Autowired
    private OffProgramRepository offProgramRepository;

    @Test
    public void testCreateAndRetrieveOffProgram() {
        // Create and save OffProgram
        OffProgram offProgram = new OffProgram();
        offProgram.setProgramName("Offline Program 1");
        offProgram.setProgramDetailName("Detailed description of offline program 1");
        offProgram.setApplication_info("Application information for offline program 1");
        offProgram.setApplicationStartDate(LocalDate.now());
        offProgram.setApplicationEndDate(LocalDate.now().plusDays(10));
        offProgram.setOperatingStartDay(LocalDate.now().plusDays(15));
        offProgram.setOperatingEndDay(LocalDate.now().plusDays(30));
        offProgram.setParticipationFee("Free");
        offProgram.setStartTime(LocalTime.of(10, 0));
        offProgram.setEndTime(LocalTime.of(12, 0));
        offProgram.setMaxParticipants(30);
        offProgram.setApplicationState("Open");
        offProgram.setApprovalState("Approved");
        offProgram.setDayOfWeek(Day_of_week.수요일);
        offProgram.setViews(0);
        offProgram.setLikesCount(0);
        offProgram.setCategory("Education");
        offProgram.setPlaceName("Community Center");
        offProgram.setProgramType("Offline");

        offProgramRepository.save(offProgram);

        // Retrieve and test OffProgram
        OffProgram savedOffProgram = offProgramRepository.findById(offProgram.getId()).orElse(null);
        assertThat(savedOffProgram).isNotNull();
        assertThat(savedOffProgram.getProgramName()).isEqualTo("Offline Program 1");
        assertThat(savedOffProgram.getProgramDetailName()).isEqualTo("Detailed description of offline program 1");
        assertThat(savedOffProgram.getApplication_info()).isEqualTo("Application information for offline program 1");
        assertThat(savedOffProgram.getApplicationStartDate()).isEqualTo(LocalDate.now());
        assertThat(savedOffProgram.getApplicationEndDate()).isEqualTo(LocalDate.now().plusDays(10));
        assertThat(savedOffProgram.getOperatingStartDay()).isEqualTo(LocalDate.now().plusDays(15));
        assertThat(savedOffProgram.getOperatingEndDay()).isEqualTo(LocalDate.now().plusDays(30));
        assertThat(savedOffProgram.getParticipationFee()).isEqualTo("Free");
        assertThat(savedOffProgram.getStartTime()).isEqualTo(LocalTime.of(10, 0));
        assertThat(savedOffProgram.getEndTime()).isEqualTo(LocalTime.of(12, 0));
        assertThat(savedOffProgram.getMaxParticipants()).isEqualTo(30);
        assertThat(savedOffProgram.getApplicationState()).isEqualTo("Open");
        assertThat(savedOffProgram.getApprovalState()).isEqualTo("Approved");
        assertThat(savedOffProgram.getDayOfWeek()).isEqualTo(Day_of_week.수요일);
        assertThat(savedOffProgram.getViews()).isEqualTo(0);
        assertThat(savedOffProgram.getLikesCount()).isEqualTo(0);
        assertThat(savedOffProgram.getCategory()).isEqualTo("Education");
        assertThat(savedOffProgram.getPlaceName()).isEqualTo("Community Center");
        assertThat(savedOffProgram.getProgramType()).isEqualTo("Offline");
    }
}
