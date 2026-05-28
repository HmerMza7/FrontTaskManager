import type { TaskCardProps } from "../types";

const TaskCard = ({
  task,
  priorities,
  states,
  onEdit,
  onDelete,
  onToggleState,
}: TaskCardProps) => {
  const isCompleted = task.state_id === 2;
  const priority = priorities.find((p) => p.id === task.priority_id);
  const state = states.find((s) => s.id === task.state_id);

  const priorityColors: Record<string, string> = {
    alta: "bg-red-100 text-red-700",
    media: "bg-yellow-100 text-yellow-700",
    baja: "bg-green-100 text-green-700",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 ${isCompleted ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`font-semibold text-gray-800 ${isCompleted ? "line-through" : ""}`}
        >
          {task.title}
        </h3>
        {priority && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[priority.level] ?? "bg-gray-100 text-gray-600"}`}
          >
            {priority.level}
          </span>
        )}
      </div>

      <p
        className={`text-sm text-gray-500 ${isCompleted ? "line-through" : ""}`}
      >
        {task.description}
      </p>

      <p className="text-xs text-gray-400">
        {new Date(task.creation_date).toLocaleDateString()}
      </p>

      <div className="flex gap-2 mt-1">
        <button
          onClick={() => onToggleState(task)}
          className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
        >
          {isCompleted ? "Marcar pendiente" : "Marcar completada"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="text-xs px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
