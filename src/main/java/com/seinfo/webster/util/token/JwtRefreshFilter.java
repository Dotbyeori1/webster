package com.seinfo.webster.util.token;

import com.seinfo.webster.util.CookieUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtRefreshFilter extends OncePerRequestFilter {

    private final TokenUtils tokenUtils;
    private final TokenMapper tokenMapper;

    @Value("${service.dup.ipcheck:false")
    private String checkDupIP;

    @Value("${server.type:local}")
    private String serverType;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return tokenUtils.getTokenFromCookie(request) == null
                || uri.equals("/vite.svg")
                || uri.equals("/index.html")
                || uri.equals("/login/refreshToken")
                || uri.startsWith("/static/")
                || uri.startsWith("/assets/")
                || uri.startsWith("/.well-known");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {

        try {
            String token = tokenUtils.getTokenFromCookie();
            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            boolean expired = (boolean) tokenUtils.getClaimsByValue(TokenUtils.TOKEN_EXPIRATION_VALID);
            if (expired) {
                filterChain.doFilter(request, response);
                return;
            }

            // 2) 신규 토큰 생성
            String refreshToken = tokenUtils.refreshToken(TokenUtils.TOKEN_REFRESH_DEFAULT);

            // 토큰 생성
            new CookieUtil().createCookie(TokenUtils.TOKEN_KEY_HEADER, refreshToken, response, serverType);
        } catch (Exception e) {
            log.warn("Refresh-filter error : {}", e.getMessage());
            // 예외 무시 → 이후 EntryPoint/AccessDeniedHandler가 401/403 반환
        }

        filterChain.doFilter(request, response);
    }

    private String fnGetClientIp() throws UnknownHostException {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attrs != null) {
            HttpServletRequest req = attrs.getRequest();
            String ip = req.getHeader("X-Forwarded-For");

            if (ip == null ||ip.isEmpty()|| "unknown".equalsIgnoreCase(ip)) {
                ip = req.getHeader("Proxy-Client-IP");
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = req.getHeader("Wl-Proxy-Client-IP");
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = req.getHeader("HTTP_CLIENT_IP");
            }
            if (ip == null || ip.isEmpty()|| "unknown".equalsIgnoreCase(ip)) {
                ip = req.getHeader("HTTP_X_FORWARDED_FOR");
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = req.getHeader("X-Real-IP");
            }
            if (ip == null || ip.isEmpty()|| "unknown".equalsIgnoreCase(ip)) {
                ip = req.getHeader("X-RealIP");
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = req.getHeader("REMOTE_ADDR");
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = req.getRemoteAddr();
            }

            if (ip.equals("0:0:0:0:0:0:0:1") || ip.equals("127.0.0.1")) {
                InetAddress address = InetAddress.getLocalHost();
                ip = address.getHostAddress();
            }

            //여러 프록시를 거치는 경우 첫번째 IP 사용
            if (ip != null && ip.contains(",")) {
                ip = ip.split(",")[0].trim();
            }
            return ip;
        }
        return null;
    }

    private String fnGetBrowserInfo(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        return userAgent != null ? userAgent : "Unknown";
    }

}