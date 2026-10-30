// src/components/ui/PageLayout.tsx
import type { ReactNode } from "react";
import styles from "./PageLayout.module.css";

type PageLayoutProps = {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function PageLayout({ title, actions, children }: PageLayoutProps) {
  return (
    <>
      {/* En 3.1, cet en-tête de site ira dans le layout racine du routeur */}
      <header className={styles.siteHeader}>
        <p className={styles.brand}>TaskFlow</p>
      </header>
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{title}</h1>
          {actions != null && <div className={styles.actions}>{actions}</div>}
        </div>
        {children}
      </main>
    </>
  );
}
