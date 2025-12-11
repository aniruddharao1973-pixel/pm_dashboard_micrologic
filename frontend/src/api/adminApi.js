// src/api/adminApi.js
import { useAxios } from "./axios";

export const useAdminApi = () => {
  const api = useAxios();

  /* ---------------------------------------------
      CUSTOMER / COMPANY
  --------------------------------------------- */

    // Create new customer (creates company + admin only)
    const createCustomer = (payload) =>
      api.post("/admin/create-customer", payload);


  // Get list of companies + their admin users
  const getCustomers = () => api.get("/admin/customers");

  // Fetch COMPANY profile (company + users + projects)
  const getCustomer = (companyId) =>
    api.get(`/admin/company/${companyId}`);

  // Update COMPANY profile (sync collaborator also)
  const updateCustomer = (companyId, payload) =>
    api.put(`/admin/company/${companyId}`, payload);

  /* ---------------------------------------------
      DELETE ENTIRE COMPANY 
      (Deletes: company + admin + collaborator + projects + folders + docs)
  --------------------------------------------- */
  const deleteCompany = (companyId) =>
    api.delete(`/admin/company/${companyId}`);

  /* ---------------------------------------------
      DELETE ONLY COLLABORATOR
  --------------------------------------------- */
  const deleteCollaborator = (userId) =>
    api.delete(`/admin/collaborator/${userId}`);

  /* ---------------------------------------------
      ADD COLLABORATOR TO COMPANY
  --------------------------------------------- */
  const addCollaborator = (payload) =>
    api.post("/admin/add-collaborator", payload);

  /* ---------------------------------------------
      PROJECTS
  --------------------------------------------- */
  const createProject = (payload) =>
    api.post("/admin/create-project", payload);

  // Backend route exists: GET /admin/projects
  const getProjects = () => api.get("/admin/projects");

  /* ---------------------------------------------
      FOLDERS
  --------------------------------------------- */
  const createFolder = (payload) =>
    api.post("/admin/create-folder", payload);

  /* ---------------------------------------------
      EMAIL LOGS + RESEND CREDENTIALS
  --------------------------------------------- */
  const getEmailLogs = () => api.get("/admin/email-logs");

  const resendCredentials = (customerId) =>
    api.post(`/admin/resend/${customerId}`);


  /* ---------------------------------------------
      Delete Project
  --------------------------------------------- */

  const deleteProject = (projectId) =>
  api.delete(`/admin/project/${projectId}`);


  /* ---------------------------------------------
      EXPORT FUNCTIONS
  --------------------------------------------- */
  return {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCompany,
    deleteCollaborator,
    addCollaborator,
    createProject,
    createFolder,
    getProjects,
    deleteProject,
    getEmailLogs,
    resendCredentials,
  };
};
