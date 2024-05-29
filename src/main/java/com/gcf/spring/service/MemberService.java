package com.gcf.spring.service;

import com.gcf.spring.dto.MemberDTO;
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

    public MemberDTO createMember(MemberDTO memberDTO) {
        Member member = modelMapper.map(memberDTO, Member.class);
        String encodedPassword = passwordEncoder.encode(memberDTO.getPassword());
        member.setPassword(encodedPassword);
        member = memberRepository.save(member);
        return modelMapper.map(member, MemberDTO.class);
    }

    public List<MemberDTO> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(member -> modelMapper.map(member, MemberDTO.class))
                .collect(Collectors.toList());
    }

    public MemberDTO getMemberById(String id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
        return modelMapper.map(member, MemberDTO.class);
    }

    public MemberDTO updateMember(String id, MemberDTO memberDTO) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
        modelMapper.map(memberDTO, member);
        if (memberDTO.getPassword() != null && !memberDTO.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(memberDTO.getPassword());
            member.setPassword(encodedPassword);
        }
        member = memberRepository.save(member);
        return modelMapper.map(member, MemberDTO.class);
    }

    public void deleteMember(String id) {
        memberRepository.deleteById(id);
    }
}
