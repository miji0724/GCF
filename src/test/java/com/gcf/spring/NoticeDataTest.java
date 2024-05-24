package com.gcf.spring;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.gcf.spring.entity.Notice;
import com.gcf.spring.repository.AdminNoticeRepository;

@SpringBootTest
public class NoticeDataTest {

    @Autowired
    private AdminNoticeRepository noticeRepository;

    @BeforeEach
    public void setUp() {
        // 테스트 실행 전에 데이터베이스에서 모든 공지사항 삭제
        noticeRepository.deleteAll();
    }
    
    @Test
    public void testCreateMultipleNotices() {
        // 삽입할 데이터 목록 생성
        List<Notice> notices = new ArrayList<>();
        
        // 삽입할 데이터 수
        int numberOfNotices = 200;
        
        // 반복문을 통해 데이터 생성
        for (int i = 0; i < numberOfNotices; i++) {
            Notice notice = new Notice();
            
            // 데이터 설정
            notice.setTitle("Notice Title " + i);
            notice.setContent("Notice Content " + i);
            
            // 리스트에 추가
            notices.add(notice);
            
            // Notice 저장
            Notice savedNotice = noticeRepository.save(notice);
            
            // 저장된 Notice 확인
            assertNotNull(savedNotice);
            assertNotNull(savedNotice.getId()); // Notice의 ID가 null이 아닌지 확인
        }
        
        // 생성된 데이터 확인
        List<Notice> retrievedNotices = noticeRepository.findAll();
    }

    // 다른 테스트 케이스도 작성 가능
}
