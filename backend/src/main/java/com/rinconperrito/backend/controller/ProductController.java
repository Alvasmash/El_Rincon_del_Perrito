package com.rinconperrito.backend.controller;

import com.rinconperrito.backend.entity.Product;
import com.rinconperrito.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST para gestionar el catálogo de productos de la tienda (/api/products)
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Devuelve todos los productos registrados en MySQL
    @GetMapping
    public List<Product> getAll() {
        return productService.findAll();
    }

    // Busca un producto específico por su ID
    @GetMapping("/{id}")
    public Product getById(@PathVariable String id) {
        return productService.findById(id);
    }

    // Crea un producto nuevo (solo Admin o Vendedor)
    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(product));
    }

    // Actualiza un producto existente por su ID (solo Admin o Vendedor)
    @PutMapping("/{id}")
    public Product update(@PathVariable String id, @RequestBody Product product) {
        return productService.update(id, product);
    }

    // Elimina un producto por su ID (solo Admin o Vendedor)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

