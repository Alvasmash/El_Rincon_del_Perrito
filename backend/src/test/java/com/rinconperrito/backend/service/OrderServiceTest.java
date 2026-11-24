package com.rinconperrito.backend.service;

import com.rinconperrito.backend.dto.OrderRequest;
import com.rinconperrito.backend.dto.OrderResponse;
import com.rinconperrito.backend.entity.Order;
import com.rinconperrito.backend.entity.Product;
import com.rinconperrito.backend.repository.OrderRepository;
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

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    void createDescuentaStockYGuardaOrden() {
        Product cama = new Product("cama-madera", "CAM001", "Cama Madera", "Desc", 14990, 11990, true, 10, 3, "camas", "Pino", "cama.png");

        OrderRequest.CustomerInfo customer = new OrderRequest.CustomerInfo();
        customer.setNombre("María");
        customer.setApellidos("González");
        customer.setCorreo("cliente@gmail.com");
        customer.setCalle("Av. Providencia 2020");
        customer.setRegion("Región Metropolitana de Santiago");
        customer.setComuna("Providencia");

        OrderRequest.OrderItemDto item = new OrderRequest.OrderItemDto();
        item.setId("cama-madera");
        item.setPrecio(11990);
        item.setQuantity(2);

        OrderRequest req = new OrderRequest();
        req.setId("20240705");
        req.setCustomer(customer);
        req.setSubtotal(23980);
        req.setDescuento(0);
        req.setTotal(23980);
        req.setItems(List.of(item));

        when(productRepository.findById("cama-madera")).thenReturn(Optional.of(cama));
        when(productRepository.save(any(Product.class))).thenAnswer(inv -> inv.getArgument(0));
        when(orderRepository.save(any(Order.class))).thenAnswer(inv -> inv.getArgument(0));

        OrderResponse res = orderService.create(req);

        assertEquals(8, cama.getStock());
        assertEquals("20240705", res.getId());
        assertEquals(1, res.getItems().size());
    }

    @Test
    void createConStockInsuficienteLanzaBadRequest() {
        Product cama = new Product("cama-madera", "CAM001", "Cama Madera", "Desc", 14990, null, false, 1, 3, "camas", "Pino", "cama.png");

        OrderRequest.OrderItemDto item = new OrderRequest.OrderItemDto();
        item.setId("cama-madera");
        item.setQuantity(5);

        OrderRequest req = new OrderRequest();
        req.setTotal(50000);
        req.setItems(List.of(item));

        when(productRepository.findById("cama-madera")).thenReturn(Optional.of(cama));

        assertThrows(ResponseStatusException.class, () -> orderService.create(req));
        verify(orderRepository, never()).save(any());
    }
}

