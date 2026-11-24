package com.rinconperrito.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Molde de los datos que envía el formulario de registro desde React
public class RegisterRequest {

    @NotBlank(message = "El RUN es requerido.")
    @Size(min = 7, max = 9, message = "El RUN debe tener entre 7 y 9 caracteres.")
    private String run;

    @NotBlank(message = "El nombre es requerido.")
    private String nombre;

    private String apellidos;

    @NotBlank(message = "El correo es requerido.")
    private String correo;

    @NotBlank(message = "La contraseña es requerida.")
    @Size(min = 4, max = 20, message = "La contraseña debe tener entre 4 y 20 caracteres.")
    private String clave;

    private String region;
    private String comuna;
    private String direccion;
    private String telefono;

    public String getRun() {
        return run;
    }

    public void setRun(String run) {
        this.run = run;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getComuna() {
        return comuna;
    }

    public void setComuna(String comuna) {
        this.comuna = comuna;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}

