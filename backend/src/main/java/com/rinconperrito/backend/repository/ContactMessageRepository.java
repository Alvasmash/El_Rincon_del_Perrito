package com.rinconperrito.backend.repository;

import com.rinconperrito.backend.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio JPA para guardar los mensajes del formulario de contacto
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}

