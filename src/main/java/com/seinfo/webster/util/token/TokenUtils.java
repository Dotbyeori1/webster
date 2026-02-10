package com.seinfo.webster.util.token;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class TokenUtils {

    @Value("${jwt.token.secret}")
    private String secret;

    @Value("${jwt.token.expiration.default:0}")
    private Long expiration;

    @Value("${jwt.token.expiration.autoLogin:0}")
    private Long autoLoginExpiration;

    private final HttpServletRequest req;

    public static final String TOKEN_KEY_HEADER = "X-AUTH-TOKEN";
    public static final String TOKEN_USER_ID = "USER_ID";
    public static final String TOKEN_USER_NM = "USER_NM";
    public static final String TOKEN_USER_UID = "TOKEN_USER_UID";
    public static final String TOKEN_USER_TYPE = "USER_TYPE";
    public static final String TOKEN_EXPIRETIME = "EXPIRETIME";
    public static final String TOKEN_NAME = "TOKEN";
    public static final String TOKEN_AUTHORITIES = "AUTHORITIES";
    public static final String TOKEN_EXPIRATION = "EXPIRATION";
    public static final String TOKEN_EXPIRATION_AUTOLOGIN = "EXPIRATION";
    public static final String TOKEN_EXPIRATION_VALID = "EXPIRATION_VALID";
    public static final String TOKEN_REFRESH_DEFAULT = "TOKEN_REFRESH_DEFAULT";
    public static final String TOKEN_REFRESH_TYPE1 = "TOKEN_REFRESH_TYPE1";

    private SecretKey getSecretKey(String base64Secret) {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(base64Secret));
    }

    private Claims getClaimsFromTokenInternal(String token, String base64Secret) {
        try {
            SecretKey key = getSecretKey(base64Secret);

            return Jwts.parser()
                    .verifyWith(key)             // setSigningKey(...) → verifyWith(key)
                    .build()
                    .parseSignedClaims(token)    // parseClaimsJws(...) → parseSignedClaims(...)
                    .getPayload();               // getBody() → getPayload()
        } catch (ExpiredJwtException ex) {
            // 만료된 토큰이라도 클레임은 꺼내 쓰고 싶을 때
            return ex.getClaims();
        } catch (JwtException ex) {
            return null;
        }
    }

    public String getTokenFromCookie() {
        return getTokenFromCookie(this.req);
    }

    public String getTokenFromCookie(HttpServletRequest httpReq) {
        if (httpReq.getCookies() == null) return null;

        return Arrays.stream(httpReq.getCookies())
                .filter(cookie -> "X-AUTH-TOKEN".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }

    private Claims getClaimsFromToken(String token) {
        return getClaimsFromTokenInternal(token, this.secret);
    }

    private Claims getClaimsFromToken(String token, String secret) {
        return getClaimsFromTokenInternal(token, secret);
    }

    private String generateClaims(Map<String, Object> claims, Long expirationTime) {
        return generateToken(claims, this.secret, expirationTime);
    }

    public String generateToken(Map<String, Object> claims) {
        return generateToken(claims, this.secret, this.expiration);
    }

    public String generateToken(Map<String, Object> claims, String tmpSecret) {
        long expireTime = Long.parseLong(claims.getOrDefault("EXPIRETIME", "0").toString());
        claims.remove("EXPIRETIME");
        return generateToken(claims, tmpSecret, expireTime);
    }

    private String generateToken(Map<String, Object> claims, String secret, long expireSeconds) {
        SecretKey key = getSecretKey(secret); // HMAC용 키 (예: Keys.hmacShaKeyFor(...))
        Instant now = Instant.now();

        return Jwts.builder()
                .claims(claims)                          // setClaims(...) → claims(...)
                .issuedAt(Date.from(now))                // setIssuedAt(...) → issuedAt(...)
                .expiration(Date.from(now.plusSeconds(expireSeconds))) // setExpiration(...) → expiration(...)
                .signWith(key, Jwts.SIG.HS256)           // SignatureAlgorithm → Jwts.SIG.HS256
                .compact();
    }
    public Object getClaimsByValue(String token, String value) {
        return extractClaim(getClaimsFromToken(token), value);
    }

    public Object getClaimsByValue(String token, String value, String secret) {
        return extractClaim(getClaimsFromToken(token, secret), value);
    }

    public Object getClaimsByValue(String value) {
        String token = getTokenFromCookie();
        if (token == null) token = this.req.getHeader("X-AUTH-TOKEN");
        if (token == null) return null;
        return extractClaim(getClaimsFromToken(token), value);
    }

    private Object extractClaim(Claims claims, String value) {
        return switch (value) {
            case "EXPIRATION" -> claims.getExpiration();
            case "EXPIRATION_VALID" -> claims.getExpiration().before(new Date(System.currentTimeMillis()));
            default -> claims.get(value);
        };
    }

    public String refreshToken(String type) {
        String token = getTokenFromCookie();
        if (token == null) token = this.req.getHeader("X-AUTH-TOKEN");

        Claims claims = getClaimsFromToken(token);
        long expire = "TOKEN_REFRESH_TYPE1".equals(type) ? this.autoLoginExpiration : this.expiration;
        return generateClaims(claims, expire);
    }

    public boolean validateToken(String token, String username) {
        return validateToken(token, username, this.secret);
    }

    public boolean validateToken(String token, String username, String secret) {
        if (username == null || token == null) {
            log.info(">> Token Validate Failed - Token present: {}, Username present: {}", token != null, username != null);
            return false;
        }

        try {
            String tokenUserId = (String) getClaimsByValue(token, "USER_ID", secret);
            if (!username.equals(tokenUserId)) {
                log.info(">> Token id: {} / Login id: {} mismatch", tokenUserId, username);
                return false;
            }

            Boolean isExpired = (Boolean) getClaimsByValue(token, "EXPIRATION_VALID", secret);
            if (Boolean.TRUE.equals(isExpired)) {
                log.info(">> Token expired for id: {}", username);
                return false;
            }

            getClaimsFromToken(token, secret); // signature check
            log.info(">> Token Validate Successful UserId: {}", username);
            return true;

        } catch (Exception e) {
            log.error(">> Token Validation Error for user: {}, Error: {}", username, e.getMessage());
            return false;
        }
    }
}