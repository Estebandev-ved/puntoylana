package com.crochet.puntoylana.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ai_designs")
public class AiDesign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String userPrompt; // Lo que escribió el usuario ("Perro con hueso")

    @Column(length = 1000)
    private String enhancedPrompt; // Lo que mejoramos ("Perro tejido amigurumi...")

    @Column(columnDefinition = "TEXT")
    private String imageUrl; // El link de la imagen generada

    private LocalDateTime createdAt;
}