package com.rinconperrito.backend.dto;

import jakarta.validation.constraints.NotBlank;

// Molde de los datos que envía el frontend al iniciar sesión (correo y contraseña)
public class LoginRequest {

    @NotBlank(message = "El correo es requerido.")
    private String correo;

    @NotBlank(message = "La contraseña es requerida.")
    private String clave;

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
}

