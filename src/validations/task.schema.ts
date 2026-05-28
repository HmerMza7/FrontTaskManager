import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "El título es requerido")
    .max(255, "Máximo 255 caracteres"),

  description: z
    .string()
    .trim()
    .min(1, "La descripción es requerida")
    .max(1000, "Máximo 1000 caracteres"),
  priority_id: z
    .number()
    .min(1, "La prioridad es requerida")
    .max(3, "Máximo 3"),
});

export type TaskSchema = z.infer<typeof taskSchema>;
