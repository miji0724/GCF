package com.gcf.spring.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.constant.On_Category;
import com.gcf.spring.dto.On_ProgramDTO;
import com.gcf.spring.entity.On_Program;
import com.gcf.spring.repository.On_programRepository;

@Service
public class On_programService {

    private final On_programRepository onProgramRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public On_programService(On_programRepository onProgramRepository, ModelMapper modelMapper) {
        this.onProgramRepository = onProgramRepository;
        this.modelMapper = modelMapper;
    }

    // 모든 프로그램 목록을 최신순으로 정렬
    public List<On_ProgramDTO> getAllPrograms() {
        List<On_Program> programs = onProgramRepository.findAll();
        return programs.stream()
                       .sorted((p1, p2) -> p2.getOperating_Start_Day().compareTo(p1.getOperating_Start_Day()))
                       .map(program -> modelMapper.map(program, On_ProgramDTO.class))
                       .collect(Collectors.toList());
    }

    // ID로 프로그램 조회
    public Optional<On_ProgramDTO> getProgramById(int id) {
        Optional<On_Program> program = onProgramRepository.findById(id);
        return program.map(p -> modelMapper.map(p, On_ProgramDTO.class));
    }

    // 카테고리별 및 이름별 필터링된 프로그램 목록을 반환
    public List<On_ProgramDTO> findFilteredPrograms(On_Category category, String name) {
        List<On_Program> filteredPrograms = onProgramRepository.findAll();

        if (category != null) {
            filteredPrograms = filteredPrograms.stream()
                                               .filter(program -> program.getOfflineCategory() == category)
                                               .collect(Collectors.toList());
        }

        if (name != null && !name.isEmpty()) {
            filteredPrograms = filteredPrograms.stream()
                                               .filter(program -> program.getOn_program_name().contains(name))
                                               .collect(Collectors.toList());
        }

        return filteredPrograms.stream()
                               .sorted((p1, p2) -> p2.getOperating_Start_Day().compareTo(p1.getOperating_Start_Day()))
                               .map(program -> modelMapper.map(program, On_ProgramDTO.class))
                               .collect(Collectors.toList());
    }
}
