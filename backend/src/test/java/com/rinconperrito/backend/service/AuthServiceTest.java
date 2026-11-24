package com.rinconperrito.backend.service;

import com.rinconperrito.backend.dto.AuthResponse;
import com.rinconperrito.backend.dto.LoginRequest;
import com.rinconperrito.backend.dto.RegisterRequest;
import com.rinconperrito.backend.entity.User;
import com.rinconperrito.backend.repository.UserRepository;
import com.rinconperrito.backend.security.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    @Test
    void loginExitosoRetornaTokenYUsuario() {
        User admin = new User("19011022K", "Administrador", "Principal", "admin@duocuc.cl",
                "encoded-pass", "Administrador", "Región Metropolitana de Santiago", "Santiago", "Av. España 123", "");

        when(userRepository.findByCorreoIgnoreCase("admin@duocuc.cl")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("admin123", "encoded-pass")).thenReturn(true);
        when(jwtService.generateToken("admin@duocuc.cl", "Administrador")).thenReturn("jwt-token-test");

        LoginRequest request = new LoginRequest();
        request.setCorreo("admin@duocuc.cl");
        request.setClave("admin123");

        AuthResponse response = authService.login(request);

        assertEquals("jwt-token-test", response.getToken());
        assertEquals("Administrador", response.getUser().getRol());
        assertEquals("admin@duocuc.cl", response.getUser().getCorreo());
    }

    @Test
    void loginConClaveIncorrectaLanzaUnauthorized() {
        User client = new User("201112223", "María", "González", "cliente@gmail.com",
                "encoded-pass", "Cliente", "", "", "", "");

        when(userRepository.findByCorreoIgnoreCase("cliente@gmail.com")).thenReturn(Optional.of(client));
        when(passwordEncoder.matches("mala", "encoded-pass")).thenReturn(false);

        LoginRequest request = new LoginRequest();
        request.setCorreo("cliente@gmail.com");
        request.setClave("mala");

        assertThrows(ResponseStatusException.class, () -> authService.login(request));
    }

    @Test
    void registroNuevoClienteAsignaRolCliente() {
        RegisterRequest req = new RegisterRequest();
        req.setRun("212223334");
        req.setNombre("Lucas");
        req.setApellidos("Rojas");
        req.setCorreo("lucas@gmail.com");
        req.setClave("123456");

        when(userRepository.existsByCorreoIgnoreCase("lucas@gmail.com")).thenReturn(false);
        when(userRepository.existsByRunIgnoreCase("212223334")).thenReturn(false);
        when(passwordEncoder.encode("123456")).thenReturn("hash");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtService.generateToken("lucas@gmail.com", "Cliente")).thenReturn("jwt-lucas");

        AuthResponse response = authService.register(req);

        assertEquals("Cliente", response.getUser().getRol());
        assertEquals("jwt-lucas", response.getToken());
        verify(userRepository).save(any(User.class));
    }
}

