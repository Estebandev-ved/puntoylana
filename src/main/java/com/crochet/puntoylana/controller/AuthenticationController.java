package com.crochet.puntoylana.controller;

import com.crochet.puntoylana.dto.AuthenticationRequest;
import com.crochet.puntoylana.dto.AuthenticationResponse;
import com.crochet.puntoylana.dto.RegisterRequest;
import com.crochet.puntoylana.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    /**
     * Registrar un admin (requiere clave secreta en header)
     * Header: X-Admin-Secret: puntoylana-admin-2026
     */
    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(
            @RequestBody RegisterRequest request,
            @RequestHeader(value = "X-Admin-Secret", required = false) String adminSecret) {
        try {
            return ResponseEntity.ok(service.registerAdmin(request, adminSecret));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        }
    }
}