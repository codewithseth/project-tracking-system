import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllProjects } from "../api/project";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

const Project = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleProjectCreated = () => {
    fetchProjects();
  };

  const handleProjectUpdated = () => {
    fetchProjects();
  };

  const handleProjectDeleted = () => {
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <ProjectForm onProjectCreated={handleProjectCreated} />
      </div>
      <div className="col-lg-8">
        <ProjectList
          projects={projects}
          onProjectDeleted={handleProjectDeleted}
          onProjectUpdated={handleProjectUpdated}
        />
      </div>
    </div>
  );
};

export default Project;
