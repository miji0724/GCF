package com.gcf.spring.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.dto.bannerdto.BannerInput;
import com.gcf.spring.dto.bannerdto.BannerModule;
import com.gcf.spring.dto.bannerdto.BannerModulesWrapper;
import com.gcf.spring.entity.Attachment;
import com.gcf.spring.entity.BannerOne;
import com.gcf.spring.entity.BannerTwo;
import com.gcf.spring.repository.AttachmentRepository;
import com.gcf.spring.repository.BannerOneRepository;
import com.gcf.spring.repository.BannerTwoRepository;

@Service
public class BannerService {

	private final BannerOneRepository bannerOneRepository;
	private final BannerTwoRepository bannerTwoRepository;
	private final AttachmentRepository attachmentRepository;
	private final AttachmentService attachmentService;

	public BannerService(BannerOneRepository bannerOneRepository, BannerTwoRepository bannerTwoRepository,
			AttachmentRepository attachmentRepository, AttachmentService attachmentService) {
		this.bannerOneRepository = bannerOneRepository;
		this.bannerTwoRepository = bannerTwoRepository;
		this.attachmentRepository = attachmentRepository;
		this.attachmentService = attachmentService;
	}

	public String updateBanners(BannerModulesWrapper modules) {
		
		bannerOneRepository.deleteAll();
		bannerTwoRepository.deleteAll();
		for (BannerModule bannerModule : modules.getModules()) {
			System.out.println("Entity ID: " + bannerModule.getEntityId());
			for (BannerInput bannerInput : bannerModule.getInputs()) {
				System.out.println("FileName : " + bannerInput.getAttachment());
				System.out.println("Link : " + bannerInput.getLink());

				MultipartFile file = bannerInput.getAttachment(); // 파일 가져오기
				Attachment attachment = attachmentService.uploadBannerFile(file);

				if ("bannerone".equals(bannerModule.getEntityId())) {
					BannerOne bannerOne = new BannerOne();
					bannerOne.setUrl(bannerInput.getLink());

					if (attachment != null) {
						attachment.setBannerOne(bannerOne);
						bannerOne.setAttachment(attachment);
					}

					bannerOneRepository.save(bannerOne);
				} else if ("bannertwo".equals(bannerModule.getEntityId())) {
					BannerTwo bannerTwo = new BannerTwo();
					bannerTwo.setUrl(bannerInput.getLink());

					if (attachment != null) {
						attachment.setBannerTwo(bannerTwo);
						bannerTwo.setAttachment(attachment);
					}

					bannerTwoRepository.save(bannerTwo);
				}
			}
		}
		//attachmentService.deleteUnlinkedFiles();
		return "배너 데이터가 성공적으로 업데이트되었습니다.";
	}
}