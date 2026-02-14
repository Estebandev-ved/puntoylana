package com.crochet.puntoylana.repository;

import com.crochet.puntoylana.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Buscar todos los pedidos de un usuario específico
    List<Order> findByUserId(Long userId);
}