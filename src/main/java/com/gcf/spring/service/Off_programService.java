package com.gcf.spring.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.constant.Off_Category;
import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.constant.ProgramState;
import com.gcf.spring.dto.Off_ProgramDTO;
import com.gcf.spring.constant.Place;
import com.gcf.spring.entity.FileEntity;
import com.gcf.spring.entity.Off_program;
import com.gcf.spring.entity.On_program;
import com.gcf.spring.entity.Teacher;
import com.gcf.spring.repository.FileRepository;
import com.gcf.spring.repository.Off_program_Repository;
import com.gcf.spring.repository.TeacherRepository;

@Service
public class Off_programService {

    private final Off_program_Repository offProgramRepository;
    private final TeacherRepository teacherRepository;
    private final FileRepository fileRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public Off_programService(Off_program_Repository offProgramRepository, TeacherRepository teacherRepository, FileRepository fileRepository, ModelMapper modelMapper) {
        this.offProgramRepository = offProgramRepository;
        this.teacherRepository = teacherRepository;
        this.fileRepository = fileRepository;
        this.modelMapper = modelMapper;
    }

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

    public List<Off_ProgramDTO> findFilteredPrograms(ProgramState state, Place placeName, Off_Category category, String name, LocalDate date, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Off_program> filteredPrograms;

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

    @Transactional
    public Off_ProgramDTO saveProgram(Off_ProgramDTO offProgramDTO, MultipartFile posterFile, MultipartFile educationIntroductionFile, MultipartFile teacherIntroductionFile, On_or_OFF programType) {
        Off_program off_program = modelMapper.map(offProgramDTO, Off_program.class);

        Optional<Teacher> teacherOpt = teacherRepository.findById(offProgramDTO.getTeacherId());
        if (teacherOpt.isPresent()) {
            off_program.setTeacher(teacherOpt.get());
        } else {
            throw new RuntimeException("강사 정보가 없습니다");
        }

        off_program.setProgram_type(programType); // 프로그램 타입 설정

        FileEntity poster = saveFile(posterFile, off_program, null);
        FileEntity educationIntroduction = saveFile(educationIntroductionFile, off_program, null);
        FileEntity teacherIntroduction = saveFile(teacherIntroductionFile, off_program, null);

        off_program.setPoster(poster);
        off_program.setFiles(List.of(educationIntroduction, teacherIntroduction));

        Off_program savedProgram = offProgramRepository.save(off_program);
        return modelMapper.map(savedProgram, Off_ProgramDTO.class);
    }

    private FileEntity saveFile(MultipartFile file, Off_program offProgram, On_program onProgram) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        try {
            String fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            String uniqueFileName = UUID.randomUUID().toString() + fileExtension; // 같은 이름이 있을 것에 대비해여 UUID 사용
            Path filePath = Paths.get("path/to/save/" + uniqueFileName);
            Files.copy(file.getInputStream(), filePath);

            FileEntity fileEntity = new FileEntity();
            fileEntity.setFileName(uniqueFileName);
            fileEntity.setFilePath(filePath.toString());
            fileEntity.setFileType(file.getContentType());
            fileEntity.setOffProgram(offProgram);
            fileEntity.setOnProgram(onProgram);
            return fileRepository.save(fileEntity);
        } catch (Exception e) {
            throw new RuntimeException("파일 저장 실패", e);
        }
    }
}
