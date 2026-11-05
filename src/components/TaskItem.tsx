// src/components/TaskItem.tsx
import { PRIORITY_LABELS, STATUS_LABELS } from "../data/labels.ts";
import type { Task } from "../types/api.ts";
import styles from "./TaskItem.module.css";
import VisuallyHidden from "./ui/VisuallyHidden.tsx";

const dueDateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

type TaskItemProps = {
  task: Task;
  onToggleDone: (taskId: Task["id"]) => void;
};

export default function TaskItem({ task, onToggleDone }: TaskItemProps) {
  const { id, title, description, status, priority, dueDate } = task;
  const priorityClassName = `${styles.badge} ${priority === "HIGH" ? styles.high : ""}`;

  const checkboxId = `task-done-${id}`;
  const isDone = status === "DONE";

  return (
    <article className={styles.task}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.done}>
        <input id={checkboxId} type="checkbox" checked={isDone} onChange={() => onToggleDone(id)} />
        {/* Nom accessible : « Terminée : <titre> », unique dans la liste des champs */}
        <label htmlFor={checkboxId}>
          Terminée<VisuallyHidden> : {title}</VisuallyHidden>
        </label>
      </div>
      <p className={styles.tags}>
        <span className={priorityClassName}>Priorité : {PRIORITY_LABELS[priority]}</span>
        <span className={styles.badge}>{STATUS_LABELS[status]}</span>
      </p>
      {description && <p className={styles.text}>{description}</p>}
      {dueDate && (
        <p className={styles.text}>
          Échéance : <time dateTime={dueDate}>{dueDateFormatter.format(new Date(dueDate))}</time>
        </p>
      )}
    </article>
  );
}
