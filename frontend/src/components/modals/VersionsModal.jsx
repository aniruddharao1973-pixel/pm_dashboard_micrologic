// // src/components/modals/VersionsModal.jsx
// import React from "react";
// import { formatDate } from "../../utils/formatDate";

// const VersionsModal = ({ document, versions = [], onClose }) => {
//   if (!document) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white w-[90%] max-w-xl rounded-xl shadow-xl overflow-hidden">

//         {/* Header */}
//         <div className="flex justify-between items-center px-5 py-3 border-b bg-sky-300">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Version History — {document.title}
//           </h2>

//           <button
//             className="text-gray-600 hover:text-gray-800 text-xl"
//             onClick={onClose}
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
//           {versions.length === 0 ? (
//             <p className="text-gray-500 text-center py-6">
//               No versions found.
//             </p>
//           ) : (
//             versions.map((v) => (
//               <div
//                 key={v.id}
//                 className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
//               >
//                 <div>
//                   <p className="font-semibold text-gray-900">
//                     Version {v.version_number}
//                   </p>

//                   <p className="text-gray-800 text-sm">
//                     Uploaded: {formatDate(v.created_at)}
//                   </p>

//                   <p className="text-gray-800 text-sm">
//                     By: {v.uploaded_by_name || "Unknown"}
//                   </p>

//                   <p className="text-gray-800 text-xs mt-1">
//                     File: {v.filename}
//                   </p>
//                 </div>

//                 {/* ❌ Download Removed */}
//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default VersionsModal;


// // src/components/modals/VersionsModal.jsx
// import React from "react";
// import { formatDate } from "../../utils/formatDate";

// const VersionsModal = ({ document, versions = [], onClose }) => {
//   if (!document) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
//       <div className="w-[90%] max-w-xl rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/90 to-amber-50/90 border border-amber-200 backdrop-blur-xl">

//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-orange-400 to-amber-400">
//           <h2 className="text-xl font-extrabold text-white drop-shadow-lg tracking-wide">
//             Version History — {document.title}
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-white text-2xl font-bold hover:scale-125 transition-transform"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">

//           {versions.length === 0 ? (
//             <p className="text-gray-600 text-center py-8 text-lg font-semibold">
//               No versions found.
//             </p>
//           ) : (
//             versions.map((v) => (
//               <div
//                 key={v.id}
//                 className="p-5 rounded-xl border border-amber-200 bg-white/80 relative"
//               >
//                 {/* RIGHT-SIDE DOWNLOAD BUTTON */}
//                 <a
//                   href={`http://localhost:5000${v.file_path}`}
//                   download={v.filename}
//                   className="
//                     absolute top-5 right-5
//                     flex items-center gap-2
//                     px-4 py-2 text-sm font-bold
//                     bg-gradient-to-r from-blue-500 to-indigo-500
//                     text-white
//                     rounded-xl shadow-md
//                     hover:shadow-lg hover:scale-105
//                     transition-all
//                   "
//                 >
//                   ⬇️ Download
//                 </a>

//                 <p className="font-extrabold text-gray-900 text-lg">
//                   Version {v.version_number}
//                 </p>

//                 <p className="text-amber-700 font-medium text-sm">
//                   Uploaded: {formatDate(v.created_at)}
//                 </p>

//                 <p className="text-orange-700 text-sm">
//                   By: {v.uploaded_by_name || "Unknown User"}
//                 </p>

//                 <p className="text-gray-600 text-xs mt-2 font-medium">
//                   File: {v.filename}
//                 </p>

//                 {/* <p className="text-gray-500 text-xs mt-1">
//                   Hash: {v.file_hash?.slice(0, 6)}...{v.file_hash?.slice(-6)}
//                 </p> */}

//                 {v.version_number === document.current_version && (
//                   <span className="
//                     inline-block mt-4 px-3 py-1 bg-green-100 text-green-600 
//                     text-xs rounded-lg font-semibold border border-green-300
//                   ">
//                     Latest Version
//                   </span>
//                 )}
//               </div>
//             ))
//           )}

//         </div>

//       </div>

//       {/* Fade-in Animation */}
//       <style>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.25s ease-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #f4b26a;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #fff2e0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VersionsModal;



// // src/components/modals/VersionsModal.jsx
// import React from "react";
// import { formatDate } from "../../utils/formatDate";
// import Swal from "sweetalert2";
// import axios from "axios";

// const VersionsModal = ({ document, versions = [], onClose, onRefresh }) => {
//   if (!document) return null;

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token"); // <-- REQUIRED

//   // ------------------------------
//   // Approve / Reject version
//   // ------------------------------
//   const handleApproval = async (versionId, actionType) => {
//     const { value: comment } = await Swal.fire({
//       title: actionType === "approve" ? "Approve Version" : "Reject Version",
//       input: "textarea",
//       inputPlaceholder: "Enter your comment...",
//       inputAttributes: { rows: 4 },
//       showCancelButton: true,
//       confirmButtonText: actionType === "approve" ? "Approve" : "Reject",
//       confirmButtonColor: actionType === "approve" ? "#4CAF50" : "#e74c3c",
//       cancelButtonColor: "#888",
//       inputValidator: (value) => {
//         if (!value) return "Comment is required!";
//       },
//     });

//     if (!comment) return;

//     try {
//       const endpoint =
//         actionType === "approve"
//           ? `/api/approvals/${versionId}/approve`
//           : `/api/approvals/${versionId}/reject`;

//       // 🔥 FINAL FIX — Send token in Authorization header
//       await axios.post(
//         `http://localhost:5000${endpoint}`,
//         { comment },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       Swal.fire({
//         icon: "success",
//         title: `Version ${actionType}d successfully!`,
//         confirmButtonColor: "#4CAF50",
//       });

//       if (onRefresh) onRefresh();
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Action failed",
//         text: err?.response?.data?.message || "Something went wrong.",
//         confirmButtonColor: "#e74c3c",
//       });
//       console.error(err);
//     }
//   };

//   // ------------------------------
//   // Permission Check
//   // ------------------------------
//   const canApproveReject = (uploadedById, uploadedByRole) => {
//     if (!user) return false;

//     // ❌ uploader cannot approve/reject their own upload
//     if (uploadedById === user.id) return false;
//     if (uploadedByRole === user.role) return false;

//     return true;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
//       <div className="w-[90%] max-w-xl rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/90 to-amber-50/90 border border-amber-200 backdrop-blur-xl">

//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-orange-400 to-amber-400">
//           <h2 className="text-xl font-extrabold text-white drop-shadow-lg tracking-wide">
//             Version History — {document.title}
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-white text-2xl font-bold hover:scale-125 transition-transform"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">

//           {versions.length === 0 ? (
//             <p className="text-gray-600 text-center py-8 text-lg font-semibold">
//               No versions found.
//             </p>
//           ) : (
//             versions.map((v) => {
//               const allowAction = canApproveReject(v.uploaded_by, v.uploaded_by_role);

//               return (
//                 <div
//                   key={v.id}
//                   className="p-5 rounded-xl border border-amber-200 bg-white/80 relative"
//                 >
//                   {/* Download */}
//                   <a
//                     href={`http://localhost:5000${v.file_path}`}
//                     download={v.filename}
//                     className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
//                   >
//                     ⬇️ Download
//                   </a>

//                   <p className="font-extrabold text-gray-900 text-lg">
//                     Version {v.version_number}
//                   </p>

//                   <p className="text-amber-700 font-medium text-sm">
//                     Uploaded: {formatDate(v.created_at)}
//                   </p>

//                   <p className="text-orange-700 text-sm">
//                     Uploaded By: {v.uploaded_by_name || "Unknown User"}
//                   </p>

//                   {v.notes && (
//                     <p className="text-gray-700 text-sm mt-2 italic">
//                       “{v.notes}”
//                     </p>
//                   )}

//                   {v.version_number === document.current_version && (
//                     <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-600 text-xs rounded-lg font-semibold border border-green-300">
//                       Latest Version
//                     </span>
//                   )}

//                   {/* Approve / Reject Buttons */}
//                   {allowAction && (
//                     <div className="flex gap-3 mt-4">
//                       <button
//                         onClick={() => handleApproval(v.id, "approve")}
//                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
//                       >
//                         Approve
//                       </button>

//                       <button
//                         onClick={() => handleApproval(v.id, "reject")}
//                         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>

//       </div>

//       {/* Styles */}
//       <style>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.25s ease-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #f4b26a;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #fff2e0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VersionsModal;


// // src/components/modals/VersionsModal.jsx
// import React from "react";
// import { formatDate } from "../../utils/formatDate";
// import Swal from "sweetalert2";
// import axios from "axios";
// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";


// const VersionsModal = ({ document, versions = [], onClose, onRefresh }) => {
//   if (!document) return null;

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   // ------------------------------------------------
//   // PERMISSION: Only opposite role can approve/reject
//   // ------------------------------------------------
//   const canApproveReject = (uploadedById, uploadedByRole, approvalStatus) => {
//     if (!user) return false;

//     const myRole = (user.role || "").toLowerCase();
//     const uploaderRole = (uploadedByRole || "").toLowerCase();

//     // 1. uploader cannot approve themselves
//     if (uploadedById === user.id) return false;
//     if (myRole === uploaderRole) return false;

//     // 2. If already approved/rejected → buttons must hide
//     if (["approved", "rejected"].includes((approvalStatus || "").toLowerCase())) {
//       return false;
//     }

//     return true;
//   };

//   // ----------------------------------------
//   // APPROVE or REJECT a specific version
//   // ----------------------------------------
//   // const handleApproval = async (versionId, actionType) => {
//   //   const { value: comment } = await Swal.fire({
//   //     title: actionType === "approve" ? "Approve Version" : "Reject Version",
//   //     input: "textarea",
//   //     inputPlaceholder: "Enter your comment...",
//   //     inputAttributes: { rows: 4 },
//   //     showCancelButton: true,
//   //     confirmButtonText: actionType === "approve" ? "Approve" : "Reject",
//   //     confirmButtonColor: actionType === "approve" ? "#4CAF50" : "#e74c3c",
//   //     cancelButtonColor: "#888",
//   //     inputValidator: (value) => {
//   //       if (!value) return "Comment is required!";
//   //     },
//   //   });

//   //   if (!comment) return;

//   //   try {
//   //     const url =
//   //       actionType === "approve"
//   //         ? `/api/approvals/${versionId}/approve`
//   //         : `/api/approvals/${versionId}/reject`;

//   //     await axios.post(
//   //       `http://localhost:5000${url}`,
//   //       { comment },
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );

//   //     Swal.fire({
//   //       icon: "success",
//   //       title: `Version ${actionType}d successfully!`,
//   //       confirmButtonColor: "#4CAF50",
//   //     });

//   //     if (onRefresh) onRefresh(); // Reload versions
//   //   } catch (err) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Action failed",
//   //       text: err?.response?.data?.message || "Something went wrong.",
//   //       confirmButtonColor: "#e74c3c",
//   //     });
//   //   }
//   // };

  
//   const handleApproval = async (versionId, actionType) => {
//   const { value: comment } = await Swal.fire({
//     title: actionType === "approve" ? "Approve Version" : "Reject Version",
//     input: "textarea",
//     inputPlaceholder: "Enter your comment...",
//     showCancelButton: true,
//     confirmButtonText: actionType === "approve" ? "Approve" : "Reject",
//     confirmButtonColor: actionType === "approve" ? "#4CAF50" : "#e74c3c",
//     inputValidator: (v) => (!v ? "Comment required" : null),
//   });

//   if (!comment) return;

//   try {
//       const endpoint =
//         actionType === "approve"
//           ? `/api/approvals/version/${versionId}/approve`
//           : `/api/approvals/version/${versionId}/reject`;

//       await axios.post(
//         `${API_BASE}${endpoint}`,
//         { comment },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );


//     Swal.fire({
//       icon: "success",
//       title: `Version ${actionType}d successfully`,
//     });

//     onRefresh && onRefresh();
//   } catch (err) {
//     Swal.fire({
//       icon: "error",
//       title: "Action failed",
//       text: err?.response?.data?.message || "Something went wrong.",
//     });
//   }
// };



//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
//       <div className="w-[90%] max-w-xl rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/90 to-amber-50/90 border border-amber-200 backdrop-blur-xl">

//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-orange-400 to-amber-400">
//           <h2 className="text-xl font-extrabold text-white drop-shadow-lg tracking-wide">
//             Version History — {document.title}
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-white text-2xl font-bold hover:scale-125 transition-transform"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">

//           {versions.length === 0 ? (
//             <p className="text-gray-600 text-center py-8 text-lg font-semibold">
//               No versions found.
//             </p>
//           ) : (
//             versions.map((v) => {
//               const status = (v.approval_status || "pending").toLowerCase();

//               const showButtons = canApproveReject(
//                 v.uploaded_by,
//                 v.uploaded_by_role,
//                 v.approval_status
//               );

//               return (
//                 <div
//                   key={v.id}
//                   className="p-5 rounded-xl border border-amber-200 bg-white/80 relative"
//                 >
//                   {/* Download */}
//                   {/* <a
//                     href={`http://localhost:5000${v.file_path}`}
//                     download={v.filename}
//                     className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
//                   >
//                     ⬇️ Download
//                   </a> */}

//                                     {/* DOWNLOAD BUTTON — Restricted if admin disabled downloads */}
//                   {(user.role === "admin" || document.can_download) ? (
//                     <a
//                       href={`http://localhost:5000${v.file_path}`}
//                       download={v.filename}
//                       className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 
//                                 text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-500 
//                                 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 
//                                 transition-all"
//                     >
//                       ⬇️ Download
//                     </a>
//                   ) : (
//                     <div
//                       className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 
//                                 text-sm font-bold bg-gray-300 text-gray-600 rounded-xl 
//                                 shadow cursor-not-allowed"
//                     >
//                       🚫 No Download
//                     </div>
//                   )}


//                   {/* Version Info */}
//                   <p className="font-extrabold text-gray-900 text-lg">
//                     Version {v.version_number}
//                   </p>

//                   <p className="text-amber-700 font-medium text-sm">
//                     Uploaded: {formatDate(v.created_at)}
//                   </p>

//                   <p className="text-orange-700 text-sm">
//                     Uploaded By: {v.uploaded_by_name || "Unknown User"}
//                   </p>

//                   {/* Upload comment (only before approval) */}
//                   {/* {v.upload_comment && !v.approval_status && (
//                     <p className="text-gray-700 text-sm mt-2 italic">
//                       “{v.upload_comment}”
//                     </p>
//                   )} */}
//                   {v.upload_comment && (
//                   <p className="text-gray-700 text-sm mt-2 italic">
//                     “{v.upload_comment}”
//                   </p>
//                 )}


//                   {/* Approval details */}
//                   {v.approval_status && (
//                     <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
//                       <p className="text-green-700 text-sm font-semibold">
//                         Status: {v.approval_status.toUpperCase()}
//                       </p>
//                       <p className="text-green-800 text-sm mt-1">
//                         Approved By: {v.approved_by_name}
//                       </p>
//                       <p className="text-gray-700 text-sm italic mt-1">
//                         “{v.approval_comment}”
//                       </p>
//                     </div>
//                   )}

//                   {v.version_number === document.current_version && (
//                     <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-600 text-xs rounded-lg font-semibold border border-green-300">
//                       Latest Version
//                     </span>
//                   )}

//                   {/* Approve / Reject Buttons */}
//                   {/* Approve / Reject Buttons (ONLY for latest version) */}
//                   {showButtons && v.version_number === document.current_version && (
//                     <div className="flex gap-3 mt-4">
                      
//                       <button
//                         onClick={() => handleApproval(v.id, "approve")}
//                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
//                       >
//                         Approve
//                       </button>

//                       <button
//                         onClick={() => handleApproval(v.id, "reject")}
//                         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"
//                       >
//                         Reject
//                       </button>

//                     </div>
//                   )}

//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>

//       {/* Custom Scrollbar Styles */}
//       <style>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.25s ease-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #f4b26a;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #fff2e0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VersionsModal;


// // src/components/modals/VersionsModal.jsx
// import React from "react";
// import { formatDate } from "../../utils/formatDate";
// import Swal from "sweetalert2";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const VersionsModal = ({ document, versions = [], onClose, onRefresh }) => {
//   if (!document) return null;

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   // ⭐ LOCAL STATE for instant UI update
//   const [localVersions, setLocalVersions] = React.useState(versions);

//   React.useEffect(() => {
//     setLocalVersions(versions);
//   }, [versions]);

//   // ------------------------------------------------
//   // PERMISSION RULES
//   // ------------------------------------------------
//   const canApproveReject = (uploadedById, uploadedByRole, approvalStatus) => {
//     if (!user) return false;

//     const myRole = (user.role || "").toLowerCase();
//     const uploaderRole = (uploadedByRole || "").toLowerCase();

//     if (uploadedById === user.id) return false;
//     if (myRole === uploaderRole) return false;

//     if (["approved", "rejected"].includes((approvalStatus || "").toLowerCase()))
//       return false;

//     return true;
//   };

//   // ----------------------------------------
//   // APPROVE / REJECT
//   // ----------------------------------------
//   const handleApproval = async (versionId, actionType) => {
//     const { value: comment } = await Swal.fire({
//       title: actionType === "approve" ? "Approve Version" : "Reject Version",
//       input: "textarea",
//       inputPlaceholder: "Enter your comment...",
//       showCancelButton: true,
//       confirmButtonText: actionType === "approve" ? "Approve" : "Reject",
//       confirmButtonColor: actionType === "approve" ? "#4CAF50" : "#e74c3c",
//       inputValidator: (v) => (!v ? "Comment required" : null),
//     });

//     if (!comment) return;

//     try {
//       const endpoint =
//         actionType === "approve"
//           ? `/api/approvals/version/${versionId}/approve`
//           : `/api/approvals/version/${versionId}/reject`;

//       await axios.post(
//         `${API_BASE}${endpoint}`,
//         { comment },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       Swal.fire({
//         icon: "success",
//         title: `Version ${actionType}d successfully`,
//       });

//       // ⭐ INSTANT UI UPDATE → hide buttons + show approval info
//       setLocalVersions((prev) =>
//         prev.map((v) =>
//           v.id === versionId
//             ? {
//                 ...v,
//                 approval_status: actionType,
//                 approval_comment: comment,
//                 approved_by_name: user.name,

//                 // 💥 THIS LINE instantly hides approve/reject buttons
//                 uploaded_by_role: user.role,
//               }
//             : v
//         )
//       );

//       onRefresh && onRefresh();
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Action failed",
//         text: err?.response?.data?.message || "Something went wrong.",
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
//       <div className="w-[90%] max-w-xl rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/90 to-amber-50/90 border border-amber-200 backdrop-blur-xl">

//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 
//      bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600">

//           <h2 className="text-xl font-extrabold text-white drop-shadow-lg tracking-wide">
//             Version History — {document.title}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-white text-2xl font-bold hover:scale-125 transition-transform"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">

//           {localVersions.length === 0 ? (
//             <p className="text-gray-600 text-center py-8 text-lg font-semibold">
//               No versions found.
//             </p>
//           ) : (
//             localVersions.map((v) => {
//               const showButtons = canApproveReject(
//                 v.uploaded_by,
//                 v.uploaded_by_role,
//                 v.approval_status
//               );

//               return (
//                 <div
//                   key={v.id}
//                   className="p-5 rounded-xl border border-amber-200 bg-white/80 relative"
//                 >
// {/* Download */}
// {(user.role === "admin" || document.can_download) ? (
//   <button
//     onClick={async () => {
//       try {
//         const url = `${API_BASE}/api/documents/download/${v.id}`;
//         console.log("DOWNLOAD URL:", url);

//         const response = await axios.get(url, {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         const original = v.original_filename || v.filename || "file.pdf";
//         const blob = new Blob([response.data], { type: response.data.type });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = original;
//         link.click();
//       } catch (err) {
//         console.error("DOWNLOAD ERROR:", err);
//         Swal.fire("Error", "Unable to download file", "error");
//       }
//     }}
//     className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 
//       text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-500 
//       text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 
//       transition-all"
//   >
//     ⬇️ Download
//   </button>
// ) : (
//   <div
//     className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 
//       text-sm font-bold bg-gray-300 text-gray-600 rounded-xl cursor-not-allowed"
//   >
//     🚫 No Download
//   </div>
// )}


//                   {/* Version Info */}
//                   <p className="font-extrabold text-gray-900 text-lg">
//                     Version {v.version_number}
//                   </p>

//                   <p className="text-amber-700 font-medium text-sm">
//                     Uploaded: {formatDate(v.created_at)}
//                   </p>

//                   <p className="text-orange-700 text-sm">
//                     Uploaded By: {v.uploaded_by_name || "Unknown User"}
//                   </p>

//                   {v.upload_comment && (
//                     <p className="text-gray-700 text-sm mt-2 italic">
//                       “{v.upload_comment}”
//                     </p>
//                   )}

//                   {/* Approval Info */}
//                   {v.approval_status && (
//                     <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
//                       <p className="text-green-700 text-sm font-semibold">
//                         Status: {v.approval_status.toUpperCase()}
//                       </p>
//                       <p className="text-green-800 text-sm mt-1">
//                         Approved By: {v.approved_by_name}
//                       </p>
//                       <p className="text-gray-700 text-sm italic mt-1">
//                         “{v.approval_comment}”
//                       </p>
//                     </div>
//                   )}

//                                     {/* 🔍 CHANGE LOG – Only if available */}
// {/* 🔍 CHANGE LOG – Only if available */}
// {v.change_log && v.change_log.changes?.length > 0 && (
//   <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//     <p className="text-blue-700 font-semibold text-sm">Detected Changes:</p>

//     {/* Changed By */}
//     {v.change_log.changed_by && (
//       <p className="text-sm text-gray-700 mt-2">
//         <b>Changed by:</b> {v.change_log.changed_by.name} ({v.change_log.changed_by.role})
//       </p>
//     )}

//     <div className="mt-3 space-y-3 text-sm">
//       {v.change_log.changes.map((c, idx) => (
//         <div key={idx} className="border-b pb-2">
          
//           {/* WORD CHANGE */}
//           {c.type === "word" && (
//             <>
//               <p className="font-semibold text-green-700">🟩 Word Change</p>
//               <p className="text-gray-600 ml-2">
//                 <b>Changed from:</b> <span className="text-red-600">"{c.old}"</span>
//               </p>
//               <p className="text-gray-600 ml-2">
//                 <b>Changed to:</b> <span className="text-green-600">"{c.new}"</span>
//               </p>
//             </>
//           )}

//           {/* SENTENCE CHANGE */}
//           {c.type === "sentence" && (
//             <>
//               <p className="font-semibold text-blue-700">🟦 Sentence Change</p>
//               <p className="text-gray-600 ml-2">
//                 <b>Changed from:</b> <span className="text-red-600">"{c.old}"</span>
//               </p>
//               <p className="text-gray-600 ml-2">
//                 <b>Changed to:</b> <span className="text-green-600">"{c.new}"</span>
//               </p>
//             </>
//           )}

//           {/* PARAGRAPH CHANGE */}
//           {c.type === "paragraph" && (
//             <>
//               <p className="font-semibold text-red-700">🟥 Paragraph Change</p>
//               <p className="text-gray-600 ml-2 whitespace-pre-line">
//                 <b>Changed from:</b>
//                 <br />
//                 <span className="text-red-600">{c.old}</span>
//               </p>
//               <p className="text-gray-600 ml-2 whitespace-pre-line">
//                 <b>Changed to:</b>
//                 <br />
//                 <span className="text-green-600">{c.new}</span>
//               </p>
//             </>
//           )}

//         </div>
//       ))}
//     </div>
//   </div>
// )}



//                   {v.version_number === document.current_version && (
//                     <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-600 text-xs rounded-lg font-semibold border border-green-300">
//                       Latest Version
//                     </span>
//                   )}

//                   {/* ⭐ Approve / Reject buttons */}
//                   {showButtons && v.version_number === document.current_version && (
//                     <div className="flex gap-3 mt-4">
//                       <button
//                         onClick={() => handleApproval(v.id, "approve")}
//                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
//                       >
//                         Approve
//                       </button>

//                       <button
//                         onClick={() => handleApproval(v.id, "reject")}
//                         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>

//       {/* Scrollbar */}
//       <style>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.25s ease-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #f4b26a;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #fff2e0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VersionsModal;




// // src/components/modals/VersionsModal.jsx
// import React from "react";
// import { formatDate } from "../../utils/formatDate";
// import Swal from "sweetalert2";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const VersionsModal = ({ document: doc, versions = [], onClose, onRefresh }) => {
//   if (!doc) return null;

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const [localVersions, setLocalVersions] = React.useState(versions);

//   React.useEffect(() => {
//     setLocalVersions(versions);
//   }, [versions]);

//   const canApproveReject = (uploadedById, uploadedByRole, approvalStatus) => {
//     if (!user) return false;

//     const myRole = (user.role || "").toLowerCase();
//     const uploaderRole = (uploadedByRole || "").toLowerCase();

//     if (uploadedById === user.id) return false;
//     if (myRole === uploaderRole) return false;
//     if (["approved", "rejected"].includes((approvalStatus || "").toLowerCase()))
//       return false;

//     return true;
//   };

//   const handleApproval = async (versionId, actionType) => {
//     const { value: comment } = await Swal.fire({
//       title: actionType === "approve" ? "Approve Version" : "Reject Version",
//       input: "textarea",
//       inputPlaceholder: "Enter your comment...",
//       showCancelButton: true,
//       confirmButtonText: actionType === "approve" ? "Approve" : "Reject",
//       confirmButtonColor: actionType === "approve" ? "#4CAF50" : "#e74c3c",
//       inputValidator: (v) => (!v ? "Comment required" : null),
//     });

//     if (!comment) return;

//     try {
//       const endpoint =
//         actionType === "approve"
//           ? `/api/approvals/version/${versionId}/approve`
//           : `/api/approvals/version/${versionId}/reject`;

//       await axios.post(
//         `${API_BASE}${endpoint}`,
//         { comment },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       Swal.fire({
//         icon: "success",
//         title: `Version ${actionType}d successfully`,
//       });

//       setLocalVersions((prev) =>
//         prev.map((v) =>
//           v.id === versionId
//             ? {
//                 ...v,
//                 approval_status: actionType,
//                 approval_comment: comment,
//                 approved_by_name: user.name,
//                 uploaded_by_role: user.role,
//               }
//             : v
//         )
//       );

//       onRefresh && onRefresh();
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Action failed",
//         text: err?.response?.data?.message || "Something went wrong.",
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
//       <div className="w-[90%] max-w-xl rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/90 to-amber-50/90 border border-amber-200 backdrop-blur-xl">

//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600">
//           <h2 className="text-xl font-extrabold text-white drop-shadow-lg tracking-wide">
//             Version History — {doc.title}
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-white text-2xl font-bold hover:scale-125 transition-transform"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">

//           {localVersions.length === 0 ? (
//             <p className="text-gray-600 text-center py-8 text-lg font-semibold">
//               No versions found.
//             </p>
//           ) : (
//             localVersions.map((v) => {
//               const showButtons = canApproveReject(
//                 v.uploaded_by,
//                 v.uploaded_by_role,
//                 v.approval_status
//               );

//               return (
//                 <div
//                   key={v.id}
//                   className="p-5 rounded-xl border border-amber-200 bg-white/80 relative"
//                 >

//                   {/* DOWNLOAD BUTTON (FIXED) */}
//                   {(user.role === "admin" || doc.can_download) ? (
//                     <button
//                       onClick={async () => {
//                         try {
//                           const url = `${API_BASE}/api/documents/download/${v.id}`;
//                           console.log("DOWNLOAD URL:", url);

//                           const response = await axios.get(url, {
//                             responseType: "blob",
//                             headers: { Authorization: `Bearer ${token}` },
//                           });

//                           const filename =
//                             v.original_filename || v.filename || "file.pdf";

//                           const blob = new Blob([response.data], {
//                             type: response.data.type,
//                           });

//                           const link = window.document.createElement("a");
//                           link.href = URL.createObjectURL(blob);
//                           link.download = filename;
//                           link.click();
//                         } catch (err) {
//                           console.error("DOWNLOAD ERROR:", err);
//                           Swal.fire("Error", "Unable to download file", "error");
//                         }
//                       }}
//                       className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 
//                         text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-500 
//                         text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 
//                         transition-all"
//                     >
//                       ⬇️ Download
//                     </button>
//                   ) : (
//                     <div
//                       className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 
//                         text-sm font-bold bg-gray-300 text-gray-600 rounded-xl cursor-not-allowed"
//                     >
//                       🚫 No Download
//                     </div>
//                   )}

//                   {/* Version Info */}
//                   <p className="font-extrabold text-gray-900 text-lg">
//                     Version {v.version_number}
//                   </p>

//                   <p className="text-amber-700 font-medium text-sm">
//                     Uploaded: {formatDate(v.created_at)}
//                   </p>

//                   <p className="text-orange-700 text-sm">
//                     Uploaded By: {v.uploaded_by_name || "Unknown User"}
//                   </p>

//                   {v.upload_comment && (
//                     <p className="text-gray-700 text-sm mt-2 italic">
//                       “{v.upload_comment}”
//                     </p>
//                   )}

//                   {v.approval_status && (
//                     <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
//                       <p className="text-green-700 text-sm font-semibold">
//                         Status: {v.approval_status.toUpperCase()}
//                       </p>
//                       <p className="text-green-800 text-sm mt-1">
//                         Approved By: {v.approved_by_name}
//                       </p>
//                       <p className="text-gray-700 text-sm italic mt-1">
//                         “{v.approval_comment}”
//                       </p>
//                     </div>
//                   )}

//                   {/* Change Log */}
//                   {v.change_log && v.change_log.changes?.length > 0 && (
//                     <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                       <p className="text-blue-700 font-semibold text-sm">
//                         Detected Changes:
//                       </p>

//                       {v.change_log.changed_by && (
//                         <p className="text-sm text-gray-700 mt-2">
//                           <b>Changed by:</b> {v.change_log.changed_by.name} ({v.change_log.changed_by.role})
//                         </p>
//                       )}

//                       <div className="mt-3 space-y-3 text-sm">
//                         {v.change_log.changes.map((c, idx) => (
//                           <div key={idx} className="border-b pb-2">

//                             {c.type === "word" && (
//                               <>
//                                 <p className="font-semibold text-green-700">🟩 Word Change</p>
//                                 <p className="text-gray-600 ml-2">
//                                   <b>Changed from:</b> <span className="text-red-600">"{c.old}"</span>
//                                 </p>
//                                 <p className="text-gray-600 ml-2">
//                                   <b>Changed to:</b> <span className="text-green-600">"{c.new}"</span>
//                                 </p>
//                               </>
//                             )}

//                             {c.type === "sentence" && (
//                               <>
//                                 <p className="font-semibold text-blue-700">🟦 Sentence Change</p>
//                                 <p className="text-gray-600 ml-2">
//                                   <b>Changed from:</b> <span className="text-red-600">"{c.old}"</span>
//                                 </p>
//                                 <p className="text-gray-600 ml-2">
//                                   <b>Changed to:</b> <span className="text-green-600">"{c.new}"</span>
//                                 </p>
//                               </>
//                             )}

//                             {c.type === "paragraph" && (
//                               <>
//                                 <p className="font-semibold text-red-700">🟥 Paragraph Change</p>
//                                 <p className="text-gray-600 ml-2 whitespace-pre-line">
//                                   <b>Changed from:</b>
//                                   <br />
//                                   <span className="text-red-600">{c.old}</span>
//                                 </p>
//                                 <p className="text-gray-600 ml-2 whitespace-pre-line">
//                                   <b>Changed to:</b>
//                                   <br />
//                                   <span className="text-green-600">{c.new}</span>
//                                 </p>
//                               </>
//                             )}

//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {v.version_number === doc.current_version && (
//                     <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-600 text-xs rounded-lg font-semibold border border-green-300">
//                       Latest Version
//                     </span>
//                   )}

//                   {/* Approve / Reject */}
//                   {showButtons && v.version_number === doc.current_version && (
//                     <div className="flex gap-3 mt-4">
//                       <button
//                         onClick={() => handleApproval(v.id, "approve")}
//                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
//                       >
//                         Approve
//                       </button>

//                       <button
//                         onClick={() => handleApproval(v.id, "reject")}
//                         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   )}

//                 </div>
//               );
//             })
//           )}

//         </div>
//       </div>

//       {/* Scrollbar CSS */}
//       <style>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.25s ease-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #f4b26a;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #fff2e0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VersionsModal;



// // src/components/modals/VersionsModal.jsx
// import React from "react";
// import { formatDate } from "../../utils/formatDate";
// import Swal from "sweetalert2";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const VersionsModal = ({ document: doc, versions = [], onClose, onRefresh }) => {
//   if (!doc) return null;

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const [localVersions, setLocalVersions] = React.useState(versions);

//   React.useEffect(() => {
//     setLocalVersions(versions);
//   }, [versions]);

//   const canApproveReject = (uploadedById, uploadedByRole, approvalStatus) => {
//     if (!user) return false;

//     const myRole = (user.role || "").toLowerCase();
//     const uploaderRole = (uploadedByRole || "").toLowerCase();

//     if (uploadedById === user.id) return false;
//     if (myRole === uploaderRole) return false;
//     if (["approved", "rejected"].includes((approvalStatus || "").toLowerCase()))
//       return false;

//     return true;
//   };

//   const handleApproval = async (versionId, actionType) => {
//     const { value: comment } = await Swal.fire({
//       title: actionType === "approve" ? "Approve Version" : "Reject Version",
//       input: "textarea",
//       inputPlaceholder: "Enter your comment...",
//       showCancelButton: true,
//       confirmButtonText: actionType === "approve" ? "Approve" : "Reject",
//       confirmButtonColor: actionType === "approve" ? "#4CAF50" : "#e74c3c",
//       inputValidator: (v) => (!v ? "Comment required" : null),
//     });

//     if (!comment) return;

//     try {
//       const endpoint =
//         actionType === "approve"
//           ? `/api/approvals/version/${versionId}/approve`
//           : `/api/approvals/version/${versionId}/reject`;

//       await axios.post(
//         `${API_BASE}${endpoint}`,
//         { comment },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       Swal.fire({
//         icon: "success",
//         title: `Version ${actionType}d successfully`,
//       });

//       setLocalVersions((prev) =>
//         prev.map((v) =>
//           v.id === versionId
//             ? {
//                 ...v,
//                 approval_status: actionType,
//                 approval_comment: comment,
//                 approved_by_name: user.name,
//                 uploaded_by_role: user.role,
//               }
//             : v
//         )
//       );

//       onRefresh && onRefresh();
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Action failed",
//         text: err?.response?.data?.message || "Something went wrong.",
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
//       <div className="w-[90%] max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/90 to-amber-50/90 border border-amber-200 backdrop-blur-xl">

//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600">
//           <h2 className="text-xl font-extrabold text-white drop-shadow-lg tracking-wide">
//             Version History — {doc.title}
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-white text-2xl font-bold hover:scale-125 transition-transform"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 max-h-[70vh] overflow-y-auto custom-scrollbar">

//           {localVersions.length === 0 ? (
//             <p className="text-gray-600 text-center py-8 text-lg font-semibold">
//               No versions found.
//             </p>
//           ) : (
//             <table className="w-full bg-white rounded-xl shadow border border-gray-200">
//               <thead className="bg-gray-100 border-b sticky top-0 z-10">
//                 <tr className="text-left text-sm text-gray-700">
//                   <th className="p-3 w-10">#</th>
//                   <th className="p-3">Version</th>
//                   <th className="p-3">Date</th>
//                   <th className="p-3">Uploaded By</th>
//                   <th className="p-3">Summary</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {localVersions.map((v, index) => {
//                   const showButtons = canApproveReject(
//                     v.uploaded_by,
//                     v.uploaded_by_role,
//                     v.approval_status
//                   );

//                   return (
//                     <React.Fragment key={v.id}>
//                       {/* MAIN ROW */}
//                       <tr className="border-b hover:bg-gray-50 text-sm">
//                         <td className="p-3 font-medium">{index + 1}</td>

//                         <td className="p-3 font-bold text-gray-900">
//                           Version {v.version_number}
//                           {v.version_number === doc.current_version && (
//                             <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-300">
//                               Latest
//                             </span>
//                           )}
//                         </td>

//                         <td className="p-3">{formatDate(v.created_at)}</td>

//                         <td className="p-3">{v.uploaded_by_name || "Unknown"}</td>

//                         <td className="p-3 italic">
//                           {v.upload_comment ? `“${v.upload_comment}”` : "-"}
//                         </td>

//                         <td className="p-3 text-center flex justify-center gap-2">

//                           {/* DOWNLOAD BUTTON */}
//                           {(user.role === "admin" || doc.can_download) ? (
//                             <button
//                               onClick={async () => {
//                                 try {
//                                   const url = `${API_BASE}/api/documents/download/${v.id}`;
//                                   const response = await axios.get(url, {
//                                     responseType: "blob",
//                                     headers: { Authorization: `Bearer ${token}` },
//                                   });

//                                   const filename =
//                                     v.original_filename || v.filename || "file.pdf";

//                                   const blob = new Blob([response.data]);
//                                   const link = document.createElement("a");
//                                   link.href = URL.createObjectURL(blob);
//                                   link.download = filename;
//                                   link.click();
//                                 } catch (err) {
//                                   Swal.fire("Error", "Unable to download file", "error");
//                                 }
//                               }}
//                               className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                             >
//                               Download
//                             </button>
//                           ) : (
//                             <span className="px-3 py-1 bg-gray-300 text-gray-600 rounded">
//                               No Download
//                             </span>
//                           )}

//                           {/* APPROVE */}
//                           {showButtons && v.version_number === doc.current_version && (
//                             <button
//                               onClick={() => handleApproval(v.id, "approve")}
//                               className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                             >
//                               Approve
//                             </button>
//                           )}

//                           {/* REJECT */}
//                           {showButtons && v.version_number === doc.current_version && (
//                             <button
//                               onClick={() => handleApproval(v.id, "reject")}
//                               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                             >
//                               Reject
//                             </button>
//                           )}

//                         </td>
//                       </tr>

//                       {/* APPROVAL STATUS */}
//                       {v.approval_status && (
//                         <tr className="bg-green-50 border-b">
//                           <td></td>
//                           <td colSpan={5} className="p-4 text-sm">
//                             <p className="text-green-700 font-semibold">
//                               Status: {v.approval_status.toUpperCase()}
//                             </p>
//                             <p className="text-green-800 mt-1">
//                               Approved By: {v.approved_by_name}
//                             </p>
//                             <p className="italic text-gray-700 mt-1">
//                               “{v.approval_comment}”
//                             </p>
//                           </td>
//                         </tr>
//                       )}

//                       {/* CHANGE LOG */}
//                       {v.change_log && v.change_log.changes?.length > 0 && (
//                         <tr className="bg-blue-50 border-b">
//                           <td></td>
//                           <td colSpan={5} className="p-4">
//                             <p className="text-blue-700 font-semibold text-sm">
//                               Detected Changes:
//                             </p>

//                             {v.change_log.changed_by && (
//                               <p className="text-sm text-gray-700 mt-2">
//                                 <b>Changed by:</b> {v.change_log.changed_by.name} (
//                                 {v.change_log.changed_by.role})
//                               </p>
//                             )}

//                             <div className="mt-3 space-y-3 text-sm">
//                               {v.change_log.changes.map((c, idx) => (
//                                 <div key={idx} className="border-b pb-2">

//                                   {c.type === "word" && (
//                                     <>
//                                       <p className="font-semibold text-green-700">🟩 Word Change</p>
//                                       <p className="text-gray-600 ml-2">
//                                         <b>From:</b>{" "}
//                                         <span className="text-red-600">"{c.old}"</span>
//                                       </p>
//                                       <p className="text-gray-600 ml-2">
//                                         <b>To:</b>{" "}
//                                         <span className="text-green-600">"{c.new}"</span>
//                                       </p>
//                                     </>
//                                   )}

//                                   {c.type === "sentence" && (
//                                     <>
//                                       <p className="font-semibold text-blue-700">🟦 Sentence Change</p>
//                                       <p className="text-gray-600 ml-2">
//                                         <b>From:</b>{" "}
//                                         <span className="text-red-600">"{c.old}"</span>
//                                       </p>
//                                       <p className="text-gray-600 ml-2">
//                                         <b>To:</b>{" "}
//                                         <span className="text-green-600">"{c.new}"</span>
//                                       </p>
//                                     </>
//                                   )}

//                                   {c.type === "paragraph" && (
//                                     <>
//                                       <p className="font-semibold text-red-700">🟥 Paragraph Change</p>
//                                       <p className="text-gray-600 ml-2 whitespace-pre-line">
//                                         <b>From:</b>
//                                         <br />
//                                         <span className="text-red-600">{c.old}</span>
//                                       </p>
//                                       <p className="text-gray-600 ml-2 whitespace-pre-line">
//                                         <b>To:</b>
//                                         <br />
//                                         <span className="text-green-600">{c.new}</span>
//                                       </p>
//                                     </>
//                                   )}

//                                 </div>
//                               ))}
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}

//         </div>
//       </div>

//       {/* Scrollbar CSS */}
//       <style>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.25s ease-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #f4b26a;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #fff2e0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VersionsModal;




// src/components/modals/VersionsModal.jsx
import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils/formatDate";
import Swal from "sweetalert2";
import axios from "axios";

// Heroicons
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const VersionsModal = ({ document: doc, versions = [], onClose, onRefresh }) => {
  if (!doc) return null;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [localVersions, setLocalVersions] = useState(versions);
  const [expandedRow, setExpandedRow] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(localVersions.length / rowsPerPage);

  const paginatedVersions = localVersions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    setLocalVersions(versions);
  }, [versions]);



  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="w-[90%] max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/90 to-amber-50/90 border border-amber-200 backdrop-blur-xl">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600">
          <h2 className="text-xl font-extrabold text-white drop-shadow-lg tracking-wide">
            Version History — {doc.title}
          </h2>

          <button
            onClick={onClose}
            className="text-white text-2xl font-bold hover:scale-125 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 max-h-[70vh] overflow-y-auto custom-scrollbar">

          {localVersions.length === 0 ? (
            <p className="text-gray-600 text-center py-8 text-lg font-semibold">
              No versions found.
            </p>
          ) : (
            <table className="w-full bg-white rounded-xl shadow border border-gray-200">
              <thead className="bg-gray-100 border-b sticky top-0 z-50">
                <tr className="text-left text-sm text-gray-700">
                  <th className="p-3 w-10">#</th>
                  <th className="p-3">Version</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Uploaded By</th>
                  <th className="p-3">Summary</th>
                  <th className="p-3 text-center w-28">Status</th> 
                  <th className="p-3 text-center w-10"></th>

                </tr>
              </thead>

              <tbody>
                {paginatedVersions.map((v, index) => {


                  const isLatest = v.version_number === doc.current_version;
                  const isExpanded = expandedRow === v.id;

                  return (
                    <React.Fragment key={v.id}>
                      {/* MAIN ROW */}
                      <tr
                        onClick={() => toggleRow(v.id)}
                        className={`border-b cursor-pointer transition 
                        ${isExpanded ? "bg-blue-50" : "hover:bg-gray-50"}
                        ${isLatest ? "bg-green-50" : ""}`}
                      >
                        <td className="p-3 font-medium">
                          {(currentPage - 1) * rowsPerPage + index + 1}
                        </td>

                        <td className="p-3 font-bold text-gray-900 flex items-center gap-2">
                          Version {v.version_number}
                          {isLatest && (
                            <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded">
                              Latest
                            </span>
                          )}
                        </td>

                        <td className="p-3">{formatDate(v.created_at)}</td>

                        <td className="p-3">{v.uploaded_by_name || "Unknown"}</td>

                        <td className="p-3 italic">
                          {v.upload_comment ? `“${v.upload_comment}”` : "-"}
                        </td>

                                              <td className="p-3 text-center">
                        {!v.approval_status && (
                          <span className="text-gray-400 text-xs">—</span>
                        )}

                        {v.approval_status === "approved" && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            APPROVED
                          </span>
                        )}

                        {v.approval_status === "rejected" && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                            REJECTED
                          </span>
                        )}

                        {v.approval_status === "pending" && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                            PENDING
                          </span>
                        )}
                      </td>

                        {/* ACTION BUTTONS */}
                        <td
                          className="p-3 text-center flex justify-center gap-3"
                          onClick={(e) => e.stopPropagation()} // prevent expanding
                        >
                          {/* DOWNLOAD BUTTON */}
                          {(user.role === "admin" || user.role === "techsales" || doc.can_download) ? (
                            <button
                              onClick={async () => {
                                try {
                                  const url = `${API_BASE}/api/documents/download/${v.id}`;
                                  const response = await axios.get(url, {
                                    responseType: "blob",
                                    headers: { Authorization: `Bearer ${token}` },
                                  });

                                  const filename =
                                    v.original_filename || v.filename || "file.pdf";

                                  const blob = new Blob([response.data]);
                                  const link = document.createElement("a");
                                  link.href = URL.createObjectURL(blob);
                                  link.download = filename;
                                  link.click();
                                } catch (err) {
                                  Swal.fire("Error", "Unable to download file", "error");
                                }
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow hover:scale-105 transition"
                            >
                              <ArrowDownTrayIcon className="h-5 w-5" />
                              Download
                            </button>
                          ) : (
                            <span className="px-3 py-1 bg-gray-300 text-gray-600 rounded">
                              No Download
                            </span>
                          )}

                        </td>

                        {/* Expand / Collapse Icon */}
                        <td className="text-center">
                          {isExpanded ? (
                            <ChevronUpIcon className="h-6 w-6 text-gray-700" />
                          ) : (
                            <ChevronDownIcon className="h-6 w-6 text-gray-700" />
                          )}
                        </td>
                      </tr>

                      {/* EXPANDED PANEL */}
                      {isExpanded && (
                        <tr className="bg-gray-50 border-b transition-all duration-300">
                          <td></td>
                          <td colSpan={6} className="p-5 space-y-5 text-sm">

                            {/* APPROVAL STATUS */}
                            {v.approval_status && (
                              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-700 font-semibold">
                                  Status: {v.approval_status.toUpperCase()}
                                </p>
                                <p className="text-green-800 mt-1">
                                  Approved By: {v.approved_by_name}
                                </p>
                                <p className="italic text-gray-700 mt-1">
                                  “{v.approval_comment}”
                                </p>
                              </div>
                            )}

                            {/* CHANGE LOG */}
                            {v.change_log &&
                              v.change_log.changes?.length > 0 && (
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                  <p className="text-blue-700 font-semibold">Detected Changes:</p>

                                  {v.change_log.changed_by && (
                                    <p className="text-gray-700 mt-1">
                                      <b>Changed by:</b>{" "}
                                      {v.change_log.changed_by.name} (
                                      {v.change_log.changed_by.role})
                                    </p>
                                  )}

                                  <div className="mt-3 space-y-3">
                                    {v.change_log.changes.map((c, idx) => (
                                      <div
                                        key={idx}
                                        className="border-b pb-2 text-sm"
                                      >
                                        {c.type === "word" && (
                                          <>
                                            <p className="font-semibold text-green-700">
                                              🟩 Word Change
                                            </p>
                                            <p className="ml-2 text-gray-600">
                                              <b>From:</b>{" "}
                                              <span className="text-red-600">
                                                "{c.old}"
                                              </span>
                                            </p>
                                            <p className="ml-2 text-gray-600">
                                              <b>To:</b>{" "}
                                              <span className="text-green-600">
                                                "{c.new}"
                                              </span>
                                            </p>
                                          </>
                                        )}

                                        {c.type === "sentence" && (
                                          <>
                                            <p className="font-semibold text-blue-700">
                                              🟦 Sentence Change
                                            </p>
                                            <p className="ml-2 text-gray-600">
                                              <b>From:</b>{" "}
                                              <span className="text-red-600">
                                                "{c.old}"
                                              </span>
                                            </p>
                                            <p className="ml-2 text-gray-600">
                                              <b>To:</b>{" "}
                                              <span className="text-green-600">
                                                "{c.new}"
                                              </span>
                                            </p>
                                          </>
                                        )}

                                        {c.type === "paragraph" && (
                                          <>
                                            <p className="font-semibold text-red-700">
                                              🟥 Paragraph Change
                                            </p>
                                            <p className="ml-2 whitespace-pre-line text-gray-600">
                                              <b>From:</b>
                                              <br />
                                              <span className="text-red-600">
                                                {c.old}
                                              </span>
                                            </p>
                                            <p className="ml-2 whitespace-pre-line text-gray-600">
                                              <b>To:</b>
                                              <br />
                                              <span className="text-green-600">
                                                {c.new}
                                              </span>
                                            </p>
                                          </>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Prev
              </button>

              <span className="text-gray-800 font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollbar CSS */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f4b26a;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fff2e0;
        }
      `}</style>
    </div>
  );
};

export default VersionsModal;
