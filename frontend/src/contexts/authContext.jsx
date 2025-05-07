import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { notify } from '../components/Toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token) => {
    setAccessToken(token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        notify.error('Error signing out');
        return;
      }
      notify.success('Sign out successful!')
    } catch (error) {
      console.error('Logout request failed:', error);
    }

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
