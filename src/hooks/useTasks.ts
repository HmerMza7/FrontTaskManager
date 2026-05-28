import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getPriorities,
  getStates,
} from "../api/task";
import type {
  PaginatedTasks,
  TaskFilters,
  TaskPayload,
  Priority,
  StateTask,
} from "../types";
import { toast } from "sonner";

const useTasks = () => {
  const [tasks, setTasks] = useState<PaginatedTasks | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [states, setStates] = useState<StateTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    page: 1,
    limit: 10,
  });

  const fetchTasks = async (newFilters?: TaskFilters) => {
    setLoading(true);
    setError(null);
    try {
      const activeFilters = newFilters ?? filters;
      const data = await getTasks(activeFilters);
      setTasks(data);
    } catch {
      setError("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalogs = async () => {
    try {
      const [p, s] = await Promise.all([getPriorities(), getStates()]);
      setPriorities(p);
      setStates(s);
    } catch {
      setError("Error al cargar los catálogos");
    }
  };

  const create = async (payload: TaskPayload) => {
    try {
      await createTask(payload);
      await fetchTasks();
      toast.success("Tarea creada exitosamente");
    } catch {
      toast.error("Error al crear la tarea");
    }
  };

  const update = async (id: number, payload: Partial<TaskPayload>) => {
    try {
      await updateTask(id, payload);
      await fetchTasks();
      toast.success("Tarea actualizada");
    } catch {
      toast.error("Error al actualizar la tarea");
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteTask(id);
      await fetchTasks();
      toast.success("Tarea eliminada");
    } catch {
      toast.error("Error al eliminar la tarea");
    }
  };

  const changeFilters = (newFilters: TaskFilters) => {
    const updated = { ...filters, ...newFilters, page: 1 };
    setFilters(updated);
    fetchTasks(updated);
  };

  const changePage = (page: number) => {
    const updated = { ...filters, page };
    setFilters(updated);
    fetchTasks(updated);
  };

  useEffect(() => {
    fetchCatalogs();
    fetchTasks();
  }, []);

  return {
    tasks,
    priorities,
    states,
    loading,
    error,
    filters,
    fetchTasks,
    create,
    update,
    remove,
    changeFilters,
    changePage,
  };
};

export default useTasks;
