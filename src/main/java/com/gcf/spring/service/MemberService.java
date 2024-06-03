package com.gcf.spring.service;

import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public MemberDto createMember(MemberDto memberDTO) {
        Member member = modelMapper.map(memberDTO, Member.class);
        String encodedPassword = passwordEncoder.encode(memberDTO.getPassword());
        member.setPassword(encodedPassword);
        member = memberRepository.save(member);
        return modelMapper.map(member, MemberDto.class);
    }

    public List<MemberDto> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(member -> modelMapper.map(member, MemberDto.class))
                .collect(Collectors.toList());
    }

    public MemberDto getMemberById(String id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
        return modelMapper.map(member, MemberDto.class);
    }

    public MemberDto updateMember(String id, MemberDto memberDTO) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
        modelMapper.map(memberDTO, member);
        if (memberDTO.getPassword() != null && !memberDTO.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(memberDTO.getPassword());
            member.setPassword(encodedPassword);
        }
        member = memberRepository.save(member);
        return modelMapper.map(member, MemberDto.class);
    }

    public void deleteMember(String id) {
        memberRepository.deleteById(id);
    }
}
