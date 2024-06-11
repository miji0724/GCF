//package com.gcf.spring.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import com.gcf.spring.service.OffProgramService;
//import com.gcf.spring.service.OnProgramService;
//
//@RestController
//@RequestMapping("/api")
//public class ProgramController {
//
//    @Autowired
//    private OffProgramService offProgramService;
//
//    @Autowired
//    private OnProgramService onProgramService;
//
//    @PostMapping("/offProgram")
//    public String handleOffProgramUpload(
//            @RequestPart("teacherId") String teacherId,
//            @RequestPart("programName") String programName,
//            @RequestPart("programDetailName") String programDetailName,
//            @RequestPart("application_info") String applicationInfo,
//            @RequestPart("applicationStartDate") String applicationStartDate,
//            @RequestPart("applicationEndDate") String applicationEndDate,
//            @RequestPart("operatingStartDay") String operatingStartDay,
//            @RequestPart("operatingEndDay") String operatingEndDay,
//            @RequestPart("participationFee") String participationFee,
//            @RequestPart("startTime") String startTime,
//            @RequestPart("endTime") String endTime,
//            @RequestPart("maxParticipants") int maxParticipants,
//            @RequestPart("dayOfWeek") String dayOfWeek,
//            @RequestPart("offlineCategory") String offlineCategory,
//            @RequestPart("placeName") String placeName,
//            @RequestPart(value = "certificationFiles", required = false) MultipartFile[] certificationFiles,
//            @RequestPart(value = "teachingSubjectFiles", required = false) MultipartFile[] teachingSubjectFiles,
//            @RequestPart(value = "bannerFiles", required = false) MultipartFile[] bannerFiles
//    ) {
//        // Your logic to save the program and files
//        return "Success";
//    }
//
//    @PostMapping("/onProgram")
//    public String handleOnProgramUpload(
//            @RequestPart("teacherId") String teacherId,
//            @RequestPart("programName") String programName,
//            @RequestPart("operatingStartDay") String operatingStartDay,
//            @RequestPart("views") int views,
//            @RequestPart("likesCount") int likesCount,
//            @RequestPart("category") String category,
//            @RequestPart("programType") String programType,
//            @RequestPart("approvalState") String approvalState,
//            @RequestPart(value = "certificationFiles", required = false) MultipartFile[] certificationFiles,
//            @RequestPart(value = "teachingSubjectFiles", required = false) MultipartFile[] teachingSubjectFiles,
//            @RequestPart(value = "bannerFiles", required = false) MultipartFile[] bannerFiles
//    ) {
//        // Your logic to save the program and files
//        return "Success";
//    }
//}
