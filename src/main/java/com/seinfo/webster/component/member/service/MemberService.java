package com.seinfo.webster.component.member.service;

import com.seinfo.webster.component.member.model.MemberModel;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface MemberService {
	
	void insertMember(MemberModel memberModel); // 회원가입

	ResponseEntity<?> emailCheckProcess(String userId); // 이메일 인증

    ResponseEntity<?> extendTime(String userEmail);

	ResponseEntity<?> checkAuthNumberProcess(String email, String authNumber); // 인증번호 확인

	ResponseEntity<?> getMemberInfo(); // 회원정보 보기

	void setMyInfoUpd(MemberModel memberModel); // 회원정보 업데이트

	ResponseEntity<?> dropUserInfo(Map<String, Object> param) throws Exception; //회원탈퇴

}
