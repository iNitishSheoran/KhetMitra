import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check authentication status
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

  // Fetch user info
  const refreshUser = useCallback(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
    setUser(res.data);
  } catch {
    setUser(null);
  }
}, []);

  // Run on mount and when auth state changes
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) refreshUser();
    else setUser(null);
  }, [isAuthenticated, refreshUser]);

  return { isAuthenticated, loading, user, refreshUser, refreshAuth: checkAuth };
}
