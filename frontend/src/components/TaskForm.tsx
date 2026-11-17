import { useState, type FormEvent } from "react";
import type { Task, TaskInput } from "../services/taskService";
import "../styles/taskForm.css";

type TaskFormProps = {
  task?: Task | null;
  onSave: (input: TaskInput) => Promise<void>;
  onClose: () => void;
};

export default function TaskForm({ task, onSave, onClose }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState<TaskInput["priority"]>(
    task?.priority ?? "medium",
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      await onSave({
        title: title.trim(),
        description: description.trim(),
        priority,
      });
      onClose();
    } catch (saveError: unknown) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save the task.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="form-backdrop" onClick={onClose}>
      <section
        className="task-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="task-form-heading">
          <div>
            <p className="task-form-eyebrow">
              {task ? "EDIT TASK" : "NEW TASK"}
            </p>
            <h2 id="task-form-title">
              {task ? "Update task" : "Create a task"}
            </h2>
          </div>

          <button
            className="task-form-close"
            type="button"
            aria-label="Close form"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="task-form-field">
            <span>Title</span>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to get done?"
              maxLength={100}
              required
            />
          </label>

          <label className="task-form-field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a few details..."
              rows={4}
            />
          </label>

          <label className="task-form-field">
            <span>Priority</span>
            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TaskInput["priority"])
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          {error && <p className="task-form-error">{error}</p>}

          <div className="task-form-actions">
            <button
              className="task-form-cancel"
              type="button"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              className="task-form-submit"
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving..." : task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
