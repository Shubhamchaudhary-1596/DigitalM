import React, { createContext, useState, useContext, useEffect } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import { fetchDataFromApi } from '../utils/api';
=======
import { api } from '../lib/api';
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));

// Refresh access token using refresh token
  const refreshAccessToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if needed
      });

      const data = await response.json();
      if (data.success && data.data?.accessToken) {
        const newToken = data.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return newToken;
      } else {
        throw new Error('Refresh token invalid');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Clear all tokens on refresh failure
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setToken(null);
      setRefreshToken(null);
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
      throw error;
    }
  };

  // Fetch user details function with auto-refresh
  const fetchUser = async (retry = false) => {
    try {
      const response = await fetchDataFromApi('/api/user/user-details');
      if (response.success && response.data) {
        setUser(response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      
      // Auto-refresh on 401 and retry once
      if (!retry && (error.status === 401 || error.message?.includes('401'))) {
        console.log('Token expired, attempting refresh...');
        try {
          await refreshAccessToken();
          console.log('Refresh successful, retrying user fetch...');
          return await fetchUser(true); // Retry once
        } catch (refreshError) {
          console.error('Refresh failed, logging out...');
        }
      }
      return null;
    }
  };

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      
      if (storedToken) {
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        
        // Try to fetch user details (with auto-refresh)
        const userData = await fetchUser();
        if (!userData) {
          // Failed even after refresh attempt, clear everything
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setToken(null);
          setRefreshToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Refetch user on window focus (tab refresh/navigation) - disabled to prevent aggressive refresh
  useEffect(() => {
    const handleFocus = async () => {
      if (token) {
        await fetchUser();
      }
    };

    // window.addEventListener('focus', handleFocus);
    // return () => window.removeEventListener('focus', handleFocus);
  }, [token]);

  // Set up axios defaults when token changes
=======
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('admin-user') || 'null'); } catch { return null; }
  });
  const loading = false;

>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
  useEffect(() => {
    if (token) api.defaults.headers.common.Authorization = 'Bearer ' + token;
    else delete api.defaults.headers.common.Authorization;
  }, [token]);

<<<<<<< HEAD
  const login = async (mobile, password) => {
    try {
      const response = await axios.post('/api/user/login', { mobile, password });
      const { accesstoken: newToken, refreshToken: newRefreshToken, user: userData } = response.data.data;

      // Store both tokens
      localStorage.setItem('accessToken', newToken);
      localStorage.setItem('refreshToken', newRefreshToken);
=======
  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      if (!newToken || !userData || userData.role !== 'admin') return { success: false, error: 'The server returned an invalid administrator session.' };
      api.defaults.headers.common.Authorization = 'Bearer ' + newToken;
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
      setToken(newToken);
      setRefreshToken(newRefreshToken);
      setUser(userData);
<<<<<<< HEAD
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

=======
      localStorage.setItem('token', newToken);
      localStorage.setItem('admin-user', JSON.stringify(userData));
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed. Check API configuration and try again.' };
    }
  };

<<<<<<< HEAD
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/user/register', userData);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed'
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
    // Dispatch event for api.js to handle gracefully
    window.dispatchEvent(new CustomEvent('auth:logout'));
=======
  const register = async () => ({ success: false, error: 'Public registration is disabled. Ask the site administrator to provision access.' });

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('admin-user');
    delete api.defaults.headers.common.Authorization;
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
  };

  const forgotPassword = async (email) => {
    try {
<<<<<<< HEAD
      const response = await axios.post('/api/user/forgot-password', { email });
      return {
        success: true,
        message: response.data.message
      };
=======
      const response = await api.post('/api/auth/forgot-password', { email });
      return { success: true, message: response.data.message };
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Password reset is not configured. Contact the site administrator.' };
    }
  };

<<<<<<< HEAD
  const value = {
    user,
    token,
    refreshToken,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    fetchUser,
    setUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'Admin' || user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
=======
  const value = { user, token, loading, login, register, logout, forgotPassword, isAuthenticated: Boolean(token && user), isAdmin: user?.role === 'admin' };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
};
