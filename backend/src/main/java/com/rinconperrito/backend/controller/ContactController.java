package com.rinconperrito.backend.controller;

import com.rinconperrito.backend.entity.ContactMessage;
import com.rinconperrito.backend.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST que recibe los mensajes del formulario de contacto (/api/contact)
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // Guarda un mensaje enviado desde la página Contacto
    @PostMapping
    public ResponseEntity<ContactMessage> submit(@RequestBody ContactMessage message) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.save(message));
    }

    // Lista los mensajes recibidos (para Admin o Vendedor)
    @GetMapping
    public List<ContactMessage> getAll() {
        return contactService.findAll();
    }
}

