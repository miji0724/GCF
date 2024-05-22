package com.gcf.spring.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gcf.spring.entity.Off_program;
import com.gcf.spring.repository.Off_program_Repository;
@Service
public class Off_programService {

    private final Off_program_Repository offProgramRepository;

    @Autowired
    public Off_programService(Off_program_Repository offProgramRepository) {
        this.offProgramRepository = offProgramRepository;
    }

    public List<Off_program> getAllPrograms() {
        return offProgramRepository.findAll();
    }

    public Optional<Off_program> getProgramById(int id) {
        return offProgramRepository.findById(id);
    }


}
