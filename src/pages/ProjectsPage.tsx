import { useState } from "react";
import PageLayout from "../components/ui/PageLayout.tsx";
import ProjectList from "../components/ProjectList.tsx";
import { projects as initialProjects } from "../data/projects.ts";
import type { Project } from "../types/api.ts";
import ProjectCreateForm, { type ProjectFormValues } from "../components/projects/ProjectCreateForm.tsx";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [statusMessage, setStatusMessage] = useState("");

  function handleSelectProject(projectId: Project["id"]) {
    console.log("Projet sélectionné :", projectId);
  }

  function handleCreateProject(values: ProjectFormValues) {
    const project: Project = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description === "" ? null : values.description, // à adapter
      role: "OWNER", // le créateur est propriétaire (règle de l'API)
      taskCounts: { TODO: 0, IN_PROGRESS: 0, DONE: 0 }, // à adapter
    };
    setProjects((prev) => [project, ...prev]);
    setStatusMessage(`Projet « ${project.name} » créé.`);
  }

  return (
    <PageLayout title="Projets">
      <ProjectCreateForm onCreate={handleCreateProject} />
      {/* Région présente dès le premier rendu : seul son contenu change */}
      <p role="status">{statusMessage}</p>
      <ProjectList projects={projects} onSelectProject={handleSelectProject} />
    </PageLayout>
  );
}
