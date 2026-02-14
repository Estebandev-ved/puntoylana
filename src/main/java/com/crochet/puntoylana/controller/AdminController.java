package com.crochet.puntoylana.controller;

import com.crochet.puntoylana.dto.ProductRequest;
import com.crochet.puntoylana.entity.Product;
import com.crochet.puntoylana.entity.Role;
import com.crochet.puntoylana.entity.User;
import com.crochet.puntoylana.repository.UserRepository;
import com.crochet.puntoylana.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador para funciones de ADMIN
 * Requiere autenticación con rol ADMIN
 */
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProductService productService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ==================== PRODUCTOS ====================

    /**
     * Listar todos los productos (admin)
     */
    @GetMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    /**
     * Crear nuevo producto
     */
    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.save(request));
    }

    /**
     * Actualizar producto existente
     */
    @PutMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request) {
        return productService.update(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Eliminar producto
     */
    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // ==================== USUARIOS ====================

    /**
     * Ver todos los usuarios (admin)
     */
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    /**
     * Promover usuario a admin
     */
    @PostMapping("/users/{id}/make-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> makeAdmin(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setRole(Role.ROLE_ADMIN);
                    userRepository.save(user);
                    return ResponseEntity.ok(Map.of("message", "Usuario promovido a admin"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ==================== ESTADÍSTICAS ====================

    /**
     * Estadísticas del dashboard
     */
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalProducts = productService.count();
        long totalUsers = userRepository.count();

        return ResponseEntity.ok(Map.of(
                "totalProducts", totalProducts,
                "totalUsers", totalUsers));
    }
}
