package com.rinconperrito.backend.repository;

import com.rinconperrito.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repositorio JPA para órdenes de compra, ordenadas de la más nueva a la más antigua
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findAllByOrderByFechaDescIdDesc();
}

