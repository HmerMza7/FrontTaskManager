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
