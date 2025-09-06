// src/hooks/useAuth.js
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/auth/check`, { withCredentials: true });
      setIsAuthenticated(res.data?.authenticated === true);
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // return object so components can call refreshAuth()
  return { isAuthenticated, loading, refreshAuth: checkAuth };
}
