package com.rinconperrito.backend.service;

import com.rinconperrito.backend.entity.Product;
import com.rinconperrito.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// Pruebas unitarias de la lógica de productos usando JUnit 5 y Mockito
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void findAllRetornaListaDeProductos() {
        Product p = new Product("cama-madera", "CAM001", "Cama Madera", "Desc", 14990, 11990, true, 10, 3, "camas", "Pino", "cama.png");
        when(productRepository.findAll()).thenReturn(List.of(p));

        List<Product> result = productService.findAll();

        assertEquals(1, result.size());
        assertEquals("CAM001", result.get(0).getCodigo());
    }

    @Test
    void createConCodigoDuplicadoLanzaExcepcion() {
        Product p = new Product(null, "CAM001", "Cama", "Desc", 10000, null, false, 5, 2, "camas", "Tela", "cama.png");
        when(productRepository.existsByCodigoIgnoreCase("CAM001")).thenReturn(true);

        assertThrows(ResponseStatusException.class, () -> productService.create(p));
        verify(productRepository, never()).save(any());
    }

    @Test
    void updateActualizaCamposDelProducto() {
        Product existing = new Product("cama-madera", "CAM001", "Cama Vieja", "Desc", 14990, null, false, 10, 3, "camas", "Pino", "cama.png");
        Product updated = new Product("cama-madera", "CAM001", "Cama Nueva", "Desc Nueva", 15990, 12990, true, 8, 2, "camas", "Roble", "camav2.png");

        when(productRepository.findById("cama-madera")).thenReturn(Optional.of(existing));
        when(productRepository.save(any(Product.class))).thenAnswer(inv -> inv.getArgument(0));

        Product result = productService.update("cama-madera", updated);

        assertEquals("Cama Nueva", result.getNombre());
        assertEquals(12990, result.getPrecioOferta());
        assertTrue(result.getEsOferta());
    }
}

