import type { Task } from "../types/api";
import TaskItem from "./TaskItem";
import style from "./TaskList.module.css";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>Aucune tâche pour le moment.</p>;
  }
  return (
    <ul className={style.list}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} />
        </li>
      ))}
    </ul>
  );
}
