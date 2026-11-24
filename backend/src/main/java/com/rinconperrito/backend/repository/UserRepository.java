package com.rinconperrito.backend.repository;

import com.rinconperrito.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Repositorio JPA para usuarios: permite buscar por correo o verificar si el RUN ya existe
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByCorreoIgnoreCase(String correo);
    boolean existsByCorreoIgnoreCase(String correo);
    boolean existsByRunIgnoreCase(String run);
}

