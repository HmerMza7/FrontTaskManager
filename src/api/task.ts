import api from "./axios";
import type {
  PaginatedTasks,
  Priority,
  StateTask,
  Task,
  TaskFilters,
  TaskPayload,
} from "../types";

export const getTasks = async (
  filters: TaskFilters = {},
): Promise<PaginatedTasks> => {
  const { data } = await api.get("/tasks/", { params: filters });
  return data;
};

export const createTask = async (payload: TaskPayload): Promise<Task> => {
  const { data } = await api.post("/tasks/", payload);
  return data;
};

export const updateTask = async (
  id: number,
  payload: Partial<TaskPayload>,
): Promise<Task> => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const getPriorities = async (): Promise<Priority[]> => {
  const { data } = await api.get("/tasks/priorities");
  return data;
};

export const getStates = async (): Promise<StateTask[]> => {
  const { data } = await api.get("/tasks/states");
  return data;
};
