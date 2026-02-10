package com.seinfo.webster.component.member.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.seinfo.webster.component.file.service.impl.TusServiceImpl;
import com.seinfo.webster.component.member.mapper.DropInfoMapper;
import com.seinfo.webster.component.member.mapper.MemberMapper;
import com.seinfo.webster.component.member.model.MemberModel;
import com.seinfo.webster.component.member.service.MemberService;
import com.seinfo.webster.util.EncriptUtil;
import com.seinfo.webster.util.api.ApiService;
import com.seinfo.webster.util.response.CodeCoreResultList;
import com.seinfo.webster.util.response.ResponseEntityUtil;
import com.seinfo.webster.util.token.TokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final TokenUtils tokenUtils;
    private final DropInfoMapper dropInfoMapper;
    private final ResponseEntityUtil responseEntityUtil;
    private final TusServiceImpl tusService;
    private final ApiService apiService;

    // 인증번호 저장할 캐쉬 로드
    private final Cache<String, Map<String, Object>> verificationCache = Caffeine.newBuilder()
            .expireAfterWrite(5, TimeUnit.MINUTES).maximumSize(10000).build();

    /**
     * 회원가입 정보 저장
     *
     * @throws Exception
     */

    @SuppressWarnings("unchecked")
    @Override
    @Transactional
    public void insertMember(MemberModel memberModel) {

        Map<String, Object> memberMap = new ObjectMapper().convertValue(memberModel, Map.class);

        if(memberMapper.chkUserEmailDuplicate(memberMap) > 0) {
            throw new RuntimeException("아이디가 중복 됩니다.");
        }

        // 패스워드 암호화
        String password = memberModel.getUserPwd();
        String encodedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

        UUID id = UUID.randomUUID();
        String userUid = id.toString().replaceAll("-", "");
        memberMap.put("userUid", userUid);
        memberMap.replace("userPwd", encodedPassword);
        memberMap.put("regUserId", memberModel.getUserEmail());
        memberMap.put("modUserId", memberModel.getUserEmail());

        if (!memberMapper.insertMember(memberMap)) {
            throw new RuntimeException("회원 정보 데이터 삽입 중 오류가 발생하였습니다");
        }
    }

    /**
     * 인증번호 이메일 발송
     *
     * @throws Exception
     */

    @Override
    public ResponseEntity<?> emailCheckProcess(String userEmail) {
        Map<String, Object> param = new HashMap<String, Object>();
        HashMap<String, Object> errorResult = new HashMap<>();

        // 이메일 중복여부 체크
        param.put("userEmail", userEmail);
        int duplicateTest = memberMapper.chkUserEmailDuplicate(param);
        if (duplicateTest >= 1) {
            errorResult.put("message", "사용자 계정이 중복됩니다.");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        }

        // 인증번호 생성
        int length = 6;
        String chars = "0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder authNumber = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(chars.length());
            authNumber.append(chars.charAt(index));
        }

        // 인증번호 저장
        verificationCache.put(userEmail, Map.of("authNumber", authNumber.toString(), "timestamp", System.currentTimeMillis()));

        // 인증번호 메일발송
        try {
            param.put("userEmail", userEmail+";");
            param.put("mailTitle", "[SE정보기술] 사용자 인증번호 안내");
            param.put("mailCotnent", authNumber);

            apiService.sendMail(param, "seinfo/mail/mailTemplate04");
        } catch (Exception e) {
            log.error("emailCheckProcess >>> fnSendMail : {}", e.getMessage());
            errorResult.put("message", "[사용자 인증 안내 : RTPE108] <br> 이메일 전송 중 오류가 발생하였습니다.");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        }

        HashMap<String, Object> rtnResult = new HashMap<>();
        rtnResult.put("authNumber", authNumber);
        return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_SUCCESS, "S001", rtnResult); // 왜 인증번호를 프론트에 보내냐? 프론트에도 인증번호를 내려줍니다. (개발 또는 테스트 환경) 위해서
    }

    /**
     * 인증번호 유효 시간 연장
     *
     * @throws Exception
     */
    @Override
    public ResponseEntity<?> extendTime(String userEmail) { // 인증시간 연장
        HashMap<String, Object> rtnResult = new HashMap<>();
        // (key, existingData) -> ...는 람다식
        verificationCache.asMap().computeIfPresent(userEmail, (key, existingData) -> Map.of(
                "authNumber", existingData.get("authNumber"),
                "timestamp", System.currentTimeMillis()
        ));

        rtnResult.put("message", "시간이 연장되었습니다.");
        rtnResult.put("userEmail", userEmail);
        return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_SUCCESS, "S001", rtnResult);
    }

    /**
     * 인증번호 검증
     *
     * @throws Exception
     */
    @Override
    public ResponseEntity<?> checkAuthNumberProcess(String userEmail, String authNumber) { // 인증번호 체크

        HashMap<String, Object> errorResult = new HashMap<>();

        Map<String, Object> data = verificationCache.getIfPresent(userEmail);

        if (data == null) {
            errorResult.put("message", "인증번호를 확인할 수 없습니다. 다시 요청해주세요.");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        }

        long storedTime = (long) data.get("timestamp");
        long elapsedTime = System.currentTimeMillis() - storedTime;
        long maxTime = TimeUnit.MINUTES.toMillis(3); // 3분

        if (elapsedTime > maxTime) {
            verificationCache.invalidate(userEmail); // 만료된 인증번호 삭제
            errorResult.put("message", "인증번호 확인 시간이 초과하였습니다. 다시 요청해주세요.");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        }

        if (!authNumber.equals(data.get("authNumber"))) {
            errorResult.put("message", "인증번호가 일치하지 않습니다.");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        }

        HashMap<String, Object> rtnResult = new HashMap<>();
        rtnResult.put("message", "인증성공");
        rtnResult.put("userEmail", userEmail);
        return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_SUCCESS, "S001", rtnResult);
    }

    /**
     * 회원정보 불러오기
     */

    @Override
    public ResponseEntity<?> getMemberInfo() {
        Map<String, Object> errorResult = new HashMap<String, Object>();

        //토큰 유효성 체크
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            errorResult.put("message", "로그인이 필요합니다.");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        }
        if (tokenUtils.getTokenFromCookie() == null) {
            errorResult.put("message", "잘못된 접근입니다. 로그인이 필요합니다.");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        }

        String companyNo = "";
        String decodedCompanyNo = "";
        String userEmail = authentication.getName();

        Map<String, Object> rtnResult = memberMapper.selectUsrAndCompanyInfo(Map.of("userEmail", userEmail));

        if (rtnResult == null) {
            log.error("getMemberInfo >>>> 등록되지 않은 사용자: {}", userEmail);
            errorResult.put("message", "등록되지 않은 사용자입니다. 새로 로그인이 필요합니다.");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        } else {
            try {
                if (rtnResult.get("companyNo") != null) {
                    companyNo = rtnResult.get("companyNo").toString();
                    decodedCompanyNo = EncriptUtil.decryptAes256(companyNo);
                    StringBuffer sb = new StringBuffer(decodedCompanyNo);
                    sb.insert(3, '-');
                    sb.insert(6, '-');
                    rtnResult.replace("companyNo", sb.toString());
                }
            } catch (Exception e) {
                log.error("getMemberInfo >>>> 복호화 오류 발생 : {}", e.toString());
                errorResult.put("message", "서버 내 오류가 발생하였습니다.");
                return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
            }
        }
        return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_SUCCESS, "S001", rtnResult);
    }

    /**
     * 회원정보 업데이트
     */
    @SuppressWarnings("unchecked")
    @Override
    public void setMyInfoUpd(MemberModel memberModel) {

        Map<String, Object> memberMap = new ObjectMapper().convertValue(memberModel, Map.class);
        Map<String, Object> resultMap = memberMapper.findUserByUserUid(memberMap);
        if (!BCrypt.checkpw(memberMap.get("userPwd").toString(), resultMap.get("userPwd").toString())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }
        memberMap.put("modUserId", memberModel.getUserEmail());
        if (!memberMapper.updateUserInfo(memberMap)) {
            throw new RuntimeException("회원 정보 수정 중 오류가 발생하였습니다. (사용자정보)");
        }
    }

    /**
     * 회원탈퇴
     */

    @SuppressWarnings("unchecked")
    @Override
    @Transactional
    public ResponseEntity<?> dropUserInfo(Map<String, Object> param) throws Exception {
        Map<String, Object> errorResult = new HashMap<String, Object>();
        param.put("userId", this.tokenUtils.getClaimsByValue(TokenUtils.TOKEN_USER_ID));

        Map<String, Object> userMap = dropInfoMapper.selectDropUsrInfo(param);

        if(!BCrypt.checkpw(param.get("userPwd").toString(), userMap.get("userPwd").toString())) {
            errorResult.put("message", "비밀번호가 일치하지 않습니다.");
            return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_FAILED, "E001", errorResult);
        }

        // 물리적 데이터 삭제
        List<Map<String, Object>> memberFileList = dropInfoMapper.selectMfileList(param);
        if(!memberFileList.isEmpty()) {
            ResponseEntity<?> rtn = tusService.deleteFile(memberFileList);
            // 응답에서 process_code 및 data 추출
            Map<String, Object> resultMap = (Map<String, Object>) rtn.getBody();
            String processCode = (String) Objects.requireNonNull(resultMap).get("process_code");

            if (!"00".equals(processCode)) {
                Map<String, Object> data = (Map<String, Object>) resultMap.get("data");
                String errorMsg = (String) data.get("message");

                String msg = "삭제 중 서버 내 오류가 발생하였습니다. (파일삭제) <br> ▷ " + errorMsg;
                log.error("dropUserInfo >>> deleteFile >>> message : {}", msg);
                throw new RuntimeException(msg);
            }
        }

        // 회원 데이터 삭제
        List<String> memberList = new ArrayList<>();
        memberList.add(this.tokenUtils.getClaimsByValue(TokenUtils.TOKEN_USER_ID).toString());
        dropInfoMapper.deleteUsrAllTables(memberList);
        
        return this.responseEntityUtil.getResponseEntity(CodeCoreResultList.RESULT_CODE_SUCCESS, "S001", "정상적으로 처리되었습니다.");
    }
}