import { useState } from "react";
import { toast } from "react-toastify";
import { deleteProject, updateProject } from "../../api/project";
import ViewProjectModal from "./ViewProjectModal";

const ProjectList = ({
  projects,
  isLoading,
  onProjectDeleted,
  onProjectUpdated,
}) => {
  const [viewingProject, setViewingProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
  });
  const [loadingId, setLoadingId] = useState(null);

  const handleView = (project) => {
    setViewingProject(project);
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setEditFormData({ title: project.title, description: project.description });
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
    setLoadingId(editingProject.id);

    try {
      await updateProject(editingProject.id, editFormData);
      toast.success("Project updated successfully");
      setEditingProject(null);
      onProjectUpdated();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (projectId) => {
    setDeletingProject(projectId);
  };

  const confirmDelete = async () => {
    if (!deletingProject) return;

    setLoadingId(deletingProject);
    try {
      await deleteProject(deletingProject);
      toast.success("Project deleted successfully");
      setDeletingProject(null);
      onProjectDeleted();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">All Projects</h2>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <p className="text-muted text-center py-4">No projects found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Created</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>
                        <strong>{project.title}</strong>
                      </td>
                      <td>{project.description}</td>
                      <td>
                        <small>
                          {new Date(project.created_at).toLocaleString()}
                        </small>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            className="btn btn-info"
                            onClick={() => handleView(project)}
                            title="View"
                          >
                            View
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() => handleEditClick(project)}
                            title="Edit"
                            disabled={loadingId === project.id}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(project.id)}
                            title="Delete"
                            disabled={loadingId === project.id}
                          >
                            {loadingId === project.id
                              ? "Deleting..."
                              : "Delete"}
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

      {/* View Project Modal */}
      <ViewProjectModal
        project={viewingProject}
        onClose={() => setViewingProject(null)}
      />

      {/* Edit Modal */}
      {editingProject && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingProject(null)}
                  disabled={loadingId === editingProject.id}
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
                      disabled={loadingId === editingProject.id}
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
                      disabled={loadingId === editingProject.id}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingProject(null)}
                    disabled={loadingId === editingProject.id}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loadingId === editingProject.id}
                  >
                    {loadingId === editingProject.id
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
      {deletingProject && (
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
                  onClick={() => setDeletingProject(null)}
                  disabled={loadingId === deletingProject}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete this project? This action
                  cannot be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeletingProject(null)}
                  disabled={loadingId === deletingProject}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  disabled={loadingId === deletingProject}
                >
                  {loadingId === deletingProject ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList;
