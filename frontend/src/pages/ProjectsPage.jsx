// frontend/src/pages/ProjectsPage.jsx
import React, { useEffect, useState } from "react";
import { useProjectsApi } from "../api/projectsApi";
import { useAuth } from "../hooks/useAuth";
import ProjectCard from "../components/ProjectCard";

const ProjectsPage = () => {
  // const { getAllProjects } = useProjectsApi();
  const { getAllProjects } = useProjectsApi();



  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const res = await getAllProjects();
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  if (loading) return <p className="text-gray-600">Loading projects...</p>;

  return (
        <div
          className="
            w-full
            h-[calc(100vh-80px)]   /* adjust based on header height */
            overflow-y-scroll
            scroll-smooth
            bg-gradient-to-br from-gray-50 via-white to-gray-50/40
            p-6 md:p-8
            space-y-8
          "
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f1f5f9",
          }}
        >

      <div className="space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-lg text-gray-800 font-dark-medium">
          List of all available projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">No projects found.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id} 
              className="group transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <ProjectCard project={project} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
