package com.gcf.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gcf.spring.entity.OnBookMark;

public interface OnBookMarkRepository extends JpaRepository<OnBookMark, Integer> {

	List<OnBookMark> findByMemberId(String userId);
}