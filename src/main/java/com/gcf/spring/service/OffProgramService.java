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

import com.gcf.spring.dto.OffProgramDto;
import com.gcf.spring.entity.OffProgram;
import com.gcf.spring.repository.AttachmentRepository;
import com.gcf.spring.repository.OffProgramRepository;
import com.gcf.spring.repository.TeacherRepository;

@Service
public class OffProgramService {

    private final OffProgramRepository offProgramRepository;
    private final TeacherRepository teacherRepository;
    private final AttachmentRepository fileRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public OffProgramService(OffProgramRepository offProgramRepository, TeacherRepository teacherRepository, AttachmentRepository fileRepository, ModelMapper modelMapper) {
        this.offProgramRepository = offProgramRepository;
        this.teacherRepository = teacherRepository;
        this.fileRepository = fileRepository;
        this.modelMapper = modelMapper;
    }

    public List<OffProgramDto> getAllPrograms(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OffProgram> programsPage = offProgramRepository.findAll(pageable);
        return programsPage.stream()
                           .sorted((p1, p2) -> p2.getOperatingStartDay().compareTo(p1.getOperatingStartDay()))
                           .map(program -> modelMapper.map(program, OffProgramDto.class))
                           .collect(Collectors.toList());
    }

    public Optional<OffProgramDto> getProgramById(int id) {
        Optional<OffProgram> program = offProgramRepository.findById(id);
        return program.map(p -> modelMapper.map(p, OffProgramDto.class));
    }

    public List<OffProgramDto> findFilteredPrograms(String state, String placeName, String category, String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OffProgram> filteredPrograms;

        if (state != null && placeName != null && category != null) {
            filteredPrograms = offProgramRepository.findByStateAndPlaceNameAndOfflineCategory(state, placeName, category, pageable);
        } else if (name != null && !name.isEmpty()) {
            filteredPrograms = offProgramRepository.findByOffProgramNameContaining(name, pageable);
        } else {
            filteredPrograms = offProgramRepository.findAll(pageable);
        }

        return filteredPrograms.stream()
                               .sorted((p1, p2) -> p2.getOperatingStartDay().compareTo(p1.getOperatingStartDay()))
                               .map(program -> modelMapper.map(program, OffProgramDto.class))
                               .collect(Collectors.toList());
    }

    public boolean updateProgramStats(int id, boolean incrementViews, boolean incrementLikes) {
        Optional<OffProgram> optionalProgram = offProgramRepository.findById(id);
        if (optionalProgram.isPresent()) {
            OffProgram program = optionalProgram.get();
            if (incrementViews) {
                program.setViews(program.getViews() + 1);
            }
            if (incrementLikes) {
                program.setLikesCount(program.getLikesCount() + 1);
            }

            offProgramRepository.save(program);
            return true;
        } else {
            return false;
        }
    }

    public void makeOffProgram(OffProgram offProgram) {
        offProgramRepository.save(offProgram);
    }
}
