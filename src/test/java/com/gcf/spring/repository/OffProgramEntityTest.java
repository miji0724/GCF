package com.gcf.spring.repository;

import com.gcf.spring.entity.Off_program;
import com.gcf.spring.entity.Poster;
import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Target;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class OffProgramEntityTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    @Transactional
    @Rollback
    public void testCreateOffProgram() {
        Poster poster = new Poster();
        poster.setImageUrl("http://example.com/image.jpg");
        entityManager.persist(poster);
        entityManager.flush();

        Off_program offProgram = new Off_program();
        offProgram.setOff_program_name("Sample Program");
        offProgram.setRecruitment_start_date(LocalDate.now());
        offProgram.setRecruitment_end_date(LocalDate.now().plusDays(10));
        offProgram.setOperating_start_day(LocalDate.now().plusDays(20));
        offProgram.setOperating_end_day(LocalDate.now().plusDays(30));
        offProgram.setParticipation_target(Target.성인);
        offProgram.setParticipation_fee(100);
        offProgram.setStart_time(LocalTime.of(10, 0));
        offProgram.setEnd_time(LocalTime.of(12, 0));
        offProgram.setMax_participants(20);
        offProgram.setCurrent_participants(0);
        offProgram.setState(ProgramState.준비중);
        offProgram.setDay_of_week("Monday");
        offProgram.setViews(0);
        offProgram.setLikes_count(0);
        offProgram.setOffline_category(Off_Category.체험);
        offProgram.setNote("This is a sample note.");
        offProgram.setPlace_name(Place.김포아트홀);
        offProgram.setBookmark(false);
        offProgram.setProgram_type(On_or_OFF.오프라인);
        offProgram.setPoster(poster);

        entityManager.persist(offProgram);
        entityManager.flush();

        Off_program foundProgram = entityManager.find(Off_program.class, offProgram.getOff_program_number());

        assertNotNull(foundProgram.getOff_program_number());
        assertEquals("Sample Program", foundProgram.getOff_program_name());
        assertEquals(Target.성인, foundProgram.getParticipation_target());
        assertEquals(100, foundProgram.getParticipation_fee());
        assertEquals(LocalTime.of(10, 0), foundProgram.getStart_time());
        assertEquals(LocalTime.of(12, 0), foundProgram.getEnd_time());
        assertEquals(20, foundProgram.getMax_participants());
        assertEquals(0, foundProgram.getCurrent_participants());
        assertEquals(ProgramState.준비중, foundProgram.getState());
        assertEquals("Monday", foundProgram.getDay_of_week());
        assertEquals(0, foundProgram.getViews());
        assertEquals(0, foundProgram.getLikes_count());
        assertEquals(Off_Category.체험, foundProgram.getOffline_category());
        assertEquals("This is a sample note.", foundProgram.getNote());
        assertEquals(Place.김포아트홀, foundProgram.getPlace_name());
        assertFalse(foundProgram.getBookmark());
        assertEquals(On_or_OFF.오프라인, foundProgram.getProgram_type());
        assertNotNull(foundProgram.getPoster());
    }
}
