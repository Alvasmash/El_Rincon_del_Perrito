package com.rinconperrito.backend.config;

import com.rinconperrito.backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

// Aquí configuramos toda la seguridad del backend: quién puede entrar a cada ruta, CORS y JWT
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // Reglas de acceso para cada endpoint de la API
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Desactivamos CSRF porque usamos tokens JWT en lugar de sesiones con cookies
            .csrf(csrf -> csrf.disable())
            // Habilitamos CORS para que el frontend en React (puerto 3000) pueda hablar con el backend
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // No guardamos sesión en el servidor: cada petición trae su propio token JWT
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Permitimos las consultas previas OPTIONS del navegador (CORS)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // Login y registro son públicos
                .requestMatchers("/api/auth/**").permitAll()
                // Enviar mensaje de contacto es público
                .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()
                // Ver productos y categorías es público para cualquier visitante
                .requestMatchers(HttpMethod.GET, "/api/products/**", "/api/categories/**").permitAll()
                // Crear una compra es público (puede comprar un cliente logueado o invitado)
                .requestMatchers(HttpMethod.POST, "/api/orders").permitAll()
                // Crear, editar o borrar productos/categorías solo lo pueden hacer Admin o Vendedor
                .requestMatchers(HttpMethod.POST, "/api/products/**", "/api/categories/**").hasAnyRole("ADMINISTRADOR", "VENDEDOR")
                .requestMatchers(HttpMethod.PUT, "/api/products/**", "/api/categories/**").hasAnyRole("ADMINISTRADOR", "VENDEDOR")
                .requestMatchers(HttpMethod.DELETE, "/api/products/**", "/api/categories/**").hasAnyRole("ADMINISTRADOR", "VENDEDOR")
                // Ver el historial de pedidos y mensajes de contacto es solo para Admin o Vendedor
                .requestMatchers(HttpMethod.GET, "/api/orders/**", "/api/contact/**").hasAnyRole("ADMINISTRADOR", "VENDEDOR")
                // Gestionar usuarios es exclusivo del Administrador
                .requestMatchers("/api/users/**").hasRole("ADMINISTRADOR")
                // Cualquier otra ruta pide estar autenticado
                .anyRequest().authenticated()
            )
            // Ponemos nuestro filtro JWT antes del filtro normal de usuario/contraseña
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Configuración de CORS para aceptar peticiones desde el frontend en desarrollo
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // Encriptador BCrypt para guardar y comparar contraseñas de forma segura
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Administrador de autenticación estándar de Spring Security
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

