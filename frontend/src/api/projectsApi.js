// // src/api/projectsApi.js
// import { useAxios } from "./axios";

// export const useProjectsApi = () => {
//   const api = useAxios();

//   // Admin: create a new project
//   const createProject = (data) => {
//     return api.post("/admin/create-project", data);
//   };

//   // Admin: get all projects
//   const getAllProjects = () => {
//     return api.get("/projects");
//   };

//   // Customer: get only their projects
//   const getProjectsByCustomer = (customerId) => {
//     return api.get(`/projects/by-customer/${customerId}`);
//   };

//   // Get single project details
//   const getProjectById = (projectId) => {
//     return api.get(`/projects/${projectId}`);
//   };

//   return {
//     createProject,
//     getAllProjects,
//     getProjectsByCustomer,
//     getProjectById,
//   };
// };


// src/api/projectsApi.js
import { useAxios } from "./axios";

export const useProjectsApi = () => {
  const api = useAxios();

  // Admin: create a project for a company
  const createProject = (data) => {
    return api.post("/admin/create-project", data);
  };

  // Both Admin + Customer:
  // Backend automatically returns:
  // - all projects (admin)
  // - only their company projects (customer)
  const getAllProjects = () => {
    return api.get("/projects");
  };

  // ❌ REMOVE — no longer valid because projects now belong to company, not customer
  // const getProjectsByCustomer = (...)

  // Get single project details
  const getProjectById = (projectId) => {
    return api.get(`/projects/${projectId}`);
  };

  return {
    createProject,
    getAllProjects,
    getProjectById,
  };
};
