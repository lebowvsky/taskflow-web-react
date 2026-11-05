import type { ReactNode } from "react";
import styles from "./VisuallyHidden.module.css"; // y déplacer la règle .srOnly, renommée .visuallyHidden

export default function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className={styles.visuallyHidden}>{children}</span>;
}
