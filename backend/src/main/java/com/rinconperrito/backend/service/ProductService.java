package com.rinconperrito.backend.service;

import com.rinconperrito.backend.entity.Product;
import com.rinconperrito.backend.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado."));
    }

    public Product create(Product product) {
        if (product.getId() == null || product.getId().isBlank()) {
            product.setId("prod-" + System.currentTimeMillis());
        }
        if (productRepository.existsByCodigoIgnoreCase(product.getCodigo())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un producto con ese código.");
        }
        if (product.getEsOferta() == null) {
            product.setEsOferta(false);
        }
        if (product.getStock() == null) {
            product.setStock(0);
        }
        if (product.getStockCritico() == null) {
            product.setStockCritico(3);
        }
        return productRepository.save(product);
    }

    public Product update(String id, Product updated) {
        Product existing = findById(id);
        existing.setCodigo(updated.getCodigo());
        existing.setNombre(updated.getNombre());
        existing.setDescripcion(updated.getDescripcion());
        existing.setPrecio(updated.getPrecio());
        existing.setEsOferta(updated.getEsOferta() != null ? updated.getEsOferta() : false);
        existing.setPrecioOferta(Boolean.TRUE.equals(existing.getEsOferta()) ? updated.getPrecioOferta() : null);
        existing.setStock(updated.getStock());
        existing.setStockCritico(updated.getStockCritico());
        existing.setCategoria(updated.getCategoria());
        existing.setMaterial(updated.getMaterial());
        existing.setImagen(updated.getImagen());
        return productRepository.save(existing);
    }

    public void delete(String id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado.");
        }
        productRepository.deleteById(id);
    }
}

