package com.gcf.spring.repository;

import com.gcf.spring.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    // 추가적인 쿼리 메서드가 필요하다면 여기에 작성합니다.
}
