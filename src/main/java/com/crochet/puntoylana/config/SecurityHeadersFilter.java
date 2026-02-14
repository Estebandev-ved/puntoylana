package com.crochet.puntoylana.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Filtro para agregar headers de seguridad HTTP a todas las respuestas.
 * Protege contra XSS, clickjacking, MIME sniffing, etc.
 */
@Component
@Order(2)
public class SecurityHeadersFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Prevenir ataques de clickjacking
        httpResponse.setHeader("X-Frame-Options", "DENY");

        // Prevenir MIME type sniffing
        httpResponse.setHeader("X-Content-Type-Options", "nosniff");

        // Habilitar filtro XSS del navegador
        httpResponse.setHeader("X-XSS-Protection", "1; mode=block");

        // Política de referrer
        httpResponse.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

        // Permisos de features del navegador
        httpResponse.setHeader("Permissions-Policy",
                "geolocation=(), microphone=(), camera=(), payment=(self)");

        // Content Security Policy - ajustado para permitir recursos necesarios
        httpResponse.setHeader("Content-Security-Policy",
                "default-src 'self'; " +
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; " +
                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                        "font-src 'self' https://fonts.gstatic.com; " +
                        "img-src 'self' data: https: blob:; " +
                        "connect-src 'self' https://generativelanguage.googleapis.com https://api.efipay.io; " +
                        "frame-ancestors 'none';");

        // Strict Transport Security (HTTPS obligatorio)
        httpResponse.setHeader("Strict-Transport-Security",
                "max-age=31536000; includeSubDomains; preload");

        chain.doFilter(request, response);
    }
}
