// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { useAxios } from "../../api/axios";
// import { Folder, FileText } from "lucide-react";
// import { getGreeting } from "../../utils/getGreeting";

// const CustomerDashboard = () => {
//   const { user } = useAuth();
//   const api = useAxios();

//   const [stats, setStats] = useState({
//     projects: "--",
//     documents: "--",
//   });

//   const loadStats = async () => {
//     try {
//       const res = await api.get("/dashboard/customer");

//       setStats({
//         projects: res.data.totalProjects,
//         documents: res.data.totalDocuments,
//       });
//     } catch (err) {
//       console.error("Customer Dashboard Error:", err);
//     }
//   };

//   useEffect(() => {
//     if (user) loadStats();
//   }, [user]);

//   return (
//     <div className="space-y-6">

//       <h1 className="text-3xl font-bold text-gray-800">
//         {getGreeting()}, {user?.name} 👋
//       </h1>

//       <p className="text-rose-800">
//         Your dashboard. View your projects and documents.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* ⭐ My Projects */}
//         <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//           <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//             <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
//               <Folder className="text-white" size={20} />
//             </div>
//             My Projects
//           </h3>
//           <p className="text-4xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
//             {stats.projects}
//           </p>
//         </div>

//         {/* ⭐ My Documents */}
//         <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//           <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//             <div className="p-2 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors">
//               <FileText className="text-white" size={20} />
//             </div>
//             My Documents
//           </h3>
//           <p className="text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors">
//             {stats.documents}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;




// // src\pages\customer\CustomerDashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { useAxios } from "../../api/axios";
// import { Folder, FileText } from "lucide-react";
// import { getGreeting } from "../../utils/getGreeting";
// import { useNavigate } from "react-router-dom";

// const CustomerDashboard = () => {
//   const { user } = useAuth();
//   const api = useAxios();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     projects: "--",
//     documents: "--",
//   });

//   const loadStats = async () => {
//     try {
//       const res = await api.get("/dashboard/customer");

//       setStats({
//         projects: res.data.totalProjects,
//         documents: res.data.totalDocuments,
//       });
//     } catch (err) {
//       console.error("Customer Dashboard Error:", err);
//     }
//   };

//   useEffect(() => {
//     if (user) loadStats();
//   }, [user]);

//   return (
// <div className="space-y-6">

//   {/* Greeting */}
//   <h1 className="text-3xl font-bold text-gray-800">
//     {getGreeting()}, {user?.name} 👋
//   </h1>

//   <p className="text-sm text-gray-600">
//     Your dashboard. View your projects and documents.
//   </p>

//   {/* Cards */}
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//     {/* ⭐ My Projects */}
//     <div
//       onClick={() => navigate("/projects")}
//       className="cursor-pointer rounded-2xl p-6
//                  bg-white/50 backdrop-blur-xl 
//                  border border-white/40 
//                  shadow-lg hover:shadow-2xl 
//                  transition-all duration-300 
//                  hover:-translate-y-1 group"
//     >
//       <h3 className="text-gray-700 text-sm flex items-center gap-3 mb-3 font-semibold">
//         <div className="p-3 rounded-xl 
//             bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600
//             shadow-md group-hover:shadow-xl transition-all duration-300">
//           <Folder className="text-white" size={20} />
//         </div>
//         My Projects
//       </h3>

//       <p className="text-4xl font-extrabold 
//          bg-gradient-to-r from-purple-600 to-blue-600 
//          bg-clip-text text-transparent">
//         {stats.projects}
//       </p>
//     </div>

//     {/* ⭐ My Documents */}
//     <div
//       onClick={() => navigate("/projects")}
//       className="cursor-pointer rounded-2xl p-6
//                  bg-white/50 backdrop-blur-xl 
//                  border border-white/40 
//                  shadow-lg hover:shadow-2xl 
//                  transition-all duration-300 
//                  hover:-translate-y-1 group"
//     >
//       <h3 className="text-gray-700 text-sm flex items-center gap-3 mb-3 font-semibold">
//         <div className="p-3 rounded-xl 
//             bg-gradient-to-br from-green-500 to-emerald-600
//             shadow-md group-hover:shadow-xl transition-all duration-300">
//           <FileText className="text-white" size={20} />
//         </div>
//         My Documents
//       </h3>

//       <p className="text-4xl font-extrabold 
//          bg-gradient-to-r from-green-600 to-emerald-500 
//          bg-clip-text text-transparent">
//         {stats.documents}
//       </p>
//     </div>

//   </div>
// </div>

//   );
// };

// export default CustomerDashboard;




// // src/pages/customer/CustomerDashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { useAxios } from "../../api/axios";
// import { Folder, FileText } from "lucide-react";
// import { getGreeting } from "../../utils/getGreeting";
// import { useNavigate } from "react-router-dom";

// const CustomerDashboard = () => {
//   const { user } = useAuth();
//   const api = useAxios();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     projects: "--",
//     documents: "--",
//   });

//   const loadStats = async () => {
//     try {
//       const res = await api.get("/dashboard/customer");
//       setStats({
//         projects: res.data.totalProjects,
//         documents: res.data.totalDocuments,
//       });
//     } catch (err) {
//       console.error("Customer Dashboard Error:", err);
//     }
//   };

//   useEffect(() => {
//     if (user) loadStats();
//   }, [user]);

//   return (
//             <div
//           className="
//             w-full
//             h-[calc(100vh-80px)]   /* adjust height based on Header */
//             overflow-y-scroll
//             scroll-smooth
//             bg-gradient-to-br from-gray-50 via-white to-gray-50/40
//             p-6 md:p-8
//           "
//           style={{
//             scrollbarWidth: 'thin',
//             scrollbarColor: '#cbd5e1 #f1f5f9',
//           }}
//         >

//       <div className="max-w-6xl mx-auto space-y-10">

//         {/* Greeting */}
//         <div className="space-y-3">
//           <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
//             {getGreeting()}, {user?.name} <span>👋</span>
//           </h1>

//           <p className="text-gray-600 text-base">
//             Welcome back! Here's a quick overview of your activity.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          
//           {/* ⭐ My Projects */}
//           <div
//             onClick={() => navigate("/projects")}
//             className="cursor-pointer bg-white border border-gray-200
//                        rounded-2xl shadow-sm hover:shadow-xl
//                        transition-all duration-300 hover:-translate-y-1
//                        relative overflow-hidden group"
//           >
//             {/* Decorative Blobs */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mt-10 -mr-10" />
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -mb-10 -ml-10" />

//             <div className="relative p-6">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 shadow-md group-hover:scale-110 transition-transform duration-300">
//                   <Folder className="text-white" size={24} />
//                 </div>
//                 <h3 className="text-gray-800 text-lg font-semibold">My Projects</h3>
//               </div>

//               <p className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 {stats.projects}
//               </p>

//               <div className="mt-3 flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <p className="text-xs text-gray-500">Updated just now</p>
//               </div>
//             </div>
//           </div>

//           {/* ⭐ My Documents */}
//           <div
//             onClick={() => navigate("/projects")}
//             className="cursor-pointer bg-white border border-gray-200
//                        rounded-2xl shadow-sm hover:shadow-xl
//                        transition-all duration-300 hover:-translate-y-1
//                        relative overflow-hidden group"
//           >
//             {/* Decorative Blobs */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mt-10 -mr-10" />
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full -mb-10 -ml-10" />

//             <div className="relative p-6">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-md group-hover:scale-110 transition-transform duration-300">
//                   <FileText className="text-white" size={24} />
//                 </div>
//                 <h3 className="text-gray-800 text-lg font-semibold">My Documents</h3>
//               </div>

//               <p className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
//                 {stats.documents}
//               </p>

//               <div className="mt-3 flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <p className="text-xs text-gray-500">Updated just now</p>
//               </div>
//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;



// src/pages/customer/CustomerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../api/axios";
import { Folder, FileText } from "lucide-react";
import { getGreeting } from "../../utils/getGreeting";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const api = useAxios();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    projects: "--",
    documents: "--",
  });

  const loadStats = async () => {
    try {
      const res = await api.get("/dashboard/customer");
      setStats({
        projects: res.data.totalProjects,
        documents: res.data.totalDocuments,
      });
    } catch (err) {
      console.error("Customer Dashboard Error:", err);
    }
  };

  useEffect(() => {
    if (user) loadStats();
  }, [user]);

  return (
    <div
      className="
        w-full
        h-[calc(100vh-80px)]
        overflow-y-scroll
        scroll-smooth
        bg-gradient-to-br from-gray-50 via-white to-gray-50/40
        p-4 sm:p-6 md:p-8
      "
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f1f5f9',
      }}
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">

        {/* Greeting Section - Responsive */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {getGreeting()}, {user?.name}
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl">👋</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Welcome back! Here's a quick overview of your activity.
          </p>
        </div>

        {/* Stats Cards Grid - Responsive */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto sm:max-w-none">
          
          {/* ⭐ My Projects Card */}
          <div
            onClick={() => navigate("/projects")}
            className="cursor-pointer bg-white border border-gray-200
                       rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl
                       transition-all duration-300 hover:-translate-y-0 sm:hover:-translate-y-1
                       relative overflow-hidden group"
          >
            {/* Decorative Blobs - Responsive */}
            <div className="absolute top-0 right-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-purple-500/10 rounded-full -mt-8 -mr-8 sm:-mt-10 sm:-mr-10" />
            <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-blue-500/10 rounded-full -mb-8 -ml-8 sm:-mb-10 sm:-ml-10" />

            <div className="relative p-4 sm:p-5 md:p-6">
              {/* Card Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Folder className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-gray-800 text-base sm:text-lg font-semibold">
                  My Projects
                </h3>
              </div>

              {/* Stats Number */}
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {stats.projects}
              </p>

              {/* Status Indicator */}
              <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] sm:text-xs text-gray-500">Updated just now</p>
              </div>
            </div>
          </div>

          {/* ⭐ My Documents Card */}
          <div
            onClick={() => navigate("/projects")}
            className="cursor-pointer bg-white border border-gray-200
                       rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl
                       transition-all duration-300 hover:-translate-y-0 sm:hover:-translate-y-1
                       relative overflow-hidden group"
          >
            {/* Decorative Blobs - Responsive */}
            <div className="absolute top-0 right-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-green-500/10 rounded-full -mt-8 -mr-8 sm:-mt-10 sm:-mr-10" />
            <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-emerald-500/10 rounded-full -mb-8 -ml-8 sm:-mb-10 sm:-ml-10" />

            <div className="relative p-4 sm:p-5 md:p-6">
              {/* Card Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <FileText className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-gray-800 text-base sm:text-lg font-semibold">
                  My Documents
                </h3>
              </div>

              {/* Stats Number */}
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                {stats.documents}
              </p>

              {/* Status Indicator */}
              <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] sm:text-xs text-gray-500">Updated just now</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;