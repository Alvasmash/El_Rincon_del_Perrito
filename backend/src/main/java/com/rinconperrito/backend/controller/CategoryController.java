package com.rinconperrito.backend.controller;

import com.rinconperrito.backend.entity.Category;
import com.rinconperrito.backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST para listar, crear, editar y eliminar categorías (/api/categories)
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Lista todas las categorías disponibles
    @GetMapping
    public List<Category> getAll() {
        return categoryService.findAll();
    }

    // Agrega una categoría nueva
    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category category) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(category));
    }

    // Modifica el nombre o descripción de una categoría
    @PutMapping("/{id}")
    public Category update(@PathVariable String id, @RequestBody Category category) {
        return categoryService.update(id, category);
    }

    // Borra una categoría si no tiene productos asociados
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

