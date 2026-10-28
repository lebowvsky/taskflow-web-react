// src/pages/HomePage.tsx
import styles from "./HomePage.module.css"; // CSS Modules : équivalent de <style module>

export default function HomePage() {
  console.log("HomePage render"); // temporaire : pour observer StrictMode
  return (
    // <>…</> est un fragment : il regroupe sans ajouter d'élément au DOM (détaillé en 1.1)
    <>
      <header className={styles.header}>
        <p className={styles.brand}>TaskFlow</p>
      </header>
      <main className={styles.main}>
        <h1>Bienvenue sur TaskFlow</h1>
        <p>Gérez vos projets et vos tâches en équipe.</p>
      </main>
    </>
  );
}
