import TaskList from "../components/TaskList";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";

export default function ProjectDetailPage() {
  const projectTasks = tasks.filter((task) => task.projectId === projects[0].id);
  return (
    <main>
      <h1>{projects[0].name}</h1>
      <TaskList tasks={projectTasks} />
    </main>
  );
}
