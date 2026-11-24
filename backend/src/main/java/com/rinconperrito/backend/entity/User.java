package com.rinconperrito.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Representa la tabla "users" en MySQL con los datos del cliente, vendedor o administrador
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(length = 12, nullable = false)
    private String run;

    @Column(length = 60, nullable = false)
    private String nombre;

    @Column(length = 100)
    private String apellidos;

    @Column(length = 120, nullable = false, unique = true)
    private String correo;

    @Column(length = 255, nullable = false)
    private String clave;

    @Column(length = 30, nullable = false)
    private String rol;

    @Column(length = 120)
    private String region;

    @Column(length = 100)
    private String comuna;

    @Column(length = 300)
    private String direccion;

    @Column(length = 30)
    private String telefono;

    public User() {
    }

    public User(String run, String nombre, String apellidos, String correo, String clave,
                String rol, String region, String comuna, String direccion, String telefono) {
        this.run = run;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.clave = clave;
        this.rol = rol;
        this.region = region;
        this.comuna = comuna;
        this.direccion = direccion;
        this.telefono = telefono;
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

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
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

