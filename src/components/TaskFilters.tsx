import type { TaskFiltersProps } from "../types";

const TaskFiltersComponent = ({
  priorities,
  states,
  filters,
  onChange,
}: TaskFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <select
        value={filters.state_id ?? ""}
        onChange={(e) =>
          onChange({
            state_id: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="border rounded-lg px-3 py-2 text-sm bg-white"
      >
        <option value="">Todos los estados</option>
        {states.map((s) => (
          <option key={s.id} value={s.id}>
            {s.state}
          </option>
        ))}
      </select>

      <select
        value={filters.priority_id ?? ""}
        onChange={(e) =>
          onChange({
            priority_id: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="border rounded-lg px-3 py-2 text-sm bg-white"
      >
        <option value="">Todas las prioridades</option>
        {priorities.map((p) => (
          <option key={p.id} value={p.id}>
            {p.level}
          </option>
        ))}
      </select>

      {(filters.state_id || filters.priority_id) && (
        <button
          onClick={() =>
            onChange({ state_id: undefined, priority_id: undefined })
          }
          className="text-sm text-red-500 hover:text-red-700 transition"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default TaskFiltersComponent;
