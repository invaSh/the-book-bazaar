import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token) => {
    setAccessToken(token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            method: 'POST',
            credentials: 'include',
          }
        );
        if (!res.ok) {
          console.log('Refresh failed!');
          return;
        }
        const data = await res.json();
        const token = data.accessToken.result;
        setAccessToken(token);
        setUser(jwtDecode(token));
        console.log('Refresh successful!');
      } catch (e) {
        console.error('Silent refresh error: ', e);
      }
    };

    tryRefresh();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
