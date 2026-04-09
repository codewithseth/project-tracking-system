import { useEffect, useState } from "react";
import { getAllTasks } from "../api/task";
import { toast } from "react-toastify";
import TaskForm from "../components/task/TaskForm";
import TasksTable from "../components/task/TasksTable";
import { getAllProjects } from "../api/project";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const handleTaskCreated = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <TaskForm projects={projects} onTaskCreated={handleTaskCreated} />
      </div>
      <div className="col-lg-8">
        <TasksTable
          tasks={tasks}
          projects={projects}
          onTaskDeleted={handleTaskDeleted}
          onTaskUpdated={handleTaskUpdated}
        />
      </div>
    </div>
  );
};

export default Task;
