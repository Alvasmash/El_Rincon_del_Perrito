package com.rinconperrito.backend.service;

import com.rinconperrito.backend.dto.UserRequest;
import com.rinconperrito.backend.dto.UserResponse;
import com.rinconperrito.backend.entity.User;
import com.rinconperrito.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// Lógica de negocio para que el Administrador gestione usuarios y sus roles
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Lista todos los usuarios transformados a UserResponse (sin enviar contraseñas)
    public List<UserResponse> findAll() {
        return userRepository.findAll().stream().map(UserResponse::fromEntity).toList();
    }

    // Busca un usuario por RUN
    public UserResponse findByRun(String run) {
        User user = userRepository.findById(run.trim().toUpperCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado."));
        return UserResponse.fromEntity(user);
    }

    // Crea un usuario nuevo encriptando su clave con BCrypt antes de guardar
    public UserResponse create(UserRequest req) {
        String cleanRun = req.getRun().trim().toUpperCase();
        String cleanEmail = req.getCorreo().trim().toLowerCase();

        if (userRepository.existsByRunIgnoreCase(cleanRun)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un usuario con este RUN.");
        }
        if (userRepository.existsByCorreoIgnoreCase(cleanEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este correo ya está registrado.");
        }

        User user = new User(
                cleanRun,
                req.getNombre(),
                req.getApellidos(),
                cleanEmail,
                passwordEncoder.encode(req.getClave()),
                req.getRol() != null ? req.getRol() : "Cliente",
                req.getRegion(),
                req.getComuna(),
                req.getDireccion(),
                req.getTelefono()
        );
        return UserResponse.fromEntity(userRepository.save(user));
    }

    // Actualiza datos del usuario; si la clave viene vacía, mantiene la contraseña actual
    public UserResponse update(String run, UserRequest req) {
        User existing = userRepository.findById(run.trim().toUpperCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado."));

        existing.setNombre(req.getNombre());
        existing.setApellidos(req.getApellidos());
        existing.setCorreo(req.getCorreo().trim().toLowerCase());
        if (req.getClave() != null && !req.getClave().isBlank()) {
            existing.setClave(passwordEncoder.encode(req.getClave()));
        }
        if (req.getRol() != null && !req.getRol().isBlank()) {
            existing.setRol(req.getRol());
        }
        existing.setRegion(req.getRegion());
        existing.setComuna(req.getComuna());
        existing.setDireccion(req.getDireccion());
        existing.setTelefono(req.getTelefono());

        return UserResponse.fromEntity(userRepository.save(existing));
    }

    // Borra un usuario por su RUN
    public void delete(String run) {
        String cleanRun = run.trim().toUpperCase();
        if (!userRepository.existsById(cleanRun)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado.");
        }
        userRepository.deleteById(cleanRun);
    }
}

