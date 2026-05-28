export interface User {
  id: number;
  username: string;
  name: string;
}

export interface Priority {
  id: number;
  level: string;
}

export interface StateTask {
  id: number;
  state: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  state_id: number;
  priority_id: number;
  creation_date: string;
  user_id: number;
}

export interface PaginatedTasks {
  data: Task[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
export interface TaskFilters {
  page?: number;
  limit?: number;
  state_id?: number;
  priority_id?: number;
}

export interface TaskPayload {
  title: string;
  description: string;
  priority_id: number;
  state_id?: number;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  name: string;
  password: string;
}

export interface TaskFormProps {
  priorities: Priority[];
  onSubmit: (payload: TaskPayload) => void;
  onCancel: () => void;
  initialData?: Task | null;
  loading?: boolean;
}

export interface TaskCardProps {
  task: Task;
  priorities: Priority[];
  states: StateTask[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleState: (task: Task) => void;
}

export interface TaskFiltersProps {
  priorities: Priority[];
  states: StateTask[];
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}

export interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  onPageChange: (page: number) => void;
}

interface TaskFormProps {
  priorities: Priority[];
  onSubmit: (payload: TaskSchema) => void;
  onCancel: () => void;
  initialData?: Task | null;
  loading?: boolean;
}
