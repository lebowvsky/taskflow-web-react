// src/data/labels.ts
import type { ProjectRole, TaskStatus, TaskPriority } from "../types/api.ts";

export const ROLE_LABELS: Record<ProjectRole, string> = {
  OWNER: "Propriétaire",
  EDITOR: "Éditeur",
  VIEWER: "Lecteur",
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "À faire",
  IN_PROGRESS: "En cours",
  DONE: "Terminées",
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  LOW: "Basse",
  MEDIUM: "Moyenne",
  HIGH: "Haute",
};

// Ordre d'affichage explicite (Object.keys ne garantit rien de lisible pour un humain)
export const TASK_STATUSES: readonly TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

// src/data/labels.ts (ajout)
export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const satisfies readonly TaskPriority[];

// Garde de type : remplace le cast par une vérification réelle
export function isTaskPriority(value: string): value is TaskPriority {
  return (TASK_PRIORITIES as readonly string[]).includes(value);
}
