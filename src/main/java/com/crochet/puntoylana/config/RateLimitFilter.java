package com.crochet.puntoylana.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Filtro de Rate Limiting para proteger contra ataques de fuerza bruta.
 * Límite: 100 requests por minuto por IP.
 */
@Slf4j
@Component
@Order(1)
public class RateLimitFilter implements Filter {

    // Almacena conteo de requests por IP
    private final Map<String, RequestCounter> requestCounts = new ConcurrentHashMap<>();

    // Configuración
    private static final int MAX_REQUESTS_PER_MINUTE = 100;
    private static final long WINDOW_SIZE_MS = 60_000; // 1 minuto
    private static final long BLOCK_DURATION_MS = 300_000; // 5 minutos de bloqueo

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String clientIp = getClientIP(httpRequest);
        String path = httpRequest.getRequestURI();

        // Excluir assets estáticos del rate limiting
        if (isStaticResource(path)) {
            chain.doFilter(request, response);
            return;
        }

        // Limpiar entradas antiguas periódicamente
        cleanupOldEntries();

        RequestCounter counter = requestCounts.computeIfAbsent(clientIp, k -> new RequestCounter());

        // Verificar si está bloqueado
        if (counter.isBlocked()) {
            log.warn("🚫 IP bloqueada por rate limiting: {}", clientIp);
            httpResponse.setStatus(429);
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write("{\"error\":\"Demasiadas solicitudes. Intenta en unos minutos.\"}");
            return;
        }

        // Verificar límite
        if (counter.incrementAndCheck()) {
            chain.doFilter(request, response);
        } else {
            log.warn("⚠️ Rate limit excedido para IP: {}", clientIp);
            counter.block();
            httpResponse.setStatus(429);
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write("{\"error\":\"Has excedido el límite de solicitudes. Espera 5 minutos.\"}");
        }
    }

    private String getClientIP(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }

    private boolean isStaticResource(String path) {
        return path.startsWith("/assets/") ||
                path.endsWith(".js") ||
                path.endsWith(".css") ||
                path.endsWith(".ico") ||
                path.endsWith(".png") ||
                path.endsWith(".jpg") ||
                path.endsWith(".svg") ||
                path.endsWith(".webp") ||
                path.endsWith(".woff") ||
                path.endsWith(".woff2");
    }

    private void cleanupOldEntries() {
        long now = System.currentTimeMillis();
        requestCounts.entrySet().removeIf(entry -> now - entry.getValue().getWindowStart() > WINDOW_SIZE_MS * 10);
    }

    /**
     * Contador de requests por IP con ventana de tiempo deslizante.
     */
    private static class RequestCounter {
        private final AtomicInteger count = new AtomicInteger(0);
        private volatile long windowStart = System.currentTimeMillis();
        private volatile long blockedUntil = 0;

        public synchronized boolean incrementAndCheck() {
            long now = System.currentTimeMillis();

            // Nueva ventana de tiempo
            if (now - windowStart > WINDOW_SIZE_MS) {
                count.set(1);
                windowStart = now;
                return true;
            }

            // Incrementar y verificar límite
            return count.incrementAndGet() <= MAX_REQUESTS_PER_MINUTE;
        }

        public boolean isBlocked() {
            return System.currentTimeMillis() < blockedUntil;
        }

        public void block() {
            blockedUntil = System.currentTimeMillis() + BLOCK_DURATION_MS;
        }

        public long getWindowStart() {
            return windowStart;
        }
    }
}
