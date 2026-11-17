import { useState } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";
import type { Task } from "../services/taskService";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const safeIndex = tasks.length ? activeIndex % tasks.length : 0;
  const activeTask = tasks[safeIndex] ?? null;

  function move(directionChange: -1 | 1) {
    if (tasks.length < 2 || isAnimating) return;

    const nextIndex =
      (safeIndex + directionChange + tasks.length) % tasks.length;

    setDirection(directionChange === 1 ? "next" : "previous");
    setActiveIndex(nextIndex);
    setIsAnimating(true);
  }

  const previousTask =
    tasks.length > 1
      ? tasks[(safeIndex - 1 + tasks.length) % tasks.length]
      : null;

  const nextTask =
    tasks.length > 1 ? tasks[(safeIndex + 1) % tasks.length] : null;

  if (!activeTask) {
    return (
      <section className="task-carousel">
        <p className="carousel-empty">No tasks found.</p>
      </section>
    );
  }

  return (
    <section className="task-carousel" aria-label="Task carousel">
      <div className="carousel-stage">
        {previousTask && (
          <div
            className="carousel-preview carousel-preview-previous"
            aria-hidden="true"
          >
            <span
              className={`priority-badge priority-${previousTask.priority}`}
            >
              {previousTask.priority}
            </span>
            <h3>{previousTask.title}</h3>
            <p>{previousTask.description}</p>
          </div>
        )}

        <button
          className="carousel-arrow carousel-arrow-previous"
          type="button"
          aria-label="Previous task"
          disabled={tasks.length < 2 || isAnimating}
          onClick={() => move(-1)}
        >
          <MdKeyboardArrowLeft size={24} />
        </button>

        <div
          key={activeTask.id}
          className={`carousel-current carousel-enter-${direction}`}
          onAnimationEnd={() => setIsAnimating(false)}
        >
          <TaskItem
            task={activeTask}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>

        <button
          className="carousel-arrow carousel-arrow-next"
          type="button"
          aria-label="Next task"
          disabled={tasks.length < 2 || isAnimating}
          onClick={() => move(1)}
        >
          <MdKeyboardArrowRight size={24} />
        </button>

        {nextTask && (
          <div
            className="carousel-preview carousel-preview-next"
            aria-hidden="true"
          >
            <span className={`priority-badge priority-${nextTask.priority}`}>
              {nextTask.priority}
            </span>
            <h3>{nextTask.title}</h3>
            <p>{nextTask.description}</p>
          </div>
        )}
      </div>

      <p className="carousel-count">
        {safeIndex + 1} of {tasks.length}
      </p>
    </section>
  );
}
