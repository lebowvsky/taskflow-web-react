// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // point d'entrée navigateur de react-dom
import "./index.css";
import App from "./App.tsx";

const container = document.getElementById("root");
if (!container) {
  // échec explicite plutôt que le `!` du gabarit, qui masquerait un index.html cassé
  throw new Error("Root element #root not found in index.html");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
