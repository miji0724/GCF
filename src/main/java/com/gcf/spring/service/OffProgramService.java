package com.gcf.spring.service;

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.repository.OffProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OffProgramService {

    @Autowired
    private OffProgramRepository offProgramRepository;

    public OffProgram createOffProgram(OffProgramDto offProgramDto) {
        OffProgram offProgram = OffProgram.createOffProgram(offProgramDto);
        return offProgramRepository.save(offProgram);
    }
}
