import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE = 'https://healthai-backend-hh9u.onrender.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('ai_health_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      setUser(response.data);
      localStorage.setItem('ai_health_user', JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/signup`, { name, email, password });
      setUser(response.data);
      localStorage.setItem('ai_health_user', JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/google-login`, { credential });
      setUser(response.data);
      localStorage.setItem('ai_health_user', JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Google Sign-In failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai_health_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, googleLogin, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
