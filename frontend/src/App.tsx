import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
  type Task,
  type TaskInput,
} from "./services/taskService";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Header from "./components/Header";
import type { TaskFilterValue } from "./components/TaskFilter";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [actionError, setActionError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null);

  const [filter, setFilter] = useState<TaskFilterValue>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Something went wrong";
  }

  async function handleToggle(id: number) {
    setActionError("");

    try {
      const updatedTask = await toggleTask(id);
      setTasks((current) =>
        current.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch (error: unknown) {
      setActionError(getErrorMessage(error));
    }
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setShowTaskForm(true);
  }

  function openAddForm() {
    setEditingTask(null);
    setShowTaskForm(true);
  }

  function closeTaskForm() {
    setShowTaskForm(false);
    setEditingTask(null);
  }

  async function saveTask(input: TaskInput) {
    if (editingTask) {
      const updatedTask = await updateTask(editingTask.id, input);

      setTasks((current) =>
        current.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      );
    } else {
      const newTask = await createTask(input);
      setTasks((current) => [...current, newTask]);
    }
  }

  function openDeleteConfirmation(id: number) {
    const task = tasks.find((item) => item.id === id);
    if (task) setPendingDelete(task);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;

    try {
      await deleteTask(pendingDelete.id);
      setTasks((current) =>
        current.filter((task) => task.id !== pendingDelete.id),
      );
      setPendingDelete(null);
    } catch (error: unknown) {
      setActionError(
        error instanceof Error ? error.message : "Could not delete task.",
      );
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  const query = search.trim().toLowerCase();

  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    const matchesSearch = task.title.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Header onAddTask={openAddForm} />

      <main className="app-main">
        <section className="task-summary">
          <div className="task-summary-text">
            <h2>Your tasks</h2>
            <p>{tasks.length} tasks in your workspace</p>
          </div>

          <TaskFilter
            value={filter}
            onChange={setFilter}
            totalCount={tasks.length}
            pendingCount={pendingCount}
            completedCount={completedCount}
          />
        </section>

        <input
          className="task-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
        />

        {actionError && <p role="alert">{actionError}</p>}

        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={openDeleteConfirmation}
        />

        {showTaskForm && (
          <TaskForm
            key={editingTask?.id ?? "new-task"}
            task={editingTask}
            onSave={saveTask}
            onClose={closeTaskForm}
          />
        )}

        {pendingDelete && (
          <DeleteConfirmation
            title={pendingDelete.title}
            onClose={() => setPendingDelete(null)}
            onDelete={confirmDelete}
          />
        )}
      </main>
    </>
  );
}

export default App;
