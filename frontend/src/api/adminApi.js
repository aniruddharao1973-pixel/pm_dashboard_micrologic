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

  // ✅ FIXED: Fetch customer for Edit modal
  const getCustomer = (companyId) => api.get(`/admin/customer/${companyId}`);

  // Update COMPANY profile
  const updateCustomer = (companyId, payload) =>
    api.put(`/admin/company/${companyId}`, payload);

  /* ---------------------------------------------
    LIVE DUPLICATE VALIDATION (CREATE + EDIT)
--------------------------------------------- */
  const validateDuplicate = (params) => api.get("/admin/validate", { params });

  /* ---------------------------------------------
      DELETE ENTIRE COMPANY 
    (Deletes: company + users + projects + folders + docs)
  --------------------------------------------- */
  const deleteCompany = (companyId) =>
    api.delete(`/admin/company/${companyId}`);

  /* ---------------------------------------------
      PROJECTS
  --------------------------------------------- */
  const createProject = (payload) => api.post("/admin/create-project", payload);

  // Backend route exists: GET /admin/projects
  const getProjects = () => api.get("/admin/projects");

  const getCompanyProfile = (companyId) =>
    api.get(`/admin/company/${companyId}`);

  /* ---------------------------------------------
      FOLDERS
  --------------------------------------------- */
  const createFolder = (payload) => api.post("/admin/create-folder", payload);

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
    getCompanyProfile, // ✅ ADD
    updateCustomer,
    deleteCompany,
    createProject,
    createFolder,
    getProjects,
    deleteProject,
    getEmailLogs,
    resendCredentials,
    validateDuplicate, // ✅ NEW
  };
};
