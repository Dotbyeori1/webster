package com.seinfo.webster.component.login.service;

import com.seinfo.webster.component.login.model.LoginModel;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface LoginService {

    ResponseEntity<?> loginProcess(LoginModel loginModel) throws Exception; // 로그인

    ResponseEntity<?> removeToken() throws Exception; //로그아웃

    ResponseEntity<?> unlockPwdProcess(Map<String, Object> param) throws Exception; // 임시 비밀번호 발급

    ResponseEntity<?> changePwdProcess(LoginModel loginModel) throws Exception; // 비민번호 변경

    ResponseEntity<?> pwdFindProcess(Map<String, Object> param) throws Exception; // 비밀번호 찾기

    ResponseEntity<?> idFindProcess(Map<String, Object> param); // id 찾기

    ResponseEntity<?> refreshToken() throws Exception;
}
