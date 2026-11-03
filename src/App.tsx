// src/App.tsx
import { projects } from "./data/projects";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectsPage from "./pages/ProjectsPage";

export default function App() {
  // Une seule page affichée à la fois en attendant React Router (3.1)
  return <ProjectDetailPage project={projects[0]} />;
}
