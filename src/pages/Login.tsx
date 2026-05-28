import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthForm from "../hooks/useAuth";

const Login = () => {
  const { handleLogin, loading, error } = useAuthForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>

      <p className="text-sm text-center">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default Login;
