// src/components/ProjectCard.tsx
import { ROLE_LABELS, STATUS_LABELS, TASK_STATUSES } from "../data/labels.ts";
import type { Project } from "../types/api.ts";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  // Calculé pendant le rendu : une simple variable dérivée des props (le « computed » de React, détaillé en 1.6)
  const total = TASK_STATUSES.reduce((sum, status) => sum + project.taskCounts[status], 0);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{project.name}</h2>
        {/* className n'accepte qu'une chaîne : on compose les deux classes à la main */}
        <span className={`${styles.role} ${styles[project.role]}`}>{ROLE_LABELS[project.role]}</span>
      </header>

      {/* && avec une chaîne ou null à gauche : sans risque, null n'affiche rien */}
      {project.description && <p className={styles.description}>{project.description}</p>}

      {/* Ternaire : deux branches. Surtout pas `total && …`, qui afficherait « 0 » */}
      {total > 0 ? (
        <dl className={styles.counts}>
          {TASK_STATUSES.map((status) => (
            // Le <div> regroupe dt/dd (HTML valide dans un dl) et porte la key
            <div key={status}>
              <dt>{STATUS_LABELS[status]}</dt>
              <dd>{project.taskCounts[status]}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className={styles.empty}>Aucune tâche</p>
      )}
    </article>
  );
}
