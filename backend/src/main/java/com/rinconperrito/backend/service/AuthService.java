package com.rinconperrito.backend.service;

import com.rinconperrito.backend.dto.AuthResponse;
import com.rinconperrito.backend.dto.LoginRequest;
import com.rinconperrito.backend.dto.RegisterRequest;
import com.rinconperrito.backend.dto.UserResponse;
import com.rinconperrito.backend.entity.User;
import com.rinconperrito.backend.repository.UserRepository;
import com.rinconperrito.backend.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse login(LoginRequest request) {
        String cleanEmail = request.getCorreo().trim().toLowerCase();
        User user = userRepository.findByCorreoIgnoreCase(cleanEmail)
                .or(() -> userRepository.findByCorreoIgnoreCase(cleanEmail.replace("@duoc.cl", "@duocuc.cl")))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "El usuario no existe."));

        if (!passwordEncoder.matches(request.getClave(), user.getClave())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta.");
        }

        String token = jwtService.generateToken(user.getCorreo(), user.getRol());
        return new AuthResponse(token, UserResponse.fromEntity(user));
    }

    public AuthResponse register(RegisterRequest request) {
        String cleanEmail = request.getCorreo().trim().toLowerCase();
        String cleanRun = request.getRun().trim().toUpperCase();

        if (userRepository.existsByCorreoIgnoreCase(cleanEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este correo ya está registrado.");
        }
        if (userRepository.existsByRunIgnoreCase(cleanRun)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un usuario con este RUN.");
        }

        User user = new User(
                cleanRun,
                request.getNombre().trim(),
                request.getApellidos() != null ? request.getApellidos().trim() : "",
                cleanEmail,
                passwordEncoder.encode(request.getClave()),
                "Cliente",
                request.getRegion(),
                request.getComuna(),
                request.getDireccion(),
                request.getTelefono()
        );

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved.getCorreo(), saved.getRol());
        return new AuthResponse(token, UserResponse.fromEntity(saved));
    }
}

