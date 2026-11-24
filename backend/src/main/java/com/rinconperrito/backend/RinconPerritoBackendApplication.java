package com.rinconperrito.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Clase principal desde donde parte todo el servidor Spring Boot
@SpringBootApplication
public class RinconPerritoBackendApplication {

    // Punto de entrada de la aplicación: levanta Tomcat en el puerto 8080 y conecta Spring con MySQL
    public static void main(String[] args) {
        SpringApplication.run(RinconPerritoBackendApplication.class, args);
    }
}

