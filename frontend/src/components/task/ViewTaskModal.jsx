const ViewTaskModal = ({ task, onClose }) => {
  if (!task) return null;

  const statusLabels = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
  };

  const statusBadgeClasses = {
    todo: "bg-secondary",
    in_progress: "bg-warning",
    done: "bg-success",
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Task Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge ${statusBadgeClasses[task.status]}`}>
                {statusLabels[task.status]}
              </span>
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(task.created_at).toLocaleString()}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
