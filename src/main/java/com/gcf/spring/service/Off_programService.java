package com.gcf.spring.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.constant.Place;
import com.gcf.spring.dto.Off_programDto;
import com.gcf.spring.entity.Off_program;
import com.gcf.spring.repository.Off_program_Repository;

@Service
public class Off_programService {

    private final Off_program_Repository offProgramRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public Off_programService(Off_program_Repository offProgramRepository, ModelMapper modelMapper) {
        this.offProgramRepository = offProgramRepository;
        this.modelMapper = modelMapper;
    }

    public List<Off_programDto> getAllPrograms() { 
        List<Off_program> programs = offProgramRepository.findAll();
        return programs.stream()
                       .map(program -> modelMapper.map(program, Off_programDto.class))
                       .collect(Collectors.toList());
    }

    public Optional<Off_programDto> getProgramById(int id) {
        Optional<Off_program> program = offProgramRepository.findById(id);
        return program.map(prog -> modelMapper.map(prog, Off_programDto.class));
    }

    public List<Off_programDto> findFilteredPrograms(ProgramState state, Place placeName, Off_Category category, String name) {
        List<Off_program> programs = offProgramRepository.findAll();
        return programs.stream()
                .filter(program -> (state == null || program.getState() == state) &&
                                   (placeName == null || program.getPlaceName() == placeName) &&
                                   (category == null || program.getOfflineCategory() == category) &&
                                   (name == null || program.getOff_program_name().contains(name)))
                .map(program -> modelMapper.map(program, Off_programDto.class))
                .collect(Collectors.toList());
    }
}
