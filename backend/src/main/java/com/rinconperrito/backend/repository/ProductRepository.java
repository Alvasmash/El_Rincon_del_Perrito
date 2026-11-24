package com.rinconperrito.backend.repository;

import com.rinconperrito.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsByCategoria(String categoria);
    boolean existsByCodigoIgnoreCase(String codigo);
    List<Product> findByCategoria(String categoria);
}

