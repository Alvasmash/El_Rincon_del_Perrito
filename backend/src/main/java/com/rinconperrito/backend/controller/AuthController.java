package com.rinconperrito.backend.controller;

import com.rinconperrito.backend.dto.AuthResponse;
import com.rinconperrito.backend.dto.LoginRequest;
import com.rinconperrito.backend.dto.RegisterRequest;
import com.rinconperrito.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Controlador que atiende el inicio de sesión y el registro de clientes (/api/auth)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Recibe correo y clave, valida en AuthService y devuelve el token JWT + datos del usuario
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // Crea un usuario nuevo con rol Cliente, lo guarda en MySQL y devuelve su token JWT
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }
}

