export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: "low" | "medium" | "high";
};

export type TaskInput = Pick<Task, "title" | "description" | "priority">;

const API_URL = "http://localhost:4000/api/tasks";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getTasks() {
  return request<Task[]>("");
}

export function createTask(input: TaskInput) {
  return request<Task>("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function updateTask(id: number, input: TaskInput) {
  return request<Task>(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function toggleTask(id: number) {
  return request<Task>(`/${id}/toggle`, {
    method: "PATCH",
  });
}

export function deleteTask(id: number) {
  return request<void>(`/${id}`, {
    method: "DELETE",
  });
}
