import { useState, useEffect } from "react";

import type {
  PaginatedTasks,
  TaskFilters,
  TaskPayload,
  Priority,
  StateTask,
} from "../types";
import {
  createTask,
  deleteTask,
  getPriorities,
  getStates,
  getTasks,
  updateTask,
} from "../api/task";

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
    await createTask(payload);
    await fetchTasks();
  };

  const update = async (id: number, payload: Partial<TaskPayload>) => {
    await updateTask(id, payload);
    await fetchTasks();
  };

  const remove = async (id: number) => {
    await deleteTask(id);
    await fetchTasks();
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
