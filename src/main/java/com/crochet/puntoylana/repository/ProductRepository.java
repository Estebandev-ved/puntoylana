package com.crochet.puntoylana.repository;

import com.crochet.puntoylana.entity.Category;
import com.crochet.puntoylana.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Buscar productos por categoría
    List<Product> findByCategory(Category category);

    // Buscar productos por nombre (búsqueda parcial, ignora mayúsculas)
    List<Product> findByNameContainingIgnoreCase(String name);
}