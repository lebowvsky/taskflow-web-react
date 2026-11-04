// src/components/projects/ProjectCreateForm.tsx
import { useId, useState, type SubmitEvent } from "react";
import { flushSync } from "react-dom";
import Button from "../ui/Button.tsx";
import styles from "./ProjectCreateForm.module.css";

export type ProjectFormValues = {
  name: string;
  description: string;
};

type ProjectFormErrors = Partial<Record<keyof ProjectFormValues, string>>;

const INITIAL_VALUES: ProjectFormValues = { name: "", description: "" };
const FIELD_ORDER = ["name", "description"] as const; // ordre visuel, pour choisir le champ à focaliser
const NAME_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 500;

// Fonction pure au niveau du module : ne dépend que de ses arguments
function validate(values: ProjectFormValues): ProjectFormErrors {
  const errors: ProjectFormErrors = {};
  const name = values.name.trim();
  if (name === "") {
    errors.name = "Saisissez le nom du projet.";
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `Le nom doit faire au plus ${NAME_MAX_LENGTH} caractères.`;
  }
  if (values.description.trim().length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `La description doit faire au plus ${DESCRIPTION_MAX_LENGTH} caractères.`;
  }
  return errors;
}

// Assemble les id pour aria-describedby ; undefined plutôt qu'un attribut vide
function describedBy(...ids: (string | false)[]): string | undefined {
  const value = ids.filter(Boolean).join(" ");
  return value === "" ? undefined : value;
}

type ProjectCreateFormProps = {
  onCreate: (values: ProjectFormValues) => void;
};

export default function ProjectCreateForm({ onCreate }: ProjectCreateFormProps) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const id = useId();

  // Dérivé pendant le rendu : jamais stocké, donc jamais désynchronisé
  const errors = validate(values);
  const shownErrors: ProjectFormErrors = hasSubmitted ? errors : {};

  const titleId = `${id}-title`;
  const nameId = `${id}-name`;
  const nameHintId = `${id}-name-hint`;
  const nameErrorId = `${id}-name-error`;
  const descriptionId = `${id}-description`;
  const descriptionErrorId = `${id}-description-error`;

  function updateField<K extends keyof ProjectFormValues>(field: K, value: ProjectFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget; // à capturer tout de suite (voir erreurs fréquentes)
    // `errors` vient de ce rendu : ce sont exactement les valeurs que l'utilisateur voit
    const firstInvalidField = FIELD_ORDER.find((field) => errors[field] !== undefined);

    if (firstInvalidField !== undefined) {
      // Commit synchrone : messages et aria-invalid sont dans le DOM avant le focus
      flushSync(() => setHasSubmitted(true));
      const control = form.elements.namedItem(firstInvalidField);
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    // La transformation (trim) a lieu ici, une seule fois
    onCreate({ name: values.name.trim(), description: values.description.trim() });
    setValues(INITIAL_VALUES);
    setHasSubmitted(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        Nouveau projet
      </h2>

      <div className={styles.field}>
        <label htmlFor={nameId}>Nom du projet (obligatoire)</label>
        <p id={nameHintId} className={styles.hint}>
          {NAME_MAX_LENGTH} caractères maximum.
        </p>
        <input
          id={nameId}
          name="name"
          type="text"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          required
          aria-invalid={shownErrors.name !== undefined}
          aria-describedby={describedBy(nameHintId, shownErrors.name !== undefined && nameErrorId)}
        />
        {shownErrors.name !== undefined && (
          <p id={nameErrorId} className={styles.error}>
            {shownErrors.name}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={descriptionId}>Description</label>
        <textarea
          id={descriptionId}
          name="description"
          rows={3}
          value={values.description}
          onChange={(event) => updateField("description", event.target.value)}
          aria-invalid={shownErrors.description !== undefined}
          aria-describedby={describedBy(shownErrors.description !== undefined && descriptionErrorId)}
        />
        {shownErrors.description !== undefined && (
          <p id={descriptionErrorId} className={styles.error}>
            {shownErrors.description}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        {/* Ton Button est type="button" par défaut : sans type="submit", le formulaire ne s'envoie pas */}
        <Button type="submit">Créer le projet</Button>
      </div>
    </form>
  );
}
