//package com.gcf.spring.controller;
//
//import java.io.IOException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.gcf.spring.service.GoogleCloudStorageService;
//
//@RestController
//public class FileUploadController {
//
//    @Autowired
//    private GoogleCloudStorageService googleCloudStorageService;
//
//    @PostMapping("/attachment")
//    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
//        try {
//            String fileUrl = googleCloudStorageService.uploadFile(file);
//            return ResponseEntity.ok("attachment/" + fileUrl);
//        } catch (IOException e) {
//            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
//        }
//    }
//}
