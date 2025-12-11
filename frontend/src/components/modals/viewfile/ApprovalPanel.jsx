// // src/components/modals/viewfile/ApprovalPanel.jsx
// import React, { useState } from "react";
// import Swal from "sweetalert2";

// const ApprovalPanel = ({ file, user, API_BASE, pushToast }) => {
//   const [loading, setLoading] = useState(false);
//   const status = (file.status || "submitted").toLowerCase();

//   const isCollaborator = user.role === "collaborator";
//   const isUploader = user.id === file.uploaded_by;
//   const sameRole = user.role === file.uploaded_by_role;

//   const canAct =
//     !isCollaborator &&
//     !isUploader &&
//     !sameRole &&
//     !["approved", "rejected"].includes(status);

// const handleAction = async (action) => {
//   const { value: comment } = await Swal.fire({
//     title: action === "approve" ? "Approve File" : "Reject File",
//     input: "textarea",
//     inputPlaceholder: "Add a comment...",
//     showCancelButton: true,
//     confirmButtonText: action === "approve" ? "Approve" : "Reject",
//     inputValidator: (v) => (!v ? "Comment required" : null),

//     // ⬇️ Disable Grammarly inside the textarea
//     didOpen: (popup) => {
//       const textarea = popup.querySelector("textarea");
//       if (textarea) {
//         textarea.setAttribute("data-gramm", "false");
//         textarea.setAttribute("data-gramm_editor", "false");
//         textarea.setAttribute("data-enable-grammarly", "false");
//         textarea.setAttribute("spellcheck", "false");
//         textarea.setAttribute("autocomplete", "off");
//       }
//     },
//   });

//   if (!comment) return;

//   setLoading(true);

//   try {
//     const versionId = file.version_id || file.id;
//     const token = localStorage.getItem("token");

//     const resp = await fetch(
//       `${API_BASE}/api/approvals/version/${versionId}/${action}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ comment }),
//       }
//     );

//     if (!resp.ok) throw new Error();

//     pushToast(`File ${action}d successfully`, "success");
//   } catch {
//     pushToast("Failed to process action", "error");
//   } finally {
//     setLoading(false);
//   }
// };


//   const badgeClass = {
//     approved: "bg-green-100 text-green-700",
//     rejected: "bg-red-100 text-red-700",
//     submitted: "bg-gray-100 text-gray-700",
//   }[status];

//   return (
//     <div className="p-4 border-b bg-white">
//       {/* Status badge */}
//       <div className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${badgeClass}`}>
//         {status.toUpperCase()}
//       </div>

//       {/* Buttons */}
//       {canAct && (
//         <div className="mt-3 flex gap-2">
//           <button
//             onClick={() => handleAction("approve")}
//             disabled={loading}
//             className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
//           >
//             Approve
//           </button>

//           <button
//             onClick={() => handleAction("reject")}
//             disabled={loading}
//             className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
//           >
//             Reject
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApprovalPanel;






// // src\components\modals\viewfile\ApprovalPanel.jsx
// import React, { useState } from "react";
// import Swal from "sweetalert2";

// const ApprovalPanel = ({ file, user, API_BASE, pushToast }) => {
//   const [loading, setLoading] = useState(false);

//   // ⭐ Local status state
//   const [localStatus, setLocalStatus] = useState(
//     (file.status || "submitted").toLowerCase()
//   );

//   const isCollaborator = user.role === "collaborator";
//   const isUploader = user.id === file.uploaded_by;
//   const sameRole = user.role === file.uploaded_by_role;

//   const canAct =
//     !isCollaborator &&
//     !isUploader &&
//     !sameRole &&
//     !["approved", "rejected"].includes(localStatus);

//   const handleAction = async (action) => {
//     const { value: comment } = await Swal.fire({
//       title: action === "approve" ? "Approve File" : "Reject File",
//       input: "textarea",
//       inputPlaceholder: "Add a comment...",
//       showCancelButton: true,
//       confirmButtonText: action === "approve" ? "Approve" : "Reject",
//       inputValidator: (v) => (!v ? "Comment required" : null),
//     });

//     if (!comment) return;

//     setLoading(true);

//     try {
//       const versionId = file.version_id || file.id;
//       const token = localStorage.getItem("token");

//       const resp = await fetch(
//         `${API_BASE}/api/approvals/version/${versionId}/${action}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ comment }),
//         }
//       );

//       if (!resp.ok) throw new Error();

//       // ⭐ UPDATE STATUS IN UI IMMEDIATELY
//       setLocalStatus(action === "approve" ? "approved" : "rejected");

//       pushToast(`File ${action}d successfully`, "success");
//     } catch {
//       pushToast("Failed to process action", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const badgeClass = {
//     approved: "bg-green-100 text-green-700",
//     rejected: "bg-red-100 text-red-700",
//     submitted: "bg-gray-100 text-gray-700",
//   }[localStatus];

//   return (
//     <div className="p-4 border-b bg-white">
//       {/* Status badge */}
//       <div className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${badgeClass}`}>
//         {localStatus.toUpperCase()}
//       </div>

//       {/* Buttons */}
//       {canAct && (
//         <div className="mt-3 flex gap-2">
//           <button
//             onClick={() => handleAction("approve")}
//             disabled={loading}
//             className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
//           >
//             Approve
//           </button>

//           <button
//             onClick={() => handleAction("reject")}
//             disabled={loading}
//             className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
//           >
//             Reject
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApprovalPanel;


// // src\components\modals\viewfile\ApprovalPanel.jsx
// import React, { useState } from "react";
// import Swal from "sweetalert2";

// const ApprovalPanel = ({ file, user, API_BASE, pushToast }) => {
//   const [loading, setLoading] = useState(false);

//   // ⭐ Local status state
//   const [localStatus, setLocalStatus] = useState(
//     (file.status || "submitted").toLowerCase()
//   );

//   const isCollaborator = user.role === "collaborator";
//   const isUploader = user.id === file.uploaded_by;
//   const sameRole = user.role === file.uploaded_by_role;

//   const canAct =
//     !isCollaborator &&
//     !isUploader &&
//     !sameRole &&
//     !["approved", "rejected"].includes(localStatus);

//   const handleAction = async (action) => {
//     const { value: comment } = await Swal.fire({
//       title: action === "approve" ? "Approve File" : "Reject File",
//       input: "textarea",
//       inputPlaceholder: "Add a comment...",
//       showCancelButton: true,
//       confirmButtonText: action === "approve" ? "Approve" : "Reject",
//       inputValidator: (v) => (!v ? "Comment required" : null),
//     });

//     if (!comment) return;

//     setLoading(true);

//     try {
//       const versionId = file.version_id || file.id;
//       const token = localStorage.getItem("token");

//       const resp = await fetch(
//         `${API_BASE}/api/approvals/version/${versionId}/${action}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ comment }),
//         }
//       );

//       if (!resp.ok) throw new Error();

//       // ⭐ UPDATE STATUS IN UI IMMEDIATELY
//       setLocalStatus(action === "approve" ? "approved" : "rejected");

//       pushToast(`File ${action}d successfully`, "success");
//     } catch {
//       pushToast("Failed to process action", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const badgeClass = {
//     approved: "bg-green-100 text-green-700",
//     rejected: "bg-red-100 text-red-700",
//     submitted: "bg-gray-100 text-gray-700",
//   }[localStatus];

//   return (
//     <div className="p-2 sm:p-3 md:p-4 border-b bg-white">
//       {/* Status badge */}
//       <div className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold inline-block ${badgeClass}`}>
//         {localStatus.toUpperCase()}
//       </div>

//       {/* Buttons */}
//       {canAct && (
//         <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row gap-2">
//           <button
//             onClick={() => handleAction("approve")}
//             disabled={loading}
//             className="flex-1 bg-green-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Approve
//           </button>

//           <button
//             onClick={() => handleAction("reject")}
//             disabled={loading}
//             className="flex-1 bg-red-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Reject
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApprovalPanel;



// src/components/modals/viewfile/ApprovalPanel.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";

const ApprovalPanel = ({ file, user, API_BASE, pushToast }) => {
  const [loading, setLoading] = useState(false);

  // ⭐ Local status state
  const [localStatus, setLocalStatus] = useState(
    (file.status || "submitted").toLowerCase()
  );

  const isCollaborator = user.role === "collaborator";
  const isUploader = user.id === file.uploaded_by;
  const sameRole = user.role === file.uploaded_by_role;

  const canAct =
    !isCollaborator &&
    !isUploader &&
    !sameRole &&
    !["approved", "rejected"].includes(localStatus);

  const handleAction = async (action) => {
    const { value: comment } = await Swal.fire({
      title: action === "approve" ? "Approve File" : "Reject File",
      input: "textarea",
      inputPlaceholder: "Add a comment...",
      showCancelButton: true,
      confirmButtonText: action === "approve" ? "Approve" : "Reject",
      inputValidator: (v) => (!v ? "Comment required" : null),
      customClass: {
        popup: 'responsive-swal',
        input: 'text-sm sm:text-base'
      }
    });

    if (!comment) return;

    setLoading(true);

    try {
      const versionId = file.version_id || file.id;
      const token = localStorage.getItem("token");

      const resp = await fetch(
        `${API_BASE}/api/approvals/version/${versionId}/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (!resp.ok) throw new Error();

      // ⭐ UPDATE STATUS IN UI IMMEDIATELY
      setLocalStatus(action === "approve" ? "approved" : "rejected");

      pushToast(`File ${action}d successfully`, "success");
    } catch {
      pushToast("Failed to process action", "error");
    } finally {
      setLoading(false);
    }
  };

  const badgeClass = {
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    submitted: "bg-gray-100 text-gray-700",
  }[localStatus];

  return (
    <div className="p-3 sm:p-4 md:p-4 border-b bg-white">
      {/* Status badge */}
      <div className={`px-2.5 sm:px-3 py-1 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold inline-block ${badgeClass}`}>
        {localStatus.toUpperCase()}
      </div>

      {/* Buttons */}
      {canAct && (
        <div className="mt-3 flex flex-row gap-2">
          <button
            onClick={() => handleAction("approve")}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-2 sm:py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[40px] sm:min-h-[44px]"
          >
            Approve
          </button>

          <button
            onClick={() => handleAction("reject")}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 sm:py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[40px] sm:min-h-[44px]"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ApprovalPanel;