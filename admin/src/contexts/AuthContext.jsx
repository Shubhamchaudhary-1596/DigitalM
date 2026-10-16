import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('admin-user') || 'null'); } catch { return null; }
  });
  const loading = false;

  useEffect(() => {
    if (token) api.defaults.headers.common.Authorization = 'Bearer ' + token;
    else delete api.defaults.headers.common.Authorization;
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      if (!newToken || !userData || userData.role !== 'admin') return { success: false, error: 'The server returned an invalid administrator session.' };
      api.defaults.headers.common.Authorization = 'Bearer ' + newToken;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      localStorage.setItem('admin-user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed. Check API configuration and try again.' };
    }
  };

  const register = async () => ({ success: false, error: 'Public registration is disabled. Ask the site administrator to provision access.' });

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('admin-user');
    delete api.defaults.headers.common.Authorization;
  };

  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/api/auth/forgot-password', { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Password reset is not configured. Contact the site administrator.' };
    }
  };

  const value = { user, token, loading, login, register, logout, forgotPassword, isAuthenticated: Boolean(token && user), isAdmin: user?.role === 'admin' };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
