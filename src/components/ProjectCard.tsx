// src/components/ProjectCard.tsx
import type { Project, ProjectRole } from "../types/api.ts";
import { ROLE_LABELS } from "../data/labels.ts";
import Card from "./ui/Card.tsx";
import Badge, { type BadgeTone } from "./ui/Badge.tsx";
import Button from "./ui/Button.tsx";

// Constante de module : créée une fois, pas à chaque rendu (rappel 1.1)
const ROLE_TONES: Record<ProjectRole, BadgeTone> = {
  OWNER: "info",
  EDITOR: "success",
  VIEWER: "neutral",
};

type ProjectCardProps = {
  project: Project;
  onSelect: (projectId: Project["id"]) => void; // suit le type de l'id, quel qu'il soit
};

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <Card
      title={project.name}
      footer={
        <Button
          variant="secondary"
          onClick={() => onSelect(project.id)} // une fonction, pas un appel
          // relayé par ...rest ; commence par le texte visible (critère RGAA du nom accessible)
          aria-label={`Ouvrir le projet ${project.name}`}
        >
          Ouvrir
        </Button>
      }
    >
      <Badge tone={ROLE_TONES[project.role]}>{ROLE_LABELS[project.role]}</Badge>
      {project.description && <p>{project.description}</p>}
    </Card>
  );
}
