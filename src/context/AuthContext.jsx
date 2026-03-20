import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être dans AuthProvider');
  return ctx;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('se_token');
    const storedUser = localStorage.getItem('se_user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`; //add this header to all requests
    }
    setLoading(false);
  }, []);

  // login
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('se_token', data.token);
    localStorage.setItem('se_user',  JSON.stringify(data.user));
    setUser(data.user);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return data.user;
  };

  // REGISTER
  const register = async (formData) => {
    const { data } = await api.post('/auth/register', formData);
    localStorage.setItem('se_token', data.token);
    localStorage.setItem('se_user',  JSON.stringify(data.user));
    setUser(data.user);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return data.user;
  };

  // logout
  const logout = () => {
    localStorage.removeItem('se_token');
    localStorage.removeItem('se_user');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('se_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
       isAuthenticated: !!user,
        isAdmin: user?.role === 'admin', login, register, logout, updateUser,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}