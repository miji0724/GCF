package com.gcf.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gcf.spring.entity.OnBookMark;

public interface OnBookMarkRepository extends JpaRepository<OnBookMark, Integer> {
}
