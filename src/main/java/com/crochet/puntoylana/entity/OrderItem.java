package com.crochet.puntoylana.entity;

import com.fasterxml.jackson.annotation.JsonIgnore; // <--- AGREGA ESTE IMPORT
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity; // Cuántos compró
    private BigDecimal price; // Precio en el momento de la compra (por si luego sube)

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order; // A qué pedido pertenece
}
