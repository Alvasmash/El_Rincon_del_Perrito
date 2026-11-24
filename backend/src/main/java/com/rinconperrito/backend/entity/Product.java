package com.rinconperrito.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Representa la tabla "products" en MySQL con precio, oferta, stock y categoría de cada artículo
@Entity
@Table(name = "products")
public class Product {

    @Id
    @Column(length = 80, nullable = false)
    private String id;

    @Column(length = 30, nullable = false, unique = true)
    private String codigo;

    @Column(length = 150, nullable = false)
    private String nombre;

    @Column(length = 500)
    private String descripcion;

    @Column(nullable = false)
    private Integer precio;

    private Integer precioOferta;

    @Column(nullable = false)
    private Boolean esOferta = false;

    @Column(nullable = false)
    private Integer stock = 0;

    @Column(nullable = false)
    private Integer stockCritico = 3;

    @Column(length = 60, nullable = false)
    private String categoria;

    @Column(length = 120)
    private String material;

    @Column(length = 150)
    private String imagen;

    public Product() {
    }

    public Product(String id, String codigo, String nombre, String descripcion, Integer precio,
                   Integer precioOferta, Boolean esOferta, Integer stock, Integer stockCritico,
                   String categoria, String material, String imagen) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.precioOferta = precioOferta;
        this.esOferta = esOferta != null ? esOferta : false;
        this.stock = stock != null ? stock : 0;
        this.stockCritico = stockCritico != null ? stockCritico : 3;
        this.categoria = categoria;
        this.material = material;
        this.imagen = imagen;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public Integer getPrecioOferta() {
        return precioOferta;
    }

    public void setPrecioOferta(Integer precioOferta) {
        this.precioOferta = precioOferta;
    }

    public Boolean getEsOferta() {
        return esOferta;
    }

    public void setEsOferta(Boolean esOferta) {
        this.esOferta = esOferta;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getStockCritico() {
        return stockCritico;
    }

    public void setStockCritico(Integer stockCritico) {
        this.stockCritico = stockCritico;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}

