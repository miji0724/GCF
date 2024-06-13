package com.gcf.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gcf.spring.entity.OffBookMark;

public interface OffBookMarkRepository extends JpaRepository<OffBookMark, Integer> {
}