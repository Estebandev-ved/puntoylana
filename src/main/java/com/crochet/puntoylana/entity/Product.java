package com.crochet.puntoylana.entity;

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
@Table(name = "products") // Nombre explícito para evitar problemas en Postgres
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000) // Permitimos descripciones largas
    private String description;

    private BigDecimal price; // Siempre usa BigDecimal para dinero

    private Integer stock; // Cantidad disponible (para físicos)

    private String imageUrl; // URL de la foto (luego veremos cómo subirla)

    // Solo para productos digitales (Link al PDF o Video)
    private String digitalUrl;

    @Enumerated(EnumType.STRING)
    private Category category;
}