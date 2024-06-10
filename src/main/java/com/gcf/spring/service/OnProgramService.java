package com.gcf.spring.service;

import com.gcf.spring.dto.OnProgramDto;
import com.gcf.spring.entity.OnProgram;
import com.gcf.spring.repository.OnProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OnProgramService {

    @Autowired
    private OnProgramRepository onProgramRepository;

    public OnProgram createOnProgram(OnProgramDto onProgramDto) {
        OnProgram onProgram = OnProgram.createOnProgram(onProgramDto);
        return onProgramRepository.save(onProgram);
    }

    // 추가적인 서비스 메서드가 필요하면 여기에 작성할 수 있습니다.
}
