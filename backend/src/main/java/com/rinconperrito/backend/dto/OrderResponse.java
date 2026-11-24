package com.rinconperrito.backend.dto;

import com.rinconperrito.backend.entity.Order;
import com.rinconperrito.backend.entity.OrderItem;

import java.util.List;

public class OrderResponse {
    private String id;
    private String fecha;
    private Integer subtotal;
    private Integer descuento;
    private Integer total;
    private String estado;
    private OrderRequest.CustomerInfo customer;
    private OrderRequest.AddressInfo direccion;
    private OrderRequest.PaymentInfo pago;
    private List<OrderRequest.OrderItemDto> items;

    public static OrderResponse fromEntity(Order order) {
        OrderResponse res = new OrderResponse();
        res.setId(order.getId());
        res.setFecha(order.getFecha());
        res.setSubtotal(order.getSubtotal());
        res.setDescuento(order.getDescuento());
        res.setTotal(order.getTotal());
        res.setEstado(order.getEstado());

        OrderRequest.CustomerInfo cust = new OrderRequest.CustomerInfo();
        cust.setNombre(order.getClienteNombre());
        cust.setApellidos(order.getClienteApellidos());
        cust.setCorreo(order.getClienteCorreo());
        cust.setTelefono(order.getClienteTelefono());
        cust.setCalle(order.getCalle());
        cust.setDepto(order.getDepto());
        cust.setRegion(order.getRegion());
        cust.setComuna(order.getComuna());
        cust.setIndicaciones(order.getIndicaciones());
        res.setCustomer(cust);

        OrderRequest.AddressInfo addr = new OrderRequest.AddressInfo();
        addr.setCalle(order.getCalle());
        addr.setDepto(order.getDepto());
        addr.setRegion(order.getRegion());
        addr.setComuna(order.getComuna());
        res.setDireccion(addr);

        OrderRequest.PaymentInfo pay = new OrderRequest.PaymentInfo();
        pay.setMetodo(order.getMetodoPago());
        pay.setFecha(order.getFecha());
        res.setPago(pay);

        List<OrderRequest.OrderItemDto> itemDtos = order.getItems().stream().map(OrderResponse::mapItem).toList();
        res.setItems(itemDtos);
        return res;
    }

    private static OrderRequest.OrderItemDto mapItem(OrderItem item) {
        OrderRequest.OrderItemDto dto = new OrderRequest.OrderItemDto();
        dto.setId(item.getProductId());
        dto.setCodigo(item.getCodigo());
        dto.setNombre(item.getNombre());
        dto.setPrecio(item.getPrecio());
        dto.setQuantity(item.getQuantity());
        dto.setImagen(item.getImagen());
        return dto;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public Integer getSubtotal() { return subtotal; }
    public void setSubtotal(Integer subtotal) { this.subtotal = subtotal; }
    public Integer getDescuento() { return descuento; }
    public void setDescuento(Integer descuento) { this.descuento = descuento; }
    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public OrderRequest.CustomerInfo getCustomer() { return customer; }
    public void setCustomer(OrderRequest.CustomerInfo customer) { this.customer = customer; }
    public OrderRequest.AddressInfo getDireccion() { return direccion; }
    public void setDireccion(OrderRequest.AddressInfo direccion) { this.direccion = direccion; }
    public OrderRequest.PaymentInfo getPago() { return pago; }
    public void setPago(OrderRequest.PaymentInfo pago) { this.pago = pago; }
    public List<OrderRequest.OrderItemDto> getItems() { return items; }
    public void setItems(List<OrderRequest.OrderItemDto> items) { this.items = items; }
}

