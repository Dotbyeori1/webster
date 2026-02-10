package com.seinfo.webster.component.login.controller;

import com.seinfo.webster.component.login.model.LoginModel;
import com.seinfo.webster.component.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/login")
public class LoginController {

	private final LoginService loginService;

	@PostMapping(value = "/refreshToken", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> refreshToken() throws Exception {
		return loginService.refreshToken();
	}

	/**
	 * 로그아웃
	 * @throws Exception
	 */
	@PostMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
	//public ResponseEntity<CoreWebApiResponseModel> logout() throws Exception {
	public ResponseEntity<?> logout() throws Exception {
		return loginService.removeToken();
	}
	
	/**
	 * 로그인 처리
	 * @param
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/loginProcess", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> loginProcess(@RequestBody LoginModel loginModel, BindingResult bindingResult) throws Exception {
		HashMap<String, Object> message = new HashMap<String, Object>();
		
		if(bindingResult.hasErrors()) {
			FieldError fieldError = bindingResult.getFieldError();
			if(fieldError != null) {
				String errorMessage = fieldError.getDefaultMessage();
				message.put("message", errorMessage);
			}
			return ResponseEntity.badRequest().body(message);			
		}
		return loginService.loginProcess(loginModel);
	}
	
	/**
	 * 비밀번호 잠금 해제
	 * @param
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/login/unlockPwd", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> postUnlockPwd(@RequestBody Map<String, Object> param) throws Exception {
		return loginService.unlockPwdProcess(param);
	}
	
	/**
	 * 비밀번호 변경 (로긴시 비밀번호 초기화로 인한)
	 * @param
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/tmpPassChange/changePwdProcess")
	public ResponseEntity<?> tmpPassChangeProcess(@RequestBody LoginModel loginModel) throws Exception {
		return loginService.changePwdProcess(loginModel);
	}
	
	/**
	 * id 찾기
	 * @param
	 * @return
	 * @throw Exception
	 */
	@PostMapping(value = "/passFind/idFindProcess", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> idFindProcess(@RequestBody Map<String, Object> param) {
		return loginService.idFindProcess(param);
	}
	
	/**
	 * 비밀번호 찾기
	 * @param
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/passFind/pwdFindProcess", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> passFindProcess(@RequestBody Map<String, Object> param) throws Exception {
		return loginService.pwdFindProcess(param);
	}
}
