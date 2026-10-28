// src/components/ProjectList.tsx
import type { Project } from "../types/api.ts";
import ProjectCard from "./ProjectCard.tsx";
import styles from "./ProjectList.module.css";

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListProps) {
  // Retour anticipé : l'équivalent d'un v-if / v-else sur tout le composant
  if (projects.length === 0) {
    return <p>Aucun projet pour le moment.</p>;
  }

  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        // La key va sur l'élément retourné par map : le <li>, pas l'<article> de ProjectCard
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
