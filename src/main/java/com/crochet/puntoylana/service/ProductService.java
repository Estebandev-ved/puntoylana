package com.crochet.puntoylana.service;

import com.crochet.puntoylana.dto.ProductRequest;
import com.crochet.puntoylana.entity.Category;
import com.crochet.puntoylana.entity.Product;
import com.crochet.puntoylana.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    // Guardar un producto nuevo
    public Product save(ProductRequest request) {
        var product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .imageUrl(request.getImageUrl())
                .category(request.getCategory())
                .build();
        return repository.save(product);
    }

    // Listar todos los productos
    public List<Product> findAll() {
        return repository.findAll();
    }

    // Buscar por ID
    public Optional<Product> findById(Long id) {
        return repository.findById(id);
    }

    // Buscar por categoría
    public List<Product> findByCategory(String categoryName) {
        try {
            Category category = Category.valueOf(categoryName.toUpperCase());
            return repository.findByCategory(category);
        } catch (IllegalArgumentException e) {
            return List.of(); // Categoría no válida, devolver lista vacía
        }
    }

    // Buscar por nombre (búsqueda parcial)
    public List<Product> search(String query) {
        return repository.findByNameContainingIgnoreCase(query);
    }

    // Actualizar producto
    public Optional<Product> update(Long id, ProductRequest request) {
        return repository.findById(id)
                .map(product -> {
                    product.setName(request.getName());
                    product.setDescription(request.getDescription());
                    product.setPrice(request.getPrice());
                    product.setStock(request.getStock());
                    product.setImageUrl(request.getImageUrl());
                    product.setCategory(request.getCategory());
                    return repository.save(product);
                });
    }

    // Eliminar producto
    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    // Contar productos
    public long count() {
        return repository.count();
    }
}