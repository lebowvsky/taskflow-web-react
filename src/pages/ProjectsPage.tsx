import PageLayout from "../components/ui/PageLayout.tsx";
import ProjectList from "../components/ProjectList.tsx";
import { projects } from "../data/projects.ts";
import type { Project } from "../types/api.ts";
import Button from "../components/ui/Button.tsx";

export default function ProjectsPage() {
  // Provisoire : l'état arrive en 1.3, la navigation en 3.1
  function handleSelectProject(projectId: Project["id"]) {
    console.log("Projet sélectionné :", projectId);
  }
  function handleCreateProject() {
    console.log("Création de projet demandée");
  }

  return (
    <PageLayout title="Projets" actions={<Button onClick={handleCreateProject}>Nouveau projet</Button>}>
      <ProjectList projects={projects} onSelectProject={handleSelectProject} />
    </PageLayout>
  );
}
