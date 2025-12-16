// // frontend/src/pages/ProjectsPage.jsx
// import React, { useEffect, useState } from "react";
// import { useProjectsApi } from "../api/projectsApi";
// import { useAuth } from "../hooks/useAuth";
// import ProjectCard from "../components/ProjectCard";

// const ProjectsPage = () => {
//   const { getAllProjects } = useProjectsApi();

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadProjects = async () => {
//     try {
//       const res = await getAllProjects();
//       setProjects(res.data);
//     } catch (err) {
//       console.error("Failed to load projects:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProjects();
//   }, []);

//   if (loading) {
//     return (
//       <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50/40">
//         <div className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6">
//           {/* Spinner - Responsive sizes */}
//           <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
//             {/* Outer rotating ring */}
//             <div className="absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-transparent border-t-purple-600 border-r-indigo-500 animate-spin"></div>
//             {/* Inner rotating ring */}
//             <div
//               className="absolute inset-1 sm:inset-1.5 md:inset-2 rounded-full border-2 sm:border-3 md:border-4 border-transparent border-t-blue-600 border-l-indigo-500 animate-spin"
//               style={{ animationDirection: "reverse", animationDuration: "1s" }}
//             ></div>
//             {/* Center gradient dot */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 animate-pulse"></div>
//             </div>
//           </div>

//           {/* Loading text - Responsive text size */}
//           <div className="text-center space-y-1.5 sm:space-y-2">
//             <p className="text-base sm:text-lg md:text-lg font-semibold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
//               Loading projects
//             </p>
//             <div className="flex space-x-1 justify-center">
//               <div
//                 className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-600 rounded-full animate-bounce"
//                 style={{ animationDelay: "0s" }}
//               ></div>
//               <div
//                 className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-bounce"
//                 style={{ animationDelay: "0.2s" }}
//               ></div>
//               <div
//                 className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce"
//                 style={{ animationDelay: "0.4s" }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="
//         w-full
//         h-[calc(100vh-80px)]
//         overflow-y-scroll
//         scroll-smooth
//         bg-gradient-to-br from-gray-50 via-white to-gray-50/40
//         p-4 sm:p-6 md:p-8
//         space-y-4 sm:space-y-6 md:space-y-8
//       "
//       style={{
//         scrollbarWidth: "thin",
//         scrollbarColor: "#cbd5e1 #f1f5f9",
//       }}
//     >
//       {/* Header Section - Responsive text and spacing */}
//       <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//           Projects
//         </h1>
//         <p className="text-sm sm:text-base md:text-lg text-gray-800 font-dark-medium">
//           List of all available projects.
//         </p>
//       </div>

//       {/* Projects Grid - Responsive columns */}
//       <div
//         className="grid
//                       grid-cols-1
//                       sm:grid-cols-2
//                       lg:grid-cols-3
//                       xl:grid-cols-3
//                       gap-3 sm:gap-4 md:gap-5 lg:gap-6"
//       >
//         {projects.length === 0 ? (
//           <div className="col-span-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16">
//             {/* Empty State Icon - Responsive sizes */}
//             <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-3.5 md:mb-4">
//               <svg
//                 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
//                 />
//               </svg>
//             </div>
//             <p className="text-gray-400 text-sm sm:text-base md:text-lg">
//               No projects found.
//             </p>
//           </div>
//         ) : (
//           projects.map((project) => (
//             <div
//               key={project.id}
//               className="group
//                          transition-all duration-300
//                          hover:transform
//                          hover:scale-[1.01] sm:hover:scale-[1.02]
//                          active:scale-[0.99]
//                          touch-manipulation"
//             >
//               <ProjectCard project={project} />
//             </div>
//           ))
//         )}
//       </div>

//       {/* Optional: Add bottom spacing for mobile safe area */}
//       <div className="h-4 sm:h-6 md:h-8 lg:hidden"></div>
//     </div>
//   );
// };

// export default ProjectsPage;


// frontend/src/pages/ProjectsPage.jsx
import React, { useEffect, useState } from "react";
import { useProjectsApi } from "../api/projectsApi";
import { useAuth } from "../hooks/useAuth";
import ProjectCard from "../components/ProjectCard";

const ProjectsPage = () => {
  const { getAllProjects } = useProjectsApi();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const res = await getAllProjects();
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="relative w-full h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50/30 to-indigo-50/40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_transparent,_white_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_transparent,_white_70%)]"></div>
        </div>

        {/* Floating orbs animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="relative flex flex-col items-center space-y-6 p-8">
          {/* Modern loading spinner */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24">
              {/* Gradient ring */}
              <svg className="animate-spin" viewBox="0 0 100 100">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
                    <stop offset="50%" stopColor="#6366F1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="200 100"
                  className="drop-shadow-lg"
                />
              </svg>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl animate-pulse">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Loading text with animation */}
          <div className="text-center space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Loading Projects
            </h3>
            <div className="flex items-center space-x-1 justify-center">
              <div
                className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: "0.15s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 font-medium mt-2">
              Fetching your projects...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* Background design */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_transparent,_white_50%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
      </div>

      {/* Scrollable content */}
      <div
        className="relative w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(139, 92, 246, 0.3) transparent",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: rgba(241, 245, 249, 0.5);
            border-radius: 10px;
          }
          div::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #8b5cf6, #6366f1);
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: padding-box;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #7c3aed, #4f46e5);
            background-clip: padding-box;
          }
        `}</style>

        <div className="relative z-10 p-6 sm:p-8 lg:p-12 max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-12 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                    <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      Projects
                    </span>
                  </h1>
                </div>
                <p className="text-base sm:text-lg text-gray-600 font-medium ml-4">
                  Explore and manage your project collection
                </p>
              </div>

              {/* Project count badge */}
              {projects.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">
                    {projects.length} Active
                  </span>
                </div>
              )}
            </div>

            {/* Decorative line */}
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-8">
              <div className="relative">
                {/* Empty state illustration background */}
                <div className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl"></div>

                {/* Icon container */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl flex items-center justify-center mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-3xl"></div>
                  <svg
                    className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center space-y-3 max-w-md">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                  No Projects Yet
                </h3>
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                  Start by creating your first project to organize and track
                  your work efficiently.
                </p>

                {/* Call to action button */}
                <button className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create First Project
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 animate-fadeIn">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Card glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden">
                    <ProjectCard project={project} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom spacing */}
          <div className="h-12 sm:h-16"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
