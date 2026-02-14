package com.crochet.puntoylana.controller;

import com.crochet.puntoylana.dto.OrderRequest;
import com.crochet.puntoylana.entity.Order;
import com.crochet.puntoylana.entity.User;
import com.crochet.puntoylana.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    // Crear pedido (Comprar)
    @PostMapping
    public ResponseEntity<Order> createOrder(
            @AuthenticationPrincipal User user, // ¡Truco mágico! Spring nos da el usuario del token
            @RequestBody OrderRequest request) {
        return ResponseEntity.ok(service.createOrder(user, request));
    }

    // Ver mis pedidos
    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.getMyOrders(user));
    }
}