// src/pages/NotFoundPage.tsx
export default function NotFoundPage() {
  return (
    <main>
      <h1>Page introuvable</h1>
      <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
      {/* <a> natif provisoire : le composant <Link> de React Router le remplacera en 3.1 */}
      <a href="/">Retour à l'accueil</a>
    </main>
  );
}
