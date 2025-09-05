import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/check`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200 && res.data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        // 👇 Handle 401 or connection issues gracefully
        console.warn("auth check failed:", err?.response?.status);
        setIsAuthenticated(false);
      });
  }, []);

  return isAuthenticated;
}