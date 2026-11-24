package com.rinconperrito.backend.controller;

import com.rinconperrito.backend.dto.OrderRequest;
import com.rinconperrito.backend.dto.OrderResponse;
import com.rinconperrito.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST para registrar compras y revisar el historial de pedidos (/api/orders)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Lista todas las órdenes para el panel de administración
    @GetMapping
    public List<OrderResponse> getAll() {
        return orderService.findAll();
    }

    // Busca el detalle de una orden por su ID
    @GetMapping("/{id}")
    public OrderResponse getById(@PathVariable String id) {
        return orderService.findById(id);
    }

    // Guarda una nueva compra desde el Checkout y descuenta el stock de los productos
    @PostMapping
    public ResponseEntity<OrderResponse> create(@RequestBody OrderRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.create(request));
    }
}

