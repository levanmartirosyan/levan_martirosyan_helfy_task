import { FaCheck } from "react-icons/fa";
import "../styles/TaskItem.css";
import type { Task } from "../services/taskService";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

function formatCreatedAt(value: string) {
  const date = new Date(value);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  return isToday ? "Created today" : `Created ${date.toLocaleDateString()}`;
}

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-card-header">
        <span className={`priority-badge priority-${task.priority}`}>
          <span className="priority-dot" />
          {task.priority} priority
        </span>

        <div className="task-actions">
          <button type="button" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>

      <h2 className="task-title">{task.title}</h2>
      <p className="task-description">{task.description}</p>

      <div className="task-divider" />

      <button
        className="task-complete"
        type="button"
        aria-pressed={task.completed}
        onClick={() => onToggle(task.id)}
      >
        <span className="task-check" aria-hidden="true">
          {task.completed ? <FaCheck /> : ""}
        </span>
        {task.completed ? "Mark as pending" : "Mark as complete"}
      </button>

      <p className="task-date">{formatCreatedAt(task.createdAt)}</p>
    </div>
  );
}
