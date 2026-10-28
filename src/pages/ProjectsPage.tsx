// src/pages/ProjectsPage.tsx
import ProjectList from "../components/ProjectList.tsx";
import { projects } from "../data/projects.ts";
import styles from "./ProjectsPage.module.css";

export default function ProjectsPage() {
  return (
    <main className={styles.main}>
      <h1>Projets</h1>
      <ProjectList projects={projects} />
    </main>
  );
}
