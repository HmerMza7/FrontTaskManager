import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "El usuario es requerido"),
  password: z.string().min(5, "La contraseña debe tener mínimo 5 caracteres"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    username: z.string().min(3, "El usuario debe tener mínimo 3 caracteres"),
    password: z.string().min(5, "La contraseña debe tener mínimo 5 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
