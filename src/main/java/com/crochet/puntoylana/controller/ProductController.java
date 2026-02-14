package com.crochet.puntoylana.controller;

import com.crochet.puntoylana.dto.ProductRequest;
import com.crochet.puntoylana.entity.Product;
import com.crochet.puntoylana.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    // Crear un producto (POST)
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(service.save(request));
    }

    // Ver todos los productos (GET)
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(service.findAll());
    }
}