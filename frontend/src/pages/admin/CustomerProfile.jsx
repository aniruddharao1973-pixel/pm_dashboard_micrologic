// src/pages/admin/CustomerProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAdminApi } from "../../api/adminApi";
import { useAuth } from "../../hooks/useAuth"; // <-- ADD THIS
import Swal from "sweetalert2";

export default function CustomerProfile() {
  const { companyId } = useParams();
  const { getCustomer } = useAdminApi();
  const { deleteProject } = useAdminApi();

  const [data, setData] = useState({
    company: null,
    admin: null,
    projects: [],
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

        setData({
          company: companyData.company || null,
          admin: adminUser,
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
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteProject(projectId);

      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== projectId),
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
          {/* Outer glow effect */}
          <div className="relative inline-block">
            {/* Spinning gradient ring */}
            <div
              className="h-16 w-16 sm:h-20 sm:w-20 animate-spin rounded-full border-4 border-transparent"
              style={{
                background:
                  "linear-gradient(white, white) padding-box, linear-gradient(to right, rgb(59, 130, 246), rgb(168, 85, 247), rgb(59, 130, 246)) border-box",
                borderRadius: "50%",
                border: "4px solid transparent",
              }}
            ></div>

            {/* Inner pulsing circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse opacity-40"></div>
            </div>

            {/* Rotating outer ring for extra effect */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          </div>

          {/* Text with gradient */}
          <p className="mt-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 font-bold text-lg sm:text-xl tracking-tight">
            Loading company profile...
          </p>

          {/* Subtle subtext */}
          <p className="mt-2 text-gray-500 text-sm">Please wait a moment</p>

          {/* Loading dots */}
          <div className="flex justify-center items-center space-x-1 mt-4">
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "200ms", animationDuration: "1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "400ms", animationDuration: "1s" }}
            ></div>
          </div>
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
          <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-2">
            Company Not Found
          </h2>
          <p className="text-sm sm:text-base text-red-600 mb-6">
            The company you're trying to view doesn't exist.
          </p>
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

  const { company, admin, projects } = data;

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
              <span className="text-gray-900 font-semibold">
                {company.name}
              </span>
            ) : (
              <Link
                to="/projects"
                className="text-indigo-600 font-semibold underline-offset-2 hover:underline"
              >
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
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600
                                  flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl md:text-4xl shadow-lg"
                  >
                    {company.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-gray-900">
                    {company.name}
                  </h1>

                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                    {admin && (
                      <div className="inline-flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-100 rounded-md sm:rounded-lg shadow-sm">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded sm:rounded-md bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs sm:text-base">
                          👤
                        </div>
                        <div className="text-xs sm:text-sm">
                          <div className="font-semibold text-gray-900">
                            {admin.email}
                          </div>
                          <div className="text-[10px] sm:text-xs text-gray-500">
                            Admin
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start md:justify-end gap-2 sm:gap-3 mt-4 md:mt-0">
                <button
                  onClick={() =>
                    navigate(`/admin/create-project/${company.id}`)
                  }
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

        {/* Main grid: / Projects (right) */}
        <main className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* Projects area */}
          <section className="lg:col-span-2 mt-6 lg:mt-0 overflow-hidden">
            <div className="flex items-center justify-between mb-4 sm:mb-5 overflow-hidden">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate md:truncate-none">
                  Projects
                </h2>
                <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] sm:text-sm font-semibold shadow-sm flex-shrink-0">
                  {projects.length}
                </span>
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="rounded-2xl sm:rounded-3xl bg-white p-8 sm:p-12 border border-gray-200 shadow-lg text-center">
                <div className="text-5xl sm:text-6xl mb-4">📂</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  No projects yet
                </div>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                  Create the first project to get started.
                </p>
                <Link
                  to={`/admin/create-project/${company.id}`}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl text-sm sm:text-base"
                >
                  Create First Project
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 overflow-hidden">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}/folders`)}
                    className="group cursor-pointer relative bg-white rounded-xl sm:rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden"
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
                            Created{" "}
                            {new Date(project.created_at).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )}
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            className="sm:w-4 sm:h-4 w-[14px] h-[14px]"
                            viewBox="0 0 24 24"
                            fill="#ef4444"
                            aria-hidden="true"
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-gray-100 pt-3 sm:pt-4">
                      <span className="text-xs sm:text-sm text-gray-600 group-hover:text-indigo-600 transition">
                        Open Project
                      </span>
                      <span className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition">
                        →
                      </span>
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
