package com.rinconperrito.backend.repository;

import com.rinconperrito.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio JPA para consultar y guardar categorías en la tabla "categories"
public interface CategoryRepository extends JpaRepository<Category, String> {
}

