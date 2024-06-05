package com.gcf.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gcf.spring.constant.On_or_OFF;
import com.gcf.spring.entity.Comment;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.CommentRepository;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.On_programRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

@RestController
public class TestController {

    @Autowired
    private On_programRepository onProgramRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MemberRepository memberRepository;

    // 테스트용 엔드포인트: OnProgram 임의 값 입력
    @GetMapping("/test/onprogram")
    public OnProgram createTestOnProgram() {
        OnProgram onProgram = new OnProgram();
        onProgram.setOnProgramName("Test Program");
        onProgram.setOperatingStartDay(LocalDate.of(2023, 6, 5));
        onProgram.setViews(0);
        onProgram.setLikesCount(0);
        onProgram.setOnlineCategory(Arrays.asList("Category1", "Category2"));
        onProgram.setProgramType(On_or_OFF.온라인);

        return onProgramRepository.save(onProgram);
    }

    // 테스트용 엔드포인트: Comment 임의 값 입력
    @GetMapping("/test/comment")
    public Comment createTestComment() {
        Member member = new Member();
        member.setId("test_member");
        member.setName("Test User");
        member.setPassword("password");
        member.setBirth(LocalDate.of(1990, 1, 1));
        member.setPhone_number("010-1234-5678");
        member.setEmail("test@example.com");
        member.setAddress("123 Test Street");
        member.setDetail_address("Apt 101");
        member.setEmail_agreement(true);
        member.setMessage_agreement(true);
        member.setMail_agreement(true);
        member.setCreatedAt(LocalDateTime.now());
        member.setInterests(Arrays.asList("Interest1", "Interest2"));

        member = memberRepository.save(member); // Save the member first

        OnProgram onProgram = onProgramRepository.findById(1).orElse(null);

        Comment comment = new Comment();
        comment.setMember(member);
        comment.setContent("This is a test comment");
        comment.setPostId(onProgram);
        comment.setCreatedDate(LocalDate.now());
        comment.setModifiedDate(LocalDateTime.now());

        return commentRepository.save(comment);
    }
}
