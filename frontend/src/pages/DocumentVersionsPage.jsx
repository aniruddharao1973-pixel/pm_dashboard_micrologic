// // src/pages/DocumentVersionsPage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDocumentsApi } from "../api/documentsApi";
// import { formatDate } from "../utils/formatDate";

// const DocumentVersionsPage = () => {
//   const { documentId } = useParams();
//   const { getDocumentVersions } = useDocumentsApi();

//   const [versions, setVersions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadVersions = async () => {
//     try {
//       const res = await getDocumentVersions(documentId);
//       setVersions(res.data);
//     } catch (err) {
//       console.error("Failed to load document versions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadVersions();
//   }, [documentId]);

//   if (loading) return <p className="text-gray-600">Loading versions...</p>;

//   return (
//     <div className="space-y-8">
//       {/* Title */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">Document Versions</h1>
//         <p className="text-gray-600">Complete version history of the file.</p>
//       </div>

//       {/* Version List */}
//       {versions.length === 0 ? (
//         <p className="text-gray-500">No versions found.</p>
//       ) : (
//         <div className="space-y-4">
//           {versions.map((v) => (
//             <div
//                   key={v.id}   // ← FIXED
//               className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition"
//             >
//               <div className="flex items-center gap-4">
//                 {/* Version Badge */}
//                 <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold shadow">
//                   {v.version_number}
//                 </div>

//                 {/* Info */}
//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     Version {v.version_number}
//                   </h3>
//                   <p className="text-gray-500 text-sm">
//                     Uploaded: {formatDate(v.uploaded_at)}
//                   </p>
//                 </div>
//               </div>

//               {/* Download Button */}
//               <a
//                 href={v.file_url}
//                 download
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition flex items-center gap-2"
//               >
//                 <svg
//                   className="h-4 w-4 text-white"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M3 14a2 2 0 002 2h10a2 2 0 002-2v-1H3v1zm4-5l3 3 3-3h-2V3H9v6H7z" />
//                 </svg>
//                 Download
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentVersionsPage;

// src/pages/DocumentVersionsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDocumentsApi } from "../api/documentsApi";
import { formatDate } from "../utils/formatDate";

const DocumentVersionsPage = () => {
  const { documentId } = useParams();
  const { getDocumentVersions } = useDocumentsApi();

  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadVersions = async () => {
    try {
      const res = await getDocumentVersions(documentId);
      setVersions(res.data);
    } catch (err) {
      console.error("Failed to load document versions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVersions();
  }, [documentId]);

  if (loading) return <p className="text-gray-600">Loading versions...</p>;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Document Versions</h1>
        <p className="text-gray-600">Complete version history of this file.</p>
      </div>

      {/* Version List */}
      {versions.length === 0 ? (
        <p className="text-gray-500">No versions found.</p>
      ) : (
        <div className="space-y-4">
          {versions.map((v) => (
            <div
              key={v.id}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm 
                         flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {/* Version Badge */}
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 
                                text-white flex items-center justify-center font-bold shadow">
                  {v.version_number}
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Version {v.version_number}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Uploaded: {formatDate(v.created_at)}
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <a
                href={`http://localhost:5000${v.file_path}`}
                download={v.filename}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm 
                           hover:bg-blue-700 transition flex items-center gap-2"
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 14a2 2 0 002 2h10a2 2 0 002-2v-1H3v1zm4-5l3 3 3-3h-2V3H9v6H7z" />
                </svg>
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentVersionsPage;

