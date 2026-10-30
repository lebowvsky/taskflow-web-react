// src/components/ui/Badge.tsx
import type { ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeTone = "neutral" | "info" | "success" | "warning";

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode; // ReactNode, pas string : "Terminé" comme <abbr>…</abbr> sont acceptés
};

export default function Badge({ tone = "neutral", children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
