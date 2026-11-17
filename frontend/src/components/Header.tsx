import { FaTasks } from "react-icons/fa";

type HeaderProps = {
  onAddTask: () => void;
};

export default function Header({ onAddTask }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-logo">
        <FaTasks size={24} />
        <h1>Task Manager</h1>
      </div>
      <button className="add-task-button" type="button" onClick={onAddTask}>
        Add a task
      </button>
    </header>
  );
}
