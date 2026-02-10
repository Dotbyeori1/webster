package com.seinfo.webster.component.member.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seinfo.webster.component.login.model.LoginModel;
import com.seinfo.webster.component.login.service.LoginService;
import com.seinfo.webster.component.member.model.MemberModel;
import com.seinfo.webster.component.member.service.MemberService;
import com.seinfo.webster.util.response.CodeCoreResultList;
import com.seinfo.webster.util.response.ResponseEntityUtil;
import jakarta.validation.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final LoginService loginService;
    private final ResponseEntityUtil responseEntityUtil;

    /*사용자 인증: 메일발송
     * @param userId
     * @return*/
    @PostMapping("/usrMember/sendAuthMail")
    public ResponseEntity<?> sendAuthMail(@RequestBody Map<String, Object> param) { // JSON 형태로 들어온 요청 데이터를 param이라는 Map으로 받음
        String userEmail = Objects.toString(param.get("userEmail"),"");
        if(userEmail.isBlank()) {
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED,"E001",Map.of("message","회원 아이디가 비어 있습니다."));
        }

        return memberService.emailCheckProcess(userEmail);
    }

    /*사용자인증: 확인
     * @userId
     *@return */
    @PostMapping("/usrMember/authNumberChk")
    public ResponseEntity<?> authNumberChk(@RequestBody Map<String, Object> param) {
        String userEmail = Objects.toString(param.get("userEmail"),"");
        String authNumber = Objects.toString(param.get("authNumber"),"");
        if(authNumber.isBlank()) {
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED,"E001",Map.of("message","인증번호가 일치하지 않습니다."));
        }

        return memberService.checkAuthNumberProcess(userEmail,authNumber);
    }

    /*사용자인증: 시간연장
     * @userId
     *@return */
    @PostMapping("/usrMember/extendTime")
    public ResponseEntity<?> extendTime(@RequestBody Map<String, Object> param) {
        String userEmail = Objects.toString(param.get("userEmail"),"");
        return memberService.extendTime(userEmail);
    }

    /*회원가입 정보 저장
     * @param
     *@return
     *throws Exception */
    @PostMapping(value = "/registerMember")
    public ResponseEntity<?> memberInfoAdd(@RequestBody @Valid MemberModel memberModel, BindingResult bindingResult) throws Exception{
        Map<String, String> errorResult = new HashMap<>();

        if(bindingResult.hasErrors()) {
            FieldError fieldError = bindingResult.getFieldError();
            if(fieldError != null) {
                errorResult.put("message", fieldError.getDefaultMessage());
            }
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED,"E001",errorResult);
        }
        try {
            memberService.insertMember(memberModel);
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_SUCCESS,"S001","회원가입 성공");
        } catch (DataAccessException e) {  // DB 관련 예외 처리
            log.error("setMemberInfoAdd >>> dataAccessException >>> 예외발생: {}", e.toString());
            errorResult.put("message", "예외발생 : 처리할 수 없습니다. (dataAccessException)");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED,"E001",errorResult);
        } catch (Exception e) {	 // 그 외 모든 예외 처리
            errorResult.put("message", e.getMessage());
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED,"E001",errorResult);
        }
    }

    /**
     * 회원가입 정보 호출
     *
     * @param
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/myInfo/getMemberInfo")

    public ResponseEntity<?> getMemberInfo(){
        return memberService.getMemberInfo();
    }

    /**
     * 회원정보 수정
     */
    @PutMapping(value = "/myInfo/myInfoUpd")
    public ResponseEntity<?> myInfoUpd(@RequestBody Map<String, Object> param) throws Exception{
        Map<String, Object> errorResult = new HashMap<String, Object>();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        MemberModel memberModel = objectMapper.convertValue(param, MemberModel.class);

        //Validation 검증 시작
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        //멤버 서버 내 검증
        Set<ConstraintViolation<MemberModel>> memberViolations = validator.validate(memberModel);
        memberViolations.removeIf(violation -> violation.getPropertyPath().toString().equals("userPwd")); //비밀번호 규칙 검증 무시

        if (!memberViolations.isEmpty()) {
            String firstError = memberViolations.stream()
                    .findFirst()
                    .map(ConstraintViolation::getMessage)
                    .orElse("잘못된 요청입니다.");

            errorResult.put("message", firstError);
            return ResponseEntity.internalServerError().body(errorResult);
        }

        try {
            memberService.setMyInfoUpd(memberModel);
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_SUCCESS, "S001", "회원정보가 수정되었습니다.");
        } catch (BadCredentialsException e) {
            errorResult.put("message", e.getMessage());
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        } catch (Exception e) {
            log.error("setMemberInfoUpd 예외 발생: {}", e.getMessage());
            errorResult.put("message", e.getMessage());
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        }
    }

    /**
     * 비밀번호 변경 (회원정보수정 하단 팝업화면에서 사용자가 직접 변경시)
     */
    @PostMapping(value = "/myInfo/passChange/changePwdProcess")
    public ResponseEntity<?> psaaChangeProcess(@RequestBody LoginModel loginModel) throws Exception {
        return loginService.changePwdProcess(loginModel);
    }

    /**
     * 회원탈퇴
     */
    @PostMapping(value = "/dropInfo/userDrop")
    public ResponseEntity<?> dropUserInfo(@RequestBody Map<String, Object> param) throws Exception {
        return memberService.dropUserInfo(param);
    }
}
