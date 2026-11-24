package com.rinconperrito.backend.dto;

import com.rinconperrito.backend.entity.User;

public class UserResponse {
    private String run;
    private String nombre;
    private String apellidos;
    private String correo;
    private String rol;
    private String region;
    private String comuna;
    private String direccion;
    private String telefono;

    public UserResponse() {
    }

    public static UserResponse fromEntity(User user) {
        UserResponse dto = new UserResponse();
        dto.setRun(user.getRun());
        dto.setNombre(user.getNombre());
        dto.setApellidos(user.getApellidos());
        dto.setCorreo(user.getCorreo());
        dto.setRol(user.getRol());
        dto.setRegion(user.getRegion());
        dto.setComuna(user.getComuna());
        dto.setDireccion(user.getDireccion());
        dto.setTelefono(user.getTelefono());
        return dto;
    }

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

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
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

