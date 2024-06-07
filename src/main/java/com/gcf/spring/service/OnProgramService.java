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

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.OnProgramRepository;

@Service
public class OnProgramService {

    private final OnProgramRepository onProgramRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public OnProgramService(OnProgramRepository onProgramRepository, ModelMapper modelMapper) {
        this.onProgramRepository = onProgramRepository;
        this.modelMapper = modelMapper;
    }

    public List<OnProgramDto> getAllPrograms(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OnProgram> programsPage = onProgramRepository.findAll(pageable);
        return programsPage.stream()
                .sorted((p1, p2) -> p2.getOperatingStartDay().compareTo(p1.getOperatingStartDay()))
                .map(program -> modelMapper.map(program, OnProgramDto.class))
                .collect(Collectors.toList());
    }

    public Optional<OnProgramDto> getProgramById(int id) {
        Optional<OnProgram> program = onProgramRepository.findById(id);
        return program.map(p -> modelMapper.map(p, OnProgramDto.class));
    }

    public List<OnProgramDto> findFilteredPrograms(String category, String name, int page, int size) {
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
                .map(program -> modelMapper.map(program, OnProgramDto.class))
                .collect(Collectors.toList());
    }

    public boolean updateProgramStats(int id, boolean incrementViews, boolean incrementLikes) {
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

    public OnProgram saveOnProgram(OnProgram onProgram) {
        return onProgramRepository.save(onProgram);
    }

    public Optional<OnProgram> getOnProgramById(int id) {
        return onProgramRepository.findById(id);
    }

    public List<OnProgram> getAllOnPrograms() {
        return onProgramRepository.findAll();
    }
}
