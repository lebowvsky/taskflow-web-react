import PageLayout from "../components/ui/PageLayout.tsx";
import TaskList from "../components/TaskList.tsx";
import { projects } from "../data/projects.ts";
import { tasks } from "../data/tasks.ts";
import styles from "./ProjectDetailPage.module.css";
import EmptyState from "../components/ui/EmptyState.tsx";
import Button from "../components/ui/Button.tsx";

export default function ProjectDetailPage() {
  // Provisoire : le projet viendra de l'URL (useParams) en 3.1
  const project = projects[0];
  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  const count = projectTasks.length;
  // Libellé calculé avant le return : le JSX reste lisible
  const countLabel = count === 0 ? "Aucune tâche" : `${count} tâche${count > 1 ? "s" : ""}`;
  function handleCreateTask() {
    console.log("Création de d'une tâche demandée");
  }

  return (
    <PageLayout title={project.name}>
      {count === 0 ? (
        <EmptyState
          title="Ce projet n'a pas encore de tâche"
          description="Créez une première tâche pour suivre l'avancement du projet."
          actions={<Button onClick={handleCreateTask}>Créer une tâche</Button>}
        />
      ) : (
        <>
          <p className={styles.count}>{countLabel}</p>
          <TaskList tasks={projectTasks} />
        </>
      )}
    </PageLayout>
  );
}
