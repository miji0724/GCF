package com.gcf.spring.util;

import java.util.UUID;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;

@Configuration
public class GcsUtil {

    // 고유 식별자 생성 및 파일 이름 생성
    public String generateUniqueFileName(MultipartFile file) {
        String uniqueID = UUID.randomUUID().toString();
        return uniqueID + "_" + file.getOriginalFilename();
    }

    // BlobId 생성
    public BlobId createBlobId(String bucketName, String fileName) {
        return BlobId.of(bucketName, fileName);
    }

    // BlobInfo 생성
    public BlobInfo createBlobInfo(BlobId blobId, String contentType) {
        return BlobInfo.newBuilder(blobId)
                .setContentType(contentType)
                .build();
    }
}