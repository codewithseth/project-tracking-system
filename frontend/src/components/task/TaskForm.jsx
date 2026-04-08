import { useState } from "react";
import { toast } from "react-toastify";
import { createTask } from "../../api/task";

const TaskForm = ({ projects, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    project_id: "",
    title: "",
    description: "",
    status: "todo",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.project_id) {
      toast.error("Project is required");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    try {
      console.log(formData.status);
      await createTask({
        project_id: parseInt(formData.project_id),
        title: formData.title,
        description: formData.description,
        status: formData.status,
      });
      toast.success("Task created successfully");
      setFormData({
        project_id: "",
        title: "",
        description: "",
        status: "todo",
      });
      onTaskCreated();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="project_id" className="form-label">
              Project
            </label>
            <select
              className="form-select"
              id="project_id"
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">-- Select a project --</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
