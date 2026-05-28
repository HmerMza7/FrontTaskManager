import { useState, useEffect } from "react";
import type { TaskFormProps } from "../types";

const TaskForm = ({
  priorities,
  onSubmit,
  onCancel,
  initialData,
  loading,
}: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priorityId, setPriorityId] = useState<number>(1);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPriorityId(initialData.priority_id);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, priority_id: priorityId });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {initialData ? "Editar tarea" : "Nueva tarea"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
            required
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm resize-none h-24"
            required
          />
          <select
            value={priorityId}
            onChange={(e) => setPriorityId(Number(e.target.value))}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            {priorities.map((p) => (
              <option key={p.id} value={p.id}>
                {p.level}
              </option>
            ))}
          </select>

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
