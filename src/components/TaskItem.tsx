// src/components/TaskItem.tsx
import { PRIORITY_LABELS, STATUS_LABELS } from "../data/labels.ts";
import type { Task } from "../types/api.ts";
import styles from "./TaskItem.module.css";

// Créé une seule fois au chargement du module, pas à chaque rendu (non exporté : only-export-components)
const dueDateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const { title, description, status, priority, dueDate } = task;
  // Classes composées en une chaîne : styles.high est le nom réel généré par le CSS Module
  const priorityClassName = `${styles.badge} ${priority === "HIGH" ? styles.high : ""}`;

  return (
    <article className={styles.task}>
      {/* Titre d'abord : c'est lui qui identifie la tâche dans l'ordre de lecture */}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.tags}>
        <span className={priorityClassName}>Priorité : {PRIORITY_LABELS[priority]}</span>
        <span className={styles.badge}>{STATUS_LABELS[status]}</span>
      </p>
      {/* L'élément entier est conditionné : pas de <p> vide quand description vaut null */}
      {description && <p className={styles.text}>{description}</p>}
      {dueDate && (
        <p className={styles.text}>
          Échéance : <time dateTime={dueDate}>{dueDateFormatter.format(new Date(dueDate))}</time>
        </p>
      )}
    </article>
  );
}
