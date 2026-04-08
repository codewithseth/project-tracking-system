import { useEffect, useState } from "react";
import { getAllTasks } from "../api/task";
import { toast } from "react-toastify";
import TaskList from "../components/TaskList";

const Task = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        setTasks(response);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchTasks();
  }, []);

  return <TaskList tasks={tasks} />;
};

export default Task;
