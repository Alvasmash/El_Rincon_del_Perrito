package com.rinconperrito.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

// Servicio encargado de crear y validar los tokens JWT para las sesiones de usuario
@Service
public class JwtService {

    private final SecretKey signingKey;
    private final long expirationMs;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration-ms:86400000}") long expirationMs) {
        // Convertimos nuestra clave secreta en una llave criptográfica HMAC-SHA256
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    // Genera un token JWT con el correo del usuario, su rol y la fecha de vencimiento
    public String generateToken(String correo, String rol) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .subject(correo)
                .claim("rol", rol)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(signingKey)
                .compact();
    }

    // Saca el correo (subject) guardado dentro del token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Comprueba que el token pertenezca al usuario y que todavía no haya expirado
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        Date expiration = extractAllClaims(token).getExpiration();
        return username.equalsIgnoreCase(userDetails.getUsername()) && expiration.after(new Date());
    }

    // Lee y verifica la firma del token para extraer su contenido
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}

