// src/pages/FoldersPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFoldersApi } from "../api/foldersApi";
import { useProjectsApi } from "../api/projectsApi";
import { useAdminApi } from "../api/adminApi";
import { useAuth } from "../hooks/useAuth";
import FolderCard from "../components/FolderCard";
import { Link } from "react-router-dom";

const FoldersPage = () => {
  const { projectId, folderId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { getFoldersByProject, getSubFolders } = useFoldersApi();
  const { getProjectById } = useProjectsApi();
  const { getCustomer } = useAdminApi();

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [customerName, setCustomerName] = useState("");
  const [projectName, setProjectName] = useState("");

  // ⭐ FIX — ADD THIS
  const [companyId, setCompanyId] = useState(null);

  const loadFolders = async () => {
    try {
      let res;

      if (folderId) {
        // 👉 Load subfolders
        res = await getSubFolders(folderId);
      } else {
        // 👉 Load root folders
        res = await getFoldersByProject(projectId);
      }

      setFolders(res.data);
    } catch (err) {
      console.error("Error loading folders:", err);
    }
  };

  const loadProjectAndCustomer = async () => {
    try {
      const pRes = await getProjectById(projectId);
      const project = pRes.data;

      setProjectName(project.name);
      setCompanyId(project.company_id); // ⭐ ADD THIS

      // ⭐ Admin + Tech Sales → load company profile
      if (user.role === "admin" || user.role === "techsales") {
        if (project.company_id) {
          const cRes = await getCustomer(project.company_id);
          if (cRes.data?.company) {
            setCustomerName(cRes.data.company.name);
          }
        }
      } else {
        // ⭐ Customer → rely on project.company_name
        if (project.company_name) {
          setCustomerName(project.company_name);
        }
      }
    } catch (err) {
      console.error("Error loading project/customer:", err);
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([loadFolders(), loadProjectAndCustomer()]);
      setLoading(false);
    })();
    // re-run when projectId or folderId changes (folderId may be undefined for root)
  }, [projectId, folderId]);

if (loading) {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="mt-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-base sm:text-lg font-semibold">
          Loading folders...
        </p>
      </div>
    </div>
  );
}

  const handleFolderClick = async (folder) => {
    // 1️⃣ Explicit rule for Documents folder
    if (folder.name === "Documents") {
      navigate(`/projects/${projectId}/documents/${folder.id}`);
      return;
    }

    // 2️⃣ Default behavior
    const res = await getSubFolders(folder.id);

    if (res.data.length > 0) {
      navigate(`/projects/${projectId}/folders/${folder.id}`);
    } else {
      navigate(`/projects/${projectId}/documents/${folder.id}`);
    }
  };

  return (
    <div
      className="
        p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6
        h-[calc(100vh-100px)]
        overflow-y-auto
        custom-scrollbar
      "
    >
      {/* ⭐ Updated Premium Breadcrumb — No "Folders" at end */}
      <div
        className="
        flex flex-wrap items-center gap-1 sm:gap-1.5 text-sm sm:text-base font-semibold
        px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-white via-indigo-50/20 to-white 
        backdrop-blur-sm border border-gray-200/60 rounded-xl sm:rounded-2xl shadow-sm
        hover:shadow-md hover:border-indigo-200/70 transition-all duration-300
        relative overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-indigo-100/10 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%]
        before:transition-transform before:duration-1000
      "
      >
        {/* Projects */}
        <span
          onClick={() => navigate("/projects")}
          className="
            text-gray-700 font-semibold hover:text-indigo-600 
            transition-all duration-300 relative px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg cursor-pointer
            hover:bg-white/80 hover:shadow-sm
            after:content-[''] after:absolute after:bottom-0.5
            after:left-2 sm:after:left-2.5 after:right-2 sm:after:right-2.5 after:h-0.5
            after:bg-gradient-to-r after:from-indigo-400 after:via-indigo-600 after:to-indigo-400
            after:scale-x-0 after:transition-transform after:duration-300 after:rounded-full
            hover:after:scale-x-100
          "
        >
          Projects
        </span>

        <span className="text-gray-400">›</span>

        {/* Customer Name */}
        {customerName && (
          <>
            <span
              onClick={() => navigate(`/admin/company/${companyId}`)}
              className="
                text-gray-700 font-semibold hover:text-indigo-600 
                transition-all duration-300 relative px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg cursor-pointer
                hover:bg-white/80 hover:shadow-sm
                after:content-[''] after:absolute after:bottom-0.5
                after:left-2 sm:after:left-2.5 after:right-2 sm:after:right-2.5 after:h-0.5
                after:bg-gradient-to-r after:from-indigo-400 after:via-indigo-600 after:to-indigo-400
                after:scale-x-0 after:transition-transform after:duration-300 after:rounded-full
                hover:after:scale-x-100
              "
            >
              {customerName}
            </span>

            <span className="text-gray-400">›</span>
          </>
        )}

        {/* Project Name */}
        <span
          onClick={() => navigate(`/projects/${projectId}/folders`)}
          className="
            text-indigo-600 font-bold relative px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg
            bg-gradient-to-br from-indigo-50 via-white to-indigo-50
            shadow-sm border border-indigo-100/50
            hover:shadow-md transition-all duration-300 cursor-pointer
          "
        >
          {projectName}
          <span
            className="
            absolute bottom-0.5 left-2 sm:left-2.5 right-2 sm:right-2.5 h-0.5 
            bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500
            rounded-full shadow-sm
          "
          ></span>
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        {projectName} — Folders
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        All folders under this project.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {folders.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base col-span-2 sm:col-span-2 lg:col-span-3">
            No folders found.
          </p>
        ) : (
          folders.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              onClick={() => handleFolderClick(folder)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FoldersPage;
