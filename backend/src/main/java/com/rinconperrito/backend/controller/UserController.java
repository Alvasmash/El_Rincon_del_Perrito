package com.rinconperrito.backend.controller;

import com.rinconperrito.backend.dto.UserRequest;
import com.rinconperrito.backend.dto.UserResponse;
import com.rinconperrito.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST para administrar usuarios y roles (solo accesible por Administrador)
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Devuelve todos los usuarios sin mostrar sus contraseñas
    @GetMapping
    public List<UserResponse> getAll() {
        return userService.findAll();
    }

    // Busca un usuario por su RUN
    @GetMapping("/{run}")
    public UserResponse getByRun(@PathVariable String run) {
        return userService.findByRun(run);
    }

    // Crea un usuario nuevo desde el panel administrativo
    @PostMapping
    public ResponseEntity<UserResponse> create(@RequestBody UserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(request));
    }

    // Actualiza datos o rol de un usuario existente
    @PutMapping("/{run}")
    public UserResponse update(@PathVariable String run, @RequestBody UserRequest request) {
        return userService.update(run, request);
    }

    // Elimina un usuario por su RUN
    @DeleteMapping("/{run}")
    public ResponseEntity<Void> delete(@PathVariable String run) {
        userService.delete(run);
        return ResponseEntity.noContent().build();
    }
}

