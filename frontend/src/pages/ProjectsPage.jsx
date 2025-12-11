


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
//         <div className="flex flex-col items-center space-y-6">
//           {/* Spinner */}
//           <div className="relative w-20 h-20">
//             {/* Outer rotating ring */}
//             <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 border-r-indigo-500 animate-spin"></div>
//             {/* Inner rotating ring */}
//             <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-600 border-l-indigo-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
//             {/* Center gradient dot */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 animate-pulse"></div>
//             </div>
//           </div>
          
//           {/* Loading text */}
//           <div className="text-center space-y-2">
//             <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
//               Loading projects
//             </p>
//             <div className="flex space-x-1 justify-center">
//               <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//               <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//               <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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
//         p-6 md:p-8
//         space-y-8
//       "
//       style={{
//         scrollbarWidth: "thin",
//         scrollbarColor: "#cbd5e1 #f1f5f9",
//       }}
//     >
//       <div className="space-y-3">
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//           Projects
//         </h1>
//         <p className="text-lg text-gray-800 font-dark-medium">
//           List of all available projects.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.length === 0 ? (
//           <div className="col-span-full flex flex-col items-center justify-center py-16">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
//               </svg>
//             </div>
//             <p className="text-gray-400 text-lg">No projects found.</p>
//           </div>
//         ) : (
//           projects.map((project) => (
//             <div 
//               key={project.id} 
//               className="group transition-all duration-300 hover:transform hover:scale-[1.02]"
//             >
//               <ProjectCard project={project} />
//             </div>
//           ))
//         )}
//       </div>
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
      <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50/40">
        <div className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6">
          {/* Spinner - Responsive sizes */}
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-transparent border-t-purple-600 border-r-indigo-500 animate-spin"></div>
            {/* Inner rotating ring */}
            <div className="absolute inset-1 sm:inset-1.5 md:inset-2 rounded-full border-2 sm:border-3 md:border-4 border-transparent border-t-blue-600 border-l-indigo-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            {/* Center gradient dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 animate-pulse"></div>
            </div>
          </div>
          
          {/* Loading text - Responsive text size */}
          <div className="text-center space-y-1.5 sm:space-y-2">
            <p className="text-base sm:text-lg md:text-lg font-semibold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Loading projects
            </p>
            <div className="flex space-x-1 justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        h-[calc(100vh-80px)]
        overflow-y-scroll
        scroll-smooth
        bg-gradient-to-br from-gray-50 via-white to-gray-50/40
        p-4 sm:p-6 md:p-8
        space-y-4 sm:space-y-6 md:space-y-8
      "
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#cbd5e1 #f1f5f9",
      }}
    >
      {/* Header Section - Responsive text and spacing */}
      <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-800 font-dark-medium">
          List of all available projects.
        </p>
      </div>

      {/* Projects Grid - Responsive columns */}
      <div className="grid 
                      grid-cols-1 
                      sm:grid-cols-2 
                      lg:grid-cols-3 
                      xl:grid-cols-3 
                      gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16">
            {/* Empty State Icon - Responsive sizes */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-3.5 md:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">No projects found.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id} 
              className="group 
                         transition-all duration-300 
                         hover:transform 
                         hover:scale-[1.01] sm:hover:scale-[1.02] 
                         active:scale-[0.99] 
                         touch-manipulation"
            >
              <ProjectCard project={project} />
            </div>
          ))
        )}
      </div>

      {/* Optional: Add bottom spacing for mobile safe area */}
      <div className="h-4 sm:h-6 md:h-8 lg:hidden"></div>
    </div>
  );
};

export default ProjectsPage;