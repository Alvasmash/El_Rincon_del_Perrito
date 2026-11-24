package com.rinconperrito.backend.service;

import com.rinconperrito.backend.dto.OrderRequest;
import com.rinconperrito.backend.dto.OrderResponse;
import com.rinconperrito.backend.entity.Order;
import com.rinconperrito.backend.entity.OrderItem;
import com.rinconperrito.backend.entity.Product;
import com.rinconperrito.backend.repository.OrderRepository;
import com.rinconperrito.backend.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

// Lógica de negocio para guardar compras y descontar stock de forma segura en MySQL
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    // Lista todas las órdenes ordenadas desde la más reciente
    public List<OrderResponse> findAll() {
        return orderRepository.findAllByOrderByFechaDescIdDesc().stream()
                .map(OrderResponse::fromEntity)
                .toList();
    }

    // Busca una orden específica por su número de pedido
    public OrderResponse findById(String id) {
        String cleanId = id.replace("#", "");
        Order order = orderRepository.findById(cleanId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Orden no encontrada."));
        return OrderResponse.fromEntity(order);
    }

    // @Transactional asegura que si falla un producto (ej: sin stock), se deshaga toda la compra y no quede a medias
    @Transactional
    public OrderResponse create(OrderRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El pedido debe incluir al menos un producto.");
        }

        Order order = new Order();
        String orderId = (request.getId() != null && !request.getId().isBlank())
                ? request.getId().replace("#", "")
                : String.valueOf(System.currentTimeMillis());
        order.setId(orderId);
        order.setFecha(LocalDate.now().toString());
        order.setSubtotal(request.getSubtotal() != null ? request.getSubtotal() : request.getTotal());
        order.setDescuento(request.getDescuento() != null ? request.getDescuento() : 0);
        order.setTotal(request.getTotal());
        order.setEstado("Aprobada");

        if (request.getPago() != null && request.getPago().getMetodo() != null) {
            order.setMetodoPago(request.getPago().getMetodo());
        }

        OrderRequest.CustomerInfo cust = request.getCustomer();
        OrderRequest.AddressInfo addr = request.getDireccion();
        order.setClienteNombre(cust != null ? cust.getNombre() : "Cliente");
        order.setClienteApellidos(cust != null ? cust.getApellidos() : "");
        order.setClienteCorreo(cust != null ? cust.getCorreo() : "");
        order.setClienteTelefono(cust != null ? cust.getTelefono() : "");
        order.setCalle(addr != null && addr.getCalle() != null ? addr.getCalle() : (cust != null ? cust.getCalle() : ""));
        order.setDepto(addr != null && addr.getDepto() != null ? addr.getDepto() : (cust != null ? cust.getDepto() : ""));
        order.setRegion(addr != null && addr.getRegion() != null ? addr.getRegion() : (cust != null ? cust.getRegion() : ""));
        order.setComuna(addr != null && addr.getComuna() != null ? addr.getComuna() : (cust != null ? cust.getComuna() : ""));
        order.setIndicaciones(cust != null ? cust.getIndicaciones() : "");

        for (OrderRequest.OrderItemDto itemDto : request.getItems()) {
            Product product = productRepository.findById(itemDto.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Producto no encontrado: " + itemDto.getId()));

            int qty = itemDto.getQuantity() != null ? itemDto.getQuantity() : 1;
            if (product.getStock() < qty) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Stock insuficiente para " + product.getNombre());
            }

            product.setStock(product.getStock() - qty);
            productRepository.save(product);

            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setCodigo(product.getCodigo());
            item.setNombre(product.getNombre());
            item.setPrecio(itemDto.getPrecio() != null ? itemDto.getPrecio() : product.getPrecio());
            item.setQuantity(qty);
            item.setImagen(product.getImagen());
            order.addItem(item);
        }

        Order saved = orderRepository.save(order);
        return OrderResponse.fromEntity(saved);
    }
}

