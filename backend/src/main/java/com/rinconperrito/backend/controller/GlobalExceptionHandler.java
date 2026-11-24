package com.rinconperrito.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

// Atrapa los errores de los controladores y servicios para devolver un JSON limpio { "message": "..." } al frontend
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Maneja errores controlados (ej: 401 clave incorrecta, 404 producto no encontrado, 409 código duplicado)
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleStatusException(ResponseStatusException ex) {
        String msg = ex.getReason() != null ? ex.getReason() : "Error en la solicitud.";
        return ResponseEntity.status(ex.getStatusCode()).body(Map.of("message", msg));
    }

    // Maneja errores de validación automática en los DTOs (@NotBlank, @Size, etc.)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getDefaultMessage())
                .orElse("Datos inválidos en el formulario.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", msg));
    }
}

