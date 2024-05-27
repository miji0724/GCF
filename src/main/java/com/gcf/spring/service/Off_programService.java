package com.gcf.spring.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.dto.Off_ProgramDTO;
import com.gcf.spring.constant.Place;
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
    
    // 기본으로 최신순으로 정렬된 프로그램 목록을 반환하도록 수정
    public List<Off_ProgramDTO> getAllPrograms() {
    List<Off_program> programs = offProgramRepository.findAll();
    return programs.stream()
    .sorted((p1, p2) -> p2.getOperatingStartDay().compareTo(p1.getOperatingStartDay()))
    .map(program -> modelMapper.map(program, Off_ProgramDTO.class))
    .collect(Collectors.toList());
    }
    

    public Optional<Off_ProgramDTO> getProgramById(int id) {
        Optional<Off_program> program = offProgramRepository.findById(id);
        return program.map(p -> modelMapper.map(p, Off_ProgramDTO.class));
    }

    public List<Off_ProgramDTO> findFilteredPrograms(ProgramState state, Place placeName, Off_Category category, String name, Date date) {
        // 모든 프로그램을 가져온 후 필터링합니다.
        List<Off_program> filteredPrograms = offProgramRepository.findAll();

        // 상태로 필터링
        if (state != null) {
            filteredPrograms = filteredPrograms.stream()
                                               .filter(program -> program.getState() == state)
                                               .collect(Collectors.toList());
        }

        // 장소로 필터링
        if (placeName != null) {
            filteredPrograms = filteredPrograms.stream()
                                               .filter(program -> program.getPlaceName() == placeName)
                                               .collect(Collectors.toList());
        }

        // 카테고리로 필터링
        if (category != null) {
            filteredPrograms = filteredPrograms.stream()
                                               .filter(program -> program.getOfflineCategory() == category)
                                               .collect(Collectors.toList());
        }

        // 이름으로 필터링
        if (name != null && !name.isEmpty()) {
            filteredPrograms = filteredPrograms.stream()
                                               .filter(program -> program.getOff_program_name().contains(name))
                                               .collect(Collectors.toList());
        }

        // 날짜로 필터링
        if (date != null) {
            filteredPrograms = filteredPrograms.stream()
                                               .filter(program -> !program.getOperatingStartDay().after(date) && !program.getOperatingEndDay().before(date))
                                               .collect(Collectors.toList());
        }

        
        //운영 일자 기준 최신순으로 정렬되게 함
        return filteredPrograms.stream()
                .sorted((p1, p2) -> p2.getOperatingStartDay().compareTo(p1.getOperatingStartDay()))
                .map(program -> modelMapper.map(program, Off_ProgramDTO.class))
                .collect(Collectors.toList());
    }
    
    
    
    
}
