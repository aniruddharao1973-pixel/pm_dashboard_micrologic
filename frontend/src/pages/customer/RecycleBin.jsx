// // src\pages\customer\RecycleBin.jsx
// import React, { useEffect, useState } from "react";
// import { useDocumentsApi } from "../../api/documentsApi";
// import RestoreRequestModal from "../../components/modals/RestoreRequestModal";
// import { Trash2, RotateCcw } from "lucide-react";
// import { toast } from "react-toastify";

// export default function RecycleBin() {
//   const { getCustomerRecycleBinDocuments, requestRestoreDocument } =
//     useDocumentsApi();

//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const loadRecycleBin = async () => {
//     try {
//       setLoading(true);
//       const res = await getCustomerRecycleBinDocuments();
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

//   const handleRequestRestore = async () => {
//     if (!selectedDoc) return;

//     try {
//       await requestRestoreDocument(selectedDoc.id);
//       setShowConfirm(false);
//       setSelectedDoc(null);

//       toast.success(
//         "Restore request sent to admin. You will be notified once approved."
//       );
//     } catch (err) {
//       console.error("Restore request failed:", err);
//       toast.error("Failed to send restore request");
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
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//           {documents.map((doc) => (
//             <div
//               key={doc.id}
//               className="border rounded-xl p-5 bg-gray-50 shadow-sm"
//             >
//               <div className="mb-2 font-semibold text-gray-900">
//                 {doc.title}
//               </div>

//               <div className="text-sm text-gray-500 mb-4">
//                 Deleted on {new Date(doc.deleted_at).toLocaleDateString()}
//               </div>

//               <div className="text-xs text-red-600 mb-4">
//                 This document is frozen and cannot be accessed.
//               </div>

//               <button
//                 onClick={() => {
//                   setSelectedDoc(doc);
//                   setShowConfirm(true);
//                 }}
//                 className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
//               >
//                 <RotateCcw size={16} />
//                 Request Restore
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <RestoreRequestModal
//         isOpen={showConfirm}
//         document={selectedDoc}
//         onClose={(success) => {
//           setShowConfirm(false);
//           setSelectedDoc(null);

//           if (success) {
//             toast.success(
//               "Restore request sent to admin. You will be notified once approved."
//             );
//           }
//         }}
//       />
//     </div>
//   );
// }

// src\pages\customer\RecycleBin.jsx
import React, { useEffect, useState } from "react";
import { useDocumentsApi } from "../../api/documentsApi";
import RestoreRequestModal from "../../components/modals/RestoreRequestModal";
import { Trash2, RotateCcw, FileX, Clock, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function RecycleBin() {
  const { getCustomerRecycleBinDocuments, requestRestoreDocument } =
    useDocumentsApi();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const loadRecycleBin = async () => {
    try {
      setLoading(true);
      const res = await getCustomerRecycleBinDocuments();
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

  const handleRequestRestore = async () => {
    if (!selectedDoc) return;

    try {
      await requestRestoreDocument(selectedDoc.id);
      setShowConfirm(false);
      setSelectedDoc(null);

      toast.success(
        "Restore request sent to admin. You will be notified once approved."
      );
    } catch (err) {
      console.error("Restore request failed:", err);
      toast.error("Failed to send restore request");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <Trash2 className="w-16 h-16 text-gray-300" />
              </div>
              <Trash2 className="w-16 h-16 text-gray-400 relative" />
            </div>
            <p className="mt-6 text-lg text-gray-600 animate-pulse">
              Loading recycle bin…
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-500/20">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Recycle Bin
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your deleted documents
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur-2xl opacity-30"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <FileX className="w-20 h-20 text-gray-300" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Deleted Documents
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              Your recycle bin is empty. Documents you delete will appear here
              and can be restored within 30 days.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Card Header Gradient */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-400 via-red-500 to-orange-400"></div>

                <div className="p-6">
                  {/* Document Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl flex items-center justify-center">
                      <FileX className="w-6 h-6 text-red-500" />
                    </div>
                  </div>

                  {/* Document Title */}
                  <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {doc.title}
                  </h3>

                  {/* Deletion Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>
                      Deleted on{" "}
                      {new Date(doc.deleted_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Warning Badge */}
                  <div className="mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-medium text-red-700">
                        Document frozen • Cannot be accessed
                      </span>
                    </div>
                  </div>

                  {/* Restore Button */}
                  <button
                    onClick={() => {
                      setSelectedDoc(doc);
                      setShowConfirm(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Request Restore
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        {documents.length > 0 && (
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Important Information
                </h4>
                <p className="text-sm text-gray-600">
                  Documents in the recycle bin will be permanently deleted after
                  30 days. Request a restore to recover your documents. Admin
                  approval is required for restoration.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <RestoreRequestModal
        isOpen={showConfirm}
        document={selectedDoc}
        onClose={(success) => {
          setShowConfirm(false);
          setSelectedDoc(null);

          if (success) {
            toast.success(
              "Restore request sent to admin. You will be notified once approved."
            );
          }
        }}
      />
    </div>
  );
}
