// // src/api/documentsApi.js
// import { useAxios } from "./axios";

// export const useDocumentsApi = () => {
//   const api = useAxios();

//   const uploadDocument = (formData) =>
//     api.post("/documents/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//   const getDocumentsByFolder = (folderId) =>
//     api.get(`/documents/folder/${folderId}`);

//   const getDocumentVersions = (documentId) =>
//     api.get(`/documents/${documentId}/versions`);

//   const renameDocument = (documentId, newTitle) =>
//     api.put(`/documents/${documentId}/rename`, { newTitle });

//   const deleteDocument = (documentId) =>
//     api.delete(`/documents/${documentId}`);

//   const toggleDownload = (documentId, canDownload) =>
//     api.patch(`/documents/${documentId}/toggle-download`, { canDownload });

//   return {
//     uploadDocument,
//     getDocumentsByFolder,
//     getDocumentVersions,
//     renameDocument,
//     deleteDocument,
//     toggleDownload,
//   };
// };


// // src/api/documentsApi.js
// import { useAxios } from "./axios";

// export const useDocumentsApi = () => {
//   const api = useAxios();

//   /*
//   =========================================
//    DOCUMENT UPLOAD / CRUD (existing)
//   =========================================
//   */
//   const uploadDocument = (formData) =>
//     api.post("/documents/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//   const getDocumentsByFolder = (folderId) =>
//     api.get(`/documents/folder/${folderId}`);

//   const getDocumentVersions = (documentId) =>
//     api.get(`/documents/${documentId}/versions`);

//   const renameDocument = (documentId, newTitle) =>
//     api.put(`/documents/${documentId}/rename`, { newTitle });

//   const deleteDocument = (documentId) =>
//     api.delete(`/documents/${documentId}`);

//   const toggleDownload = (documentId, canDownload) =>
//     api.patch(`/documents/${documentId}/toggle-download`, { canDownload });


//   /*
//   =========================================
//     APPROVAL: ADMIN — START APPROVAL
//     POST /api/approvals/start
//   =========================================
//   */

//   const startApproval = (documentId) =>
//     api.post(`/approvals/start`, { documentId });


//   /*
//   =========================================
//     APPROVAL: CUSTOMER / ADMIN — TAKE ACTION
//     POST /api/approvals/:approvalId/action
//   =========================================
//   */

//   const actOnApproval = (approvalId, action, comment = "") =>
//     api.post(`/approvals/${approvalId}/action`, {
//       action,
//       comment,
//     });


//   /*
//   =========================================
//     COMMENTS: GET & POST
//     GET /api/documents/:documentId/comments
//     POST /api/documents/:documentId/comments
//   =========================================
//   */

//   const getComments = (documentId) =>
//     api.get(`/documents/${documentId}/comments`);

//   const addComment = (documentId, message) =>
//     api.post(`/documents/${documentId}/comments`, { message });


//   /*
//   =========================================
//     RETURN ALL API FUNCTIONS
//   =========================================
//   */
//   return {
//     // Existing CRUD
//     uploadDocument,
//     getDocumentsByFolder,
//     getDocumentVersions,
//     renameDocument,
//     deleteDocument,
//     toggleDownload,

//     // NEW — Approvals
//     startApproval,
//     actOnApproval,

//     // NEW — Comments
//     getComments,
//     addComment,
//   };
// };



// // src/api/documentsApi.js
// import { useAxios } from "./axios";

// export const useDocumentsApi = () => {
//   const api = useAxios();

//   /*
//   =========================================
//    DOCUMENT UPLOAD / CRUD
//   =========================================
//   */
//   // const uploadDocument = (formData) =>
//   //   api.post("/documents/upload", formData, {
//   //     headers: { "Content-Type": "multipart/form-data" },
//   //   });

//   const uploadDocument = async (formData) => {
//   try {
//     return await api.post("/documents/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//   } catch (err) {
//     console.error("Upload failed in API layer:", err);
//     throw err;  // 🔥 IMPORTANT → throw back to caller
//   }
// };


//   const getDocumentsByFolder = (folderId) =>
//     api.get(`/documents/folder/${folderId}`);

//   const getDocumentVersions = (documentId) =>
//     api.get(`/documents/${documentId}/versions`);

//   const renameDocument = (documentId, newTitle) =>
//     api.put(`/documents/${documentId}/rename`, { newTitle });

//   const deleteDocument = (documentId) =>
//     api.delete(`/documents/${documentId}`);

//   const toggleDownload = (documentId, canDownload) =>
//     api.patch(`/documents/${documentId}/toggle-download`, { canDownload });


//   /*
//   =========================================
//    APPROVALS
//   =========================================
//   */

//   // POST /api/approvals/start
//   const startApproval = (documentId) =>
//     api.post(`/approvals/start`, { documentId });

//   // POST /api/approvals/:approvalId/action
//   const actOnApproval = (approvalId, action, comment = "") =>
//     api.post(`/approvals/${approvalId}/action`, {
//       action,
//       comment,
//     });


//   /*
//   =========================================
//    COMMENTS
//   =========================================
//   */
//   const getComments = (documentId) =>
//     api.get(`/documents/${documentId}/comments`);

//   const addComment = (documentId, message) =>
//     api.post(`/documents/${documentId}/comments`, { message });


//   return {
//     // Documents
//     uploadDocument,
//     getDocumentsByFolder,
//     getDocumentVersions,
//     renameDocument,
//     deleteDocument,
//     toggleDownload,

//     // Approvals
//     startApproval,
//     actOnApproval,

//     // Comments
//     getComments,
//     addComment,
//   };
// };

// // src/api/documentsApi.js
// import { useAxios } from "./axios";

// export const useDocumentsApi = () => {
//   const api = useAxios();

//   /*
//   =========================================
//    DOCUMENT UPLOAD / CRUD
//   =========================================
//   */
//   const uploadDocument = async (formData) => {
//     try {
//       return await api.post("/documents/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     } catch (err) {
//       console.error("Upload failed in API layer:", err);
//       throw err;
//     }
//   };

//   const getDocumentsByFolder = (folderId) =>
//     api.get(`/documents/folder/${folderId}`);

//   const getDocumentVersions = (documentId) =>
//     api.get(`/documents/${documentId}/versions`);

//   const renameDocument = (documentId, newTitle) =>
//     api.put(`/documents/${documentId}/rename`, { newTitle });

//   const deleteDocument = (documentId) =>
//     api.delete(`/documents/${documentId}`);

//   const toggleDownload = (documentId, canDownload) =>
//     api.patch(`/documents/${documentId}/toggle-download`, { canDownload });



//   /*
//   =========================================
//     APPROVALS
//   =========================================
//   */
//   const startApproval = (documentId) =>
//     api.post(`/approvals/start`, { documentId });

//   const actOnApproval = (approvalId, action, comment = "") =>
//     api.post(`/approvals/${approvalId}/action`, {
//       action,
//       comment,
//     });



//   /*
//   =========================================
//     COMMENTS
//   =========================================
//   */
//   const getComments = (documentId) =>
//     api.get(`/documents/${documentId}/comments`);

//   const addComment = (documentId, message) =>
//     api.post(`/documents/${documentId}/comments`, { message });



//   /*
//   =========================================
//     NOTES API ⭐ NEW
//   =========================================
//   */
//   const getDocumentNotes = (documentId) =>
//     api.get(`/documents/${documentId}/notes`);

//   const updateDocumentNotes = (documentId, notes) =>
//     api.put(`/documents/${documentId}/notes`, { notes });



//   /*
//   =========================================
//     RETURN ALL API FUNCTIONS
//   =========================================
//   */
//   return {
//     uploadDocument,
//     getDocumentsByFolder,
//     getDocumentVersions,
//     renameDocument,
//     deleteDocument,
//     toggleDownload,

//     startApproval,
//     actOnApproval,

//     getComments,
//     addComment,

//     // ⭐ Notes API
//     getDocumentNotes,
//     updateDocumentNotes,
//   };
// };


// // src/api/documentsApi.js
// import { useAxios } from "./axios";

// export const useDocumentsApi = () => {
//   const api = useAxios();

//   /*
//   =========================================
//    DOCUMENT UPLOAD / CRUD
//   =========================================
//   */
//   const uploadDocument = async (formData) => {
//     try {
//       return await api.post("/documents/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     } catch (err) {
//       console.error("Upload failed in API layer:", err);
//       throw err;
//     }
//   };

//   const getDocumentsByFolder = (folderId) =>
//     api.get(`/documents/folder/${folderId}`);

//   const getDocumentVersions = (documentId) =>
//     api.get(`/documents/${documentId}/versions`);

//   const deleteDocument = (documentId) =>
//     api.delete(`/documents/${documentId}`);

//   const toggleDownload = (documentId, canDownload) =>
//     api.patch(`/documents/${documentId}/toggle-download`, { canDownload });



//   /*
//   =========================================
//     APPROVALS
//   =========================================
//   */
//   const startApproval = (documentId) =>
//     api.post(`/approvals/start`, { documentId });

//   const actOnApproval = (approvalId, action, comment = "") =>
//     api.post(`/approvals/${approvalId}/action`, {
//       action,
//       comment,
//     });



//   /*
//   =========================================
//     COMMENTS (Real-Time Chat)
//   =========================================
//   */
//   const getComments = (documentId) =>
//     api.get(`/documents/${documentId}/comments`);

//   const addComment = (documentId, message) =>
//     api.post(`/documents/${documentId}/comments`, { message });



//   /*
//   =========================================
//     NOTES API
//   =========================================
//   */
//   const getDocumentNotes = (documentId) =>
//     api.get(`/documents/${documentId}/notes`);

//   const updateDocumentNotes = (documentId, notes) =>
//     api.put(`/documents/${documentId}/notes`, { notes });



//   /*
//   =========================================
//     EXPORT API FUNCTIONS
//   =========================================
//   */
//   return {
//     uploadDocument,
//     getDocumentsByFolder,
//     getDocumentVersions,
//     deleteDocument,
//     toggleDownload,

//     startApproval,
//     actOnApproval,

//     getComments,
//     addComment,

//     getDocumentNotes,
//     updateDocumentNotes,
//   };
// };


// // src/api/documentsApi.js
// import { useAxios } from "./axios";

// export const useDocumentsApi = () => {
//   const api = useAxios();

//   /*
//   =========================================
//    DOCUMENT UPLOAD / CRUD
//   =========================================
//   */
//   const uploadDocument = async (formData) => {
//     try {
//       return await api.post("/documents/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     } catch (err) {
//       console.error("Upload failed in API layer:", err);
//       throw err;
//     }
//   };

//   const getDocumentsByFolder = (folderId) =>
//     api.get(`/documents/folder/${folderId}`);

//   const getDocumentVersions = (documentId) =>
//     api.get(`/documents/${documentId}/versions`);

//   const deleteDocument = (documentId) =>
//     api.delete(`/documents/${documentId}`);

//   const toggleDownload = (documentId, canDownload) =>
//     api.patch(`/documents/${documentId}/toggle-download`, { canDownload });

//   /*
//   =========================================
//     SIMPLE APPROVAL WORKFLOW (Version Based)
//   =========================================
//   */
//   const approveVersion = (versionId, comment) =>
//     api.post(`/approvals/${versionId}/approve`, { comment });

//   const rejectVersion = (versionId, comment) =>
//     api.post(`/approvals/${versionId}/reject`, { comment });

//   /*
//   =========================================
//     COMMENTS (Real-Time Chat)
//   =========================================
//   */
//   const getComments = (documentId) =>
//     api.get(`/documents/${documentId}/comments`);

//   const addComment = (documentId, message) =>
//     api.post(`/documents/${documentId}/comments`, { message });

//   /*
//   =========================================
//     NOTES API
//   =========================================
//   */
//   const getDocumentNotes = (documentId) =>
//     api.get(`/documents/${documentId}/notes`);

//   const updateDocumentNotes = (documentId, notes) =>
//     api.put(`/documents/${documentId}/notes`, { notes });

//   /*
//   =========================================
//     EXPORT API FUNCTIONS
//   =========================================
//   */
//   return {
//     uploadDocument,
//     getDocumentsByFolder,
//     getDocumentVersions,
//     deleteDocument,
//     toggleDownload,

//     // APPROVALS
//     approveVersion,
//     rejectVersion,

//     // COMMENTS
//     getComments,
//     addComment,

//     // NOTES
//     getDocumentNotes,
//     updateDocumentNotes,
//   };
// };




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
