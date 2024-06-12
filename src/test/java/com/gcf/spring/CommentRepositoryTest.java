package com.gcf.spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.gcf.spring.constant.Role;
import com.gcf.spring.entity.Comment;
import com.gcf.spring.entity.Member;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.CommentRepository;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;

    private Comment comment;
    private Member member;
    private OnProgram post;

    @BeforeEach
    public void setUp() {
        System.out.println("Setting up the test data...");

        member = new Member();
        member.setId("test_id"); // 실제 존재하는 멤버 아이디로 변경 필요
        member.setName("Test Member");
        member.setPassword("password");
        member.setBirth(LocalDate.of(1990, 1, 1));
        member.setPhone_number("010-1234-5678");
        member.setRole(Role.USER);
        
        post = new OnProgram();
        post.setId(1); // 실제 존재하는 포스트 아이디로 변경 필요
        // 필요한 경우 다른 post 필드 설정

        comment = new Comment();
        comment.setMember(member);
        comment.setContent("테스트 댓글");
        comment.setPost(post);
        comment.setCreatedDate(LocalDate.now());
    }

    @Test
    public void testCreateComment() {
        System.out.println("Running testCreateComment...");
        Comment savedComment = commentRepository.save(comment);
        assertNotNull(savedComment);
        assertNotNull(savedComment.getId());
        assertEquals("테스트 댓글", savedComment.getContent());
        assertEquals(LocalDate.now(), savedComment.getCreatedDate());
        assertFalse(savedComment.isDeleted());
        assertNotNull(savedComment.getMember());
        assertNotNull(savedComment.getPost());
    }

    @Test
    public void testUpdateComment() {
        System.out.println("Running testUpdateComment...");
        Comment savedComment = commentRepository.save(comment);
        String newContent = "업데이트된 댓글 내용";
        savedComment.updateContent(newContent);

        Comment updatedComment = commentRepository.save(savedComment);

        assertEquals(newContent, updatedComment.getContent());
        assertNotNull(updatedComment.getModifiedDate());
    }

    @Test
    public void testDeleteComment() {
        System.out.println("Running testDeleteComment...");
        Comment savedComment = commentRepository.save(comment);
        savedComment.deleteComment();

        Comment deletedComment = commentRepository.save(savedComment);

        assertTrue(deletedComment.isDeleted());
    }

    @Test
    public void testFindCommentById() {
        System.out.println("Running testFindCommentById...");
        Comment savedComment = commentRepository.save(comment);
        Optional<Comment> foundComment = commentRepository.findById(savedComment.getId());

        assertTrue(foundComment.isPresent());
        assertEquals(savedComment.getId(), foundComment.get().getId());
    }
}
