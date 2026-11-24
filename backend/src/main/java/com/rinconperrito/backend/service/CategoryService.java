package com.rinconperrito.backend.service;

import com.rinconperrito.backend.entity.Category;
import com.rinconperrito.backend.repository.CategoryRepository;
import com.rinconperrito.backend.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// Lógica de negocio para crear, editar y borrar categorías de productos
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    // Devuelve todas las categorías guardadas
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    // Crea una categoría generando un ID en minúsculas y verificando que no esté duplicado
    public Category create(Category category) {
        String id = (category.getId() != null && !category.getId().isBlank())
                ? category.getId().trim().toLowerCase()
                : category.getNombre().trim().toLowerCase().replaceAll("\\s+", "-");
        if (categoryRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una categoría con ese identificador.");
        }
        category.setId(id);
        return categoryRepository.save(category);
    }

    // Actualiza el nombre y descripción de una categoría
    public Category update(String id, Category updated) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada."));
        existing.setNombre(updated.getNombre());
        existing.setDescripcion(updated.getDescripcion());
        return categoryRepository.save(existing);
    }

    // Borra una categoría solo si no tiene productos asignados
    public void delete(String id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada.");
        }
        if (productRepository.existsByCategoria(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede eliminar la categoría porque tiene productos asociados.");
        }
        categoryRepository.deleteById(id);
    }
}

