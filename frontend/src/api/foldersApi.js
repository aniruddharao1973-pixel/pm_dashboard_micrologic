// // src/api/foldersApi.js
// import { useAxios } from "./axios";

// export const useFoldersApi = () => {
//   const api = useAxios();

//   // Create a folder
//   const createFolder = (data) => {
//     return api.post("/folders/create", data);
//   };

//   // Get all root folders for a project
//   const getFoldersByProject = (projectId) => {
//     return api.get(`/folders/${projectId}`);
//   };

//   // ⭐ FIXED: Correct backend route → /folders/sub/:folderId
//   const getSubFolders = (folderId) => {
//     return api.get(`/folders/sub/${folderId}`);
//   };

//   return {
//     createFolder,
//     getFoldersByProject,
//     getSubFolders,
//   };
// };



// src/api/foldersApi.js
import { useAxios } from "./axios";

export const useFoldersApi = () => {
  const api = useAxios();

  // Create a folder
  const createFolder = (data) => {
    return api.post("/folders/create", data);
  };

  // Get all root folders for a project
  const getFoldersByProject = (projectId) => {
    return api.get(`/folders/${projectId}`);
  };

  // Get subfolders under a folder
  const getSubFolders = (folderId) => {
    return api.get(`/folders/sub/${folderId}`);
  };

  // ⭐ NEW — Get folder info by ID (name, parent_id, project_id)
  const getFolderById = (folderId) => {
    return api.get(`/folders/info/${folderId}`);
  };

  return {
    createFolder,
    getFoldersByProject,
    getSubFolders,
    getFolderById,   // ⭐ Make sure this is exported
  };
};
