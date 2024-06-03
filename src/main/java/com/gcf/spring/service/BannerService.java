package com.gcf.spring.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gcf.spring.dto.BannerInput;
import com.gcf.spring.dto.BannerModule;
import com.gcf.spring.dto.BannerModulesWrapper;
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

    public BannerService(BannerOneRepository bannerOneRepository, BannerTwoRepository bannerTwoRepository, AttachmentRepository attachmentRepository) {
        this.bannerOneRepository = bannerOneRepository;
        this.bannerTwoRepository = bannerTwoRepository;
        this.attachmentRepository = attachmentRepository;
    }

    public String updateBanners(BannerModulesWrapper modules) {
    	
    	// 기존 데이터 삭제
        bannerOneRepository.deleteAll();
        bannerTwoRepository.deleteAll();
    	
        for (BannerModule bannerModule : modules.getModules()) {
            System.out.println("Entity ID: " + bannerModule.getEntityId());
            for (BannerInput bannerInput : bannerModule.getInputs()) {
            	System.out.println("FileName : " + bannerInput.getAttachment());
            	System.out.println("Link : " + bannerInput.getLink());
                // bannerId 관련 코드 삭제

                // 엔티티 ID에 따라서 bannerone 또는 bannertwo에 저장
                if ("bannerone".equals(bannerModule.getEntityId())) {
                    BannerOne bannerOne = new BannerOne();
                    bannerOne.setUrl(bannerInput.getLink());

                    Attachment attachment = saveAttachment(bannerInput.getAttachment());
                    attachment.setParent("banner"); 
                    bannerOne.setAttachment(attachment);
                    
                    bannerOneRepository.save(bannerOne);
                } else if ("bannertwo".equals(bannerModule.getEntityId())) {
                    BannerTwo bannerTwo = new BannerTwo();
                    bannerTwo.setUrl(bannerInput.getLink());

                    Attachment attachment = saveAttachment(bannerInput.getAttachment());
                    attachment.setParent("banner"); 
                    bannerTwo.setAttachment(attachment);

                    bannerTwoRepository.save(bannerTwo);
                }
            }
        }
        return "배너 데이터가 성공적으로 업데이트되었습니다.";
    }

    private Attachment saveAttachment(MultipartFile attachmentFile) {
        Attachment attachment = new Attachment();
        // 첨부 파일 관련 정보를 attachment 엔티티에 저장하는 코드 작성
        return attachmentRepository.save(attachment);
    }
}
