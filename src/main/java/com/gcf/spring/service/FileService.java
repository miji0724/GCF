package com.gcf.spring.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.entity.FileEntity;
import com.gcf.spring.entity.Off_program;
import com.gcf.spring.entity.On_program;
import com.gcf.spring.repository.FileRepository;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FileEntity storeFile(MultipartFile file, Off_program offProgram, On_program onProgram) throws Exception {
        // 원래 파일 이름
        String originalFileName = file.getOriginalFilename();
        
        // 파일 확장자 추출
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

        // UUID 생성
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

        // 파일 저장 경로
        Path filePath = Paths.get(uploadDir + uniqueFileName);

        // 파일 저장
        Files.copy(file.getInputStream(), filePath);

        // File 엔티티 생성 및 저장
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(uniqueFileName);
        fileEntity.setFilePath(filePath.toString());
        fileEntity.setFileType(file.getContentType());
        fileEntity.setOffProgram(offProgram);
        fileEntity.setOnProgram(onProgram);

        return fileRepository.save(fileEntity);
    }
}
