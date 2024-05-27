package com.gcf.spring.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.WriteChannel;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;

@Service
public class AttachmentService {

	@Autowired
	private Storage storage;

	private final String BUCKET_NAME = "gcf_attachment_storage_bucket";

	public String uploadFile(MultipartFile file) {
	    try {
	        String fileName = file.getOriginalFilename();
	        byte[] fileBytes = file.getBytes();

	        // 바이트 배열을 InputStream으로 변환합니다.
	        InputStream fileInputStream = new ByteArrayInputStream(fileBytes);

	        // GCS에 파일을 업로드합니다.
	        BlobId blobId = BlobId.of(BUCKET_NAME, fileName);
	        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();

	        String fileUrl = null; // 파일의 URL을 저장할 변수 선언

	        try (WriteChannel writer = storage.writer(blobInfo)) {
	            writer.write(ByteBuffer.wrap(fileBytes));
	        } catch (Exception ex) {
	            // 예외 처리 코드
	            ex.printStackTrace();
	        }

	        // 파일 업로드 후 처리할 작업을 추가할 수 있습니다.

	        // GCS에 업로드된 파일의 URL을 가져옵니다.
	        Blob blob = storage.get(blobId);
	        if (blob != null) {
	            fileUrl = blob.getMediaLink(); // 파일의 URL 가져오기
	        }

	        // InputStream을 닫습니다.
	        fileInputStream.close();

	        // 파일의 URL을 반환합니다.
	        return fileUrl;
	    } catch (IOException e) {
	        e.printStackTrace();
	        // 필요에 따라 예외 처리를 수행할 수 있습니다.
	        return null;
	    }
	}


	public byte[] downloadFile(String fileName) {
		// GCS에서 파일을 다운로드합니다.
		BlobId blobId = BlobId.of(BUCKET_NAME, fileName);
		Blob blob = storage.get(blobId);
		if (blob != null) {
			return blob.getContent();
		} else {
			return null;
		}
	}

	public void deleteFile(String fileName) {
		// GCS에서 파일을 삭제합니다.
		BlobId blobId = BlobId.of(BUCKET_NAME, fileName);
		boolean deleted = storage.delete(blobId);
		if (deleted) {
			// 파일이 성공적으로 삭제되었을 때 처리할 작업을 추가할 수 있습니다.
		}
	}
}