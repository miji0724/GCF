package com.gcf.spring.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gcf.spring.dto.On_ProgramDTO;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.On_programRepository;

@Service
public class On_programService2 {

    private final On_programRepository onProgramRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public On_programService2(On_programRepository onProgramRepository, ModelMapper modelMapper) {
        this.onProgramRepository = onProgramRepository;
        this.modelMapper = modelMapper;
    }

    public List<On_ProgramDTO> getAllPrograms(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OnProgram> programsPage = onProgramRepository.findAll(pageable);
        return programsPage.stream()
                .sorted((p1, p2) -> p2.getOperatingStartDay().compareTo(p1.getOperatingStartDay()))
                .map(program -> modelMapper.map(program, On_ProgramDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<On_ProgramDTO> getProgramById(int id) {
        Optional<OnProgram> program = onProgramRepository.findById(id);
        return program.map(p -> modelMapper.map(p, On_ProgramDTO.class));
    }

    public List<On_ProgramDTO> findFilteredPrograms(String category, String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OnProgram> filteredPrograms;

        if (category != null && (name == null || name.isEmpty())) {
            filteredPrograms = onProgramRepository.findByOnlineCategoryContaining(category, pageable);
        } else if (category == null && name != null && !name.isEmpty()) {
            filteredPrograms = onProgramRepository.findByOnProgramNameContaining(name, pageable);
        } else {
            filteredPrograms = onProgramRepository.findAll(pageable);
        }

        return filteredPrograms.stream()
                .sorted((p1, p2) -> p2.getOperatingStartDay().compareTo(p1.getOperatingStartDay()))
                .map(program -> modelMapper.map(program, On_ProgramDTO.class))
                .collect(Collectors.toList());
    }

    public boolean updateProgramStats(int id, boolean incrementViews, boolean incrementLikes, boolean toggleBookmark) {
        Optional<OnProgram> optionalProgram = onProgramRepository.findById(id);
        if (optionalProgram.isPresent()) {
            OnProgram program = optionalProgram.get();
            if (incrementViews) {
                program.setViews(program.getViews() + 1);
            }
            if (incrementLikes) {
                program.setLikesCount(program.getLikesCount() + 1);
            }

            onProgramRepository.save(program);
            return true;
        } else {
            return false;
        }
    }
}
