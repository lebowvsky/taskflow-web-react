// src/components/TaskList.tsx
import type { Task } from "../types/api.ts";
import TaskItem from "./TaskItem.tsx";
import styles from "./TaskList.module.css";

type TaskListProps = {
  tasks: Task[];
  onToggleDone: (taskId: string) => void;
};

export default function TaskList({ tasks, onToggleDone }: TaskListProps) {
  // Pas d'état vide ici : la page le gère, elle seule connaît le filtre actif
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id}>
          {/* Relais direct : on passe la fonction, TaskItem fournira son id */}
          <TaskItem task={task} onToggleDone={onToggleDone} />
        </li>
      ))}
    </ul>
  );
}
