/* Contexto global para gestión de sesión y roles de usuario */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserByEmail, createUser } from '../data/db';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  /* Estado del usuario activo */
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rincon_perrito_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  /* Guardar sesión en localStorage */
  useEffect(() => {
    if (user) {
      localStorage.setItem('rincon_perrito_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('rincon_perrito_session');
    }
  }, [user]);

  /* Iniciar sesión */
  const login = (email, password) => {
    const found = getUserByEmail(email);
    if (!found) {
      return { ok: false, message: 'El usuario no existe.' };
    }
    if (found.clave !== password) {
      return { ok: false, message: 'Contraseña incorrecta.' };
    }
    setUser(found);
    return { ok: true, user: found };
  };

  /* Cerrar sesión */
  const logout = () => {
    setUser(null);
  };

  /* Registro de nuevo usuario */
  const register = (userData) => {
    const existing = getUserByEmail(userData.correo);
    if (existing) {
      return { ok: false, message: 'Este correo ya está registrado.' };
    }
    const created = createUser({ ...userData, rol: userData.rol || 'Cliente' });
    setUser(created);
    return { ok: true, user: created };
  };

  const isAdmin = user?.rol === 'Administrador';
  const isVendor = user?.rol === 'Vendedor';
  const isClient = user?.rol === 'Cliente';

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAdmin, isVendor, isClient }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
