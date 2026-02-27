import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../api";
import { setToken, setUser } from "../../../core";
import { SYSTEM_ROLE } from "../../../constants";

const ALLOWED_ROLES = [SYSTEM_ROLE.SUPPER_ADMIN, SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF];

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginAPI(credentials);

      const userRoles = response.user?.roles || [];
      const hasPermission = userRoles.some(role => ALLOWED_ROLES.includes(role));

      if (!hasPermission) {
        throw new Error("You do not have permission to access the management portal.");
      }

      setToken(response.accessToken);
      setUser(response.user);

      navigate("/dashboard", { replace: true });
      
      return response;
    } catch (err) {
      const errorMessage = err?.error?.message || err?.message || "An unexpected error occurred.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return { login, isLoading, error };
};