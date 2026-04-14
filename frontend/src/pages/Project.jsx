import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllProjects } from "../api/project";
import ProjectForm from "../components/project/ProjectForm";
import ProjectList from "../components/project/ProjectList";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await getAllProjects();
      setProjects(response);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
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
          isLoading={isLoading}
          onProjectDeleted={handleProjectDeleted}
          onProjectUpdated={handleProjectUpdated}
        />
      </div>
    </div>
  );
};

export default Project;
