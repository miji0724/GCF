package com.gcf.spring.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.gcf.spring.entity.OffProgram;

public class OffProgramSpecification {

	
    public static Specification<OffProgram> hasState(String state) {
        return (root, query, criteriaBuilder) ->
                state == null ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("applicationState"), state);
    }

    public static Specification<OffProgram> hasPlaceName(String placeName) {
        return (root, query, criteriaBuilder) ->
                placeName == null ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("placeName"), placeName);
    }

    public static Specification<OffProgram> hasCategory(String category) {
        return (root, query, criteriaBuilder) ->
                category == null ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("category"), category);
    }

    public static Specification<OffProgram> hasOperatingDate(LocalDate date) {
        return (root, query, criteriaBuilder) -> {
            if (date == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.and(
                    criteriaBuilder.lessThanOrEqualTo(root.get("operatingStartDay"), date),
                    criteriaBuilder.greaterThanOrEqualTo(root.get("operatingEndDay"), date)
            ); // 마감된 강의 구분, 이걸로 진행중인 강의는 앞으로 마감된 강의는 뒤로 보냄 
        };
    }
}
