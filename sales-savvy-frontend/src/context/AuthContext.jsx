import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    console.log("AuthContext: Checking token...");
    if (token && token.includes('.')) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1]));
        console.log("AuthContext: User decoded", userData);
        setUser(userData);
      } catch (err) {
        console.error("AuthContext: Failed to decode token", err);
        localStorage.removeItem('token');
        setToken(null);
      }
    } else if (token) {
       console.warn("AuthContext: Invalid token format", token);
       localStorage.removeItem('token');
       setToken(null);
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
