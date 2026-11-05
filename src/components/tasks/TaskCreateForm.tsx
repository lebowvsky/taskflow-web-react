// src/components/tasks/TaskCreateForm.tsx
import { useId, useState, type SubmitEvent } from "react";
import { flushSync } from "react-dom";
import Button from "../ui/Button.tsx";
import { PRIORITY_LABELS, TASK_PRIORITIES, isTaskPriority } from "../../data/labels.ts";
import type { TaskPriority } from "../../types/api.ts";
import styles from "./TaskCreateForm.module.css";

export type TaskFormValues = {
  title: string;
  priority: TaskPriority;
  dueDate: string; // "" = pas d'échéance ; la conversion en null se fait au submit
};

type TaskFormErrors = Partial<Record<keyof TaskFormValues, string>>;

const INITIAL_VALUES: TaskFormValues = { title: "", priority: "MEDIUM", dueDate: "" };
const FIELD_ORDER = ["title", "dueDate"] as const; // seuls champs pouvant être invalides, dans l'ordre visuel
const TITLE_MAX_LENGTH = 200;

// toISOString() est en UTC : on construit la date du jour en heure locale
function toLocalIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

// Pure : `today` est un argument, pas une lecture de l'horloge
function validate(values: TaskFormValues, today: string): TaskFormErrors {
  const errors: TaskFormErrors = {};
  const title = values.title.trim();
  if (title === "") {
    errors.title = "Saisissez le titre de la tâche.";
  } else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Le titre doit faire au plus ${TITLE_MAX_LENGTH} caractères.`;
  }
  // Vérification indépendante : toutes les erreurs apparaissent au même envoi.
  // Au format "YYYY-MM-DD", l'ordre des chaînes est l'ordre chronologique.
  if (values.dueDate !== "" && values.dueDate < today) {
    errors.dueDate = "L'échéance ne peut pas être dans le passé.";
  }
  return errors;
}

function describedBy(...ids: (string | false)[]): string | undefined {
  const value = ids.filter(Boolean).join(" ");
  return value === "" ? undefined : value;
}

type TaskCreateFormProps = {
  onCreate: (values: TaskFormValues) => void;
};

export default function TaskCreateForm({ onCreate }: TaskCreateFormProps) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const id = useId();

  // Lu une fois, au montage : ensuite le rendu ne dépend que des props et de l'état
  const [today] = useState(() => toLocalIsoDate(new Date()));
  const errors = validate(values, today);
  const shownErrors: TaskFormErrors = hasSubmitted ? errors : {};

  // Un id par rôle : une réutilisation se voit à la lecture
  const headingId = `${id}-heading`;
  const titleId = `${id}-title`;
  const titleHintId = `${id}-title-hint`;
  const titleErrorId = `${id}-title-error`;
  const priorityId = `${id}-priority`;
  const dueDateId = `${id}-due-date`;
  const dueDateHintId = `${id}-due-date-hint`;
  const dueDateErrorId = `${id}-due-date-error`;

  function updateField<K extends keyof TaskFormValues>(field: K, value: TaskFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const firstInvalidField = FIELD_ORDER.find((field) => errors[field] !== undefined);

    if (firstInvalidField !== undefined) {
      flushSync(() => setHasSubmitted(true));
      const control = form.elements.namedItem(firstInvalidField);
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    onCreate({ ...values, title: values.title.trim() });
    setValues(INITIAL_VALUES);
    setHasSubmitted(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.title}>
        Nouvelle tâche
      </h2>

      <div className={styles.field}>
        <label htmlFor={titleId}>Titre (obligatoire)</label>
        <p id={titleHintId} className={styles.hint}>
          {TITLE_MAX_LENGTH} caractères maximum.
        </p>
        <input
          id={titleId}
          name="title"
          type="text"
          value={values.title}
          onChange={(event) => updateField("title", event.target.value)}
          required
          aria-invalid={shownErrors.title !== undefined}
          aria-describedby={describedBy(titleHintId, shownErrors.title !== undefined && titleErrorId)}
        />
        {shownErrors.title !== undefined && (
          <p id={titleErrorId} className={styles.error}>
            {shownErrors.title}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={priorityId}>Priorité</label>
        {/* Liste fermée, valeur par défaut : ce champ ne peut pas être invalide */}
        <select
          id={priorityId}
          name="priority"
          value={values.priority}
          onChange={(event) => {
            const { value } = event.target;
            if (isTaskPriority(value)) updateField("priority", value);
          }}
        >
          {TASK_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {PRIORITY_LABELS[priority]}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor={dueDateId}>Échéance</label>
        <p id={dueDateHintId} className={styles.hint}>
          Facultative. Aujourd'hui ou plus tard.
        </p>
        <input
          id={dueDateId}
          name="dueDate"
          type="date"
          min={today} // aide le sélecteur natif ; la validation reste la nôtre
          value={values.dueDate}
          onChange={(event) => updateField("dueDate", event.target.value)}
          aria-invalid={shownErrors.dueDate !== undefined}
          aria-describedby={describedBy(dueDateHintId, shownErrors.dueDate !== undefined && dueDateErrorId)}
        />
        {shownErrors.dueDate !== undefined && (
          <p id={dueDateErrorId} className={styles.error}>
            {shownErrors.dueDate}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <Button type="submit">Créer la tâche</Button>
      </div>
    </form>
  );
}
