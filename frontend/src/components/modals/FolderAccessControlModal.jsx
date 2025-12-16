// // modals/FolderAccessControlModal.jsx
// import React, { useEffect, useState } from "react";
// import { X, Save, ShieldCheck } from "lucide-react";
// import { useFoldersApi } from "../../api/foldersApi";
// import { useAuth } from "../../hooks/useAuth";
// import { toast } from "react-toastify";
// import { useAxios } from "../../api/axios";

// const FolderAccessControlModal = ({ open, onClose, projectId }) => {
//   const { isAdminLike } = useAuth();
//   const { getFoldersByProject } = useFoldersApi();
//   const axios = useAxios();

//   const [folders, setFolders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [isHydrated, setIsHydrated] = useState(false);

//   if (!isAdminLike || !open) return null;

//   const loadFolders = async () => {
//     try {
//       setLoading(true);
//       setIsHydrated(false);

//       const res = await getFoldersByProject(projectId);
//       const normalized = (res.data || []).map((f) => ({
//         ...f,
//         customer_can_upload: Boolean(f.customer_can_upload),
//         customer_can_view: Boolean(f.customer_can_view),
//         customer_can_delete: Boolean(f.customer_can_delete),
//         customer_can_download: Boolean(f.customer_can_download),
//       }));

//       setFolders(normalized);
//       setIsHydrated(true);
//     } catch {
//       toast.error("Failed to load folder permissions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!projectId) {
//     return (
//       <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
//         <div
//           className="
//           w-[90%] max-w-md
//           bg-white
//           rounded-2xl
//           shadow-2xl
//           border border-gray-200
//           overflow-hidden
//           animate-fadeIn
//         "
//         >
//           {/* Header */}
//           <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white">
//             <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
//               <span className="text-xl">⚠️</span>
//             </div>
//             <h2 className="text-lg font-bold tracking-wide">
//               Project Required
//             </h2>
//           </div>

//           {/* Body */}
//           <div className="px-6 py-5 text-center">
//             <p className="text-gray-700 text-sm leading-relaxed">
//               Folder Access Control must be opened from within a specific
//               project.
//             </p>

//             <p className="mt-2 text-xs text-gray-500">
//               Please navigate to a project and try again.
//             </p>
//           </div>

//           {/* Footer */}
//           <div className="px-6 py-4 bg-gray-50 flex justify-end">
//             <button
//               onClick={onClose}
//               className="
//               px-5 py-2
//               rounded-lg
//               bg-gray-900 text-white
//               font-semibold text-sm
//               hover:bg-gray-800
//               active:scale-95
//               transition-all
//             "
//             >
//               Close
//             </button>
//           </div>

//           {/* Animation */}
//           <style>{`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.96); }
//             to { opacity: 1; transform: scale(1); }
//           }
//           .animate-fadeIn {
//             animation: fadeIn 0.2s ease-out;
//           }
//         `}</style>
//         </div>
//       </div>
//     );
//   }

//   useEffect(() => {
//     if (!open || !projectId) return;

//     loadFolders();

//     return () => {
//       setFolders([]);
//       setIsHydrated(false);
//     };
//   }, [open, projectId]);

//   const togglePermission = (folderId, key) => {
//     if (!isHydrated) return;

//     setFolders((prev) =>
//       prev.map((f) => {
//         if (f.id !== folderId) return f;

//         const updated = { ...f, [key]: !f[key] };

//         if (
//           updated.customer_can_upload ||
//           updated.customer_can_download ||
//           updated.customer_can_delete
//         ) {
//           updated.customer_can_view = true;
//         }

//         if (key === "customer_can_view" && !updated.customer_can_view) {
//           updated.customer_can_upload = false;
//           updated.customer_can_download = false;
//           updated.customer_can_delete = false;
//         }

//         return updated;
//       })
//     );
//   };

//   const handleSave = async () => {
//     try {
//       setSaving(true);

//       for (const f of folders) {
//         await axios.put(`/folders/${f.id}/permissions`, {
//           customer_can_view: f.customer_can_view,
//           customer_can_download: f.customer_can_download,
//           customer_can_upload: f.customer_can_upload,
//           customer_can_delete: f.customer_can_delete,
//         });
//       }

//       toast.success("Folder access updated");
//       onClose();
//     } catch {
//       toast.error("Failed to save folder permissions");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div
//         className="
//           w-full h-full sm:h-auto
//           sm:max-w-4xl
//           bg-white
//           rounded-none sm:rounded-2xl
//           shadow-2xl
//           flex flex-col
//           max-h-screen
//         "
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//           <div className="flex items-center gap-3">
//             <ShieldCheck className="w-6 h-6" />
//             <h2 className="text-lg font-bold">Folder Access Control</h2>
//           </div>
//           <button onClick={onClose}>
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
//           {loading ? (
//             <div className="flex justify-center py-20">
//               <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border rounded-xl overflow-hidden">
//                 <thead className="bg-gray-50 sticky top-0 z-10">
//                   <tr>
//                     <th className="px-4 py-3 text-left">Folder</th>
//                     <th className="text-center">Upload</th>
//                     <th className="text-center">View</th>
//                     <th className="text-center">Delete</th>
//                     <th className="text-center">Download</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {folders.map((f) => (
//                     <tr key={f.id} className="border-t hover:bg-gray-50">
//                       <td className="px-4 py-3 font-medium">
//                         {f.name}
//                         {f.name === "Customer Documents" && (
//                           <span className="ml-2 text-xs text-gray-500">
//                             (includes subfolders)
//                           </span>
//                         )}
//                       </td>

//                       {[
//                         "customer_can_upload",
//                         "customer_can_view",
//                         "customer_can_delete",
//                         "customer_can_download",
//                       ].map((key) => (
//                         <td key={key} className="text-center">
//                           <input
//                             type="checkbox"
//                             checked={f[key]}
//                             onChange={() => togglePermission(f.id, key)}
//                             className="w-5 h-5 accent-indigo-600"
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t px-6 py-4 flex justify-between bg-gray-50">
//           <p className="text-xs text-gray-500">
//             Changes apply immediately to customer access
//           </p>
//           <div className="flex gap-3">
//             <button onClick={onClose} className="px-4 py-2 border rounded">
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="px-5 py-2 bg-indigo-600 text-white rounded flex items-center gap-2"
//             >
//               <Save className="w-4 h-4" />
//               {saving ? "Saving…" : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FolderAccessControlModal;



// modals/FolderAccessControlModal.jsx
import React, { useEffect, useState } from "react";
import { X, Save, ShieldCheck } from "lucide-react";
import { useFoldersApi } from "../../api/foldersApi";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useAxios } from "../../api/axios";

const FolderAccessControlModal = ({ open, onClose, projectId }) => {
  const { isAdminLike } = useAuth();
  const { getCustomerAccessFolders } = useFoldersApi();
  const axios = useAxios();

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  if (!isAdminLike || !open) return null;

  const loadFolders = async () => {
    try {
      setLoading(true);
      setIsHydrated(false);

      const res = await getCustomerAccessFolders(projectId);
      const normalized = (res.data || []).map((f) => ({
        ...f,
        customer_can_upload: Boolean(f.customer_can_upload),
        customer_can_view: Boolean(f.customer_can_view),
        customer_can_delete: Boolean(f.customer_can_delete),
        customer_can_download: Boolean(f.customer_can_download),
      }));

      setFolders(normalized);
      setIsHydrated(true);
    } catch {
      toast.error("Failed to load folder permissions");
    } finally {
      setLoading(false);
    }
  };

  const orderedFolders = React.useMemo(() => {
    if (!folders.length) return [];

    const customerRoot = folders.find(
      (f) => f.name === "Customer Documents" && !f.parent_id
    );

    const customerChildren = folders.filter(
      (f) => f.parent_id === customerRoot?.id
    );

    const otherRoots = folders.filter(
      (f) => f.id !== customerRoot?.id && !f.parent_id
    );

    return [
      ...(customerRoot ? [customerRoot] : []),
      ...customerChildren,
      ...otherRoots,
    ];
  }, [folders]);

  if (!projectId) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-200 scale-100 animate-modalSlideIn">
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 opacity-10"></div>
            <div className="relative flex items-center gap-3 px-6 py-5 border-b border-red-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">⚠️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Project Required
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Action cannot be completed
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <p className="text-gray-700 leading-relaxed">
              Folder Access Control must be opened from within a specific
              project.
            </p>
            <p className="mt-3 text-sm text-gray-500 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              💡 Please navigate to the Projects folder to continue.
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-5 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium rounded-lg hover:from-gray-800 hover:to-black active:scale-[0.98] transition-all duration-150 shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!open || !projectId) return;

    loadFolders();

    return () => {
      setFolders([]);
      setIsHydrated(false);
    };
  }, [open, projectId]);

  const togglePermission = (folderId, key) => {
    if (!isHydrated) return;

    setFolders((prev) =>
      prev.map((f) => {
        if (f.id !== folderId) return f;
        if (f.name === "Customer Documents") return f; // 🔒 HARD BLOCK

        const updated = { ...f, [key]: !f[key] };

        if (
          updated.customer_can_upload ||
          updated.customer_can_download ||
          updated.customer_can_delete
        ) {
          updated.customer_can_view = true;
        }

        if (key === "customer_can_view" && !updated.customer_can_view) {
          updated.customer_can_upload = false;
          updated.customer_can_download = false;
          updated.customer_can_delete = false;
        }

        return updated;
      })
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      for (const f of folders) {
        await axios.put(`/folders/${f.id}/permissions`, {
          customer_can_view: f.customer_can_view,
          customer_can_download: f.customer_can_download,
          customer_can_upload: f.customer_can_upload,
          customer_can_delete: f.customer_can_delete,
        });
      }

      toast.success("Folder access updated");
      onClose();
    } catch {
      toast.error("Failed to save folder permissions");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col transform transition-all duration-200 animate-modalSlideIn">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Folder Access Control</h2>
                <p className="text-sm text-white/80 mt-0.5">
                  Manage customer permissions
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-150"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 overscroll-contain">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-violet-200 rounded-full"></div>
                <div className="absolute top-0 w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Loading permissions...
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-6">
              {/* Desktop View */}
              <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-indigo-600">
                      <th className="px-6 py-4 text-left border-b-2 border-purple-500/30">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-purple-200"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                          </svg>
                          <span className="text-sm font-semibold text-white uppercase tracking-wide">
                            Folder Name
                          </span>
                        </div>
                      </th>
                      {[
                        {
                          name: "Upload",
                          icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
                        },
                        {
                          name: "View",
                          icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                        },
                        {
                          name: "Delete",
                          icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
                        },
                        {
                          name: "Download",
                          icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                        },
                      ].map((item) => (
                        <th
                          key={item.name}
                          className="px-4 py-4 text-center border-b-2 border-purple-500/30"
                        >
                          <div className="flex items-center justify-center space-x-1">
                            <svg
                              className="w-4 h-4 text-purple-200"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={item.icon}
                              />
                            </svg>
                            <span className="text-sm font-semibold text-white uppercase tracking-wide">
                              {item.name}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {orderedFolders.map((f, idx) => {
                      const isCustomerDocuments =
                        f.name === "Customer Documents";
                      const isSubfolder = !!f.parent_id;

                      return (
                        <tr
                          key={f.id}
                          className={`border-b border-gray-100 hover:bg-violet-50/50 transition-colors duration-150 ${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          {/* Folder Name */}
                          <td className="px-6 py-4">
                            <div
                              className={`flex items-center gap-3 ${
                                isSubfolder ? "ml-10" : ""
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  isCustomerDocuments
                                    ? "bg-purple-700"
                                    : isSubfolder
                                    ? "bg-gray-200"
                                    : "bg-purple-600"
                                }`}
                              >
                                📁
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {f.name}
                                </p>
                                {isSubfolder && (
                                  <span className="text-xs text-gray-500">
                                    Subfolder
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Permissions */}
                          {[
                            "customer_can_upload",
                            "customer_can_view",
                            "customer_can_delete",
                            "customer_can_download",
                          ].map((key) => (
                            <td key={key} className="px-4 py-4 text-center">
                              {isCustomerDocuments ? null : (
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={f[key]}
                                    onChange={() => togglePermission(f.id, key)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-purple-600"></div>
                                </label>
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile / Tablet View (UNCHANGED) */}
              <div className="md:hidden space-y-3">
                {folders.map((f) => (
                  <div
                    key={f.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white">📁</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{f.name}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: "customer_can_upload", label: "Upload" },
                        { key: "customer_can_view", label: "View" },
                        { key: "customer_can_delete", label: "Delete" },
                        { key: "customer_can_download", label: "Download" },
                      ].map(({ key, label }) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {label}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={f[key]}
                              onChange={() => togglePermission(f.id, key)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-purple-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Changes apply immediately to customer access
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg active:scale-[0.98] transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  .animate-modalSlideIn {
    animation: modalSlideIn 0.3s ease-out;
  }
`}</style>
    </div>
  );
};

export default FolderAccessControlModal;
