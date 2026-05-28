import { useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import useTasks from "../hooks/useTasks";
import type { Task, TaskPayload } from "../types";
import TaskFiltersComponent from "../components/TaskFilters";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const {
    tasks,
    priorities,
    states,
    loading,
    error,
    create,
    update,
    remove,
    filters,
    changeFilters,
    changePage,
  } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const pendientes = tasks?.data.filter((t) => t.state_id === 1) ?? [];
  const completadas = tasks?.data.filter((t) => t.state_id === 2) ?? [];

  const handleSubmit = async (payload: TaskPayload) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        await update(editingTask.id, payload);
      } else {
        await create(payload);
      }
      setShowForm(false);
      setEditingTask(null);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleToggleState = async (task: Task) => {
    await update(task.id, { state_id: task.state_id === 1 ? 2 : 1 });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onNewTask={() => setShowForm(true)} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading && (
          <p className="text-gray-500 text-sm mb-4">Cargando tareas...</p>
        )}
        <TaskFiltersComponent
          priorities={priorities}
          states={states}
          filters={filters}
          onChange={changeFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Pendientes ({pendientes.length})
            </h2>
            <div className="flex flex-col gap-3">
              {pendientes.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No hay tareas pendientes
                </p>
              ) : (
                pendientes.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    priorities={priorities}
                    states={states}
                    onEdit={handleEdit}
                    onDelete={remove}
                    onToggleState={handleToggleState}
                  />
                ))
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Completadas ({completadas.length})
            </h2>
            <div className="flex flex-col gap-3">
              {completadas.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No hay tareas completadas
                </p>
              ) : (
                completadas.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    priorities={priorities}
                    states={states}
                    onEdit={handleEdit}
                    onDelete={remove}
                    onToggleState={handleToggleState}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <Pagination
          page={filters.page ?? 1}
          pages={tasks?.pages ?? 1}
          total={tasks?.total ?? 0}
          onPageChange={changePage}
        />
      </main>

      {showForm && (
        <TaskForm
          priorities={priorities}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingTask}
          loading={formLoading}
        />
      )}
    </div>
  );
};

export default Dashboard;
