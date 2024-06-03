package com.gcf.spring.service;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;
import com.gcf.spring.repository.AttachmentRepository;
import com.google.cloud.WriteChannel;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;

@Service
public class AttachmentService {

	@Autowired
	private Storage storage;
	
	@Autowired
	private AttachmentRepository attachmentRepository;

	private final String BUCKET_NAME = "gcf_attachment_storage_bucket";

	public Attachment uploadBannerFile(MultipartFile file, String folderName) {
        try {
            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName.substring(originalFileName.lastIndexOf(".")); // 파일 확장자 추출

            // UUID를 사용하여 고유한 파일 이름 생성
            String uniqueID = UUID.randomUUID().toString();

            String uniqueFileName = uniqueID + "_" + originalFileName;

            String folder = folderName + "/"; // 폴더명 설정

            String fileInFolder = folder + uniqueFileName;

            byte[] fileBytes = file.getBytes();
            // GCS에 파일을 업로드합니다.
            BlobId blobId = BlobId.of(BUCKET_NAME, fileInFolder);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(extension).build();

            try (WriteChannel writer = storage.writer(blobInfo)) {
                writer.write(ByteBuffer.wrap(fileBytes));
            } catch (Exception ex) {
                // 예외 처리 코드
                ex.printStackTrace();
                return null; // 업로드 실패 시 null 반환
            }

            // GCS에 업로드된 파일의 URL을 가져옵니다.
            Blob blob = storage.get(blobId);
            String fileUrl = null; // 파일의 URL을 저장할 변수 선언
            if (blob != null) {
                fileUrl = blob.getMediaLink(); // 파일의 URL 가져오기
            }

            // 첨부 파일 정보 생성
            Attachment attachment = new Attachment();
            attachment.setOriginal_name(originalFileName);
            attachment.setFile_name(fileInFolder);
            attachment.setFile_path(fileUrl);
            attachment.setParent(folderName); // 폴더명을 부모로 설정

            // 데이터베이스에 첨부 파일 정보 저장
            attachmentRepository.save(attachment);

            return attachment;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
	
	public Attachment uploadNoticeFile(MultipartFile file, Notice notice) {
	    try {
	        String originalFileName = file.getOriginalFilename();
	        String extension = originalFileName.substring(originalFileName.lastIndexOf(".")); // 파일 확장자 추출

	        // UUID를 사용하여 고유한 파일 이름 생성
	        String uniqueID = UUID.randomUUID().toString();

	        String uniqueFileName = uniqueID + "_" + originalFileName;

	        String noticeFolder = "notice/";
	        String fileInNoticeFolder = noticeFolder + uniqueFileName;

	        System.out.println(fileInNoticeFolder);

	        byte[] fileBytes = file.getBytes();
	        // GCS에 파일을 업로드합니다.
	        BlobId blobId = BlobId.of(BUCKET_NAME, fileInNoticeFolder);
	        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(extension).build();

	        try (WriteChannel writer = storage.writer(blobInfo)) {
	            writer.write(ByteBuffer.wrap(fileBytes));
	        } catch (Exception ex) {
	            // 예외 처리 코드
	            ex.printStackTrace();
	            return null; // 업로드 실패 시 null 반환
	        }

	        // GCS에 업로드된 파일의 URL을 가져옵니다.
	        Blob blob = storage.get(blobId);
	        String fileUrl = null; // 파일의 URL을 저장할 변수 선언
	        if (blob != null) {
	            fileUrl = blob.getMediaLink(); // 파일의 URL 가져오기
	        }

	        // 첨부 파일 정보를 notice 객체에 추가
	        Attachment attachment = new Attachment();
	        attachment.setNoticeId(notice);
	        attachment.setOriginal_name(originalFileName);
	        attachment.setFile_name(fileInNoticeFolder);
	        attachment.setFile_path(fileUrl);
	        attachment.setParent("notice");
	        notice.getAttachments().add(attachment); // notice 객체에 첨부 파일 추가

	        // 데이터베이스에 첨부 파일 정보 저장
	        attachmentRepository.save(attachment);

	        return attachment;
	    } catch (IOException e) {
	        e.printStackTrace();
	        return null;
	    }
	}


	public byte[] downloadFile(String fileName) {
		// GCS에서 파일을 다운로드합니다.
		BlobId blobId = BlobId.of(BUCKET_NAME, fileName);
		Blob blob = storage.get(blobId);
		return blob != null ? blob.getContent() : null;
	}
	
	public void deleteFile(Attachment attachment) {
		String fileName = attachment.getFile_name(); // Attachment 객체에서 파일 이름 가져오기
		BlobId blobId = BlobId.of(BUCKET_NAME, fileName);
		boolean deleted = storage.delete(blobId);
		if (deleted) {
			// 파일이 성공적으로 삭제되었을 때 처리할 작업을 추가할 수 있습니다.
			System.out.println("File " + fileName + " successfully deleted from GCS.");
		} else {
			// 파일 삭제 실패 시 처리할 작업을 추가할 수 있습니다.
			System.out.println("Failed to delete file " + fileName + " from GCS.");
		}
	}

}