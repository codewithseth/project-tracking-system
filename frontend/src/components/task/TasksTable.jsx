import { useState } from "react";
import { toast } from "react-toastify";
import { deleteTask, updateTask } from "../../api/task";
import ViewTaskModal from "./ViewTaskModal";

const TasksTable = ({
  tasks,
  projects = [],
  isLoading,
  onTaskDeleted,
  onTaskUpdated,
}) => {
  const [viewingTask, setViewingTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    status: "todo",
  });
  const [loadingId, setLoadingId] = useState(null);

  const handleView = (task) => {
    setViewingTask(task);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoadingId(editingTask.id);

    try {
      await updateTask(editingTask.id, editFormData);
      toast.success("Task updated successfully");
      setEditingTask(null);
      onTaskUpdated();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = (taskId) => {
    setDeletingTask(taskId);
  };

  const confirmDelete = async () => {
    if (!deletingTask) return;

    setLoadingId(deletingTask);
    try {
      await deleteTask(deletingTask);
      toast.success("Task deleted successfully");
      setDeletingTask(null);
      onTaskDeleted();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const badgeClasses = {
      todo: "bg-secondary",
      in_progress: "bg-warning",
      done: "bg-success",
    };
    const statusLabels = {
      todo: "To Do",
      in_progress: "In Progress",
      done: "Done",
    };
    return (
      <span className={`badge ${badgeClasses[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  // Filter tasks based on selected project
  const filteredTasks = selectedProjectId
    ? tasks.filter((task) => task.project_id === parseInt(selectedProjectId))
    : tasks;

  console.log(filteredTasks);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <h2 className="card-title mb-0">All Tasks</h2>
            <div style={{ width: "250px" }}>
              <label htmlFor="projectFilter" className="form-label">
                Filter by Project
              </label>
              <select
                id="projectFilter"
                className="form-select"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                style={{ color: "#000", backgroundColor: "#fff" }}
              >
                <option value="">All Projects</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <p className="text-muted text-center py-4">No tasks found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <strong>{task.title}</strong>
                      </td>
                      <td>{getStatusBadge(task.status)}</td>
                      <td>
                        <small>
                          {new Date(task.created_at).toLocaleString()}
                        </small>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            className="btn btn-info"
                            onClick={() => handleView(task)}
                            title="View"
                          >
                            View
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() => handleEditClick(task)}
                            title="Edit"
                            disabled={loadingId === task.id}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(task.id)}
                            title="Delete"
                            disabled={loadingId === task.id}
                          >
                            {loadingId === task.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Task Modal */}
      <ViewTaskModal task={viewingTask} onClose={() => setViewingTask(null)} />

      {/* Edit Modal */}
      {editingTask && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingTask(null)}
                  disabled={loadingId === editingTask.id}
                ></button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="edit-title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edit-title"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      disabled={loadingId === editingTask.id}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit-description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="edit-description"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      rows="4"
                      disabled={loadingId === editingTask.id}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit-status" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="edit-status"
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditChange}
                      disabled={loadingId === editingTask.id}
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingTask(null)}
                    disabled={loadingId === editingTask.id}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loadingId === editingTask.id}
                  >
                    {loadingId === editingTask.id
                      ? "Saving..."
                      : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingTask && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setDeletingTask(null)}
                  disabled={loadingId === deletingTask}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete this task? This action cannot
                  be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeletingTask(null)}
                  disabled={loadingId === deletingTask}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  disabled={loadingId === deletingTask}
                >
                  {loadingId === deletingTask ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TasksTable;
