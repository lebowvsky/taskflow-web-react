export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type ProjectRole = "OWNER" | "EDITOR" | "VIEWER";

export type Project = {
  id: string;
  name: string;
  description: string | null;
  role: ProjectRole;
  taskCounts: Record<TaskStatus, number>;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
};
