package com.crochet.puntoylana.controller;

import com.crochet.puntoylana.entity.AiDesign;
import com.crochet.puntoylana.entity.User;
import com.crochet.puntoylana.service.NanoBananaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/nano-banana")
@RequiredArgsConstructor
public class NanoBananaController {

    private final NanoBananaService service;

    /**
     * Health check - GET simple para verificar que el endpoint es accesible
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        log.info("🏥 Health check llamado!");
        return ResponseEntity.ok(Map.of(
                "status", "OK",
                "service", "Nano Banana IA",
                "message", "El endpoint está funcionando correctamente"));
    }

    @PostMapping("/generate")
    public ResponseEntity<AiDesign> generate(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> request) {
        log.info("🎨 Generate llamado con prompt: {}", request.get("prompt"));
        String prompt = request.get("prompt");
        return ResponseEntity.ok(service.generateDesign(user, prompt));
    }

    /**
     * Endpoint de PRUEBA sin autenticación
     * TODO: Eliminar en producción
     */
    @PostMapping("/test")
    public ResponseEntity<AiDesign> testGenerate(
            @RequestBody Map<String, String> request) {
        log.info("🧪 Test generate llamado con prompt: {}", request.get("prompt"));
        String prompt = request.get("prompt");
        return ResponseEntity.ok(service.generateDesign(null, prompt));
    }
}