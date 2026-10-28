import type { Project } from "../types/api.ts";

// Données en dur : remplacées par l'API simulée (MSW) en 3.2
export const projects: Project[] = [
  {
    id: "p1",
    name: "Refonte du site vitrine",
    description: "Nouvelle charte graphique et migration du contenu.",
    role: "OWNER",
    taskCounts: { TODO: 4, IN_PROGRESS: 2, DONE: 7 },
  },
  {
    id: "p2",
    name: "Application mobile",
    description: null, // pas de description : aucun paragraphe ne doit être rendu
    role: "EDITOR",
    taskCounts: { TODO: 1, IN_PROGRESS: 0, DONE: 0 },
  },
  {
    id: "p3",
    name: "Audit RGAA",
    description: "Audit de conformité et plan d'action.",
    role: "VIEWER",
    taskCounts: { TODO: 0, IN_PROGRESS: 3, DONE: 12 },
  },
  {
    id: "p4",
    name: "Migration de l'API",
    description: "Passage à la version 2 du contrat.",
    role: "OWNER",
    taskCounts: { TODO: 0, IN_PROGRESS: 0, DONE: 0 }, // cas du piège du 0
  },
];
