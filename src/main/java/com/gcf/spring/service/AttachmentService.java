package com.gcf.spring.service;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.Notice;
import com.gcf.spring.repository.AttachmentRepository;
import com.google.api.gax.paging.Page;
import com.google.cloud.WriteChannel;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;

@Service
public class AttachmentService {

	@Autowired
	private Storage storage;

	@Autowired
	private AttachmentRepository attachmentRepository;

	private final String BUCKET_NAME = "gcf_attachment_storage_bucket";

	public Attachment uploadNoticeFile(MultipartFile file, Notice notice) {
		try {
			String originalFileName = file.getOriginalFilename();
			String extension = originalFileName.substring(originalFileName.lastIndexOf(".")); // 파일 확장자 추출

			// UUID를 사용하여 고유한 파일 이름 생성
			String uniqueID = UUID.randomUUID().toString();

			String uniqueFileName = uniqueID + "_" + originalFileName;

			String Folder = "notice/";
			String fileInFolder = Folder + uniqueFileName;

			System.out.println(fileInFolder);

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

			// 첨부 파일 정보를 notice 객체에 추가
			Attachment attachment = new Attachment();
			attachment.setNotice(notice);
			attachment.setOriginal_name(originalFileName);
			attachment.setFile_name(fileInFolder);
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

	public Attachment uploadBannerFile(MultipartFile file) {
		if (file == null || file.isEmpty()) {
			System.out.println("MultipartFile is null or empty.");
			return null;
		}

		try {
			String originalFileName = file.getOriginalFilename();
			String extension = originalFileName.substring(originalFileName.lastIndexOf(".")); // 파일 확장자 추출

			// UUID를 사용하여 고유한 파일 이름 생성
			String uniqueID = UUID.randomUUID().toString();
			String uniqueFileName = uniqueID + "_" + originalFileName;

			String folder = "banner/"; // 폴더명 설정
			String fileInFolder = folder + uniqueFileName;

			byte[] fileBytes = file.getBytes();
			// GCS에 파일을 업로드합니다.
			BlobId blobId = BlobId.of(BUCKET_NAME, fileInFolder);
			BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();

			try (WriteChannel writer = storage.writer(blobInfo)) {
				writer.write(ByteBuffer.wrap(fileBytes));
			} catch (Exception ex) {
				// 업로드 실패 시 예외 처리
				System.out.println("Failed to upload file to GCS.");
				ex.printStackTrace();
				return null;
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
			attachment.setParent("banner"); // 폴더명을 부모로 설정

			// 데이터베이스에 첨부 파일 정보 저장
			attachmentRepository.save(attachment);

			return attachment;
		} catch (IOException e) {
			// IO 예외 처리
			System.out.println("IOException occurred during file upload.");
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

	public void deleteUnlinkedFiles() {
		// GCS에서 Bucket을 가져옵니다.
		Bucket bucket = storage.get(BUCKET_NAME);

		// Bucket이 존재하지 않으면 종료합니다.
		if (bucket == null) {
			return;
		}

		// Bucket 내의 모든 Blob을 나열합니다.
		Page<Blob> blobs = bucket.list();

		// 각 Blob의 메타데이터를 확인하여 파일 이름을 가져온 후 attachment의 file_name과 비교합니다.
		for (Blob blob : blobs.iterateAll()) {
			// Blob의 이름을 가져옵니다.
			String blobName = blob.getName();

			// attachment의 file_name과 비교하여 일치하는 데이터가 없는 경우 해당 파일을 삭제합니다.
			boolean isLinked = false;
			for (Attachment attachment : attachmentRepository.findAll()) {
				if (attachment.getFile_name().equals(blobName)) {
					isLinked = true;
					break;
				}
			}

			// attachment의 file_name과 일치하는 데이터가 없는 경우 해당 파일을 삭제합니다.
			if (!isLinked) {
				blob.delete(); // 파일 삭제
				System.out.println("File " + blobName + " deleted from GCS."); // 삭제된 파일에 대한 로그 출력
			}
		}
	}

}