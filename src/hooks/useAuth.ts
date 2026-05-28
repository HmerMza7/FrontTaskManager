import { useState } from "react";
import {
  login as loginService,
  register as registerService,
} from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useAuthForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { access_token } = await loginService({ username, password });
      login(access_token);
      navigate("/dashboard");
    } catch {
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    username: string,
    name: string,
    password: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { access_token } = await registerService({
        username,
        name,
        password,
      });
      login(access_token);
      navigate("/dashboard");
    } catch {
      setError("Error al registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, loading, error };
};

export default useAuthForm;
