


// // src/api/projectsApi.js
// import { useAxios } from "./axios";

// export const useProjectsApi = () => {
//   const api = useAxios();

//   // Admin: create a project for a company
//   const createProject = (data) => {
//     return api.post("/admin/create-project", data);
//   };

//   // Both Admin + Customer:
//   // Backend automatically returns:
//   // - all projects (admin)
//   // - only their company projects (customer)
//   const getAllProjects = () => {
//     return api.get("/projects");
//   };

//   // ❌ REMOVE — no longer valid because projects now belong to company, not customer
//   // const getProjectsByCustomer = (...)

//   // Get single project details
//   const getProjectById = (projectId) => {
//     return api.get(`/projects/${projectId}`);
//   };

//   return {
//     createProject,
//     getAllProjects,
//     getProjectById,
//   };
// };


// src/api/projectsApi.js
import { useAxios } from "./axios";
import { useAuth } from "../hooks/useAuth";

export const useProjectsApi = () => {
  const api = useAxios();
  const { user } = useAuth();

  /* ---------------------------------------------
     CREATE PROJECT (Admin or Tech Sales)
  --------------------------------------------- */
  const createProject = (data) => {
    return api.post("/admin/create-project", data);
  };

  /* ---------------------------------------------
     GET ALL PROJECTS
     Admin + Tech Sales → /admin/projects
     Customer          → /projects
  --------------------------------------------- */
  const getAllProjects = () => {
    if (user?.role === "admin" || user?.role === "techsales") {
      console.log("Fetching ADMIN / TECH SALES projects...");
      return api.get("/admin/projects");
    }

    console.log("Fetching CUSTOMER projects...");
    return api.get("/projects");
  };

  /* ---------------------------------------------
     GET PROJECT BY ID
  --------------------------------------------- */
  const getProjectById = (projectId) => {
    return api.get(`/projects/${projectId}`);
  };

  return {
    createProject,
    getAllProjects,
    getProjectById,
  };
};
