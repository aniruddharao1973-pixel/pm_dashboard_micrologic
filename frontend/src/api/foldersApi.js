// src/api/foldersApi.js
import { useAxios } from "./axios";

export const useFoldersApi = () => {
  const api = useAxios();

  /**
   * Create a folder (Admin / TechSales only)
   */
  const createFolder = (data) => {
    return api.post("/folders/create", data);
  };

  /**
   * Get root folders for a project
   * - Customer role is filtered by backend
   * - Includes customer_can_* flags
   */ 
  const getFoldersByProject = (projectId) => {
    return api.get(`/folders/${projectId}`);
  };

  /**
   * Get subfolders under a folder
   * - Permissions inherited from parent (backend)
   */
  const getSubFolders = (folderId) => {
    return api.get(`/folders/sub/${folderId}`);
  };

  /**
   * Get single folder info
   * - Used for breadcrumb
   * - Used for permission-based UI
   */
  const getFolderById = (folderId) => {
    return api.get(`/folders/info/${folderId}`);
  };

  /**
   * ⭐ NEW — Update customer permissions for a folder
   * Admin / TechSales only
   */
  const updateFolderPermissions = (folderId, permissions) => {
    return api.put(`/folders/${folderId}/permissions`, permissions);
  };

  const getCustomerAccessFolders = (projectId) => {
  return api.get(`/folders/project/${projectId}/customer-access`);
};


  return {
    createFolder,
    getFoldersByProject,
    getSubFolders,
    getFolderById,
    updateFolderPermissions,
      getCustomerAccessFolders, // ⭐ ADD
  };
};
