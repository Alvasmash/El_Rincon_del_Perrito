package com.rinconperrito.backend.service;

import com.rinconperrito.backend.dto.UserRequest;
import com.rinconperrito.backend.dto.UserResponse;
import com.rinconperrito.backend.entity.User;
import com.rinconperrito.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// Pruebas unitarias de usuarios (no exponer contraseñas y encriptar con BCrypt al crear)
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void findAllNoExponeClave() {
        User u = new User("19011022K", "Admin", "Duoc", "admin@duocuc.cl",
                "secret-hash", "Administrador", "Región Metropolitana de Santiago", "Santiago", "Av. España 123", "");
        when(userRepository.findAll()).thenReturn(List.of(u));

        List<UserResponse> users = userService.findAll();

        assertEquals(1, users.size());
        assertEquals("admin@duocuc.cl", users.get(0).getCorreo());
    }

    @Test
    void createEncriptaClaveAntesDeGuardar() {
        UserRequest req = new UserRequest();
        req.setRun("181234567");
        req.setNombre("Carlos");
        req.setApellidos("Vendedor");
        req.setCorreo("vendedor@duocuc.cl");
        req.setClave("vendedor123");
        req.setRol("Vendedor");

        when(userRepository.existsByRunIgnoreCase("181234567")).thenReturn(false);
        when(userRepository.existsByCorreoIgnoreCase("vendedor@duocuc.cl")).thenReturn(false);
        when(passwordEncoder.encode("vendedor123")).thenReturn("bcrypt-hash");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        UserResponse created = userService.create(req);

        assertEquals("Vendedor", created.getRol());
        verify(passwordEncoder).encode("vendedor123");
    }
}

