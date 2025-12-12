


// src/api/documentsApi.js
import { useAxios } from "./axios";

export const useDocumentsApi = () => {
  const api = useAxios();

  /*
  =========================================
   DOCUMENT UPLOAD / CRUD
  =========================================
  */
  const uploadDocument = async (formData) => {
    return await api.post("/documents/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const getDocumentsByFolder = (folderId) =>
    api.get(`/documents/folder/${folderId}`);

  const getDocumentVersions = (documentId) =>
    api.get(`/documents/${documentId}/versions`);

  const deleteDocument = (documentId) =>
    api.delete(`/documents/${documentId}`);

  const toggleDownload = (documentId, canDownload) =>
    api.patch(`/documents/${documentId}/toggle-download`, { canDownload });

  /*
  =========================================
    FINAL APPROVAL WORKFLOW (Version Based)
  =========================================
  */
  const approveVersion = (versionId, comment) =>
    api.post(`/approvals/${versionId}/approve`, { comment });

  const rejectVersion = (versionId, comment) =>
    api.post(`/approvals/${versionId}/reject`, { comment });

  /*
  =========================================
    COMMENTS (Real-Time Chat)
  =========================================
  */
  const getComments = (documentId) =>
    api.get(`/documents/${documentId}/comments`);

  const addComment = (documentId, message) =>
    api.post(`/documents/${documentId}/comments`, { message });

  /*
  =========================================
    NOTES API
  =========================================
  */
  const getDocumentNotes = (documentId) =>
    api.get(`/documents/${documentId}/notes`);

  const updateDocumentNotes = (documentId, notes) =>
    api.put(`/documents/${documentId}/notes`, { notes });

  return {
    uploadDocument,
    getDocumentsByFolder,
    getDocumentVersions,
    deleteDocument,
    toggleDownload,

    // APPROVALS
    approveVersion,
    rejectVersion,

    // COMMENTS
    getComments,
    addComment,

    // NOTES
    getDocumentNotes,
    updateDocumentNotes,
  };
};
