import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskSchema } from "../validations/task.schema";
import type { Task, Priority } from "../types";

interface TaskFormProps {
  priorities: Priority[];
  onSubmit: (payload: TaskSchema) => void;
  onCancel: () => void;
  initialData?: Task | null;
  loading?: boolean;
}

const TaskForm = ({
  priorities,
  onSubmit,
  onCancel,
  initialData,
  loading,
}: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority_id: 1,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        priority_id: initialData.priority_id,
      });
    }
  }, [initialData, reset]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {initialData ? "Editar tarea" : "Nueva tarea"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <input
              {...register("title")}
              type="text"
              placeholder="Título"
              className="border rounded-lg px-3 py-2 text-sm"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <textarea
              {...register("description")}
              placeholder="Descripción"
              className="border rounded-lg px-3 py-2 text-sm resize-none h-24"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <select
              {...register("priority_id", { valueAsNumber: true })}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              {priorities.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.level}
                </option>
              ))}
            </select>
            {errors.priority_id && (
              <p className="text-red-500 text-xs">
                {errors.priority_id.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading
                ? "Guardando..."
                : initialData
                  ? "Guardar cambios"
                  : "Crear tarea"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
