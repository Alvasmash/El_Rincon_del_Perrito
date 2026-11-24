package com.rinconperrito.backend.controller;

import com.rinconperrito.backend.entity.ContactMessage;
import com.rinconperrito.backend.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submit(@RequestBody ContactMessage message) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.save(message));
    }

    @GetMapping
    public List<ContactMessage> getAll() {
        return contactService.findAll();
    }
}

