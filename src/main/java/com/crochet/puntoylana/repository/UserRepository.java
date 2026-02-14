package com.crochet.puntoylana.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crochet.puntoylana.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Método mágico: Spring crea la consulta SQL automáticamente por el nombre
    Optional<User> findByEmail(String email);

}
