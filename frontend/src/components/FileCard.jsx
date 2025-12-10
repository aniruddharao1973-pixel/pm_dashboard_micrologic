


// // // src/components/FileCard.jsx
// // import React from "react";
// // import { getFileIcon } from "../utils/fileIcons";
// // import { formatDate } from "../utils/formatDate";

// // const FileCard = ({ document, onView, onRename, onDelete, onVersions }) => {
// //   // Extract file extension
// //   const fileType = document.filename
// //     ? document.filename.split(".").pop().toUpperCase()
// //     : "UNKNOWN";

// //   const Icon = getFileIcon(fileType);

// //   // Color palette like other cards
// //   const colors = [
// //     "from-blue-500 to-purple-600",
// //     "from-purple-500 to-blue-600",
// //     "from-teal-500 to-green-600",
// //     "from-pink-500 to-rose-600",
// //     "from-indigo-500 to-purple-600",
// //   ];

// //   // UUID → number hash
// //   const hashString = (str) => {
// //     let hash = 0;
// //     for (let i = 0; i < str.length; i++) {
// //       hash = str.charCodeAt(i) + ((hash << 5) - hash);
// //     }
// //     return Math.abs(hash);
// //   };

// //   const color = colors[hashString(document.id) % colors.length];
// //   const uploadedBy = document.uploaded_by_name || "Unknown User";

// //   return (
// //     <div
// //       className="
// //         bg-white border border-gray-200 rounded-xl shadow-sm p-6
// //         hover:shadow-lg hover:-translate-y-1 transition 
// //         flex flex-col gap-4
// //       "
// //     >
// //       <div className="flex items-start gap-4">
// //         {/* File Icon */}
// //         <div
// //           className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow`}
// //         >
// //           {Icon ? (
// //             <div className="h-7 w-7 text-white">{Icon}</div>
// //           ) : (
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-7 w-7 text-white"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M7 3h6l5 5v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
// //               />
// //             </svg>
// //           )}
// //         </div>

// //         {/* Title + Actions */}
// //         <div className="flex-1">
// //           <div className="flex justify-between items-start">
// //             <h3 className="text-lg font-semibold text-gray-800">
// //               {document.title}
// //             </h3>

// //             {/* Action buttons */}
// //             <div className="flex items-center gap-3">
// //               {/* View File */}
// //               <button onClick={onView} className="text-blue-600 hover:text-blue-800">
// //                 👁️
// //               </button>

// //               {/* Rename */}
// //               <button onClick={onRename} className="text-yellow-600 hover:text-yellow-800">
// //                 ✏️
// //               </button>

// //               {/* Delete */}
// //               <button onClick={onDelete} className="text-red-600 hover:text-red-800">
// //                 ❌
// //               </button>
// //             </div>
// //           </div>

// //           {/* Info lines */}
// //           <p className="text-gray-500 text-sm">Type: {fileType}</p>
// //           <p className="text-gray-500 text-sm">Uploaded by: {uploadedBy}</p>

// //           {/* Versions */}
// //           <button
// //             onClick={onVersions}
// //             className="text-sm mt-1 text-purple-600 hover:text-purple-800 underline"
// //           >
// //             View Version History →
// //           </button>

// //           <p className="text-gray-400 text-xs mt-1">
// //             Uploaded: {formatDate(document.created_at)}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FileCard;


// // // src/components/FileCard.jsx
// // import React from "react";
// // import { getFileIcon } from "../utils/fileIcons";
// // import { formatDate } from "../utils/formatDate";

// // const FileCard = ({ document, onView, onRename, onDelete, onVersions }) => {
// //   // Extract file extension
// //   const fileType = document.filename
// //     ? document.filename.split(".").pop().toUpperCase()
// //     : "UNKNOWN";

// //   const Icon = getFileIcon(fileType);

// //   // Color palette like other cards
// //   const colors = [
// //     "from-blue-500 to-purple-600",
// //     "from-purple-500 to-blue-600",
// //     "from-teal-500 to-green-600",
// //     "from-pink-500 to-rose-600",
// //     "from-indigo-500 to-purple-600",
// //   ];

// //   // Stable UUID hash → color index
// //   const hashString = (str) => {
// //     let hash = 0;
// //     for (let i = 0; i < str.length; i++) {
// //       hash = str.charCodeAt(i) + ((hash << 5) - hash);
// //     }
// //     return Math.abs(hash);
// //   };

// //   const color = colors[hashString(document.id) % colors.length];
// //   const uploadedBy = document.uploaded_by_name || "Unknown User";

// //   return (
// //     <div
// //       className="
// //         bg-white border border-gray-200 rounded-xl shadow-sm p-6
// //         hover:shadow-lg hover:-translate-y-1 transition 
// //         flex flex-col gap-4
// //       "
// //     >
// //       <div className="flex items-start gap-4">
// //         {/* File Icon */}
// //         <div
// //           className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow`}
// //         >
// //           {Icon ? (
// //             <div className="h-7 w-7 text-white">{Icon}</div>
// //           ) : (
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-7 w-7 text-white"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M7 3h6l5 5v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
// //               />
// //             </svg>
// //           )}
// //         </div>

// //         {/* Title + Actions */}
// //         <div className="flex-1">
// //           <div className="flex justify-between items-start">
// //             <h3 className="text-lg font-semibold text-gray-800">
// //               {document.title}
// //             </h3>

// //             {/* Action Buttons */}
// //             <div className="flex items-center gap-3">
// //               {/* View */}
// //               <button
// //                 onClick={onView}
// //                 className="text-blue-600 hover:text-blue-800"
// //                 title="View File"
// //               >
// //                 👁️
// //               </button>

// //               {/* Rename */}
// //               <button
// //                 onClick={onRename}
// //                 className="text-yellow-600 hover:text-yellow-800"
// //                 title="Rename Document"
// //               >
// //                 ✏️
// //               </button>

// //               {/* Delete */}
// //               <button
// //                 onClick={onDelete}
// //                 className="text-red-600 hover:text-red-800"
// //                 title="Delete Document"
// //               >
// //                 ❌
// //               </button>
// //             </div>
// //           </div>

// //           {/* Information */}
// //           <p className="text-gray-500 text-sm">Type: {fileType}</p>
// //           <p className="text-gray-500 text-sm">Uploaded by: {uploadedBy}</p>
// //           <p className="text-gray-500 text-sm">
// //           Version: {document.current_version}
// //         </p>


// //           {/* Version History Link */}
// //           <button
// //             onClick={onVersions}
// //             className="text-sm mt-1 text-purple-600 hover:text-purple-800 underline"
// //           >
// //             View Version History →
// //           </button>

// //           {/* Uploaded At */}
// //           <p className="text-gray-400 text-xs mt-1">
// //             Uploaded: {formatDate(document.created_at)}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FileCard;



// // src/components/FileCard.jsx
// import React from "react";
// import { getFileIcon } from "../utils/fileIcons";
// import { formatDate } from "../utils/formatDate";

//   const FileCard = ({ document, onView, onRename, onDelete, onVersions, onNotes }) => {
//     // Extract file extension
//     const fileType = document.filename
//       ? document.filename.split(".").pop().toUpperCase()
//       : "UNKNOWN";

//     const Icon = getFileIcon(fileType);

//       // Normalized status coming from DocumentsPage (includes approval_status)
//     const status = (document.status || "submitted").toLowerCase();

//     const statusStyles = {
//       approved: "bg-green-100 text-green-700 border border-green-300",
//       rejected: "bg-red-100 text-red-700 border border-red-300",
//       in_review: "bg-blue-100 text-blue-700 border border-blue-300",
//       submitted: "bg-gray-100 text-gray-700 border border-gray-300",
//     };

//     const statusKey = status === "completed" ? "approved" : status;
//     const statusClass = statusStyles[statusKey] || statusStyles.submitted;
//     const statusLabel =
//       statusKey === "in_review" ? "IN REVIEW" : statusKey.toUpperCase();


//   // Enhanced color palette matching theme
//   const colors = [
//     "from-blue-500 to-indigo-600",
//     "from-purple-500 to-pink-600",
//     "from-teal-500 to-emerald-600",
//     "from-rose-500 to-pink-600",
//     "from-indigo-500 to-purple-600",
//     "from-orange-500 to-amber-600",
//   ];

//   // Stable UUID hash → color index
//   const hashString = (str) => {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     return Math.abs(hash);
//   };

//   const color = colors[hashString(document.id) % colors.length];
//   const uploadedBy = document.uploaded_by_name || "Unknown User";

//   return (
//     <div
//       className="
//         group relative
//         bg-gradient-to-br from-white to-amber-50
//         border-2 border-amber-200
//         rounded-2xl shadow-lg p-6
//         hover:shadow-2xl hover:shadow-amber-300/50 hover:border-orange-300
//         hover:-translate-y-2 hover:scale-[1.02]
//         transition-all duration-300 ease-out
//         flex flex-col gap-4
//       "
//     >
//       <div className="flex items-start gap-4">
//         {/* File Icon with Glow */}
//         <div
//           className={`
//             relative h-14 w-14 rounded-2xl 
//             bg-gradient-to-br ${color} 
//             flex items-center justify-center 
//             shadow-xl
//             group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6
//             transition-all duration-300
//           `}
//         >
//           {Icon ? (
//             <div className="h-8 w-8 text-white">{Icon}</div>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M7 3h6l5 5v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
//               />
//             </svg>
//           )}
          
//           {/* File Type Badge */}
//           <div className="absolute -bottom-2 -right-2 px-2 py-1 bg-white rounded-lg shadow-md border-2 border-amber-200">
//             <span className="text-xs font-bold text-orange-700">{fileType}</span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1">
//         <div className="flex justify-between items-start mb-3">
//           <div className="flex flex-col gap-1">
//             {/* Title */}
//             <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-700 transition-colors line-clamp-2">
//               {document.title}
//             </h3>

//             {/* Status pill */}
//             <span
//               className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}
//             >
//               {statusLabel}
//             </span>
//           </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-2 ml-2">
//               {/* View */}
//               <button
//                 onClick={onView}
//                 className="
//                   p-2 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 
//                   text-blue-600 hover:text-blue-800
//                   border-2 border-blue-300
//                   shadow-md hover:shadow-lg hover:shadow-blue-300
//                   transform hover:scale-125 hover:-translate-y-1
//                   transition-all duration-300
//                 "
//                 title="View File"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               </button>

//               {/* Rename */}
//               <button
//                 onClick={onRename}
//                 className="
//                   p-2 rounded-xl bg-gradient-to-r from-yellow-100 to-amber-100 
//                   text-yellow-600 hover:text-yellow-800
//                   border-2 border-yellow-300
//                   shadow-md hover:shadow-lg hover:shadow-yellow-300
//                   transform hover:scale-125 hover:-translate-y-1
//                   transition-all duration-300
//                 "
//                 title="Rename Document"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//               </button>

//               {/* Delete */}
//               <button
//                 onClick={onDelete}
//                 className="
//                   p-2 rounded-xl bg-gradient-to-r from-red-100 to-rose-100 
//                   text-red-600 hover:text-red-800
//                   border-2 border-red-300
//                   shadow-md hover:shadow-lg hover:shadow-red-300
//                   transform hover:scale-125 hover:-translate-y-1
//                   transition-all duration-300
//                 "
//                 title="Delete Document"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </button>

//               {/* Notes */}
//               <button
//                 onClick={onNotes}
//                 className="
//                   p-2 rounded-xl bg-gradient-to-r from-pink-100 to-rose-100
//                   text-pink-600 hover:text-pink-800
//                   border-2 border-pink-300
//                   shadow-md hover:shadow-lg hover:shadow-pink-300
//                   transform hover:scale-125 hover:-translate-y-1
//                   transition-all duration-300
//                 "
//                 title="Add Notes"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//                     viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                     d="M12 20h9M12 4h9M3 4h9M3 12h18M3 20h9" />
//                 </svg>
//               </button>

//             </div>
//           </div>

//           {/* Information Grid */}
//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
//                 👤 {uploadedBy}
//               </span>
//               <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
//                 📝 Version {document.current_version}
//               </span>
//             </div>

//             {/* Version History Link */}
//             <button
//               onClick={onVersions}
//               className="
//                 inline-flex items-center gap-2
//                 text-sm font-bold text-purple-600 hover:text-purple-800
//                 bg-purple-50 hover:bg-purple-100
//                 px-4 py-2 rounded-xl
//                 border-2 border-purple-200 hover:border-purple-400
//                 shadow-sm hover:shadow-md hover:shadow-purple-200
//                 transform hover:scale-105
//                 transition-all duration-300
//               "
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               View Version History →
//             </button>

//             {/* Uploaded At */}
//             <div className="flex items-center gap-2 text-xs text-amber-600 font-medium mt-2 pt-2 border-t border-amber-200">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               Uploaded: {formatDate(document.created_at)}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileCard;



// src/components/FileCard.jsx
import React from "react";
import { getFileIcon } from "../utils/fileIcons";
import { formatDate } from "../utils/formatDate";

const FileCard = ({ document, user, onView, onDelete, onVersions }) => {
  // Extract file extension
  const fileType = document.filename
    ? document.filename.split(".").pop().toUpperCase()
    : "UNKNOWN";

  const Icon = getFileIcon(fileType);

  // Normalized status
  const status = (document.status || "submitted").toLowerCase();

  const statusStyles = {
    approved: "bg-green-100 text-green-700 border border-green-300",
    rejected: "bg-red-100 text-red-700 border border-red-300",
    in_review: "bg-blue-100 text-blue-700 border border-blue-300",
    submitted: "bg-gray-100 text-gray-700 border border-gray-300",
  };

  const statusKey = status === "completed" ? "approved" : status;
  const statusClass = statusStyles[statusKey] || statusStyles.submitted;
  const statusLabel =
    statusKey === "in_review" ? "IN REVIEW" : statusKey.toUpperCase();

  // Icon color palette
  const colors = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-teal-500 to-emerald-600",
    "from-rose-500 to-pink-600",
    "from-indigo-500 to-purple-600",
    "from-orange-500 to-amber-600",
  ];

  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const color = colors[hashString(document.id) % colors.length];
  const uploadedBy = document.uploaded_by_name || "Unknown User";

  return (
<div
  className="
    group relative z-0
    bg-gradient-to-br from-white to-amber-50
    border-2 border-amber-200
    rounded-2xl shadow-lg p-6
    hover:shadow-2xl hover:border-orange-300
    hover:-translate-y-2 hover:scale-[1.02]
    transition-all duration-300 ease-out
    flex flex-col gap-4
    mb-8
  "
>



      <div className="flex items-start gap-4">

        {/* File Icon */}
        <div
          className={`
            relative h-14 w-14 rounded-2xl 
            bg-gradient-to-br ${color} 
            flex items-center justify-center shadow-xl
            group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6
            transition-all duration-300
          `}
        >
          {Icon ? (
            <div className="h-8 w-8 text-white">{Icon}</div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 3h6l5 5v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
            </svg>
          )}

          {/* File Type Badge */}
          <div className="absolute -bottom-2 -right-2 px-2 py-1 bg-white rounded-lg shadow-md border-2 border-amber-200">
            <span className="text-xs font-bold text-orange-700">{fileType}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">

        {/* TITLE + STATUS */}
<div className="mb-3">
  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-700 transition-colors line-clamp-2">
    {document.original_filename || document.filename || document.title}
  </h3>

  <span
    className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}
  >
    {statusLabel}
  </span>
</div>

        {/* ACTION BUTTONS – moved down */}
        <div className="flex items-center gap-3 mb-3">

          {/* View */}
          <button
            onClick={onView}
            className="
              p-2 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 
              text-blue-600 hover:text-blue-800
              border-2 border-blue-300
              shadow-md hover:shadow-lg hover:shadow-blue-300
              transition-all duration-300
            "
            title="View File"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
                  9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="
              p-2 rounded-xl bg-gradient-to-r from-red-100 to-rose-100 
              text-red-600 hover:text-red-800
              border-2 border-red-300
              shadow-md hover:shadow-lg hover:shadow-red-300
              transition-all duration-300
            "
            title="Delete Document"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
                  a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
                  m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3
                  M4 7h16" />
            </svg>
          </button>

        </div>


          {/* Information Grid */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                👤 {uploadedBy}
              </span>
              <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
                📝 Version {document.current_version}
              </span>
            </div>


{/* SHOW ONLY FOR CUSTOMERS */}
{/* {user.role === "customer" && (
  document.can_download ? (
    <span className="inline-flex items-center gap-1 mt-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-300">
      ✅ Download Allowed
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 mt-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full border border-red-300">
      🚫 Download Blocked by Admin
    </span>
  )
)} */}



            {/* View Versions */}
            <button
              onClick={onVersions}
              className="
                inline-flex items-center gap-2
                text-sm font-bold text-purple-600 hover:text-purple-800
                bg-purple-50 hover:bg-purple-100
                px-4 py-2 rounded-xl
                border-2 border-purple-200 hover:border-purple-400
                shadow-sm hover:shadow-md hover:shadow-purple-200
                transform hover:scale-105
                transition-all duration-300
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 
                     9 9 0 0118 0z" />
              </svg>
              View Version History →
            </button>

            <div className="flex items-center gap-2 text-xs text-amber-600 font-medium mt-2 pt-2 border-t border-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 
                     0 002-2V7a2 2 0 00-2-2H5a2 2 
                     0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Uploaded: {formatDate(document.created_at)}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
