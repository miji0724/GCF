package com.gcf.spring.service;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.Place;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.dto.Off_ProgramDTO;
import com.gcf.spring.entity.Off_program;
import com.gcf.spring.repository.Off_program_Repository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
public class Off_programServiceTest {

    @Autowired
    private Off_programService offProgramService;

    @Autowired
    private Off_program_Repository offProgramRepository;

    @Test
    public void testGetAllPrograms() {
        List<Off_ProgramDTO> programs = offProgramService.getAllPrograms(0, 10);
        assertThat(programs).isNotEmpty();
    }

    @Test
    public void testGetProgramById() {
        Optional<Off_ProgramDTO> program = offProgramService.getProgramById(1);
        assertThat(program).isPresent();
    }

    @Test
    public void testFindFilteredPrograms() {
        List<Off_ProgramDTO> programs = offProgramService.findFilteredPrograms(ProgramState.준비중, Place.김포아트홀, Off_Category.교육, "Test", null, 0, 10);
        assertThat(programs).isNotEmpty();
    }

    @Test
    public void testUpdateProgramStats() {
        boolean updated = offProgramService.updateProgramStats(1, true, true, true);
        assertThat(updated).isTrue();

        Optional<Off_program> program = offProgramRepository.findById(1);
        assertThat(program).isPresent();
        assertThat(program.get().getViews()).isGreaterThan(0);
        assertThat(program.get().getLikes_count()).isGreaterThan(0);
        assertThat(program.get().getBookmark()).isTrue();
    }
}
