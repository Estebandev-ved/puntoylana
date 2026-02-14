package com.crochet.puntoylana.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;

        // En desarrollo: "*", en producción: "https://puntoylana.com"
        @Value("${app.cors.allowed-origins:*}")
        private String allowedOrigins;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                log.info("🔐 Configurando Security Filter Chain...");

                http
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                // Archivos estáticos del frontend
                                                .requestMatchers(
                                                                "/",
                                                                "/index.html",
                                                                "/assets/**",
                                                                "/*.js",
                                                                "/*.css",
                                                                "/*.ico",
                                                                "/*.svg",
                                                                "/*.png",
                                                                "/*.webp",
                                                                "/favicon.ico")
                                                .permitAll()

                                                // Rutas SPA del frontend (React Router las maneja)
                                                .requestMatchers(
                                                                "/catalogo",
                                                                "/catalogo/**",
                                                                "/producto/**",
                                                                "/carrito",
                                                                "/login",
                                                                "/registro",
                                                                "/checkout",
                                                                "/perfil",
                                                                "/nosotros",
                                                                "/cursos",
                                                                "/faq",
                                                                "/envios",
                                                                "/contacto",
                                                                "/admin")
                                                .permitAll()

                                                // API pública
                                                .requestMatchers(
                                                                "/api/v1/auth/**",
                                                                "/api/v1/public/**")
                                                .permitAll()

                                                // Nano Banana (generación de imágenes)
                                                .requestMatchers("/api/v1/nano-banana/**").permitAll()

                                                // Rutas SOLO ADMIN
                                                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")

                                                // Todo lo demás requiere autenticación
                                                .anyRequest().authenticated())
                                .sessionManagement(sess -> sess
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

                log.info("✅ Security configurada con CORS para: {}", allowedOrigins);
                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();

                // Usar orígenes desde variable de entorno
                if ("*".equals(allowedOrigins)) {
                        configuration.setAllowedOriginPatterns(List.of("*"));
                } else {
                        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
                        configuration.setAllowCredentials(true);
                }

                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
                configuration.setAllowedHeaders(List.of("*"));
                configuration.setExposedHeaders(List.of("Authorization", "Content-Type"));

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);

                log.info("🌐 CORS configurado para: {}", allowedOrigins);
                return source;
        }
}
