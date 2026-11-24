package com.rinconperrito.backend.service;

import com.rinconperrito.backend.entity.Category;
import com.rinconperrito.backend.repository.CategoryRepository;
import com.rinconperrito.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private CategoryService categoryService;

    @Test
    void deleteConProductosAsociadosLanzaConflict() {
        when(categoryRepository.existsById("camas")).thenReturn(true);
        when(productRepository.existsByCategoria("camas")).thenReturn(true);

        assertThrows(ResponseStatusException.class, () -> categoryService.delete("camas"));
        verify(categoryRepository, never()).deleteById(any());
    }

    @Test
    void createNormalizaIdEnMinusculas() {
        Category cat = new Category("Snacks Saludables", "Snacks Saludables", "Premios naturales");
        cat.setId("");
        when(categoryRepository.existsById("snacks-saludables")).thenReturn(false);
        when(categoryRepository.save(any(Category.class))).thenAnswer(inv -> inv.getArgument(0));

        Category saved = categoryService.create(cat);

        assertEquals("snacks-saludables", saved.getId());
    }
}

