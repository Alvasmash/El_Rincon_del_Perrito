package com.rinconperrito.backend.security;

import com.rinconperrito.backend.entity.User;
import com.rinconperrito.backend.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

// Busca al usuario en MySQL por su correo para que Spring Security conozca su clave y su rol
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String clean = email.trim().toLowerCase();
        // Buscamos el correo exacto y también normalizamos @duoc.cl a @duocuc.cl igual que en el frontend
        User user = userRepository.findByCorreoIgnoreCase(clean)
                .or(() -> userRepository.findByCorreoIgnoreCase(clean.replace("@duoc.cl", "@duocuc.cl")))
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));

        // Spring Security espera los roles con prefijo ROLE_ en mayúsculas (ej: ROLE_ADMINISTRADOR)
        String roleAuthority = "ROLE_" + user.getRol().trim().toUpperCase();
        return new org.springframework.security.core.userdetails.User(
                user.getCorreo(),
                user.getClave(),
                List.of(new SimpleGrantedAuthority(roleAuthority))
        );
    }
}

