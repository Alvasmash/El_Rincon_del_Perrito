/* Contexto global para gestión del carrito de compras y cupones */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProductById } from '../data/db';

const CartContext = createContext();

export function CartProvider({ children }) {
  /* Lista de productos en el carrito */
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rincon_perrito_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  /* Cupón aplicado */
  const [coupon, setCoupon] = useState(null);

  /* Guardar cambios en LocalStorage */
  useEffect(() => {
    localStorage.setItem('rincon_perrito_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /* Añadir producto al carrito */
  const addToCart = (product, quantity = 1) => {
    const currentStock = product.stock ?? 10;
    if (currentStock <= 0) {
      return { ok: false, message: product.nombre + ' se encuentra sin stock.' };
    }

    let updated = [...cartItems];
    const existingIndex = updated.findIndex(i => i.id === product.id);

    if (existingIndex >= 0) {
      const newQty = updated[existingIndex].quantity + quantity;
      if (newQty > currentStock) {
        return { ok: false, message: 'Stock máximo disponible: ' + currentStock };
      }
      updated[existingIndex].quantity = newQty;
    } else {
      if (quantity > currentStock) {
        return { ok: false, message: 'Stock máximo disponible: ' + currentStock };
      }
      updated.push({
        id: product.id,
        codigo: product.codigo,
        nombre: product.nombre,
        precio: product.esOferta && product.precioOferta ? product.precioOferta : product.precio,
        precioOriginal: product.precio,
        imagen: product.imagen,
        categoria: product.categoria,
        stock: currentStock,
        quantity: quantity
      });
    }

    setCartItems(updated);
    return { ok: true, message: '¡' + product.nombre + ' agregado al carrito!' };
  };

  /* Modificar cantidad (+ / -) */
  const updateQuantity = (productId, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const fresh = getProductById(productId);
          const maxStock = fresh ? fresh.stock : item.stock;
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          if (newQty > maxStock) return { ...item, quantity: maxStock };
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  /* Eliminar producto individual */
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  /* Vaciar carrito */
  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  /* Aplicar cupón de descuento (Ej: PERRITO10 para 10% de descuento) */
  const applyCoupon = (code) => {
    if (!code) return { ok: false, message: 'Ingresa un código de cupón.' };
    const clean = code.trim().toUpperCase();
    if (clean === 'PERRITO10') {
      setCoupon({ code: 'PERRITO10', discountPercent: 0.10 });
      return { ok: true, message: '¡Cupón del 10% aplicado con éxito!' };
    }
    return { ok: false, message: 'Cupón inválido. Usa PERRITO10.' };
  };

  /* Cálculos de totales */
  const subtotal = cartItems.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
  const discountAmount = coupon ? Math.round(subtotal * coupon.discountPercent) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      coupon,
      applyCoupon,
      subtotal,
      discountAmount,
      total,
      totalCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
