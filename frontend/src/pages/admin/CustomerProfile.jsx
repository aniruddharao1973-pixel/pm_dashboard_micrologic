
// src/pages/admin/CustomerProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAdminApi } from "../../api/adminApi";
import { useAuth } from "../../hooks/useAuth";   // <-- ADD THIS
import Swal from "sweetalert2";

export default function CustomerProfile() {
  const { companyId } = useParams();
  const { getCustomer } = useAdminApi();
  const { deleteProject } = useAdminApi();

  const [data, setData] = useState({
    company: null,
    users: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
const { isAdminLike } = useAuth(); // <-- add this


  // -------------------------------
  // FETCH COMPANY PROFILE
  // -------------------------------
  useEffect(() => {
  let cancelled = false;

  async function load() {
    try {
      if (!isAdminLike) {
        navigate("/projects", { replace: true });
        return;
      }

      console.log("Fetching company profile:", companyId);
      const res = await getCustomer(companyId); // call the hook function but do not include it in deps
      if (cancelled) return;

      const companyData = res.data || {};
      const adminUser = (companyData.users && companyData.users[0]) || null;
      const collaborators = (companyData.users && companyData.users.slice(1)) || [];

      setData({
        company: companyData.company || null,
        admin: adminUser,
        collaborators,
        projects: companyData.projects || [],
      });
    } catch (err) {
      if (cancelled) return;
      console.error("Load company profile error", err);
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  load();

  return () => {
    cancelled = true;
  };
  // intentionally NOT including getCustomer to avoid re-runs if the hook returns a new function each render
}, [companyId, isAdminLike, navigate]);



  // -------------------------------
  // DELETE COLLABORATOR HANDLER
  // -------------------------------
  const { deleteCollaborator } = useAdminApi();

  const handleDeleteCollaborator = async (userId) => {
    Swal.fire({
      title: "Remove Collaborator?",
      text: "This will only remove this collaborator, not the entire company.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete"
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        console.log("🗑 Removing collaborator:", userId);
        await deleteCollaborator(userId);

        // Remove collaborator from UI
        setData((prev) => ({
          ...prev,
          collaborators: prev.collaborators.filter((u) => u.id !== userId)
        }));

        Swal.fire("Deleted!", "Collaborator removed successfully.", "success");
      } catch (err) {
        console.error("Delete collaborator error:", err);
        Swal.fire("Error", "Failed to delete collaborator", "error");
      }
    });
  };

  //------------------------------------------
  // DELETE PROJECT HANDLER
  //------------------------------------------

  const handleDeleteProject = async (projectId, name) => {
    const confirm = await Swal.fire({
      title: `Delete project "${name}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete"
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteProject(projectId);

      setData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== projectId)
      }));

      Swal.fire("Deleted!", "Project removed successfully.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to delete project.", "error");
    }
  };

  // -------------------------------
  // LOADING UI
  // -------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center p-4 sm:p-6">
        <div className="text-center">
          <div className="inline-block h-12 w-12 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-indigo-500 border-r-transparent mb-4"></div>
          <p className="text-indigo-700 font-semibold text-lg sm:text-xl">Loading company profile...</p>
        </div>
      </div>
    );
  }

  // -------------------------------
  // NOT FOUND UI
  // -------------------------------
  if (!data.company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100 flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-red-200 p-8 sm:p-12 text-center max-w-md w-full">
          <div className="text-5xl sm:text-6xl mb-4 text-red-600">❌</div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-2">Company Not Found</h2>
          <p className="text-sm sm:text-base text-red-600 mb-6">The company you're trying to view doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { company, admin, collaborators, projects } = data;

  return (
    <div
      className="
        w-full
        h-[calc(100vh-80px)]
        overflow-y-scroll
        scroll-smooth
        bg-gradient-to-b from-gray-50 via-gray-100 to-white
        p-4 sm:p-6 md:p-8
      "
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#cbd5e1 #f1f5f9",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
<nav className="mb-4 sm:mb-6">
  <p className="text-xs sm:text-sm text-gray-600 font-medium">
    {/* "Customers" label always static */}
    <span className="cursor-default">Customers</span>
    <span className="text-gray-400 mx-1 sm:mx-2">›</span>

    {/* If user is admin, show company name (unchanged). If customer, link to /projects */}
    {isAdminLike ? (
      <span className="text-gray-900 font-semibold">{company.name}</span>
    ) : (
      <Link to="/projects" className="text-indigo-600 font-semibold underline-offset-2 hover:underline">
        {company.name}
      </Link>
    )}
  </p>
</nav>


        {/* Hero / Top Card */}
        <header className="mb-6 sm:mb-10">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-white to-white/60 shadow-xl border border-gray-200">
            {/* subtle decorative stripe */}
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-600 via-indigo-500 to-blue-600"></div>

            <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start md:items-center">
              {/* avatar + text */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:col-span-2">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600
                                  flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl md:text-4xl shadow-lg">
                    {company.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-gray-900">{company.name}</h1>

                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                    {admin && (
                      <div className="inline-flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-100 rounded-md sm:rounded-lg shadow-sm">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded sm:rounded-md bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs sm:text-base">
                          👤
                        </div>
                        <div className="text-xs sm:text-sm">
                          <div className="font-semibold text-gray-900">{admin.email}</div>
                          <div className="text-[10px] sm:text-xs text-gray-500">Admin</div>
                        </div>
                      </div>
                    )}

                    {collaborators && collaborators.slice(0, 2).map(c => (
                      <div key={c.id} className="inline-flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-100 rounded-md sm:rounded-lg shadow-sm">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded sm:rounded-md bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white text-[10px] sm:text-xs">
                          📧
                        </div>
                        <div className="text-xs sm:text-sm">
                          <div className="font-semibold text-gray-800 truncate max-w-[100px] sm:max-w-[200px]">{c.email}</div>
                          <div className="text-[10px] sm:text-xs text-gray-500">Collaborator</div>
                        </div>
                      </div>
                    ))}

                    {collaborators && collaborators.length > 2 && (
                      <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-100 rounded-md sm:rounded-lg shadow-sm">
                        <span className="text-xs sm:text-sm text-gray-600">+{collaborators.length - 2} more</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start md:justify-end gap-2 sm:gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => navigate(`/admin/create-project/${company.id}`)}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-white font-semibold text-sm sm:text-base
                             bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-0.5"
                >
                  <span className="text-base sm:text-lg">✛</span> Create Project
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md text-sm sm:text-base"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main grid: Collaborators (left) / Projects (right) */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Collaborators list */}
          <aside className="lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Collaborators</h2>
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-indigo-100 text-indigo-700 text-[10px] sm:text-xs font-semibold rounded-full">
                {collaborators.length}
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {collaborators.length === 0 ? (
                <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 border border-gray-200 shadow-sm text-center">
                  <div className="text-base sm:text-lg text-gray-700">No collaborators yet</div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">Invite people to collaborate on projects.</p>
                </div>
              ) : (
                collaborators.map(u => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between gap-3 sm:gap-4 bg-white rounded-lg sm:rounded-xl py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-2 border border-gray-200 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-lg bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm sm:text-lg flex-shrink-0">
                        {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                      </div>

                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{u.name || "Unknown"}</div>
                        <div className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1 sm:gap-2 truncate">
                          <span>📧</span>
                          <span className="truncate">{u.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">
                        {new Date(u.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>

                      <button
                        onClick={() => handleDeleteCollaborator(u.id)}
                        className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 transition"
                        aria-label="Delete collaborator"
                        title="Remove collaborator"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="#ef4444">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>

{/* Projects area */}
<section className="lg:col-span-2 mt-6 lg:mt-0 overflow-hidden">
  <div className="flex items-center justify-between mb-4 sm:mb-5 overflow-hidden">
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate md:truncate-none">Projects</h2>
      <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] sm:text-sm font-semibold shadow-sm flex-shrink-0">
        {projects.length}
      </span>
    </div>
  </div>

  {projects.length === 0 ? (
    <div className="rounded-2xl sm:rounded-3xl bg-white p-8 sm:p-12 border border-gray-200 shadow-lg text-center">
      <div className="text-5xl sm:text-6xl mb-4">📂</div>
      <div className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No projects yet</div>
      <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Create the first project to get started.</p>
      <Link
        to={`/admin/create-project/${company.id}`}
        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl text-sm sm:text-base"
      >
        Create First Project
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 overflow-hidden">
      {projects.map(project => (
        <article
          key={project.id}
          onClick={() => navigate(`/projects/${project.id}/folders`)}
          className="group cursor-pointer relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden"
        >
<div className="flex items-start justify-between gap-3">
  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 flex items-center justify-center text-xl sm:text-2xl shadow-md flex-shrink-0">
      📁
    </div>
    <div className="min-w-0 flex-1">
      <h3
        title={project.name}
        className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition whitespace-normal break-words max-w-full leading-tight"
      >
        {project.name}
      </h3>
      <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
        Created {new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>
    </div>
  </div>

  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-50 text-green-700 text-[10px] sm:text-xs font-semibold border border-green-100 whitespace-nowrap">
      Active
    </span>

    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteProject(project.id, project.name);
      }}
      title="Delete Project"
      className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-red-50 border border-red-100 hover:bg-red-100 transition flex-shrink-0"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="sm:w-4 sm:h-4 w-[14px] h-[14px]" viewBox="0 0 24 24" fill="#ef4444" aria-hidden="true">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </svg>
    </button>
  </div>
</div>


          <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-gray-100 pt-3 sm:pt-4">
            <span className="text-xs sm:text-sm text-gray-600 group-hover:text-indigo-600 transition">Open Project</span>
            <span className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition">→</span>
          </div>
        </article>
      ))}
    </div>
  )}
</section>
        </main>
      </div>
    </div>
  );
}