import { PRIORITY_LABELS, STATUS_LABELS } from "../data/labels";
import type { Task } from "../types/api";
import { formatDate } from "../utils/date";
import style from "./TaskItem.module.css";

type TaskProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskProps) {
  const { priority, title, status, description, dueDate } = task;
  return (
    <div className={style.task}>
      <div className={style.tags}>
        <span className={style.badge}>{PRIORITY_LABELS[priority]}</span>
        <span className={style.badge}>{STATUS_LABELS[status]}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {dueDate && <p>{`Echéance : ${formatDate(dueDate)}`}</p>}
    </div>
  );
}
