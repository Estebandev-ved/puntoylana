package com.crochet.puntoylana.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders") // "order" es palabra reservada en SQL, usa "orders"
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // El cliente (Tu novia sabrá quién compró)

    private LocalDateTime date; // Fecha de compra

    private BigDecimal totalAmount; // Total a pagar

    private String status; // PENDING, PAID, SHIPPED, DELIVERED

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items; // Lista de cosas que compró

    // ============ Datos de Envío ============

    @Column(length = 500)
    private String shippingAddress; // Dirección completa

    private String shippingPhone; // Teléfono de contacto

    @Column(length = 500)
    private String notes; // Notas especiales del cliente

    private String paymentMethod; // card, nequi, pse

    // ============ Tracking de Envío ============

    private String shippingCompany; // Interrapidísimo, Servientrega, etc

    private String trackingNumber; // Número de guía

    private String trackingUrl; // URL de rastreo (se genera automáticamente)

    private LocalDateTime shippedAt; // Fecha de despacho

    private LocalDateTime deliveredAt; // Fecha de entrega
}