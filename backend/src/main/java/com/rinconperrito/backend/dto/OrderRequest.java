package com.rinconperrito.backend.dto;

import java.util.List;

// Estructura del JSON que envía el carrito/checkout del frontend al confirmar una compra
public class OrderRequest {
    private String id;
    private CustomerInfo customer;
    private AddressInfo direccion;
    private PaymentInfo pago;
    private Integer subtotal;
    private Integer descuento;
    private Integer total;
    private List<OrderItemDto> items;

    public static class CustomerInfo {
        private String nombre;
        private String apellidos;
        private String correo;
        private String calle;
        private String depto;
        private String region;
        private String comuna;
        private String indicaciones;
        private String telefono;

        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getApellidos() { return apellidos; }
        public void setApellidos(String apellidos) { this.apellidos = apellidos; }
        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getCalle() { return calle; }
        public void setCalle(String calle) { this.calle = calle; }
        public String getDepto() { return depto; }
        public void setDepto(String depto) { this.depto = depto; }
        public String getRegion() { return region; }
        public void setRegion(String region) { this.region = region; }
        public String getComuna() { return comuna; }
        public void setComuna(String comuna) { this.comuna = comuna; }
        public String getIndicaciones() { return indicaciones; }
        public void setIndicaciones(String indicaciones) { this.indicaciones = indicaciones; }
        public String getTelefono() { return telefono; }
        public void setTelefono(String telefono) { this.telefono = telefono; }
    }

    public static class AddressInfo {
        private String calle;
        private String depto;
        private String region;
        private String comuna;

        public String getCalle() { return calle; }
        public void setCalle(String calle) { this.calle = calle; }
        public String getDepto() { return depto; }
        public void setDepto(String depto) { this.depto = depto; }
        public String getRegion() { return region; }
        public void setRegion(String region) { this.region = region; }
        public String getComuna() { return comuna; }
        public void setComuna(String comuna) { this.comuna = comuna; }
    }

    public static class PaymentInfo {
        private String metodo;
        private String fecha;

        public String getMetodo() { return metodo; }
        public void setMetodo(String metodo) { this.metodo = metodo; }
        public String getFecha() { return fecha; }
        public void setFecha(String fecha) { this.fecha = fecha; }
    }

    public static class OrderItemDto {
        private String id;
        private String codigo;
        private String nombre;
        private Integer precio;
        private Integer quantity;
        private String imagen;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getCodigo() { return codigo; }
        public void setCodigo(String codigo) { this.codigo = codigo; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public Integer getPrecio() { return precio; }
        public void setPrecio(Integer precio) { this.precio = precio; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        public String getImagen() { return imagen; }
        public void setImagen(String imagen) { this.imagen = imagen; }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public CustomerInfo getCustomer() { return customer; }
    public void setCustomer(CustomerInfo customer) { this.customer = customer; }
    public AddressInfo getDireccion() { return direccion; }
    public void setDireccion(AddressInfo direccion) { this.direccion = direccion; }
    public PaymentInfo getPago() { return pago; }
    public void setPago(PaymentInfo pago) { this.pago = pago; }
    public Integer getSubtotal() { return subtotal; }
    public void setSubtotal(Integer subtotal) { this.subtotal = subtotal; }
    public Integer getDescuento() { return descuento; }
    public void setDescuento(Integer descuento) { this.descuento = descuento; }
    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }
    public List<OrderItemDto> getItems() { return items; }
    public void setItems(List<OrderItemDto> items) { this.items = items; }
}

