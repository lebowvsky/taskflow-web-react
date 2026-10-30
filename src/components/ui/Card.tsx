// src/components/ui/Card.tsx
import type { ReactNode } from "react";
import styles from "./Card.module.css";

type HeadingLevel = 2 | 3 | 4;

type CardProps = {
  title: ReactNode;
  headingLevel?: HeadingLevel;
  footer?: ReactNode; // slot nommé
  children?: ReactNode; // slot par défaut, facultatif
};

export default function Card({ title, headingLevel = 3, footer, children }: CardProps) {
  // Type "h2" | "h3" | "h4". Majuscule obligatoire : en JSX, une minuscule serait la balise <heading>
  const Heading = `h${headingLevel}` as const;

  return (
    <article className={styles.card}>
      <Heading className={styles.title}>{title}</Heading>
      {children}
      {footer != null && <footer className={styles.footer}>{footer}</footer>}
    </article>
  );
}
