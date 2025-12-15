// // src\pages\admin\RecycleBin.jsx
// import React, { useEffect, useState } from "react";
// import { Trash2, RotateCcw, Building2, Folder } from "lucide-react";
// import { useDocumentsApi } from "../../api/documentsApi";
// import ConfirmRestoreModal from "../../components/modals/ConfirmRestoreModal";
// import { toast } from "react-toastify";

// export default function RecycleBin() {
//   const { getAdminRecycleBinDocuments, restoreDocument } = useDocumentsApi();

//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const loadRecycleBin = async () => {
//     try {
//       setLoading(true);
//       const res = await getAdminRecycleBinDocuments();
//       setDocuments(res.data || []);
//     } catch (err) {
//       console.error("Failed to load recycle bin:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRecycleBin();
//   }, []);

//   const handleRestore = async () => {
//     if (!selectedDoc) return;

//     try {
//       await restoreDocument(selectedDoc.id);

//       toast.success("Document restored successfully");

//       setShowConfirm(false);
//       setSelectedDoc(null);
//       await loadRecycleBin(); // refresh list
//     } catch (err) {
//       console.error("Restore failed:", err);

//       toast.error("Failed to restore document");
//     }
//   };

//   if (loading) {
//     return <div className="p-6">Loading recycle bin…</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="flex items-center gap-3 mb-6">
//         <Trash2 className="text-red-600" />
//         <h1 className="text-2xl font-bold">Recycle Bin</h1>
//       </div>

//       {documents.length === 0 ? (
//         <div className="text-gray-500 text-center mt-20">
//           No deleted documents
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {documents.map((doc) => (
//             <div
//               key={doc.id}
//               className="border rounded-xl p-5 bg-white shadow-sm"
//             >
//               <div className="font-semibold text-gray-900 mb-2">
//                 {doc.title}
//               </div>

//               <div className="space-y-2 text-sm text-gray-600 mb-4">
//                 <div className="flex items-center gap-2">
//                   <Building2 size={14} />
//                   <span>{doc.company_name}</span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Folder size={14} />
//                   <span>
//                     {doc.project_name} / {doc.folder_name}
//                   </span>
//                 </div>

//                 <div className="text-xs text-gray-400">
//                   Deleted on {new Date(doc.deleted_at).toLocaleString()}
//                 </div>
//               </div>

//               <button
//                 onClick={() => {
//                   setSelectedDoc(doc);
//                   setShowConfirm(true);
//                 }}
//                 className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
//               >
//                 <RotateCcw size={16} />
//                 Restore
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <ConfirmRestoreModal
//         isOpen={showConfirm}
//         document={selectedDoc}
//         message={`Are you sure you want to restore "${selectedDoc?.title}"?
// The customer will be notified automatically.`}
//         onConfirm={handleRestore}
//         onCancel={() => {
//           setShowConfirm(false);
//           setSelectedDoc(null);
//         }}
//       />
//     </div>
//   );
// }


// src\pages\admin\RecycleBin.jsx
import React, { useEffect, useState } from "react";
import { Trash2, RotateCcw, Building2, Folder, FileText, Clock, AlertCircle } from "lucide-react";
import { useDocumentsApi } from "../../api/documentsApi";
import ConfirmRestoreModal from "../../components/modals/ConfirmRestoreModal";
import { toast } from "react-toastify";

export default function RecycleBin() {
  const { getAdminRecycleBinDocuments, restoreDocument } = useDocumentsApi();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const loadRecycleBin = async () => {
    try {
      setLoading(true);
      const res = await getAdminRecycleBinDocuments();
      setDocuments(res.data || []);
    } catch (err) {
      console.error("Failed to load recycle bin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecycleBin();
  }, []);

  const handleRestore = async () => {
    if (!selectedDoc) return;

    try {
      await restoreDocument(selectedDoc.id);

      toast.success("Document restored successfully");

      setShowConfirm(false);
      setSelectedDoc(null);
      await loadRecycleBin(); // refresh list
    } catch (err) {
      console.error("Restore failed:", err);

      toast.error("Failed to restore document");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading recycle bin…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <Trash2 className="text-red-600 h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Recycle Bin</h1>
              <p className="text-sm text-gray-500 mt-1">
                Restore deleted documents back to their original location
              </p>
            </div>
          </div>
          
          {/* Stats Bar */}
          {documents.length > 0 && (
            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="px-2 py-1 bg-gray-100 rounded-lg font-semibold text-gray-700">
                  {documents.length}
                </div>
                <span className="text-gray-600">Deleted documents</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-white rounded-2xl shadow-sm mb-6">
              <Trash2 className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Recycle Bin is Empty
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              Documents that are deleted will appear here for 30 days before permanent deletion
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-5 pb-0">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                      <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-lg">
                        {doc.title}
                      </h3>
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="p-1.5 bg-blue-50 rounded">
                        <Building2 className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium truncate">
                        {doc.company_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="p-1.5 bg-purple-50 rounded">
                        <Folder className="h-3.5 w-3.5 text-purple-600" />
                      </div>
                      <span className="text-gray-600 truncate">
                        {doc.project_name} / {doc.folder_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm pt-2 border-t border-gray-100">
                      <div className="p-1.5 bg-orange-50 rounded">
                        <Clock className="h-3.5 w-3.5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-500 text-xs">Deleted on</span>
                        <p className="text-gray-700 font-medium">
                          {new Date(doc.deleted_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(doc.deleted_at).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-4 mt-2 bg-gray-50 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedDoc(doc);
                      setShowConfirm(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 transform hover:scale-[1.02] transition-all duration-150 shadow-sm hover:shadow-md"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Restore Document
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Info Alert */}
        {documents.length > 0 && (
          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">Important Information</h4>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Restored documents will be moved back to their original location. 
                  The customer who uploaded the document will receive an automatic notification 
                  about the restoration.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmRestoreModal
        isOpen={showConfirm}
        document={selectedDoc}
        message={`Are you sure you want to restore "${selectedDoc?.title}"?
The customer will be notified automatically.`}
        onConfirm={handleRestore}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedDoc(null);
        }}
      />
    </div>
  );
}