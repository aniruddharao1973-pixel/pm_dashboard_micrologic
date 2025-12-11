// // src/components/modals/ViewFileModal.jsx
// import React from "react";

// const ViewFileModal = ({ file, onClose }) => {
//   if (!file) return null;

//   const API_BASE = import.meta.env.VITE_API_URL || "";
//   const fileUrl = file.file_path.startsWith("http")
//     ? file.file_path
//     : `${API_BASE.replace(/\/$/, "")}${file.file_path}`;

//   const filename = file.filename || "file";
//   const ext = filename.split(".").pop().toLowerCase();
//   const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
//   const isPdf = ext === "pdf";

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
//       <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl overflow-hidden relative h-[90vh]">

//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
//           <h2 className="text-xl font-semibold text-gray-800">
//             View File — {filename}
//           </h2>
//           <button
//             className="text-gray-900 hover:text-gray-800 text-2xl"
//             onClick={onClose}
//           >
//             ✕
//           </button>
//         </div>

//         {/* Content */}
//         <div className="w-full h-full p-2">
          
//           {/* PDF Viewer */}
//           {isPdf && (
//             <iframe
//               src={fileUrl}
//               title="PDF Preview"
//               className="w-full h-[85vh] border rounded-lg"
//             />
//           )}

//           {/* Image Viewer */}
//           {isImage && (
//             <div className="flex justify-center items-center h-[85vh]">
//               <img
//                 src={fileUrl}
//                 alt="Preview"
//                 className="max-h-full max-w-full rounded-lg shadow-lg"
//               />
//             </div>
//           )}

//           {/* Unsupported */}
//           {!isPdf && !isImage && (
//             <div className="h-[85vh] flex flex-col justify-center items-center text-center">
//               <p className="text-lg font-medium text-gray-700">
//                 ⚠️ This file type cannot be previewed.
//               </p>
//               <p className="text-gray-500 mt-2">
//                 You can download it below.
//               </p>

//               <a
//                 href={fileUrl}
//                 download
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Download File
//               </a>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewFileModal;




// // src/components/modals/ViewFileModal.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { joinDocumentRoom, leaveDocumentRoom, socket } from "../../socket";
// import { useDocumentsApi } from "../../api/documentsApi";
// import { useAuth } from "../../hooks/useAuth";

// /**
//  * ViewFileModal
//  * - Right sidebar: Activity (chat) + Approval controls (Start / Approve / In Review / Reject)
//  * - Real-time via socket.io
//  * - Persisted comments loaded on mount
//  *
//  * Requirements:
//  * - Backend endpoints:
//  *   GET  /api/documents/:documentId/comments
//  *   POST /api/documents/:documentId/comments
//  *   POST /api/approvals/start
//  *   POST /api/approvals/:approvalId/action
//  *   (optional) GET /api/approvals/document/:documentId -> returns { approvalId, status, current_step_role }
//  */
// const ViewFileModal = ({ file, onClose }) => {
//   const { user } = useAuth();
//   const { getComments, addComment, startApproval, actOnApproval } =
//     useDocumentsApi();

//   const [comments, setComments] = useState([]);
//   const [message, setMessage] = useState("");
//   const [sendingComment, setSendingComment] = useState(false);

//   // Approval state (document.status is used as fallback)
//   const [approvalId, setApprovalId] = useState(null);
//   const [approvalStatus, setApprovalStatus] = useState(file?.status || "");
//   const [currentStepRole, setCurrentStepRole] = useState(null); // e.g. 'customer'
//   const [actionLoading, setActionLoading] = useState(false);

//   const commentsEndRef = useRef(null);

//   if (!file) return null;

//   const documentId = file.document_id || file.id;
//   const API_BASE = import.meta.env.VITE_API_URL || "";
//   const fileUrl = file.file_path?.startsWith("http")
//     ? file.file_path
//     : `${API_BASE.replace(/\/$/, "")}${file.file_path}`;

//   const filename = file.filename || "file";
//   const ext = filename.split(".").pop().toLowerCase();
//   const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
//   const isPdf = ext === "pdf";

//   // Auto scroll
//   const scrollToBottom = () => {
//     commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
//   useEffect(scrollToBottom, [comments]);

//   // Try to fetch an existing approval for this document (optional endpoint)
//   // If your backend doesn't implement this route, it should respond 404 and we ignore the failure.
//   const fetchApprovalMeta = async () => {
//     try {
//       const res = await fetch(
//         `${API_BASE.replace(/\/$/, "")}/api/approvals/document/${documentId}`,
//         {
//           credentials: "include",
//         }
//       );
//       if (!res.ok) return;
//       const json = await res.json();
//       // Expecting { approvalId, status, currentStepRole }
//       if (json?.approvalId) setApprovalId(json.approvalId);
//       if (json?.status) setApprovalStatus(json.status);
//       if (json?.currentStepRole) setCurrentStepRole(json.currentStepRole);
//     } catch (e) {
//       // ignore - endpoint may not exist in your backend; that's fine
//       // console.debug("No approvals metadata endpoint available", e);
//     }
//   };

//   // Load comments and join socket room
//   useEffect(() => {
//     if (!documentId) return;

//     // 1) Join the socket room
//     joinDocumentRoom(documentId);

//     // 2) Load persisted comments
//     (async () => {
//       try {
//         const res = await getComments(documentId);
//         // The axios wrapper returns data: res.data
//         setComments(res.data || []);
//       } catch (err) {
//         console.error("Failed to load comments", err);
//       }
//     })();

//     // 3) Attempt to fetch approval meta (approvalId + status)
//     fetchApprovalMeta();

//     // 4) Socket listeners
//     const onNewComment = (comment) => {
//       // Avoid duplicate comment if already present
//       if (!comment || !comment.id) return;
//       setComments((prev) => {
//         const found = prev.find((c) => c.id === comment.id);
//         if (found) return prev;
//         return [...prev, comment];
//       });
//     };

//     const onApprovalUpdated = (payload) => {
//       // payload should contain: { approvalId?, documentId, action/status }
//       if (!payload || payload.documentId !== documentId) return;
//       // payload.action or payload.status: normalize
//       const status = payload.action || payload.status;
//       if (status) setApprovalStatus(status);
//       if (payload.approvalId) setApprovalId(payload.approvalId);
//       if (payload.currentStepRole) setCurrentStepRole(payload.currentStepRole);
//     };

//     socket.on("new_comment", onNewComment);
//     socket.on("approval_updated", onApprovalUpdated);

//     // Clean up on unmount
//     return () => {
//       leaveDocumentRoom(documentId);
//       socket.off("new_comment", onNewComment);
//       socket.off("approval_updated", onApprovalUpdated);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [documentId]);

//   // Helper: determine if current user can act
//   const userCanAct = () => {
//     if (!approvalStatus) return false;
//     // final statuses: approved / rejected -> no actions
//     if (["approved", "rejected"].includes(approvalStatus)) return false;
//     // admin can always act (override)
//     if (user?.role === "admin") return true;
//     // customer can act only when current step expects 'customer'
//     if (user?.role === "customer" && currentStepRole === "customer") return true;
//     // fallback - no
//     return false;
//   };

//   // Send comment (wait for API response and append)
//   const handleSend = async () => {
//     if (!message.trim()) return;
//     setSendingComment(true);
//     try {
//       const res = await addComment(documentId, message);
//       // res.data is the saved comment (backend also emits to everyone)
//       if (res?.data) {
//         // Avoid duplication if socket emits same comment later:
//         setComments((prev) => {
//           const found = prev.find((c) => c.id === res.data.id);
//           if (found) return prev;
//           return [...prev, res.data];
//         });
//       }
//       setMessage("");
//     } catch (err) {
//       console.error("send comment error:", err);
//       // optionally show toast
//     } finally {
//       setSendingComment(false);
//     }
//   };

//   // Start approval (admin)
//   const handleStartApproval = async () => {
//     if (!user || user.role !== "admin") return;
//     setActionLoading(true);
//     try {
//       const res = await startApproval(documentId);
//       // startApproval returns { approvalId }
//       const aid = res?.data?.approvalId;
//       if (aid) {
//         setApprovalId(aid);
//         setApprovalStatus("pending_approval");
//         // notify other clients via server emit (server already emits in startApproval)
//       }
//     } catch (err) {
//       console.error("startApproval error:", err);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Act on approval (approve/reject/in_review)
//   const handleAction = async (action) => {
//     if (!approvalId) {
//       // if approvalId missing, show helpful message for admin (or try to start)
//       console.warn("No approvalId found; action aborted.");
//       return;
//     }
//     setActionLoading(true);
//     try {
//       await actOnApproval(approvalId, action, null);
//       // Server will emit approval_updated; but update UI optimistically:
//       setApprovalStatus(action);
//     } catch (err) {
//       console.error("actOnApproval error:", err);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Status badge styles
//   const statusBadge = {
//     approved: "bg-green-100 text-green-700 border-green-300",
//     rejected: "bg-red-100 text-red-700 border-red-300",
//     pending_approval: "bg-yellow-50 text-yellow-800 border-yellow-200",
//     in_review: "bg-blue-50 text-blue-700 border-blue-200",
//     submitted: "bg-gray-50 text-gray-700 border-gray-200",
//   }[approvalStatus || "submitted"];

//   // Show Start Approval button when there is no active approval (submitted)
//   const showStartApproval =
//     user?.role === "admin" &&
//     !["pending_approval", "in_review", "approved", "rejected"].includes(
//       approvalStatus
//     );

//   // Show action buttons (Approve/Reject/In Review) when allowed
//   const showActionButtons = userCanAct();

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
//       <div className="bg-white w-full max-w-7xl rounded-xl shadow-xl overflow-hidden relative h-[90vh] flex">

//         {/* LEFT: Viewer */}
//         <div className="flex-1 p-3 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 rounded-l-xl">
//           <div className="flex justify-between items-center mb-4 px-2">
//             <h2 className="text-xl font-semibold text-gray-800">
//               View File — {filename}
//             </h2>
//             <div className="flex items-center gap-3">
//               {/* status small on top as well */}
//               <div
//                 className={`hidden md:inline-flex px-3 py-1 rounded-full text-sm border ${statusBadge}`}
//                 title={`Status: ${approvalStatus || "submitted"}`}
//               >
//                 {(approvalStatus || "submitted").replace("_", " ").toUpperCase()}
//               </div>
//               <button
//                 className="text-gray-900 hover:text-gray-700 text-2xl"
//                 onClick={onClose}
//               >
//                 ✕
//               </button>
//             </div>
//           </div>

//           {isPdf && (
//             <iframe
//               src={fileUrl}
//               title="PDF Preview"
//               className="w-full h-[80vh] border rounded-lg shadow"
//             />
//           )}

//           {isImage && (
//             <div className="flex justify-center items-center h-[80vh]">
//               <img
//                 src={fileUrl}
//                 alt="Preview"
//                 className="max-h-full max-w-full rounded-lg shadow-lg"
//               />
//             </div>
//           )}

//           {!isPdf && !isImage && (
//             <div className="h-[80vh] flex flex-col justify-center items-center">
//               <p className="text-gray-700 text-lg">
//                 ⚠️ Unable to preview this file type.
//               </p>
//               <a
//                 href={fileUrl}
//                 download
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
//               >
//                 Download File
//               </a>
//             </div>
//           )}
//         </div>

//         {/* RIGHT Sidebar */}
//         <div className="w-96 border-l bg-white flex flex-col">
//           {/* Header */}
//           <div className="px-4 py-3 border-b bg-gradient-to-r from-orange-50 to-yellow-50">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold">Activity & Approval</h3>
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`px-3 py-1 rounded-full text-sm border ${statusBadge}`}
//                 >
//                   {(approvalStatus || "submitted").replace("_", " ").toUpperCase()}
//                 </div>
//               </div>
//             </div>
//             <div className="text-xs text-gray-500 mt-2">
//               {approvalId ? `Approval ID: ${approvalId}` : "No approval started"}
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="p-4 border-b space-y-3">
//             {/* Start Approval (admin) */}
//             {showStartApproval && (
//               <button
//                 onClick={handleStartApproval}
//                 disabled={actionLoading}
//                 className="w-full inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white py-2 rounded-lg shadow"
//               >
//                 {actionLoading ? "Starting..." : "Start Approval"}
//               </button>
//             )}

//             {/* Action Buttons */}
//             {showActionButtons && (
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleAction("approved")}
//                   disabled={actionLoading}
//                   className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-2 rounded-lg"
//                 >
//                   {actionLoading ? "Working..." : "Approve"}
//                 </button>
//                 <button
//                   onClick={() => handleAction("in_review")}
//                   disabled={actionLoading}
//                   className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-white py-2 rounded-lg"
//                 >
//                   {actionLoading ? "Working..." : "In Review"}
//                 </button>
//                 <button
//                   onClick={() => handleAction("rejected")}
//                   disabled={actionLoading}
//                   className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-2 rounded-lg"
//                 >
//                   {actionLoading ? "Working..." : "Reject"}
//                 </button>
//               </div>
//             )}

//             {/* If no one can act, show small hint */}
//             {!showStartApproval && !showActionButtons && (
//               <div className="text-sm text-gray-600">
//                 {["approved", "rejected"].includes(approvalStatus)
//                   ? "This document has been finalized."
//                   : "Waiting for approval to be started or for the appropriate approver."}
//               </div>
//             )}
//           </div>

//           {/* Comments (chat) */}
//           <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
//             {comments.length === 0 && (
//               <div className="text-sm text-gray-500">No comments yet — be the first.</div>
//             )}

//             {comments.map((c) => {
//               const mine = c.user_id === user?.id;
//               return (
//                 <div
//                   key={c.id}
//                   className={`p-3 rounded-lg border ${
//                     mine ? "bg-purple-50 border-purple-100 ml-auto max-w-[85%]" : "bg-gray-100 border-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between gap-2">
//                     <p className={`text-sm font-semibold ${mine ? "text-purple-700" : "text-gray-700"}`}>
//                       {c.user_name || (mine ? "You" : "User")}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(c.created_at).toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="mt-1 text-sm text-gray-800">{c.message}</div>
//                 </div>
//               );
//             })}

//             <div ref={commentsEndRef} />
//           </div>

//           {/* Input */}
//           <div className="p-4 border-t bg-gray-50 flex gap-2">
//             <input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   if (!sendingComment) handleSend();
//                 }
//               }}
//               placeholder="Write a comment… (Press Enter to send)"
//               className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300"
//             />
//             <button
//               onClick={handleSend}
//               disabled={sendingComment || !message.trim()}
//               className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg"
//             >
//               {sendingComment ? "Sending..." : "Send"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewFileModal;




// // src/components/modals/ViewFileModal.jsx
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { joinDocumentRoom, leaveDocumentRoom, socket } from "../../socket";
// import { useDocumentsApi } from "../../api/documentsApi";
// import { useAuth } from "../../hooks/useAuth";
// import Swal from "sweetalert2";
// import { diffWords, diffSentences, diffLines } from "diff";

// /**
//  * Full-featured ViewFileModal
//  * - Real-time chat + approvals
//  * - Typing indicator
//  * - Delivered/Seen ticks
//  * - Bubble animations
//  * - Haptic press effect on action buttons
//  * - Toasts & online presence
//  *
//  * NOTE: If file.file_path is missing, we fall back to a local path (uploaded image in conversation)
//  * The tool/process that deploys will convert this local path to a real public URL.
//  */
// const FALLBACK_FILE_PATH = "/mnt/data/0da6496e-be9d-4940-9fcb-54f53e779f44.png";

// const ViewFileModal = ({ file, projectId, folderId, onClose }) => {
//   const { user } = useAuth();
// const { getComments, addComment } = useDocumentsApi();
// // Approval now handled per-version, not new workflow API



//   // Comments & UI state
//   const [comments, setComments] = useState([]);
//   const [message, setMessage] = useState("");
//   const [sendingComment, setSendingComment] = useState(false);
//   const [animateIds, setAnimateIds] = useState(new Set());

//   // Approval state
//   const [approvalId, setApprovalId] = useState(null);
//   const [approvalStatus, setApprovalStatus] = useState(file?.status || "");
//   const [currentStepRole, setCurrentStepRole] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);

//   // Presence & typing
//   const [onlineCount, setOnlineCount] = useState(0);
//   const [typingUsers, setTypingUsers] = useState({}); // { userId: name }
//   const typingTimeoutsRef = useRef({});

//   // Toasts
//   const [toasts, setToasts] = useState([]);

//   // Refs
//   const commentsEndRef = useRef(null);
//   const containerRef = useRef(null);
//   const lastSeenRef = useRef({}); // map messageId -> seenByUserId

//   // oldText: from previous version
// // newText: from textarea


//   if (!file) return null;
//   // DEBUG LOGS — check what values we are getting
// console.log("MODAL FILE OBJECT -->", file);
// console.log("created_by_role -->", file.created_by_role);
// console.log("logged-in user role -->", user.role);
// console.log("FULL FILE OBJECT -->", JSON.stringify(file, null, 2));



//   // Build file URL
//   const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
//   const filePath = file.file_path || FALLBACK_FILE_PATH;
//   const fileUrl =
//     filePath.startsWith("http") || filePath.startsWith("/mnt")
//       ? filePath
//       : `${API_BASE.replace(/\/$/, "")}${filePath}`;

//   const documentId = file.document_id || file.id;
//   const filename = file.filename || "file";
//   const ext = filename.split(".").pop().toLowerCase();
//   const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
//   const isPdf = ext === "pdf";
//     const isText = ext === "txt";
//   const [textContent, setTextContent] = useState("");
//   const [oldText, setOldText] = useState("");
//   const [savingTxt, setSavingTxt] = useState(false);


//   // Scroll to bottom when comments change
//   useEffect(() => {
//     commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [comments]);

//   // Helper: add toast
//   const pushToast = useCallback((text, type = "info", ttl = 4000) => {
//     const id = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
//     setToasts((t) => [...t, { id, text, type }]);
//     setTimeout(() => {
//       setToasts((t) => t.filter((x) => x.id !== id));
//     }, ttl);
//   }, []);

//   // Fetch persisted comments + join socket room + attempt to fetch approval meta
//   useEffect(() => {
//     if (!documentId) return;

//     // Join room
// // ⭐ FIX: join socket room with correct user + token
// const token = localStorage.getItem("token");
// joinDocumentRoom(documentId, user, token);


//     // Load comments
//     (async () => {
//       try {
//         const res = await getComments(documentId);
//         // Expect res.data array
//         const loaded = res?.data || [];
//         // Map to include delivered/seen flags if missing
//         const normalized = loaded.map((c) => ({
//           ...c,
//           delivered: c.delivered ?? true,
//           seen: c.seen ?? false,
//         }));
//         setComments(normalized);
//       } catch (err) {
//         console.error("Failed to load comments", err);
//         pushToast("Failed to load comments", "error");
//       }
//     })();



// //     // Try to fetch approval meta (optional endpoint). If not available ignore error.
// //     (async () => {
// //       try {
// // const token = localStorage.getItem("token");

// // const resp = await fetch(
// //   `${API_BASE.replace(/\/$/, "")}/api/approvals/document/${documentId}`,
// //   {
// //     method: "GET",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${token}`,
// //     },
// //   }
// // );

// // if (resp.status === 404) {
// //   // No approval yet — normal, do not log error
// //   return;
// // }

// // if (resp.ok) {
// //   const json = await resp.json();
// //   // if (json.approvalId) setApprovalId(json.approvalId);
// //   // if (json.status) setApprovalStatus(json.status);
// //   // if (json.currentStepRole) setCurrentStepRole(json.currentStepRole);
// //   setApprovalId(json.approvalId ?? null);
// //   setApprovalStatus(json.status ?? "submitted");  // <-- important default
// //   setCurrentStepRole(json.currentStepRole ?? null);

// // } else {
// //   // Prevent console noise
// //   return;
// // }

// //       } catch (e) {
// //         // ignore
// //       }
// //     })();

// // This endpoint is REMOVED. We no longer fetch approval meta here.
// setApprovalStatus(file?.status || "submitted");
// setApprovalId(null);
// setCurrentStepRole(null);


//     // Socket listeners
//     const onNewComment = (comment) => {
//       if (!comment || !comment.id) return;
//       setComments((prev) => {
//         const found = prev.find((c) => c.id === comment.id);
//         if (found) return prev;
//         // mark as delivered but not seen by default
//         const item = { ...comment, delivered: true, seen: false };
//         // animate
//         setAnimateIds((s) => new Set([...Array.from(s), comment.id]));
//         setTimeout(() => {
//           setAnimateIds((s) => {
//             const next = new Set(Array.from(s).filter((x) => x !== comment.id));
//             return next;
//           });
//         }, 500);
//         return [...prev, item];
//       });
//       // if comment by someone else, push delivered toast optionally
//     };

//     const onApprovalUpdated = (payload) => {
//       if (!payload || payload.documentId !== documentId) return;
//       const status = payload.action || payload.status;
//       if (status) {
//         setApprovalStatus(status);
//         pushToast(`Document ${status.replace("_", " ")}`, "success", 3000);
//       }
//       if (payload.approvalId) setApprovalId(payload.approvalId);
//       if (payload.currentStepRole) setCurrentStepRole(payload.currentStepRole);
//     };

//     const onUserJoined = (payload) => {
//       if (!payload || payload.documentId !== documentId) return;
//       setOnlineCount((n) => n + 1);
//       pushToast(`${payload.name} joined`, "info", 1500);
//     };

//     const onUserLeft = (payload) => {
//       if (!payload || payload.documentId !== documentId) return;
//       setOnlineCount((n) => Math.max(0, n - 1));
//     };

//     const onTyping = (payload) => {
//       if (!payload || payload.documentId !== documentId) return;
//       const { userId, name } = payload;
//       if (!userId || userId === user?.id) return;
//       // add to typingUsers
//       setTypingUsers((t) => ({ ...t, [userId]: name || "Someone" }));
//       // clear after timeout
//       if (typingTimeoutsRef.current[userId]) {
//         clearTimeout(typingTimeoutsRef.current[userId]);
//       }
//       typingTimeoutsRef.current[userId] = setTimeout(() => {
//         setTypingUsers((t) => {
//           const copy = { ...t };
//           delete copy[userId];
//           return copy;
//         });
//         delete typingTimeoutsRef.current[userId];
//       }, 1800);
//     };

//     const onMessageSeen = (payload) => {
//       // payload: { messageId, documentId, userId }
//       if (!payload || payload.documentId !== documentId) return;
//       setComments((prev) => prev.map((c) => (c.id === payload.messageId ? { ...c, seen: true } : c)));
//     };

//     socket.on("new_comment", onNewComment);
//     socket.on("approval_updated", onApprovalUpdated);
//     socket.on("user_joined", onUserJoined);
//     socket.on("user_left", onUserLeft);
//     socket.on("typing", onTyping);
//     socket.on("message_seen", onMessageSeen);

//     // Clean up
// // Clean up when modal closes or documentId changes
//     return () => {
//       // Properly leave the document room
//       leaveDocumentRoom(documentId, user);

//       // Remove all socket listeners for safety
//       socket.off("new_comment", onNewComment);
//       socket.off("approval_updated", onApprovalUpdated);
//       socket.off("user_joined", onUserJoined);
//       socket.off("user_left", onUserLeft);
//       socket.off("typing", onTyping);
//       socket.off("message_seen", onMessageSeen);

//       // Clear typing timeout memory
//       Object.values(typingTimeoutsRef.current).forEach((id) => clearTimeout(id));
//       typingTimeoutsRef.current = {};
//     };


//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [documentId]);

//     // Normalize roles to avoid case mismatch (Admin vs admin)
// //   const createdBy = (file.created_by_role || "").toLowerCase();
// //   const currentRole = (user.role || "").toLowerCase();


// // const userCanAct = () => {
// //   if (["approved", "rejected"].includes(approvalStatus)) return false;

// //   // uploader cannot approve their own file
// //   if (currentRole === createdBy) return false;

// //   // reviewer (opposite role) can act
// //   return true;
// // };

//     // Normalize roles ...
//     // const createdBy = (file.created_by_role || "").toLowerCase();
//     // const currentRole = (user.role || "").toLowerCase();
//     // const normalizedStatus = (approvalStatus || "submitted").toLowerCase();

//     // const userCanAct = () => {
//     //   // treat completed as final, same as approved/rejected
//     //   if (["approved", "rejected", "completed"].includes(normalizedStatus)) {
//     //     return false;
//     //   }

//     //   // uploader cannot approve their own file
//     //   if (currentRole === createdBy) return false;

//     //   // reviewer can act
//     //   return true;
//     // };

//     // Normalize roles
// const createdBy = (file.created_by_role || "").toLowerCase();
// const currentRole = (user.role || "").toLowerCase();
// const normalizedStatus = (approvalStatus || "submitted").toLowerCase();

// /**
//  * USER CAN ACT:
//  * 1. Uploader CANNOT act
//  * 2. Finalized statuses (approved/rejected/completed) CANNOT act
//  * 3. If backend provided currentStepRole → follow that
//  * 4. Else determine reviewer role (opposite of uploader)
//  */
// // const userCanAct = () => {
// //   // final statuses
// //   if (["approved", "rejected", "completed"].includes(normalizedStatus)) {
// //     return false;
// //   }

// //   // uploader cannot act
// //   if (currentRole === createdBy) {
// //     return false;
// //   }

// //   // backend decided who should act
// //   if (currentStepRole) {
// //     return currentRole === currentStepRole.toLowerCase();
// //   }

// //   // fallback: reviewer = opposite role
// //   const reviewerRole = createdBy === "admin" ? "customer" : "admin";

// //   return currentRole === reviewerRole;
// // };



//   // Typing emit: debounce stop typing after 1.2s of no keystroke
//   const typingTimerRef = useRef(null);
//   const emitTyping = () => {
//     socket.emit("typing", { documentId, userId: user?.id, name: user?.name });
//     if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
//     typingTimerRef.current = setTimeout(() => {
//       socket.emit("stop_typing", { documentId, userId: user?.id });
//     }, 1200);
//   };

//   // Send comment
//   const handleSend = async () => {
//     if (!message.trim()) return;
//     setSendingComment(true);
//     try {
//       const res = await addComment(documentId, message); // expects server to return saved comment in res.data
//       const saved = res?.data;
//       if (saved) {
//         // Append if not present
//         setComments((prev) => {
//           const found = prev.find((c) => c.id === saved.id);
//           if (found) return prev;
//           setAnimateIds((s) => new Set([...Array.from(s), saved.id]));
//           setTimeout(() => {
//             setAnimateIds((s) => {
//               const next = new Set(Array.from(s).filter((x) => x !== saved.id));
//               return next;
//             });
//           }, 500);
//           return [...prev, { ...saved, delivered: true, seen: false }];
//         });

//         // // Emit optional message_delivered event for other clients (server may also broadcast)
//         // socket.emit("message_delivered", { documentId, messageId: saved.id, from: user?.id });

//         // Immediately mark as delivered for sender
//       }
//       setMessage("");
//     } catch (err) {
//       console.error("send comment error:", err);
//       pushToast("Failed to send comment", "error");
//     } finally {
//       setSendingComment(false);
//     }
//   };



// //   // Act on approval: approved | in_review | rejected
// //   const handleAction = async (action) => {
// //   setActionLoading(true);

// //   try {
// //     let activeApprovalId = approvalId;

// //     // 🔥 If no approval started, create one automatically
// //     // if (!activeApprovalId) {
// //     //   const startRes = await startApproval(documentId);
// //       if (!activeApprovalId && userCanAct()) {
// //     const startRes = await startApproval(documentId);


// //       activeApprovalId = startRes?.data?.approvalId;
// //       setApprovalId(activeApprovalId);
// //       setApprovalStatus("pending_approval");

// //       pushToast("Approval workflow started", "success");
// //     }

// //     // 🔥 Now apply the action (approve/in_review/reject)
// //     await actOnApproval(activeApprovalId, action, null);

// //     // Optimistic UI update
// //     setApprovalStatus(action);
// //     pushToast(`Document ${action.replace("_", " ")}`, "success");

// //     // Inform others via socket
// //     socket.emit("approval_action", {
// //       documentId,
// //       approvalId: activeApprovalId,
// //       action,
// //       by: user?.id,
// //     });

// //   } catch (err) {
// //     console.error("actOnApproval error:", err);
// //     pushToast("Failed to perform action", "error");
// //   } finally {
// //     setActionLoading(false);
// //   }
// // };

// // NEW handleAction (Approve / Reject with comment popup)
// // const handleAction = async (actionType) => {
// //   const { value: comment } = await Swal.fire({
// //     title: actionType === "approved" ? "Approve File" : "Reject File",
// //     input: "textarea",
// //     inputPlaceholder: "Enter your comment...",
// //     inputAttributes: { rows: 4 },
// //     showCancelButton: true,
// //     confirmButtonText: actionType === "approved" ? "Approve" : "Reject",
// //     confirmButtonColor: actionType === "approved" ? "#4CAF50" : "#e74c3c",
// //     cancelButtonColor: "#888",
// //     inputValidator: (value) => {
// //       if (!value) return "Comment is required!";
// //     },
// //   });

// //   if (!comment) return;

// //   setActionLoading(true);

// //   try {
// //     let activeApprovalId = approvalId;

// //     // If approval not started → start it
// //     if (!activeApprovalId && userCanAct()) {
// //       const startRes = await startApproval(documentId);
// //       activeApprovalId = startRes?.data?.approvalId;
// //       setApprovalId(activeApprovalId);
// //       setApprovalStatus("pending_approval");
// //       pushToast("Approval workflow started", "success");
// //     }

// //     // Send approval action + comment
// //     await actOnApproval(activeApprovalId, actionType, comment);

// //     // Update UI
// //     setApprovalStatus(actionType);
// //     pushToast(
// //       `Document ${actionType === "approved" ? "Approved" : "Rejected"}`,
// //       "success"
// //     );

// //     // Notify others via socket
// //     socket.emit("approval_action", {
// //       documentId,
// //       approvalId: activeApprovalId,
// //       action: actionType,
// //       by: user?.id,
// //       comment,
// //     });
// //   } catch (err) {
// //     console.error("Approval action failed:", err);
// //     pushToast("Failed to perform action", "error");
// //   } finally {
// //     setActionLoading(false);
// //   }
// // };

// // FINAL APPROVAL HANDLER (Version-based)
// const handleAction = async (actionType) => {
//   const versionId = file.version_id || file.id;

//   const { value: comment } = await Swal.fire({
//     title: actionType === "approved" ? "Approve File" : "Reject File",
//     input: "textarea",
//     inputPlaceholder: "Enter your comment...",
//     showCancelButton: true,
//     confirmButtonText: actionType === "approved" ? "Approve" : "Reject",
//     inputValidator: (v) => (!v ? "Comment is required!" : null),
//   });

//   if (!comment) return;

//   setActionLoading(true);

//   try {
//     const token = localStorage.getItem("token");

//     const resp = await fetch(
//       `${API_BASE}/api/approvals/${versionId}/${actionType}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ comment }),
//       }
//     );

//     if (!resp.ok) throw new Error("Action failed");

//     setApprovalStatus(actionType);
//     pushToast(
//       actionType === "approved" ? "File Approved" : "File Rejected",
//       "success"
//     );
//   } catch (err) {
//     console.error(err);
//     pushToast("Action failed", "error");
//   } finally {
//     setActionLoading(false);
//   }
// };


//   // When comments come into view, notify server they are seen
//   // We will mark all messages from others as seen when modal mounts or user scrolls to bottom
//   const markAllAsSeen = useCallback(() => {
//     const unseen = comments.filter((c) => !c.seen && c.user_id !== user?.id);
//     unseen.forEach((m) => {
//       socket.emit("message_seen", { documentId, messageId: m.id, userId: user?.id });
//       // mark locally
//       setComments((prev) => prev.map((c) => (c.id === m.id ? { ...c, seen: true } : c)));
//     });
//   }, [comments, documentId, user?.id]);

//   useEffect(() => {
//     // mark seen on mount & whenever comments change
//     markAllAsSeen();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [comments.length]);

//   // Load TXT content when modal opens
// useEffect(() => {
//   if (isText) {
//   fetch(fileUrl)
//     .then((res) => res.text())
//     .then((txt) => {
//       setTextContent(txt);
//       setOldText(txt); // ⭐ store original text
//     })

//       .catch(() => setTextContent("⚠ Failed to load text file"));
//   }
// }, [fileUrl, isText]);


//   // // Small helpers for UI
//   // const statusBadge = {
//   //   approved: "bg-green-100 text-green-700 border-green-300",
//   //   rejected: "bg-red-100 text-red-700 border-red-300",
//   //   pending_approval: "bg-yellow-50 text-yellow-800 border-yellow-200",
//   //   in_review: "bg-blue-50 text-blue-700 border-blue-200",
//   //   submitted: "bg-gray-50 text-gray-700 border-gray-200",
//   // }[approvalStatus || "submitted"];


//     // Map backend status to what we show in UI
//   const displayStatusKey =
//     normalizedStatus === "completed" ? "approved" : normalizedStatus || "submitted";

//   const statusBadge = {
//     approved: "bg-green-100 text-green-700 border-green-300",
//     rejected: "bg-red-100 text-red-700 border-red-300",
//     pending_approval: "bg-yellow-50 text-yellow-800 border-yellow-200",
//     in_review: "bg-blue-50 text-blue-700 border-blue-200",
//     submitted: "bg-gray-50 text-gray-700 border-gray-200",
//   }[displayStatusKey];

//   const displayStatusLabel =
//     displayStatusKey === "in_review"
//       ? "IN REVIEW"
//       : displayStatusKey.toUpperCase();



//   // const showActionButtons = userCanAct();

//   // CSS for animations (added inside component so file is self-contained)
//   const animStyle = `
//     @keyframes slideIn {
//       from { transform: translateY(8px); opacity: 0; }
//       to { transform: translateY(0); opacity: 1; }
//     }
//     .animate-slide-in {
//       animation: slideIn 320ms cubic-bezier(.2,.9,.3,1);
//     }
//   `;


  
// //     const handleSaveTxt = async () => {
// //   if (!projectId || !folderId) {
// //     pushToast("Missing projectId/folderId", "error");
// //     return;
// //   }

// //   try {
// //     setSavingTxt(true);

// //     // Convert edited text → Blob → File
// //     const blob = new Blob([textContent], { type: "text/plain" });
// //     const editedFile = new File([blob], file.filename, {
// //       type: "text/plain",
// //     });

// //     const formData = new FormData();
// //     formData.append("projectId", projectId);
// //     formData.append("folderId", folderId);
// //     formData.append("title", file.title);
// //     formData.append("comment", "Edited text file");
// //     formData.append("file", editedFile);
// //     formData.append("changeLog", JSON.stringify(changeLog)); // ⭐ ADD THIS


// //     const token = localStorage.getItem("token");

// //     const resp = await fetch(`${API_BASE}/api/documents/upload`, {
// //       method: "POST",
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: formData,
// //     });

// //     if (!resp.ok) throw new Error("Upload failed");

// //     pushToast("Saved as new version", "success");

// //     // Refresh version history in parent
// //     onClose();
// //   } catch (err) {
// //     console.error(err);
// //     pushToast("Failed to save file", "error");
// //   } finally {
// //     setSavingTxt(false);
// //   }
// // };

// const handleSaveTxt = async () => {
//   if (!projectId || !folderId) {
//     pushToast("Missing projectId/folderId", "error");
//     return;
//   }

//   try {
//     setSavingTxt(true);

//     // 1️⃣ Compare changes
// // 1️⃣ PRIORITY-BASED DIFF
// let changeLog = { changes: [] };

// // WORD DIFF (highest priority)
// const wordDiff = diffWords(oldText, textContent);
// const wordChanges = wordDiff.filter(p => p.added || p.removed);

// if (wordChanges.length > 0) {
//   wordChanges.forEach(part => {
//     changeLog.changes.push({
//       type: "word",
//       old: part.removed ? part.value : "",
//       new: part.added ? part.value : ""
//     });
//   });

// } else {

//   // SENTENCE DIFF (only if no word changes)
//   const sentenceDiff = diffSentences(oldText, textContent);
//   const sentenceChanges = sentenceDiff.filter(p => p.added || p.removed);

//   if (sentenceChanges.length > 0) {
//     sentenceChanges.forEach(part => {
//       changeLog.changes.push({
//         type: "sentence",
//         old: part.removed ? part.value : "",
//         new: part.added ? part.value : ""
//       });
//     });

//   } else {

//     // PARAGRAPH DIFF (fallback)
//     const paragraphDiff = diffLines(oldText, textContent);
//     const paragraphChanges = paragraphDiff.filter(p => p.added || p.removed);

//     paragraphChanges.forEach(part => {
//       changeLog.changes.push({
//         type: "paragraph",
//         old: part.removed ? part.value : "",
//         new: part.added ? part.value : ""
//       });
//     });
//   }
// }


//     // 2️⃣ Convert edited text → file
//     const blob = new Blob([textContent], { type: "text/plain" });
//     const editedFile = new File([blob], file.filename, { type: "text/plain" });

//     const formData = new FormData();
//     formData.append("projectId", projectId);
//     formData.append("folderId", folderId);
//     formData.append("title", file.title);
//     formData.append("comment", "Edited text file");
//     formData.append("file", editedFile);
//     // formData.append("changeLog", JSON.stringify(changeLog)); // ⭐ FIXED
//         changeLog.changed_by = {
//       id: user.id,
//       name: user.name,
//       role: user.role,
//     };
//     formData.append("changeLog", JSON.stringify(changeLog));


//     const token = localStorage.getItem("token");

//     const resp = await fetch(`${API_BASE}/api/documents/upload`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: formData,
//     });

//     if (!resp.ok) throw new Error("Upload failed");

//     pushToast("Saved as new version", "success");
//     onClose();
//   } catch (err) {
//     console.error(err);
//     pushToast("Failed to save file", "error");
//   } finally {
//     setSavingTxt(false);
//   }
// };



//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
//       <style>{animStyle}</style>

//       {/* Toasts */}
//       <div className="fixed right-6 top-6 z-[10000] space-y-2">
//         {toasts.map((t) => (
//           <div
//             key={t.id}
//             className={`px-4 py-2 rounded-lg shadow-md text-sm ${
//               t.type === "success"
//                 ? "bg-green-600 text-white"
//                 : t.type === "error"
//                 ? "bg-red-600 text-white"
//                 : "bg-gray-800 text-white"
//             }`}
//           >
//             {t.text}
//           </div>
//         ))}
//       </div>

//       <div
//         className="bg-white w-[80vw] rounded-xl shadow-xl overflow-hidden relative h-[90vh] flex"
//         ref={containerRef}
//       >
//         {/* LEFT: Viewer */}
//         <div className="flex-1 p-3 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 rounded-l-xl">
//           <div className="flex justify-between items-center mb-4 px-2">
//             <h2 className="text-xl font-semibold text-gray-800">
//               View File — {filename}
//             </h2>
//             <div className="flex items-center gap-3">
//               {/* Online indicator */}
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`h-3 w-3 rounded-full ${
//                     onlineCount > 0 ? "bg-green-400" : "bg-gray-300"
//                   }`}
//                   title={onlineCount > 0 ? `${onlineCount} online` : "No other users online"}
//                 />
//                 <span className="text-xs text-gray-600">{onlineCount > 0 ? `${onlineCount} here` : "Solo"}</span>
//               </div>

//               {/* <div
//                 className={`hidden md:inline-flex px-3 py-1 rounded-full text-sm border ${statusBadge}`}
//                 title={`Status: ${approvalStatus || "submitted"}`}
//               >
//                 {(approvalStatus || "submitted").replace("_", " ").toUpperCase()}
//               </div> */}

//               <div
//               className={`hidden md:inline-flex px-3 py-1 rounded-full text-sm border ${statusBadge}`}
//               title={`Status: ${displayStatusLabel}`}
//             >
//               {displayStatusLabel}
//             </div>


//               <button
//                 className="text-gray-900 hover:text-gray-700 text-2xl"
//                 onClick={onClose}
//               >
//                 ✕
//               </button>
//             </div>
//           </div>

//           {isPdf && (
//             <iframe
//               src={fileUrl}
//               title="PDF Preview"
//               className="w-full h-[80vh] border rounded-lg shadow"
//             />
//           )}

//           {isImage && (
//             <div className="flex justify-center items-center h-[80vh]">
//               <img
//                 src={fileUrl}
//                 alt="Preview"
//                 className="max-h-full max-w-full rounded-lg shadow-lg"
//               />
//             </div>
//           )}

// {/* TXT EDITOR */}
// {isText && (
//   <div className="h-[80vh] w-full flex flex-col">
//     <textarea
//       className="flex-1 w-full p-4 border rounded-lg text-sm font-mono bg-white shadow-inner"
//       value={textContent}
//       onChange={(e) => setTextContent(e.target.value)}
//     />

//     <button
//       onClick={handleSaveTxt}
//       disabled={savingTxt}
//       className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 active:scale-95 disabled:opacity-50 transition"
//     >
//       {savingTxt ? "Saving..." : "Save New Version"}
//     </button>
//   </div>
// )}

// {/* OTHER NON-PREVIEW TYPES */}
// {!isPdf && !isImage && !isText && (
//   <div className="h-[80vh] flex flex-col justify-center items-center">
//     <p className="text-gray-700 text-lg">⚠️ Unable to preview this file type.</p>

//     {(user.role === "admin" || file.can_download) ? (
//       <a
//         href={fileUrl}
//         download
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//       >
//         Download File
//       </a>
//     ) : (
//       <div className="mt-4 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg shadow cursor-not-allowed">
//         🚫 Download Disabled by Admin
//       </div>
//     )}
//   </div>
//           )}
//         </div>

//         {/* RIGHT Sidebar */}
//         <div className="w-96 border-l bg-white flex flex-col">
//           {/* Header */}
//           <div className="px-4 py-3 border-b bg-gradient-to-r from-orange-50 to-yellow-50">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold">Discussion & Approval</h3>
//               {/* <div className="flex items-center gap-2">
//                 <div className={`px-3 py-1 rounded-full text-sm border ${statusBadge}`}>
//                   {(approvalStatus || "submitted").replace("_", " ").toUpperCase()}
//                 </div>
//               </div> */}
//               <div className="flex items-center gap-2">
//               <div className={`px-3 py-1 rounded-full text-sm border ${statusBadge}`}>
//                 {displayStatusLabel}
//               </div>
//             </div>
//             </div>
//             <div className="text-xs text-gray-500 mt-2">
//               {approvalId ? `Approval ID: ${approvalId}` : "No approval started"}
//             </div>

//             {/* Typing indicator */}
//             <div className="mt-2 text-sm text-gray-600">
//               {Object.keys(typingUsers).length > 0 ? (
//                 <span>
//                   {Object.values(typingUsers).slice(0, 2).join(", ")} {Object.values(typingUsers).length > 1 ? "are" : "is"} typing…
//                 </span>
//               ) : null}
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="p-4 border-b space-y-3">

//             {/* Action Buttons */}
//             {/* {showActionButtons && ( */}
//               <div className="flex gap-2">
//                 {/* <button
//                   onClick={() => handleAction("approved")}
//                   disabled={actionLoading}
//                   className="flex-1 bg-green-600 hover:bg-green-700 active:scale-95 transition-transform disabled:opacity-60 text-white py-2 rounded-lg"
//                 >
//                   {actionLoading ? "Working..." : "Approve"}
//                 </button> */}
//                 {/* <button
//                   onClick={() => handleAction("in_review")}
//                   disabled={actionLoading}
//                   className="flex-1 bg-yellow-500 hover:bg-yellow-600 active:scale-95 transition-transform disabled:opacity-60 text-white py-2 rounded-lg"
//                 >
//                   {actionLoading ? "Working..." : "In Review"}
//                 </button> */}
//                 {/* <button
//                   onClick={() => handleAction("rejected")}
//                   disabled={actionLoading}
//                   className="flex-1 bg-red-600 hover:bg-red-700 active:scale-95 transition-transform disabled:opacity-60 text-white py-2 rounded-lg"
//                 >
//                   {actionLoading ? "Working..." : "Reject"}
//                 </button> */}
//               </div>
//             {/* )} */}

//             {/* Hint */}

//           </div>

//           {/* Comments (chat) */}
//           <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
//             {comments.length === 0 && (
//               <div className="text-sm text-gray-500">No comments yet — be the first.</div>
//             )}

//             {comments.map((c) => {
//               const mine = c.user_id === user?.id;
//               const isAnimating = animateIds.has(c.id);
//               return (
//                 <div
//                   key={c.id}
//                   className={`p-3 rounded-lg border max-w-[85%] ${mine ? "ml-auto bg-purple-50 border-purple-100" : "bg-gray-100 border-gray-200"} ${isAnimating ? "animate-slide-in" : ""
//                     }`}
//                 >
//                   <div className="flex items-center justify-between gap-2">
//                     <p className={`text-sm font-semibold ${mine ? "text-purple-700" : "text-gray-700"}`}>
//                       {mine ? "You" : c.user_name || "User"}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <p className="text-xs text-gray-500">
//                         {new Date(c.created_at).toLocaleString()}
//                       </p>
//                       {/* Delivered/Seen ticks (simple) */}
//                       {mine ? (
//                         <div className="text-xs text-gray-500">
//                           {c.seen ? "✓✓" : c.delivered ? "✓" : ""}
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>

//                   <div className="mt-1 text-sm text-gray-800">{c.message}</div>
//                 </div>
//               );
//             })}

//             <div ref={commentsEndRef} />
//           </div>

//           {/* Input */}
//           <div className="p-4 border-t bg-gray-50 flex gap-2 items-center">
//             <input
//               value={message}
//               onChange={(e) => {
//                 setMessage(e.target.value);
//                 emitTyping();
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   if (!sendingComment) handleSend();
//                 }
//               }}
//               placeholder="Write a comment… (Press Enter to send)"
//               className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300"
//             />
//             <button
//               onClick={handleSend}
//               disabled={sendingComment || !message.trim()}
//               className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition-transform disabled:opacity-60 text-white px-4 py-2 rounded-lg"
//             >
//               {sendingComment ? "Sending..." : "Send"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewFileModal;



// // src/components/modals/ViewFileModal.jsx
// import React, { useState } from "react";
// import ViewFilePreview from "./viewfile/ViewFilePreview";
// import ViewCommentsPanel from "./viewfile/ViewCommentsPanel";
// import ApprovalPanel from "./viewfile/ApprovalPanel";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const ViewFileModal = ({ file, projectId, folderId, onClose }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [toasts, setToasts] = useState([]);

//   const pushToast = (text, type = "info", ttl = 4000) => {
//     const id = Date.now();
//     setToasts((t) => [...t, { id, text, type }]);
//     setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[5000]">

//       {/* Toasts */}
//       <div className="fixed right-6 top-6 space-y-2">
//         {toasts.map((t) => (
//           <div
//             key={t.id}
//             className={`px-4 py-2 rounded-lg shadow text-white ${
//               t.type === "error"
//                 ? "bg-red-600"
//                 : t.type === "success"
//                 ? "bg-green-600"
//                 : "bg-gray-800"
//             }`}
//           >
//             {t.text}
//           </div>
//         ))}
//       </div>

//       <div className="bg-white w-[85vw] h-[90vh] rounded-xl shadow-xl flex overflow-hidden">
        
//         {/* LEFT: FILE PREVIEW */}
//         <ViewFilePreview
//           file={file}
//           projectId={projectId}
//           folderId={folderId}
//           API_BASE={API_BASE}
//           pushToast={pushToast}
//           user={user}
//         />

//         {/* RIGHT PANEL */}
//         <div className="w-96 bg-white border-l flex flex-col">
//           {/* Approval Section */}
//           <ApprovalPanel
//             file={file}
//             user={user}
//             API_BASE={API_BASE}
//             pushToast={pushToast}
//           />

//           {/* Comments */}
//           <ViewCommentsPanel
//             file={file}
//             user={user}
//             pushToast={pushToast}
//           />

//           {/* Close */}
//           <button
//             className="absolute top-3 right-4 text-2xl text-gray-700 hover:text-black"
//             onClick={onClose}
//           >
//             ✕
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewFileModal;





// // src/components/modals/ViewFileModal.jsx
// import React, { useState } from "react";
// import ViewFilePreview from "./viewfile/ViewFilePreview";
// import ViewCommentsPanel from "./viewfile/ViewCommentsPanel";
// import ApprovalPanel from "./viewfile/ApprovalPanel";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const ViewFileModal = ({ file, projectId, folderId, onClose }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [toasts, setToasts] = useState([]);

//   const pushToast = (text, type = "info", ttl = 4000) => {
//     const id = Date.now();
//     setToasts((t) => [...t, { id, text, type }]);
//     setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[5000] animate-in fade-in duration-200">

//       {/* Toasts */}
//       <div className="fixed right-6 top-6 space-y-3 z-[5001]">
//         {toasts.map((t) => (
//           <div
//             key={t.id}
//             className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-in slide-in-from-right duration-300 ${
//               t.type === "error"
//                 ? "bg-red-500"
//                 : t.type === "success"
//                 ? "bg-green-500"
//                 : "bg-gray-900"
//             }`}
//           >
//             {t.text}
//           </div>
//         ))}
//       </div>

//       <div className="bg-white w-[85vw] h-[90vh] rounded-2xl shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-200">
        
//         {/* LEFT: FILE PREVIEW */}
//         <ViewFilePreview
//           file={file}
//           projectId={projectId}
//           folderId={folderId}
//           API_BASE={API_BASE}
//           pushToast={pushToast}
//           user={user}
//         />

//         {/* RIGHT PANEL */}
//         <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
//           {/* Approval Section */}
//           <ApprovalPanel
//             file={file}
//             user={user}
//             API_BASE={API_BASE}
//             pushToast={pushToast}
//           />

//           {/* Comments */}
//           <ViewCommentsPanel
//             file={file}
//             user={user}
//             pushToast={pushToast}
//           />

//           {/* Close Button */}
//           <button
//             className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 shadow-md hover:shadow-lg transition-all duration-200 z-10"
//             onClick={onClose}
//             aria-label="Close modal"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewFileModal;



// // src/components/modals/ViewFileModal.jsx
// import React, { useState } from "react";
// import ViewFilePreview from "./viewfile/ViewFilePreview";
// import ViewCommentsPanel from "./viewfile/ViewCommentsPanel";
// import ApprovalPanel from "./viewfile/ApprovalPanel";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const ViewFileModal = ({ file, projectId, folderId, onClose }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [toasts, setToasts] = useState([]);

//   const pushToast = (text, type = "info", ttl = 4000) => {
//     const id = Date.now();
//     setToasts((t) => [...t, { id, text, type }]);
//     setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[5000] animate-in fade-in duration-200">

//       {/* Toasts */}
//       <div className="fixed right-2 sm:right-4 md:right-6 top-2 sm:top-4 md:top-6 space-y-2 sm:space-y-3 z-[5001]">
//         {toasts.map((t) => (
//           <div
//             key={t.id}
//             className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg text-white text-xs sm:text-sm font-medium animate-in slide-in-from-right duration-300 ${
//               t.type === "error"
//                 ? "bg-red-500"
//                 : t.type === "success"
//                 ? "bg-green-500"
//                 : "bg-gray-900"
//             }`}
//           >
//             {t.text}
//           </div>
//         ))}
//       </div>

//       <div className="bg-white w-full h-full sm:w-[95vw] sm:h-[95vh] md:w-[90vw] md:h-[92vh] lg:w-[85vw] lg:h-[90vh] rounded-none sm:rounded-xl md:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-200">
        
//         {/* LEFT: FILE PREVIEW */}
//         <div className="flex-1 min-h-0 order-2 md:order-1">
//           <ViewFilePreview
//             file={file}
//             projectId={projectId}
//             folderId={folderId}
//             API_BASE={API_BASE}
//             pushToast={pushToast}
//             user={user}
//           />
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="w-full md:w-80 lg:w-96 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col h-[40vh] md:h-full order-1 md:order-2">
//           {/* Approval Section */}
//           <ApprovalPanel
//             file={file}
//             user={user}
//             API_BASE={API_BASE}
//             pushToast={pushToast}
//           />

//           {/* Comments */}
//           <ViewCommentsPanel
//             file={file}
//             user={user}
//             pushToast={pushToast}
//           />

//           {/* Close Button */}
//           <button
//             className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 shadow-md hover:shadow-lg transition-all duration-200 z-10"
//             onClick={onClose}
//             aria-label="Close modal"
//           >
//             <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewFileModal;


// src/components/modals/ViewFileModal.jsx
import React, { useState } from "react";
import ViewFilePreview from "./viewfile/ViewFilePreview";
import ViewCommentsPanel from "./viewfile/ViewCommentsPanel";
import ApprovalPanel from "./viewfile/ApprovalPanel";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ViewFileModal = ({ file, projectId, folderId, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [toasts, setToasts] = useState([]);

  const pushToast = (text, type = "info", ttl = 4000) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, text, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-0 sm:p-2 md:p-4 z-[5000] animate-in fade-in duration-200">

      {/* Toasts */}
      <div className="fixed right-2 sm:right-3 md:right-4 lg:right-6 top-2 sm:top-3 md:top-4 lg:top-6 space-y-2 z-[5001]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 rounded-lg shadow-lg text-white text-xs sm:text-sm font-medium animate-in slide-in-from-right duration-300 ${
              t.type === "error"
                ? "bg-red-500"
                : t.type === "success"
                ? "bg-green-500"
                : "bg-gray-900"
            }`}
          >
            {t.text}
          </div>
        ))}
      </div>

      <div className="bg-white w-full h-full sm:w-[98vw] sm:h-[98vh] md:w-[95vw] md:h-[95vh] lg:w-[90vw] lg:h-[92vh] xl:w-[85vw] xl:h-[90vh] rounded-none sm:rounded-lg md:rounded-xl lg:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* LEFT: FILE PREVIEW - Full width on mobile, flex-1 on desktop */}
        <div className="flex-1 min-h-0 order-2 md:order-1 h-[55vh] md:h-full">
          <ViewFilePreview
            file={file}
            projectId={projectId}
            folderId={folderId}
            API_BASE={API_BASE}
            pushToast={pushToast}
            user={user}
          />
        </div>

        {/* RIGHT PANEL - Full width on mobile, fixed width on desktop */}
        <div className="w-full md:w-80 lg:w-96 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col h-[45vh] md:h-full order-1 md:order-2">
          {/* Approval Section */}
          <ApprovalPanel
            file={file}
            user={user}
            API_BASE={API_BASE}
            pushToast={pushToast}
          />

          {/* Comments */}
          <ViewCommentsPanel
            file={file}
            user={user}
            pushToast={pushToast}
          />

          {/* Close Button - Adjusted position for mobile */}
<button
  className="
    absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4
    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
    flex items-center justify-center
    rounded-full
    bg-white/80 hover:bg-white/95
    text-red-600 hover:text-red-700
    shadow-md hover:shadow-xl
    ring-1 ring-black/5
    transition-all duration-200
    hover:scale-105 active:scale-95
    backdrop-blur-md
    z-10
  "
  onClick={onClose}
  aria-label="Close modal"
>
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="currentColor"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>

        </div>
      </div>
    </div>
  );
};

export default ViewFileModal;