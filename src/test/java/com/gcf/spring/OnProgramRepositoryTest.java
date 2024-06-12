package com.gcf.spring;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.OnProgramRepository;

@SpringBootTest
@Transactional
@Rollback(true)
public class OnProgramRepositoryTest {

    @Autowired
    private OnProgramRepository onProgramRepository;

    @BeforeEach
    public void setup() {
        onProgramRepository.deleteAll();
        OnProgram onProgram = createOnProgram();
        onProgramRepository.save(onProgram);
    }

    private OnProgram createOnProgram() {
        OnProgram onProgram = new OnProgram();
        onProgram.setProgramName("온라인 프로그램");
        onProgram.setOperatingStartDay(LocalDate.now());
        onProgram.setViews(100);
        onProgram.setLikesCount(10);
        onProgram.setCategory("교육");
        onProgram.setProgramType("온라인");
        onProgram.setApprovalState("승인대기");
        return onProgram;
    }

    @Test
    public void testSaveAndFind() {
        List<OnProgram> programs = onProgramRepository.findAll();
        assertThat(programs).isNotEmpty();
        OnProgram savedProgram = programs.get(0);
        assertThat(savedProgram).isNotNull();
        assertThat(savedProgram.getProgramName()).isEqualTo("온라인 프로그램");
        assertThat(savedProgram.getOperatingStartDay()).isEqualTo(LocalDate.now());
        assertThat(savedProgram.getViews()).isEqualTo(100);
        assertThat(savedProgram.getLikesCount()).isEqualTo(10);
        assertThat(savedProgram.getCategory()).isEqualTo("교육");
        assertThat(savedProgram.getProgramType()).isEqualTo("온라인");
        assertThat(savedProgram.getApprovalState()).isEqualTo("승인대기");
    }

    @Test
    public void testUpdate() {
        OnProgram savedProgram = onProgramRepository.findAll().get(0);
        savedProgram.setProgramName("수정된 온라인 프로그램");
        onProgramRepository.save(savedProgram);

        OnProgram updatedProgram = onProgramRepository.findById(savedProgram.getId()).orElse(null);
        assertThat(updatedProgram).isNotNull();
        assertThat(updatedProgram.getProgramName()).isEqualTo("수정된 온라인 프로그램");
    }

    @Test
    public void testDelete() {
        OnProgram savedProgram = onProgramRepository.findAll().get(0);
        onProgramRepository.delete(savedProgram);

        OnProgram deletedProgram = onProgramRepository.findById(savedProgram.getId()).orElse(null);
        assertThat(deletedProgram).isNull();
    }

    @Test
    public void testFindByApprovalState() {
        OnProgram onProgram = createOnProgram();
        onProgram.setApprovalState("승인");
        onProgramRepository.save(onProgram);

        List<OnProgram> approvedPrograms = onProgramRepository.findAllByApprovalState("승인");
        assertThat(approvedPrograms).isNotEmpty();
        assertThat(approvedPrograms.get(0).getApprovalState()).isEqualTo("승인");
    }
}
