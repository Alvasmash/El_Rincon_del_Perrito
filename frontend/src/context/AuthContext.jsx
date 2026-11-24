/* Contexto global para gestión de sesión JWT y roles de usuario */
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient, { getApiErrorMessage } from '../api/apiClient';

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

  /* Sincronizar sesión en localStorage */
  useEffect(() => {
    if (user) {
      localStorage.setItem('rincon_perrito_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('rincon_perrito_session');
      localStorage.removeItem('rincon_perrito_token');
    }
  }, [user]);

  /* Iniciar sesión contra POST /api/auth/login */
  const login = async (email, password) => {
    try {
      const { data } = await apiClient.post('/auth/login', {
        correo: email,
        clave: password
      });
      localStorage.setItem('rincon_perrito_token', data.token);
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (error) {
      return {
        ok: false,
        message: getApiErrorMessage(error, 'Error al iniciar sesión con el backend.')
      };
    }
  };

  /* Cerrar sesión */
  const logout = () => {
    localStorage.removeItem('rincon_perrito_token');
    localStorage.removeItem('rincon_perrito_session');
    setUser(null);
  };

  /* Registro de nuevo usuario contra POST /api/auth/register */
  const register = async (userData) => {
    try {
      const { data } = await apiClient.post('/auth/register', userData);
      localStorage.setItem('rincon_perrito_token', data.token);
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (error) {
      return {
        ok: false,
        message: getApiErrorMessage(error, 'Error al registrar usuario en el servidor.')
      };
    }
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
