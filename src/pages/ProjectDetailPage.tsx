// src/pages/ProjectDetailPage.tsx
import { useState } from "react";
import Button from "../components/ui/Button.tsx";
import EmptyState from "../components/ui/EmptyState.tsx";
import PageLayout from "../components/ui/PageLayout.tsx";
import TaskList from "../components/TaskList.tsx";
import { STATUS_LABELS, TASK_STATUSES } from "../data/labels.ts";
import { tasks as allTasks } from "../data/tasks.ts";
import type { Project, Task, TaskStatus } from "../types/api.ts";
import styles from "./ProjectDetailPage.module.css";
import TaskCreateForm, { type TaskFormValues } from "../components/tasks/TaskCreateForm.tsx";

type StatusFilter = TaskStatus | "ALL";
type ProjectDetailPageProps = { project: Project };

// Fonction pure au niveau du module : aucune raison de la recréer à chaque rendu
function formatCount(count: number, singular: string, plural: string) {
  return `${count} ${count > 1 ? plural : singular}`;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  // Provisoire : le projet viendra de l'URL (useParams) en 3.1.
  // allTasks ne sert qu'à initialiser : ensuite, `tasks` est la seule source de vérité.
  const [tasks, setTasks] = useState<Task[]>(() => allTasks.filter((t) => t.projectId === project.id));
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [statusMessage, setStatusMessage] = useState("");

  // Tout le reste se dérive de ces deux états, à chaque rendu
  const visibleTasks = statusFilter === "ALL" ? tasks : tasks.filter((t) => t.status === statusFilter);
  const doneCount = tasks.filter((t) => t.status === "DONE").length;
  const summary = `${formatCount(tasks.length, "tâche", "tâches")}, dont ${formatCount(doneCount, "terminée", "terminées")}`;
  const visibleLabel = formatCount(visibleTasks.length, "tâche affichée", "tâches affichées");

  function handleToggleDone(taskId: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: t.status === "DONE" ? "TODO" : "DONE" } : t)),
    );
  }

  function handleCreateTask(values: TaskFormValues) {
    const task: Task = {
      id: crypto.randomUUID(),
      projectId: project.id,
      title: values.title,
      description: null,
      status: "TODO",
      priority: values.priority,
      dueDate: values.dueDate === "" ? null : values.dueDate,
    };
    setTasks((prev) => [task, ...prev]);
    // statusFilter vient de ce rendu : c'est le filtre que l'utilisateur voit
    const hiddenByFilter = statusFilter !== "ALL" && statusFilter !== task.status;
    setStatusMessage(
      hiddenByFilter
        ? `Tâche « ${task.title} » créée. Elle est masquée par le filtre « ${STATUS_LABELS[statusFilter]} ».`
        : `Tâche « ${task.title} » créée.`,
    );
  }

  // Retour anticipé APRÈS tous les hooks : règles des hooks respectées
  return (
    <PageLayout title={project.name}>
      <p className={styles.count}>{summary}</p>
      <TaskCreateForm onCreate={handleCreateTask} />
      <p role="status">{statusMessage}</p>

      {tasks.length === 0 ? (
        <EmptyState
          headingLevel={2}
          title="Ce projet n'a pas encore de tâche"
          description="Créez une première tâche avec le formulaire ci-dessus."
        />
      ) : (
        <>
          <div className={styles.filters} role="group" aria-label="Filtrer par statut">
            <Button aria-pressed={statusFilter === "ALL"} onClick={() => setStatusFilter("ALL")}>
              Toutes
            </Button>
            {TASK_STATUSES.map((status) => (
              <Button
                key={status}
                aria-pressed={statusFilter === status}
                onClick={() => setStatusFilter(status)}
              >
                {STATUS_LABELS[status]}
              </Button>
            ))}
          </div>
          {/* Région live présente dès le montage : seuls ses CHANGEMENTS sont annoncés */}
          <p role="status" className={styles.count}>
            {visibleLabel}
          </p>
          {visibleTasks.length > 0 ? (
            <TaskList tasks={visibleTasks} onToggleDone={handleToggleDone} />
          ) : (
            <EmptyState
              headingLevel={2}
              title="Aucune tâche pour ce filtre"
              description={
                statusFilter === "ALL"
                  ? undefined
                  : `Aucune tâche au statut « ${STATUS_LABELS[statusFilter]} ».`
              }
              actions={<Button onClick={() => setStatusFilter("ALL")}>Afficher toutes les tâches</Button>}
            />
          )}
        </>
      )}
    </PageLayout>
  );
}
