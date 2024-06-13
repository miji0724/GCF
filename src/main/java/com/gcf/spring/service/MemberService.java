package com.gcf.spring.service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gcf.spring.constant.Role;
import com.gcf.spring.dto.MemberDto;
import com.gcf.spring.entity.Member;
import com.gcf.spring.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {
    
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder; 
	private final JavaMailSender mailSender;
	private final ModelMapper modelMapper;
    
    private boolean isValidId(String id) {
        String regex = "^[a-zA-Z0-9]{5,20}$";
        return Pattern.matches(regex, id);
    }
    

    public boolean existsById(String id) {
        System.out.println("아이디 존재 확인");
        return memberRepository.existsById(id);
    }
    
    public void signUp(Member member) {
        memberRepository.save(member);
    }
    
    public ResponseEntity<String> checkId(String id) {
        if (!isValidId(id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("아이디는 5글자 이상, 20자 이하이어야 하며 영문과 숫자를 포함해야 합니다. 특수문자는 사용 불가합니다.");
        }
  
        if (existsById(id)) {
            return ResponseEntity.ok("이미 사용 중인 아이디입니다. 아이디를 변경해주세요.");
        } else {
            return ResponseEntity.ok("사용 가능한 아이디입니다.");
        }
    }
    
    public boolean isPasswordMatch(String password, String confirm_password) {
        return password.equals(confirm_password);
    }
    
    // 회원가입
    public ResponseEntity<String> signUp(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        // 아이디 유효성 검사
        if (!isValidId(memberDto.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("아이디는 5글자 이상, 20자 이하이어야 하며 영문과 숫자를 포함해야 합니다. 특수문자는 사용 불가합니다.");
        }

        // 비밀번호 일치 여부 확인
        if (!isPasswordMatch(memberDto.getPassword(), memberDto.getConfirm_password())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
        }

        // 아이디 중복 체크
        if (existsById(memberDto.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 사용 중인 아이디입니다. 아이디를 변경해주세요.");
        }

        Member member = Member.createMember(memberDto, passwordEncoder);
        member.setRole(Role.USER);

        try {
            // 회원 정보를 데이터베이스에 저장
            memberRepository.save(member);
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다");
        }
    }
    
    public Member authenticate(String id, String password) {
        try {
            Optional<Member> memberOptional = memberRepository.findById(id);

            if (memberOptional.isPresent()) {
                Member member = memberOptional.get();
                
                // 비밀번호 매칭
                boolean matches = passwordEncoder.matches(password, member.getPassword());
                System.out.println("비밀번호 매칭 결과: " + matches);
                if (matches) {
                    return member; // 비밀번호가 일치하는 경우 회원 정보 반환
                } else {
                    System.out.println("비밀번호가 일치하지 않습니다.");
                    return null; // 비밀번호가 일치하지 않는 경우 null 반환
                }
            } else {
                System.out.println("회원이 존재하지 않습니다.");
                return null; // 회원이 존재하지 않는 경우 null 반환
            }
        } catch (Exception e) {
            System.out.println("예외: " + e.getMessage());
            return null; // 예외 발생 시 null 반환
        }
    }
    
    public String findId(MemberDto memberDto) {
        Optional<Member> foundIdMember = memberRepository.findIdByNameAndEmail(memberDto.getName(), memberDto.getEmail());
        if (foundIdMember.isPresent()) {
            Member member = foundIdMember.get();
            System.out.println(member);
            
            String findId = member.getId();
            System.out.println(findId);
            
            return findId;
        } else {
            return null;
        }
    }
    
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int PASSWORD_LENGTH = 10;
    
    public String generateTempPassword() {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            password.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return password.toString();
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
    
    public String findPw(MemberDto memberDto) {
        Optional<Member> foundPwMember = memberRepository.findByIdAndEmail(memberDto.getId(), memberDto.getEmail());
        if (foundPwMember.isPresent()) {
            Member member = foundPwMember.get();

            String tempPassword = generateTempPassword();
            sendEmail(member.getEmail(), "[GCF] 임시 비밀번호\n", "안녕하세요, 임시 비밀번호는 다음과 같습니다: " + tempPassword + "\n다시 로그인 해주세요.");

            // 여기서 임시 비밀번호를 데이터베이스에 저장하는 로직을 추가합니다.
            String encodedPassword = passwordEncoder.encode(tempPassword);
            member.setPassword(encodedPassword);
            memberRepository.save(member);

            return member.getEmail();
        } else {
            return null;
        }
    }
    
    public void updateMember(String userId, MemberDto memberDto) {
        Optional<Member> optionalMember = memberRepository.findById(userId);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            member.setName(memberDto.getName());
            if (memberDto.getPassword() != null && !memberDto.getPassword().isEmpty()) {
                member.setPassword(passwordEncoder.encode(memberDto.getPassword()));
            }
            member.setBirth(memberDto.getBirth());
            member.setPhone_number(memberDto.getPhone_number());
            member.setTel_number(memberDto.getTelNumber());
            member.setEmail(memberDto.getEmail());
            member.setAddress(memberDto.getAddress());
            member.setDetail_address(memberDto.getDetail_address());
            member.setEmail_agreement(memberDto.getEmail_agreement());
            member.setMessage_agreement(memberDto.getMessage_agreement());
            member.setMail_agreement(memberDto.getMail_agreement());
            member.setInterests(memberDto.getInterests());
            member.setMarried(memberDto.getMarried());
            member.setHasChildren(memberDto.getHasChildren());
            memberRepository.save(member);
        } else {
            throw new RuntimeException("Member not found with id: " + userId);
        }
    }

    public void deleteMember(String userId) {
        memberRepository.deleteById(userId);
    }
    
    public List<Member> getAllMembers(){
    	return memberRepository.findAll();
    }
    
    
    public Member memberUpdateInManage(MemberDto memberDto, PasswordEncoder passwordEncoder) {
        // 1. MemberDto 객체로부터 수정된 회원 정보를 추출합니다.
        String memberId = memberDto.getId(); // 혹은 다른 방식으로 회원을 식별하는 정보를 사용할 수 있습니다.
        
        // 회원을 찾지 못한 경우에 대한 처리
        Member existingMember = memberRepository.findById(memberId).orElse(null);
        
        // 회원을 찾지 못했을 때의 처리
        if (existingMember == null) {
            // 처리할 작업을 수행합니다. 예를 들어 예외를 던지거나 다른 방식으로 사용자에게 알릴 수 있습니다.
            System.out.println("회원을 찾을 수 없습니다.");
            return null; // 또는 다른 적절한 처리를 수행할 수 있습니다.
        }
        
        // MemberDto를 Member 엔티티로 매핑
        Member updatedMember = modelMapper.map(memberDto, Member.class);
        
       
        // 업데이트된 회원 정보를 저장하고 반환합니다.
        return memberRepository.save(updatedMember);
    }
    
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException(id);
        }
        Member member = optionalMember.get();
        return User.builder()
                   .username(member.getEmail())
                   .password(member.getPassword())
                   .roles(member.getRole().toString())
                   .build();
    }
    
    
}