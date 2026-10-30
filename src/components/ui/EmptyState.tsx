// src/components/ui/EmptyState.tsx
import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

type HeadingLevel = 2 | 3 | 4; // même type que Card : à mutualiser (voir plus bas)

type EmptyStateProps = {
  title: string; // obligatoire, sans défaut : le contexte décide toujours
  headingLevel?: HeadingLevel;
  description?: ReactNode; // texte ou contenu en ligne (<strong>, <a>…)
  actions?: ReactNode; // slot : le composant ignore ce qu'on y place
};

export default function EmptyState({ title, headingLevel = 2, description, actions }: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={styles.emptyState}>
      <Heading className={styles.title}>{title}</Heading>
      {/* <p> : la description doit rester du contenu en ligne (pas de <ul> ni de <p> imbriqué) */}
      {description != null && <p className={styles.description}>{description}</p>}
      {actions != null && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
