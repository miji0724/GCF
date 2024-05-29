package com.gcf.spring.repository;

import com.gcf.spring.entity.Off_program;
import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Target;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD) // Optional: Use SQL script to set up test data
public class OffProgramRepositoryTest {

    @Autowired
    private Off_program_Repository offProgramRepository;

    @Test
    public void testSaveOffProgram() {
        Off_program offProgram = new Off_program();
        offProgram.setOff_program_name("Test Program");
        offProgram.setRecruitment_start_date(LocalDate.now());
        offProgram.setRecruitment_end_date(LocalDate.now().plusDays(10));
        offProgram.setOperating_start_day(LocalDate.now().plusDays(15));
        offProgram.setOperating_end_day(LocalDate.now().plusDays(20));
        offProgram.setParticipation_target(Target.성인);
        offProgram.setParticipation_fee(10000);
        offProgram.setStart_time(LocalTime.of(9, 0));
        offProgram.setEnd_time(LocalTime.of(17, 0));
        offProgram.setMax_participants(50);
        offProgram.setCurrent_participants(0);
        offProgram.setState(ProgramState.준비중);
        offProgram.setDay_of_week("Monday");
        offProgram.setViews(0);
        offProgram.setLikes_count(0);
        offProgram.setOffline_category(Off_Category.교육);
        offProgram.setPlace_name(Place.김포아트홀);
        offProgram.setBookmark(false);
        offProgram.setProgram_type(On_or_OFF.오프라인);

        Off_program savedOffProgram = offProgramRepository.save(offProgram);

        assertThat(savedOffProgram).isNotNull();
        assertThat(savedOffProgram.getOff_program_number()).isGreaterThan(0);
        assertThat(savedOffProgram.getOff_program_name()).isEqualTo("Test Program");
    }

    @Test
    public void testFindById() {
        Optional<Off_program> optionalOffProgram = offProgramRepository.findById(1);
        assertThat(optionalOffProgram).isPresent();
        Off_program offProgram = optionalOffProgram.get();
        assertThat(offProgram.getOff_program_number()).isEqualTo(1);
    }

    @Test
    public void testUpdateOffProgram() {
        Optional<Off_program> optionalOffProgram = offProgramRepository.findById(1);
        assertThat(optionalOffProgram).isPresent();
        Off_program offProgram = optionalOffProgram.get();
        offProgram.setOff_program_name("Updated Program");
        offProgramRepository.save(offProgram);

        Off_program updatedOffProgram = offProgramRepository.findById(1).get();
        assertThat(updatedOffProgram.getOff_program_name()).isEqualTo("Updated Program");
    }

    @Test
    public void testDeleteOffProgram() {
        offProgramRepository.deleteById(1);
        Optional<Off_program> optionalOffProgram = offProgramRepository.findById(1);
        assertThat(optionalOffProgram).isNotPresent();
    }
}
