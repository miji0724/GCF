package com.gcf.spring.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public List<Off_ProgramDTO> getAllPrograms(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Off_program> programsPage = offProgramRepository.findAll(pageable);
        return programsPage.stream()
                           .sorted((p1, p2) -> p2.getOperating_start_day().compareTo(p1.getOperating_start_day()))
                           .map(program -> modelMapper.map(program, Off_ProgramDTO.class))
                           .collect(Collectors.toList());
    }

    public Optional<Off_ProgramDTO> getProgramById(int id) {
        Optional<Off_program> program = offProgramRepository.findById(id);
        return program.map(p -> modelMapper.map(p, Off_ProgramDTO.class));
    }

    // 필터링된 프로그램 목록을 반환하며 페이지네이션 지원
    public List<Off_ProgramDTO> findFilteredPrograms(ProgramState state, Place placeName, Off_Category category, String name, LocalDate date, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Off_program> filteredPrograms;

        // 카테고리, 장소, 상태, 이름, 날짜에 따른 필터링
        if (state != null && placeName != null && category != null) {
            filteredPrograms = offProgramRepository.findByStateAndPlaceNameAndOffline_category(state, placeName, category, pageable);
        } else if (name != null && !name.isEmpty()) {
            filteredPrograms = offProgramRepository.findByOff_program_nameContaining(name, pageable);
        } else {
            filteredPrograms = offProgramRepository.findAll(pageable);
        }

        return filteredPrograms.stream()
                               .sorted((p1, p2) -> p2.getOperating_start_day().compareTo(p1.getOperating_start_day()))
                               .map(program -> modelMapper.map(program, Off_ProgramDTO.class))
                               .collect(Collectors.toList());
    }

    // 프로그램의 조회수, 좋아요 수, 북마크 상태를 업데이트
    public boolean updateProgramStats(int id, boolean incrementViews, boolean incrementLikes, boolean toggleBookmark) {
        Optional<Off_program> optionalProgram = offProgramRepository.findById(id);
        if (optionalProgram.isPresent()) {
            Off_program program = optionalProgram.get();
            if (incrementViews) {
                program.setViews(program.getViews() + 1);
            }
            if (incrementLikes) {
                program.setLikes_count(program.getLikes_count() + 1);
            }
            if (toggleBookmark) {
                program.setBookmark(!program.getBookmark());
            }
            offProgramRepository.save(program);
            return true;
        } else {
            return false;
        }
    }
}
