import "../styles/DeleteConfirmation.css";

type DeleteConfirmationProps = {
  title: string;
  onDelete: () => void;
  onClose: () => void;
};

export default function DeleteConfirmation({
  title,
  onDelete,
  onClose,
}: DeleteConfirmationProps) {
  return (
    <div className="delete-backdrop" onClick={onClose}>
      <section
        className="delete-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="delete-dialog-title">
          Are you sure you want to delete "{title}"?
        </h2>

        <div className="delete-dialog-actions">
          <button className="cancel-button" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-button" type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
