// src/pages/DocumentsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useFoldersApi } from "../api/foldersApi";
import { useDocumentsApi } from "../api/documentsApi";

import FolderCard from "../components/FolderCard";
import FileCard from "../components/FileCard";
import UploadModal from "../components/UploadModal";

import ViewFileModal from "../components/modals/ViewFileModal";
import VersionsModal from "../components/modals/VersionsModal";
import RenameModal from "../components/modals/RenameModal";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import NotesModal from "../components/modals/NotesModal";
import { useBreadcrumb } from "../context/BreadcrumbContext";

import { useProjectsApi } from "../api/projectsApi";
import { useAdminApi } from "../api/adminApi";

import {
  Building2,
  Users,
  FolderKanban,
  ChevronRight,
  Loader2,
  Calendar,
  Sparkles,
  ArrowRight,
  Building,
  Clock,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";

const DocumentsPage = () => {
  const [forbidden, setForbidden] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projectId, folderId } = useParams();
  const safeFolderId = folderId && folderId !== "0" ? folderId : 0;

  console.log("DocumentsPage params:", {
    projectId,
    folderId,
    safeFolderId,
  });

  const { getSubFolders, getFolderById } = useFoldersApi();
  const { getDocumentsByFolder, getDocumentVersions } = useDocumentsApi();

  const { getProjectById } = useProjectsApi();
  const { getCustomer } = useAdminApi();

  const [subfolders, setSubfolders] = useState([]);

  // ⭐ Breadcrumb states
  // ⭐ Breadcrumb states
  const [projectName, setProjectName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [companyId, setCompanyId] = useState(null);

  // Build full folder path hierarchy (parent → child)
  const [folderChain, setFolderChain] = useState([]);

  const [entryType, setEntryType] = useState("ROOT");
  // ROOT | SUB

  const loadFolderHierarchy = async () => {
    if (!safeFolderId || safeFolderId === 0) {
      setFolderChain([]);
      setEntryType("ROOT");
      setFolderPerms(null);
      return;
    }

    try {
      let currentId = safeFolderId;
      const path = [];

      while (currentId) {
        const res = await getFolderById(currentId);
        const folder = res.data;
        if (!folder) break;

        path.unshift(folder);
        currentId = folder.parent_id;
      }

      setFolderChain(path);

      // ENTRY TYPE LOGIC
      if (path.length > 1) {
        setEntryType("SUB");
      } else {
        setEntryType("ROOT");
      }

      // permissions always come from CURRENT folder
      setFolderPerms(path[path.length - 1]);
    } catch (err) {
      console.error("Hierarchy Error:", err);
    }
  };

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [folderPerms, setFolderPerms] = useState(null);

  const isCustomer = user.role === "customer";
  const canCustomerUpload =
    !isCustomer ||
    safeFolderId === 0 ||
    folderPerms?.customer_can_upload === true;

  const [uploadOpen, setUploadOpen] = useState(false);

  // MODALS
  const [viewFile, setViewFile] = useState(null);
  const [renameFile, setRenameFile] = useState(null);
  const [deleteFile, setDeleteFile] = useState(null);

  const [versionsFile, setVersionsFile] = useState(null);
  const [versionList, setVersionList] = useState([]);
  const [notesFile, setNotesFile] = useState(null);
  const { setBreadcrumb } = useBreadcrumb();

  // ==============================
  // Load Project + Customer
  // ==============================
  const loadProjectAndCustomer = async () => {
    try {
      const pRes = await getProjectById(projectId);
      const project = pRes.data;

      setProjectName(project.name);
      setCompanyId(project.company_id);

      if (
        (user.role === "admin" || user.role === "techsales") &&
        project.company_id
      ) {
        const cRes = await getCustomer(project.company_id);
        if (cRes.data?.company) {
          setCustomerName(cRes.data.company.name);
        }
      }
    } catch (err) {
      console.error("Project/Customer load error:", err);
    }
  };

  // ⭐ Load breadcrumb (project + customer + folder name)
  // const loadBreadcrumbData = async () => {
  //   try {
  //     // Load project info
  //     const pRes = await getProjectById(projectId);
  //     const project = pRes.data;
  //     setProjectName(project.name);

  //     // Load customer name based on role
  //     if (
  //       user.role === "admin" ||
  //       (user.role === "techsales" && project.company_id)
  //     ) {
  //       const cRes = await getCustomer(project.company_id);
  //       if (cRes.data?.customer) {
  //         setCustomerName(cRes.data.customer.name);
  //       }
  //     } else {
  //       // customer login → use their own name
  //       setCustomerName(user.name);
  //     }

  //     // Folder name if provided by API
  //   } catch (err) {
  //     console.error("Breadcrumb Load Error:", err);
  //   }
  // };

  // 📂 Load docs + subfolders
  const loadData = async () => {
    setLoading(true);

    try {
      const [foldersRes, docsRes] = await Promise.all([
        getSubFolders(safeFolderId),
        getDocumentsByFolder(safeFolderId),
      ]);

      setSubfolders(foldersRes.data || []);

      const docs = docsRes.data || [];

      setDocuments(docs);
    } catch (err) {
      console.error("Load Error:", err);
      // If backend returned 403 set forbidden state so UI renders the 403 page.
      if (err?.response?.status === 403) {
        setForbidden(true);
        return; // stop further processing
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Load main data when folder changes
  useEffect(() => {
    loadData();
  }, [folderId]);

  // 🔄 Load breadcrumb *after* documents load
  useEffect(() => {
    loadFolderHierarchy();
    loadProjectAndCustomer();
  }, [safeFolderId, projectId]);

  // ==============================
  // SET GLOBAL BREADCRUMB
  // ==============================
  useEffect(() => {
    if (!projectName) return;

    const crumbs = [{ label: "Projects", to: "/projects" }];

    // Admin / Techsales → Customer
    if (
      (user.role === "admin" || user.role === "techsales") &&
      customerName &&
      companyId
    ) {
      crumbs.push({
        label: customerName,
        to: `/admin/company/${companyId}`,
      });
    }

    // Project → Folders
    crumbs.push({
      label: projectName,
      to: `/projects/${projectId}/folders`,
    });

    // Folders page label (explicit)
    // crumbs.push({
    //   label: "Customer Documents",
    //   to: `/projects/${projectId}/folders`,
    // });

    // Folder chain
    folderChain.forEach((f, idx) => {
      crumbs.push({
        label: f.name,
        to:
          idx === folderChain.length - 1
            ? undefined // ACTIVE (documents page)
            : `/projects/${projectId}/folders/${f.id}`,
      });
    });

    setBreadcrumb(crumbs);
  }, [projectName, customerName, folderChain, projectId, user.role]);

  const scrollRef = React.useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let timeout;
    const handleScroll = () => {
      el.classList.add("scrolling");
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        el.classList.remove("scrolling");
      }, 700);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  /** Open Version History */
  const openVersions = async (doc) => {
    setVersionsFile(doc);
    try {
      const res = await getDocumentVersions(doc.id);
      setVersionList(res.data);
    } catch (err) {
      console.error("Version Load Error:", err);
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
              Loading Documents
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Fetching Documents and files...
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

  if (forbidden) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="bg-white rounded-xl shadow p-8 text-center max-w-lg">
          <h2 className="text-3xl font-semibold text-red-600 mb-3">
            403 Forbidden
          </h2>
          <p className="mb-6 text-slate-600">
            You don't have permission to access this resource.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded border"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded bg-indigo-600 text-white"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    // <div className="space-y-2 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 pt-1 sm:pt-2">
    <div className="space-y-2 px-2 sm:px-3 pt-1 w-full">
      {/* HEADER — Fully Responsive */}
      <div
        className="
        flex flex-col sm:flex-row 
        items-start sm:items-center 
        justify-between gap-3
        bg-gradient-to-r from-slate-50 to-blue-50 
        rounded-xl sm:rounded-2xl 
        p-3 sm:p-4 
        border border-gray-300 shadow-sm
      "
      >
        {/* Breadcrumb - Responsive with horizontal scroll */}
        <div className="w-full sm:w-auto overflow-x-auto">
          <div
            className="
            inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 
            text-xs sm:text-sm md:text-base 
            font-semibold
            px-2 sm:px-3 md:px-4 
            py-1.5 sm:py-2 md:py-2.5 
            bg-gradient-to-r from-white via-indigo-50/20 to-white 
            backdrop-blur-sm border border-gray-200/60 
            rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl 
            shadow-sm
            hover:shadow-md hover:border-indigo-200/70 
            transition-all duration-300
            relative overflow-hidden whitespace-nowrap
            min-w-max
            before:absolute before:inset-0 before:bg-gradient-to-r 
            before:from-transparent before:via-indigo-100/10 before:to-transparent
            before:translate-x-[-100%] hover:before:translate-x-[100%]
            before:transition-transform before:duration-1000
          "
          >
            {[
              // ✅ Dashboard (always first)
              { label: "Dashboard", to: "/dashboard" },

              // ✅ ADMIN / TECHSALES ONLY → Customer
              (user.role === "admin" || user.role === "techsales") &&
                customerName && {
                  label: customerName,
                  to: `/admin/company/${projectId}`, // keep as per your routing
                },

              // ✅ Projects (both admin + customer)
              { label: "Projects", to: "/projects" },

              // ✅ Project → Folders
              projectName && {
                label: `${projectName} - Folders`,
                to: `/projects/${projectId}/folders`,
              },

              // ✅ Folder chain (root → subfolders)
              ...folderChain.map((f, i) => ({
                label: f.name,
                // ❌ last item = ACTIVE (Documents page, non-clickable)
                to:
                  i === folderChain.length - 1
                    ? null
                    : `/projects/${projectId}/folders/${f.id}`,
              })),
            ]
              .filter(Boolean)
              .map((item, index, arr) => (
                <div
                  key={index}
                  className="flex items-center gap-1 sm:gap-1.5 relative z-10"
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="
            text-gray-700 font-semibold hover:text-indigo-600
            transition-all duration-300 relative
            px-1 sm:px-1.5 md:px-2.5
            py-0.5 sm:py-0.5 md:py-1
            rounded-md sm:rounded-lg
            hover:bg-white/80 hover:shadow-sm
            after:content-[''] after:absolute after:bottom-0.5
            after:left-1 sm:after:left-1.5 md:after:left-2.5
            after:right-1 sm:after:right-1.5 md:after:right-2.5
            after:h-0.5
            after:bg-gradient-to-r after:from-indigo-400
            after:via-indigo-600 after:to-indigo-400
            after:scale-x-0 after:transition-transform
            after:duration-300 after:rounded-full
            hover:after:scale-x-100
          "
                    >
                      {item.label}
                    </Link>
                  ) : (
                    // 🔵 ACTIVE (current folder / documents)
                    <span
                      className="
            text-indigo-600 font-bold relative
            px-1 sm:px-1.5 md:px-2.5
            py-0.5 sm:py-0.5 md:py-1
            rounded-md sm:rounded-lg
            bg-gradient-to-br from-indigo-50 via-white to-indigo-50
            shadow-sm border border-indigo-100/50
          "
                    >
                      {item.label}
                      <span
                        className="
              absolute bottom-0.5
              left-1 sm:left-1.5 md:left-2.5
              right-1 sm:right-1.5 md:right-2.5
              h-0.5
              bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500
              rounded-full shadow-sm
            "
                      />
                    </span>
                  )}

                  {index < arr.length - 1 && (
                    <span className="text-gray-400 font-medium text-sm sm:text-base md:text-lg">
                      ›
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Upload button - Fully Responsive */}
        {canCustomerUpload ? (
          <button
            onClick={() => setUploadOpen(true)}
            className="
              group relative 
              w-full lg:w-auto
              flex items-center justify-center 
              gap-1.5
              px-4 py-2.5
              bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
              text-white font-bold
              rounded-lg
              shadow-lg hover:scale-105 transition
            "
          >
            <span className="text-lg">+</span>
            <span>Upload Document</span>
          </button>
        ) : (
          <div
            className="
              w-full lg:w-auto
              flex items-center justify-center gap-2
              px-4 py-2.5
              bg-red-50 border-2 border-red-300
              rounded-lg
              text-red-700 font-semibold
              cursor-not-allowed
            "
            title="Upload not allowed in this folder"
          >
            <span className="text-xl">🚫</span>
            <span>Upload Disabled</span>
          </div>
        )}
      </div>
=======
>>>>>>> a8df9fa (updated frontend and backend v21)

      {/* DOCUMENTS SECTION - Fully Responsive */}
      <div
        className="
    bg-white 
    rounded-lg sm:rounded-xl md:rounded-2xl 
    border border-gray-200 shadow-sm
    overflow-hidden
    w-full
    flex flex-col
    h-[calc(100vh-120px)] sm:h-[calc(100vh-160px)]
  "
      >
        {/* Header Bar */}
        <div
          className="
    bg-gradient-to-r from-slate-50 via-white to-slate-50
    px-3 sm:px-4 md:px-6 lg:px-8
    py-3 sm:py-4 md:py-5
    border-b border-gray-200
  "
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* LEFT: ICON + TITLE */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="
          w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11
          rounded-lg md:rounded-xl
          bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500
          flex items-center justify-center
          shadow-lg
        "
              >
                <span className="text-white text-base sm:text-lg md:text-xl">
                  📄
                </span>
              </div>

              <div className="leading-tight">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                  Documents
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  {documents.length} files available
                </p>
              </div>
            </div>

            {/* RIGHT: UPLOAD ACTION */}
            {canCustomerUpload ? (
              <button
                onClick={() => setUploadOpen(true)}
                className="
  w-full sm:w-auto
  inline-flex items-center justify-center gap-2 sm:gap-2.5
  px-4 sm:px-4 md:px-5
  py-2.5
  text-sm sm:text-base font-semibold
  text-white
  bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
  rounded-lg md:rounded-xl
  shadow-md hover:shadow-lg
  transition-all
"
              >
                <span className="text-lg leading-none">＋</span>
                <span className="hidden sm:inline">Upload Document</span>
                <span className="sm:hidden">Upload</span>
              </button>
            ) : (
              <div
                className="
          inline-flex items-center gap-2
          px-3 py-2
          text-xs sm:text-sm font-semibold
          text-red-700
          bg-red-50 border border-red-200
          rounded-lg
          cursor-not-allowed
        "
                title="Upload not allowed in this folder"
              >
                🚫 Disabled
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div
          ref={scrollRef}
          className="
    flex-1
    overflow-y-auto
    overflow-x-hidden
    p-2 sm:p-4
    pb-6 sm:pb-8
    scroll-appear
  "
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f1f5f9",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
        >
          {/* Empty State */}
          {documents.length === 0 ? (
            <div
              className="
              flex flex-col items-center justify-center 
              py-6 sm:py-10 md:py-14 lg:py-16 
              text-center
            "
            >
              <div
                className="
                w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                rounded-full bg-gradient-to-br from-gray-100 to-gray-200 
                flex items-center justify-center mb-3 sm:mb-4
              "
              >
                <span className="text-3xl sm:text-4xl md:text-5xl">📭</span>
              </div>
              <p className="text-gray-500 font-medium text-sm sm:text-base md:text-lg">
                No documents in this folder
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Upload your first document to get started
              </p>
            </div>
          ) : (
            /* Document Grid - Fully Responsive */

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full max-w-full">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="
                    group relative 
                    bg-gradient-to-br from-white to-gray-50 
                    rounded-md sm:rounded-lg md:rounded-xl 
                    border border-gray-200 
                    hover:border-blue-300 hover:shadow-lg 
                    transition-all duration-300 overflow-hidden
                  "
                >
                  {/* Decorative gradient top */}
                  <div
                    className="
                    absolute top-0 left-0 right-0 h-0.5 sm:h-1 
                    bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300
                  "
                  ></div>

                  {/* File Card Content */}
                  <div className="p-2.5 sm:p-3 md:p-4">
                    <FileCard
                      document={doc}
                      user={user}
                      canView={
                        user.role !== "customer" ||
                        folderPerms?.customer_can_view === true
                      }
                      canDelete={
                        user.role !== "customer" ||
                        folderPerms?.customer_can_delete === true
                      }
                      onView={async () => {
                        try {
                          // Load all versions
                          const res = await getDocumentVersions(doc.id);
                          const versions = res.data || [];

                          if (versions.length === 0) {
                            alert("No versions found for this document");
                            return;
                          }

                          const latest = versions[0]; // Latest version

                          // Enrich document object with latest version metadata
                          const enrichedFile = {
                            ...doc,
                            version_id: latest.id,
                            uploaded_by: latest.uploaded_by,
                          };

                          // Open modal with correct version file
                          setViewFile(enrichedFile);
                        } catch (err) {
                          console.error("Error loading latest version:", err);
                          alert(
                            "Unable to open document — version lookup failed."
                          );
                        }
                      }}
                      onVersions={() => openVersions(doc)}
                      onDelete={() => {
                        setDeleteFile(doc);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        folderId={safeFolderId} // ✅ FIX
        projectId={projectId}
        onUploaded={loadData}
      />

      {viewFile && (
        <ViewFileModal
          file={viewFile}
          projectId={projectId}
          folderId={safeFolderId} // ✅ FIX
          onClose={() => {
            setViewFile(null);
            loadData();
          }}
        />
      )}
      {versionsFile && (
        <VersionsModal
          document={versionsFile}
          versions={versionList}
          canDownload={
            user.role !== "customer" ||
            folderPerms?.customer_can_download === true
          }
          onClose={() => setVersionsFile(null)}
        />
      )}

      {renameFile && (
        <RenameModal
          document={renameFile}
          onClose={() => setRenameFile(null)}
          onRename={loadData}
        />
      )}
      {deleteFile && (
        <DeleteConfirmModal
          document={deleteFile}
          onClose={() => setDeleteFile(null)}
          onDelete={loadData}
        />
      )}
      {notesFile && (
        <NotesModal document={notesFile} onClose={() => setNotesFile(null)} />
      )}
    </div>
  );
};

export default DocumentsPage;
