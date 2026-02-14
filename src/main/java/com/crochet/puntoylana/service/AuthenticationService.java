package com.crochet.puntoylana.service;

// --- ZONA DE IMPORTS CRÍTICOS ---
import com.crochet.puntoylana.entity.User;
import com.crochet.puntoylana.entity.Role;
// --------------------------------

import com.crochet.puntoylana.config.JwtService;
import com.crochet.puntoylana.dto.AuthenticationRequest;
import com.crochet.puntoylana.dto.AuthenticationResponse;
import com.crochet.puntoylana.dto.RegisterRequest;
import com.crochet.puntoylana.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Crear token con claims del rol
     */
    private String generateTokenWithRole(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name()); // ej: ROLE_ADMIN o ROLE_USER
        claims.put("firstName", user.getFirstName());
        return jwtService.generateToken(claims, user);
    }

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        repository.save(user);
        var jwtToken = generateTokenWithRole(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = generateTokenWithRole(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    /**
     * Registrar un admin usando una clave secreta
     */
    public AuthenticationResponse registerAdmin(RegisterRequest request, String adminSecret) {
        String expectedSecret = "puntoylana-admin-2026";
        if (!expectedSecret.equals(adminSecret)) {
            throw new RuntimeException("Clave de admin incorrecta");
        }

        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        var user = User.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_ADMIN)
                .build();

        repository.save(user);
        var jwtToken = generateTokenWithRole(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}