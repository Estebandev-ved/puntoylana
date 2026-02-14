package com.crochet.puntoylana.service;

import com.crochet.puntoylana.entity.AiDesign;
import com.crochet.puntoylana.entity.User;
import com.crochet.puntoylana.repository.AiDesignRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class NanoBananaService {

        private final AiDesignRepository repository;

        // Pollinations.ai - API 100% GRATIS para generación de imágenes
        private static final String POLLINATIONS_URL = "https://image.pollinations.ai/prompt/";

        /**
         * Prompt Engineering avanzado para amigurumis estilo Pixar/3D
         * Optimizado para el modelo FLUX de Pollinations.ai
         */
        private String buildMasterPrompt(String userPrompt) {
                return String.format(
                                "Stunning 3D render of a cute handcrafted amigurumi crochet %s, " +
                                                "Pixar Disney animation style, soft volumetric lighting, " +
                                                "visible crochet wool texture with fuzzy yarn fibers, " +
                                                "kawaii style with big expressive eyes, " +
                                                "pastel gradient background, " +
                                                "professional product photography, " +
                                                "8K hyperrealistic CGI, centered composition, warm colors",
                                userPrompt);
        }

        public AiDesign generateDesign(User user, String userPrompt) {
                // Construimos el prompt optimizado
                String enhancedPrompt = buildMasterPrompt(userPrompt);

                try {
                        log.info("🎨 Nano Banana: Generando diseño para: {}", userPrompt);

                        // Pollinations.ai genera una URL con la imagen
                        // Parámetros: width=1024, height=1024, model=flux (mejor calidad)
                        String encodedPrompt = URLEncoder.encode(enhancedPrompt, StandardCharsets.UTF_8);
                        String imageUrl = POLLINATIONS_URL + encodedPrompt +
                                        "?width=1024&height=1024&model=flux&nologo=true";

                        log.info("🖼️ URL de imagen generada: {}",
                                        imageUrl.substring(0, Math.min(100, imageUrl.length())) + "...");

                        // Guardar el diseño
                        AiDesign design = AiDesign.builder()
                                        .user(user)
                                        .userPrompt(userPrompt)
                                        .enhancedPrompt(enhancedPrompt)
                                        .imageUrl(imageUrl) // URL directa a la imagen
                                        .createdAt(LocalDateTime.now())
                                        .build();

                        String userEmail = user != null ? user.getEmail() : "anónimo";
                        log.info("✅ Diseño generado exitosamente para usuario: {}", userEmail);

                        return repository.save(design);

                } catch (Exception e) {
                        log.error("❌ Error en Nano Banana: {}", e.getMessage());
                        throw new RuntimeException("Error generando imagen con IA: " + e.getMessage());
                }
        }
}