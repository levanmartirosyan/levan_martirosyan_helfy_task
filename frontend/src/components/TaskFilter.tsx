import "../styles/TaskFilter.css";

type TaskFilterValue = "all" | "pending" | "completed";

type TaskFilterProps = {
  value: TaskFilterValue;
  onChange: (value: TaskFilterValue) => void;
  totalCount: number;
  pendingCount: number;
  completedCount: number;
};

export type { TaskFilterValue };

export default function TaskFilter({
  value,
  onChange,
  totalCount,
  pendingCount,
  completedCount,
}: TaskFilterProps) {
  const options: {
    value: TaskFilterValue;
    label: string;
    count: number;
  }[] = [
    { value: "all", label: "All", count: totalCount },
    { value: "pending", label: "Pending", count: pendingCount },
    { value: "completed", label: "Completed", count: completedCount },
  ];

  return (
    <div className="task-filters" aria-label="Filter tasks">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`task-filter ${
            value === option.value ? "task-filter-active" : ""
          }`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label} {option.count}
        </button>
      ))}
    </div>
  );
}
