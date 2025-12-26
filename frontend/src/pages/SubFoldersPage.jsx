// // src/pages/SubFoldersPage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useFoldersApi } from "../api/foldersApi";
// import { Folder, FolderOpen, ChevronRight } from "lucide-react";

// const SubFoldersPage = () => {
//   const { projectId, folderId } = useParams();
//   const navigate = useNavigate();
//   const { getSubFolders } = useFoldersApi();

//   const [subfolders, setSubfolders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getSubFolders(folderId);
//         setSubfolders(res.data || []);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [folderId]);

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Subfolders */}
//       {subfolders.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {subfolders.map((sf) => (
//             <div
//               key={sf.id}
//               onClick={() =>
//                 navigate(`/projects/${projectId}/folders/${sf.id}`)
//               }
//               className="cursor-pointer bg-white rounded-xl border p-4 hover:shadow"
//             >
//               <Folder className="w-6 h-6 mb-2" />
//               <p className="font-semibold">{sf.name}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Documents CTA */}
//       <button
//         onClick={() => navigate(`/projects/${projectId}/documents/${folderId}`)}
//         className="flex items-center gap-2 text-indigo-600 font-semibold"
//       >
//         <FolderOpen className="w-5 h-5" />
//         View Documents
//         <ChevronRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// export default SubFoldersPage;

/* ---------------------------------------------------------------------------------------------------------------------------------------------*/

// // src/pages/SubFoldersPage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useFoldersApi } from "../api/foldersApi";
// import { useAuth } from "../hooks/useAuth";
// import CreateFolderModal from "../components/modals/CreateFolderModal";
// import { Folder, FolderOpen, ChevronRight, Plus } from "lucide-react";

// const SubFoldersPage = () => {
//   const { projectId, folderId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { getSubFolders, getFolderById, createSubFolder, deleteFolder } =
//     useFoldersApi();

//   const [subfolders, setSubfolders] = useState([]);
//   const [folderChain, setFolderChain] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreate, setShowCreate] = useState(false);

//   const isAdminLike = user.role === "admin" || user.role === "techsales";

//   const loadHierarchy = async () => {
//     let currentId = folderId;
//     const chain = [];

//     while (currentId) {
//       const res = await getFolderById(currentId);
//       if (!res.data) break;
//       chain.unshift(res.data);
//       currentId = res.data.parent_id;
//     }

//     setFolderChain(chain);
//   };

//   const loadSubFolders = async () => {
//     const res = await getSubFolders(folderId);
//     setSubfolders(res.data || []);
//   };

//   useEffect(() => {
//     (async () => {
//       await Promise.all([loadHierarchy(), loadSubFolders()]);
//       setLoading(false);
//     })();
//   }, [folderId]);

//   const handleCreate = async (data) => {
//     await createSubFolder(folderId, {
//       project_id: projectId,
//       ...data,
//     });

//     // reload subfolders if you already have a loader
//     const res = await getSubFolders(folderId);
//     setSubfolders(res.data || []);
//   };

//   const handleDeleteFolder = async (folderId) => {
//     if (!window.confirm("Move this sub-folder to Recycle Bin?")) return;

//     try {
//       await deleteFolder(folderId);
//       const res = await getSubFolders(folderId);
//       setSubfolders(res.data || []);
//     } catch (err) {
//       console.error("Delete sub-folder failed", err);
//     }
//   };

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 text-sm">
//         <Link to={`/projects/${projectId}/folders`} className="text-indigo-600">
//           Folders
//         </Link>
//         {folderChain.map((f, i) => (
//           <React.Fragment key={f.id}>
//             <ChevronRight className="w-4 h-4 text-gray-400" />
//             {i === folderChain.length - 1 ? (
//               <span className="font-semibold">{f.name}</span>
//             ) : (
//               <Link
//                 to={`/projects/${projectId}/folders/${f.id}`}
//                 className="text-indigo-600"
//               >
//                 {f.name}
//               </Link>
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-bold">
//           {folderChain.length === 1 ? "Sub Folders" : "Documents"}
//         </h2>

//         {isAdminLike && folderChain.length === 1 && (
//           <button
//             onClick={() => setShowCreate(true)}
//             className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg"
//           >
//             <Plus className="w-4 h-4" />
//             New Sub Folder
//           </button>
//         )}
//       </div>

//       {/* Subfolders Grid */}
//       {/* Subfolders Grid */}
//       {subfolders.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {subfolders.map((sf) => (
//             <div
//               key={sf.id}
//               onClick={() =>
//                 navigate(`/projects/${projectId}/folders/${sf.id}`)
//               }
//               className="cursor-pointer bg-white rounded-xl border p-4 hover:shadow relative"
//             >
//               {/* DELETE ACTION — ADMIN / TECHSALES ONLY */}
//               {isAdminLike && (
//                 <button
//                   onClick={async (e) => {
//                     e.stopPropagation();

//                     if (!window.confirm(`Move "${sf.name}" to Recycle Bin?`))
//                       return;

//                     try {
//                       await deleteFolder(sf.id);
//                       const res = await getSubFolders(folderId);
//                       setSubfolders(res.data || []);
//                     } catch (err) {
//                       console.error("Delete sub-folder failed", err);
//                     }
//                   }}
//                   className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-600"
//                 >
//                   Delete
//                 </button>
//               )}

//               <Folder className="w-6 h-6 mb-2" />
//               <p className="font-semibold">{sf.name}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* View Documents CTA */}
//       <button
//         onClick={() => navigate(`/projects/${projectId}/documents/${folderId}`)}
//         className="flex items-center gap-2 text-indigo-600 font-semibold"
//       >
//         <FolderOpen className="w-5 h-5" />
//         View Documents
//         <ChevronRight className="w-4 h-4" />
//       </button>

//       <CreateFolderModal
//         open={showCreate}
//         onClose={() => setShowCreate(false)}
//         isSubfolder
//         onCreate={handleCreate}
//       />
//     </div>
//   );
// };

// export default SubFoldersPage;

// src/pages/SubFoldersPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFoldersApi } from "../api/foldersApi";
import { useAuth } from "../hooks/useAuth";
import CreateFolderModal from "../components/modals/CreateFolderModal";
import ConfirmDeleteModal from "../components/modals/ConfirmFolderDeleteModal";
import { toast } from "react-toastify";

import {
  Folder,
  FolderOpen,
  ChevronRight,
  Plus,
  Trash2,
  FileText,
  FolderPlus,
  Home,
  ArrowRight,
  Sparkles,
  FolderTree,
  Archive,
  AlertCircle,
  Loader2,
  MoreVertical,
  Eye,
  Building2,
} from "lucide-react";

const SubFoldersPage = () => {
  const { projectId, folderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getSubFolders, getFolderById, createSubFolder, deleteFolder } =
    useFoldersApi();

  const [subfolders, setSubfolders] = useState([]);
  const [folderChain, setFolderChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isAdminLike = user.role === "admin" || user.role === "techsales";

  const loadHierarchy = async () => {
    let currentId = folderId;
    const chain = [];

    while (currentId) {
      const res = await getFolderById(currentId);
      if (!res.data) break;

      // // 🚨 Block customer from non-visible folders
      // if (user.role === "customer" && res.data.customer_can_view === false) {
      //   navigate(`/projects/${projectId}/folders`);
      //   return;
      // }

      // ✅ ADD THIS
      if (user.role === "customer" && res.data.visibility !== "shared") {
        navigate(`/projects/${projectId}/folders`);
        return;
      }

      chain.unshift(res.data);
      currentId = res.data.parent_id;
    }

    setFolderChain(chain);
  };

  const loadSubFolders = async () => {
    const res = await getSubFolders(folderId);
    setSubfolders(res.data || []);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([loadHierarchy(), loadSubFolders()]);
      setLoading(false);
    })();
  }, [folderId]);

  const handleCreate = async (data) => {
    try {
      await createSubFolder(folderId, {
        project_id: projectId,
        ...data,
      });

      toast.success("Sub-folder created successfully", {
        position: "top-center",
        autoClose: 3000,
      });

      const res = await getSubFolders(folderId);
      setSubfolders(res.data || []);
      setShowCreate(false);
    } catch (err) {
      console.error("Create sub-folder failed", err);
      toast.error("Failed to create sub-folder. Please try again.");
    }
  };

  const handleDeleteFolder = (subfolder, e) => {
    e.stopPropagation();
    setDeleteTarget(subfolder);
  };

  const confirmDeleteSubFolder = async () => {
    if (!deleteTarget) return;

    const subFolderName = deleteTarget.name;

    try {
      setDeletingId(deleteTarget.id);
      await deleteFolder(deleteTarget.id);

      toast.success(`"${subFolderName}" moved to Recycle Bin`, {
        position: "top-center",
        autoClose: 3000,
      });

      const res = await getSubFolders(folderId);
      setSubfolders(res.data || []);
    } catch (err) {
      console.error("Delete sub-folder failed", err);
      toast.error("Failed to delete sub-folder. Please try again.");
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  // -------------------------------
  // LOADING UI
  // -------------------------------
  if (loading) {
    return (
      <div
        className="
          w-full
          min-h-screen lg:h-[calc(100vh-80px)]
          bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/40
          flex items-center justify-center
          p-4 sm:p-6
        "
      >
        <div className="text-center space-y-6">
          {/* Animated Loader */}
          <div className="relative inline-flex items-center justify-center">
            {/* Outer pulsing ring */}
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 animate-ping"></div>

            {/* Middle ring */}
            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-indigo-200 animate-pulse"></div>

            {/* Main loader */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
            </div>

            {/* Spinning outer ring */}
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Loading Sub Folders
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Fetching Folders and Document Details
            </p>
          </div>

          {/* Loading dots */}
          <div className="flex justify-center items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Enhanced Breadcrumb */}
        <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-3.5">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link
              to={`/projects/${projectId}`}
              className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 
                       transition-colors group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Project</span>
            </Link>

            <ChevronRight className="w-4 h-4 text-gray-300" />

            <Link
              to={`/projects/${projectId}/folders`}
              className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 
                       transition-colors group"
            >
              <FolderTree className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Folders</span>
            </Link>

            {folderChain.map((f, i) => (
              <React.Fragment key={f.id}>
                <ChevronRight className="w-4 h-4 text-gray-300" />
                {i === folderChain.length - 1 ? (
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 
                                bg-indigo-50 rounded-lg border border-indigo-100"
                  >
                    <Folder className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold text-indigo-900">
                      {f.name}
                    </span>
                  </div>
                ) : (
                  <Link
                    to={`/projects/${projectId}/folders/${f.id}`}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 
                             transition-colors group"
                  >
                    <Folder className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{f.name}</span>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </nav>

        {/* Enhanced Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 
                            rounded-2xl shadow-sm"
              >
                <FolderOpen
                  className="w-7 h-7 text-indigo-600"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {folderChain.length === 1 ? "Sub Folders" : "Documents"}
                  {subfolders.length > 0 && (
                    <span
                      className="text-sm font-normal px-2.5 py-0.5 
                                   bg-gray-100 text-gray-600 rounded-full"
                    >
                      {subfolders.length}
                    </span>
                  )}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {folderChain[folderChain.length - 1]?.name && (
                    <>
                      In folder:{" "}
                      <span className="font-medium text-gray-700">
                        {folderChain[folderChain.length - 1].name}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAdminLike && folderChain.length === 1 && (
                <button
                  onClick={() => setShowCreate(true)}
                  className="flex items-center gap-2 px-5 py-2.5 
                           bg-gradient-to-r from-indigo-600 to-purple-600 
                           text-white rounded-xl font-medium
                           hover:from-indigo-700 hover:to-purple-700
                           transform transition-all duration-200
                           hover:shadow-lg hover:shadow-indigo-500/25
                           hover:-translate-y-0.5 active:translate-y-0"
                >
                  <FolderPlus className="w-5 h-5" strokeWidth={2} />
                  New Sub Folder
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Subfolders Grid */}
        {subfolders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subfolders.map((sf, index) => (
              <div
                key={sf.id}
                onClick={() =>
                  navigate(`/projects/${projectId}/folders/${sf.id}`)
                }
                onMouseEnter={() => setHoveredFolder(sf.id)}
                onMouseLeave={() => setHoveredFolder(null)}
                className="group relative bg-white rounded-2xl border border-gray-200 
                         p-6 cursor-pointer transition-all duration-300
                         hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1
                         transform"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: "fadeInUp 0.5s ease-out forwards",
                  opacity: 0,
                }}
              >
                {/* Admin Actions */}
                {isAdminLike && (
                  <div
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-200"
                  >
                    <button
                      onClick={(e) => handleDeleteFolder(sf, e)}
                      disabled={deletingId === sf.id}
                      className="p-2 bg-red-50 rounded-lg text-red-500 
                               hover:bg-red-100 transition-colors
                               disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move to Recycle Bin"
                    >
                      {deletingId === sf.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                )}

                {/* Folder Icon with animation */}
                <div
                  className={`
                  mb-4 p-3 rounded-2xl inline-block transition-all duration-300
                  ${
                    hoveredFolder === sf.id
                      ? "bg-gradient-to-br from-indigo-100 to-purple-100 scale-110 rotate-3"
                      : "bg-gradient-to-br from-gray-50 to-gray-100"
                  }
                `}
                >
                  <Folder
                    className={`
                      w-8 h-8 transition-colors duration-300
                      ${
                        hoveredFolder === sf.id
                          ? "text-indigo-600"
                          : "text-gray-600"
                      }
                    `}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Folder Details */}
                <h3
                  className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 
                             transition-colors"
                >
                  {sf.name}
                </h3>

                {/* Optional: Add metadata if available */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {sf.document_count || 0} docs
                  </span>
                  {sf.created_at && (
                    <span>{new Date(sf.created_at).toLocaleDateString()}</span>
                  )}
                </div>

                {/* Hover indicator */}
                <div
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-200"
                >
                  <ArrowRight className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          folderChain.length === 1 &&
          isAdminLike && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
              <div className="text-center max-w-md mx-auto">
                <div
                  className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 
          rounded-2xl flex items-center justify-center mb-6"
                >
                  <Archive
                    className="w-10 h-10 text-gray-400"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Sub Folders Yet
                </h3>

                <p className="text-gray-500 mb-6">
                  Create sub folders to better organize your documents.
                </p>

                <button
                  onClick={() => setShowCreate(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 
          bg-gradient-to-r from-indigo-600 to-purple-600 
          text-white rounded-xl font-medium
          hover:from-indigo-700 hover:to-purple-700
          transition-all duration-200
          hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  <FolderPlus className="w-5 h-5" strokeWidth={2} />
                  Create First Sub Folder
                </button>
              </div>
            </div>
          )
        )}

        {/* View Documents Section */}
        <div
          className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 
                      rounded-2xl p-6 border border-indigo-100"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <FileText
                  className="w-5 h-5 text-indigo-600"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Documents in this folder
                </h3>
                <p className="text-sm text-gray-600">
                  View and manage all documents stored in "
                  {folderChain[folderChain.length - 1]?.name}"
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(`/projects/${projectId}/documents/${folderId}`)
              }
              className="inline-flex items-center gap-2 px-5 py-2.5
                       bg-white text-indigo-600 font-semibold rounded-xl
                       border border-indigo-200 hover:bg-indigo-50
                       transform transition-all duration-200
                       hover:shadow-md hover:-translate-y-0.5"
            >
              <Eye className="w-5 h-5" strokeWidth={2} />
              View Documents
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        {isAdminLike && (
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-900 font-medium mb-1">
                  Folder Organization Tips
                </p>
                <p className="text-blue-700">
                  Sub-folders help structure your documents effectively.
                  Documents are stored within each sub-folder. Deleted folders
                  are retained in the Recycle Bin and remain recoverable for 30
                  days.
                </p>
              </div>
            </div>
          </div>
        )}

        <CreateFolderModal
          open={showCreate}
          onClose={() => setShowCreate(false)}
          isSubfolder
          onCreate={handleCreate}
        />

        <ConfirmDeleteModal
          open={!!deleteTarget}
          message={`"${deleteTarget?.name}" will be moved to the Recycle Bin.`}
          loading={deletingId === deleteTarget?.id}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDeleteSubFolder}
        />

        {/* Add animations */}
        <style>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
      </div>
    </div>
  );
};

export default SubFoldersPage;
