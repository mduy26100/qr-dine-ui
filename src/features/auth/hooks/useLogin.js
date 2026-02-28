import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../api";
import { SYSTEM_ROLE } from "../../../constants";
import { useAuth } from "../../../contexts";
import { useMutation } from "../../../core";

const ALLOWED_ROLES = [SYSTEM_ROLE.SUPPER_ADMIN, SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF];

export const useLogin = () => {
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();

  const handleLogin = useCallback(async (credentials) => {
    const response = await loginAPI(credentials);

    const userRoles = response.user?.roles || [];
    const hasPermission = userRoles.some(role => ALLOWED_ROLES.includes(role));

    if (!hasPermission) {
      throw new Error("You do not have permission to access the management portal.");
    }

    return response;
  }, []);

  const { mutate: login, isLoading, error } = useMutation(handleLogin, {
    onSuccess: (response) => {
      contextLogin(response.accessToken, response.user);

      const userRoles = response.user?.roles || [];

      if (userRoles.includes(SYSTEM_ROLE.SUPPER_ADMIN) || userRoles.includes(SYSTEM_ROLE.MERCHANT)) {
        navigate("/dashboard", { replace: true });
      } else if (userRoles.includes(SYSTEM_ROLE.STAFF)) {
        navigate("/tables", { replace: true });
      }
    }
  });

  return { login, isLoading, error };
};