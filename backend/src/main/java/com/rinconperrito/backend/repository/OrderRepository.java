package com.rinconperrito.backend.repository;

import com.rinconperrito.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findAllByOrderByFechaDescIdDesc();
}

