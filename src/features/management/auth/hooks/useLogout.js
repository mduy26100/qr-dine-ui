import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../api";
import { useAuth } from "../../../../app/providers";
import { useMutation } from "../../../../infrastructure";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout: contextLogout } = useAuth();

  const handleLogout = useCallback(async () => {
    await logoutAPI();
    return true;
  }, []);

  const {
    mutate: logout,
    isLoading,
    error,
  } = useMutation(handleLogout, {
    onSuccess: () => {
      contextLogout();
      navigate("/management/login", { replace: true });
    },
  });

  return {
    logout,
    isLoading,
    error,
  };
};
