package com.gcf.spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.Comment;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.CommentRepository;
import com.gcf.spring.repository.MemberRepository;
import com.gcf.spring.repository.OnProgramRepository;

@SpringBootTest
@Transactional
@Rollback(false)
public class CommentTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private OnProgramRepository onProgramRepository;

    @Autowired
    private CommentRepository commentRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    public void testCreateAndModifyComment() {
        // Create Member
        MemberDto memberDto = new MemberDto();
        memberDto.setId("testuser");
        memberDto.setName("Test User");
        memberDto.setPassword("password");
        memberDto.setBirth(LocalDate.of(1990, 1, 1));
        memberDto.setPhone_number("010-1234-5678");
        memberDto.setTelNumber("02-1234-5678");
        memberDto.setEmail("testuser@example.com");
        memberDto.setAddress("Test Address");
        memberDto.setDetail_address("Test Detail Address");
        memberDto.setEmail_agreement(true);
        memberDto.setMessage_agreement(true);
        memberDto.setMail_agreement(true);
        memberDto.setInterests(Collections.singletonList("Reading"));
        memberDto.setMarried(false);
        memberDto.setHasChildren(false);

        Member member = Member.createMember(memberDto, passwordEncoder);
        member.setCreatedAt(LocalDateTime.now()); // 명시적으로 createdAt 설정
        memberRepository.save(member);

        // Create OnProgram
        OnProgramDto onProgramDto = new OnProgramDto();
        onProgramDto.setProgramName("Test Program");
        onProgramDto.setOperatingStartDay(LocalDate.of(2024, 8, 1));
        onProgramDto.setViews(0);
        onProgramDto.setLikesCount(0);
        onProgramDto.setCategory("Education");
        onProgramDto.setProgramType("Online");
        onProgramDto.setApprovalState("Pending");

        OnProgram onProgram = OnProgram.createOnProgram(onProgramDto);
        onProgramRepository.save(onProgram);

        // Create Comment
        Comment comment = new Comment();
        comment.setMember(member);
        comment.setContent("This is a test comment");
        comment.setPost(onProgram);
        commentRepository.save(comment);

        Comment foundComment = commentRepository.findById(comment.getId()).orElse(null);
        assertNotNull(foundComment);
        assertEquals("This is a test comment", foundComment.getContent());
        assertEquals(member.getId(), foundComment.getMember().getId());
        assertEquals(onProgram.getId(), foundComment.getPost().getId());

        // Update Comment
        foundComment.updateContent("Updated comment content");
        commentRepository.save(foundComment);

        Comment updatedComment = commentRepository.findById(foundComment.getId()).orElse(null);
        assertNotNull(updatedComment);
        assertEquals("Updated comment content", updatedComment.getContent());
        assertNotNull(updatedComment.getModifiedDate());

        // Delete Comment
        updatedComment.deleteComment();
        commentRepository.save(updatedComment);

        Comment deletedComment = commentRepository.findById(updatedComment.getId()).orElse(null);
        assertNotNull(deletedComment);
        assertTrue(deletedComment.isDeleted());
    }
}