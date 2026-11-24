package com.rinconperrito.backend.service;

import com.rinconperrito.backend.entity.ContactMessage;
import com.rinconperrito.backend.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

// Servicio encargado de guardar y consultar los mensajes del formulario de contacto
@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    // Agrega la fecha actual y guarda el mensaje en MySQL
    public ContactMessage save(ContactMessage message) {
        message.setFecha(LocalDateTime.now().toString());
        return contactMessageRepository.save(message);
    }

    // Devuelve todos los mensajes guardados
    public List<ContactMessage> findAll() {
        return contactMessageRepository.findAll();
    }
}

