// authContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { setFetchToken } from '../lib/fetchWrapper';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token) => {
    setAccessToken(token);
    setFetchToken(token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = async () => {
    const loadingToast = toast.loading('Signing you out..');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        toast.error('Error signing out', { id: loadingToast });
        return;
      }
      toast.success('Sign out successful!', { id: loadingToast });
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          }
        );

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();
        const token = data.accessToken.result;
        setAccessToken(token);
        setFetchToken(token);
        setUser(jwtDecode(token));
        console.log('Refresh successful!');
      } catch (e) {
        console.error('Silent refresh error: ', e);
      } finally {
        setLoading(false); 
      }
    };

    tryRefresh();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
