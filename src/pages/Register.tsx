import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchema,
} from "../validations/auth.schema";
import useAuthForm from "../hooks/useAuth";

const Register = () => {
  const { handleRegister, loading, error } = useAuthForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    handleRegister(data.username, data.name, data.password);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Crear cuenta</h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <input
            {...register("name")}
            type="text"
            placeholder="Nombre completo"
            className="border rounded-lg px-3 py-2 text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...register("username")}
            type="text"
            placeholder="Usuario"
            className="border rounded-lg px-3 py-2 text-sm"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...register("password")}
            type="password"
            placeholder="Contraseña"
            className="border rounded-lg px-3 py-2 text-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirmar contraseña"
            className="border rounded-lg px-3 py-2 text-sm"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Registrarse"}
        </button>
      </form>

      <p className="text-sm text-center">
        ¿Ya tienes cuenta?{" "}
        <Link to="/" className="text-blue-600 underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default Register;
