// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { useAxios } from "../api/axios";
// import { Folder, FileText, FolderOpen } from "lucide-react";
// import { getGreeting } from "../utils/getGreeting";


// const Dashboard = () => {
//   const { user } = useAuth();
//   const api = useAxios();

//   const [stats, setStats] = useState({
//     projects: "--",
//     documents: "--",
//     folders: "--",
//   });

//   const loadStats = async () => {
//     try {
//       let res;

//       // ⭐ Decide API based on user role
//       if (user.role === "admin") {
//         res = await api.get("/dashboard/admin");
//       } else {
//         res = await api.get("/dashboard/customer");
//       }

//       setStats({
//         projects: res.data.totalProjects,
//         documents: res.data.totalDocuments,
//         folders: res.data.totalFolders,
//       });

//     } catch (err) {
//       console.error("Dashboard load error:", err);
//     }
//   };

//   useEffect(() => {
//     if (user) loadStats();
//   }, [user]);

//   return (
//     <div className="space-y-6">

//       <h1 className="text-3xl font-bold text-gray-800">
//          {getGreeting()}, {user?.name} 👋
//       </h1>

//       <p className="text-rose-800">
//         Your personalized dashboard. View your projects, folders, and documents.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// {/* ⭐ Total Projects */}
// <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//   <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//     <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
//       <Folder className="text-white" size={20} />
//     </div>
//     Total Projects
//   </h3>
//   <p className="text-4xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
//     {stats.projects}
//   </p>
// </div>

// {/* ⭐ Documents */}
// <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//   <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//     <div className="p-2 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors">
//       <FileText className="text-white" size={20} />
//     </div>
//     Documents
//   </h3>
//   <p className="text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors">
//     {stats.documents}
//   </p>
// </div>

// {/* ⭐ Folders */}
// <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//   <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//     <div className="p-2 bg-purple-500 rounded-lg group-hover:bg-purple-600 transition-colors">
//       <FolderOpen className="text-white" size={20} />
//     </div>
//     Folders
//   </h3>
//   <p className="text-4xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors">
//     {stats.folders}
//   </p>
// </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { useAxios } from "../api/axios";
// import { Users, Folder, FileText } from "lucide-react";
// import { getGreeting } from "../utils/getGreeting";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const api = useAxios();

//   const [stats, setStats] = useState({
//     customers: "--",
//     projects: "--",
//     documents: "--",
//   });

//   const loadStats = async () => {
//     try {
//       let res;

//       // ⭐ Decide API based on user role
//       if (user.role === "admin") {
//         res = await api.get("/dashboard/admin");

//         setStats({
//           customers: res.data.totalCustomers,
//           projects: res.data.totalProjects,
//           documents: res.data.totalDocuments,
//         });
//       } else {
//         res = await api.get("/dashboard/customer");

//         setStats({
//           projects: res.data.totalProjects,
//           documents: res.data.totalDocuments,
//         });
//       }
//     } catch (err) {
//       console.error("Dashboard load error:", err);
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
//         {user.role === "admin"
//           ? "Your admin dashboard. View customers, projects, and documents."
//           : "Your dashboard. View your projects and documents."}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* ⭐ ADMIN CARD — Total Customers */}
//         {user.role === "admin" && (
//           <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//             <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//               <div className="p-2 bg-pink-500 rounded-lg">
//                 <Users className="text-white" size={20} />
//               </div>
//               Total Customers
//             </h3>
//             <p className="text-4xl font-bold text-pink-600">
//               {stats.customers}
//             </p>
//           </div>
//         )}

//         {/* ⭐ Total Projects */}
//         <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//           <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//             <div className="p-2 bg-blue-500 rounded-lg">
//               <Folder className="text-white" size={20} />
//             </div>
//             {user.role === "admin" ? "Total Projects" : "My Projects"}
//           </h3>
//           <p className="text-4xl font-bold text-blue-600">
//             {stats.projects}
//           </p>
//         </div>

//         {/* ⭐ Documents */}
//         <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//           <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//             <div className="p-2 bg-green-500 rounded-lg">
//               <FileText className="text-white" size={20} />
//             </div>
//             {user.role === "admin" ? "Total Documents" : "My Documents"}
//           </h3>
//           <p className="text-4xl font-bold text-green-600">
//             {stats.documents}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { useAxios } from "../api/axios";
// import { Users, Folder, FileText } from "lucide-react";
// import { getGreeting } from "../utils/getGreeting";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const api = useAxios();

//   const [stats, setStats] = useState({
//     customers: "--",
//     projects: "--",
//     documents: "--",
//   });

//   const loadStats = async () => {
//     try {
//       let res;

//       // ⭐ Decide API based on user role
//       if (user.role === "admin") {
//         res = await api.get("/dashboard/admin");

//         setStats({
//           customers: res.data.totalCustomers,
//           projects: res.data.totalProjects,
//           documents: res.data.totalDocuments,
//         });
//       } else {
//         res = await api.get("/dashboard/customer");

//         setStats({
//           projects: res.data.totalProjects,
//           documents: res.data.totalDocuments,
//         });
//       }
//     } catch (err) {
//       console.error("Dashboard load error:", err);
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
//         {user.role === "admin"
//           ? "Your admin dashboard. View customers, projects, and documents."
//           : "Your dashboard. View your projects and documents."}
//       </p>

//       {/* Admin → 3 cards | Customer → 2 cards */}
//       <div
//         className={`grid gap-6 ${
//           user.role === "admin" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
//         }`}
//       >

//         {/* ⭐ ADMIN CARD — Total Customers */}
//         {user.role === "admin" && (
//           <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//             <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//               <div className="p-2 bg-pink-500 rounded-lg">
//                 <Users className="text-white" size={20} />
//               </div>
//               Total Customers
//             </h3>
//             <p className="text-4xl font-bold text-pink-600">
//               {stats.customers}
//             </p>
//           </div>
//         )}

//         {/* ⭐ Admin → Total Projects | Customer → My Projects */}
//         <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//           <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//             <div className="p-2 bg-blue-500 rounded-lg">
//               <Folder className="text-white" size={20} />
//             </div>
//             {user.role === "admin" ? "Total Projects" : "My Projects"}
//           </h3>
//           <p className="text-4xl font-bold text-blue-600">
//             {stats.projects}
//           </p>
//         </div>

//         {/* ⭐ Admin → Total Documents | Customer → My Documents */}
//         <div className="cursor-pointer bg-[#FFF8F0] border border-[#F5E6D3] rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition transform">
//           <h3 className="text-gray-700 text-sm flex items-center gap-2 mb-2 font-medium">
//             <div className="p-2 bg-green-500 rounded-lg">
//               <FileText className="text-white" size={20} />
//             </div>
//             {user.role === "admin" ? "Total Documents" : "My Documents"}
//           </h3>
//           <p className="text-4xl font-bold text-green-600">
//             {stats.documents}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { useAxios } from "../api/axios";
// import { Users, Folder, FileText } from "lucide-react";
// import { getGreeting } from "../utils/getGreeting";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const api = useAxios();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     customers: "--",
//     projects: "--",
//     documents: "--",
//   });

//   const loadStats = async () => {
//     try {
//       let res;

//       if (user.role === "admin") {
//         res = await api.get("/dashboard/admin");

//         setStats({
//           customers: res.data.totalCustomers,
//           projects: res.data.totalProjects,
//           documents: res.data.totalDocuments,
//         });
//       } else {
//         res = await api.get("/dashboard/customer");

//         setStats({
//           projects: res.data.totalProjects,
//           documents: res.data.totalDocuments,
//         });
//       }
//     } catch (err) {
//       console.error("Dashboard load error:", err);
//     }
//   };

//   useEffect(() => {
//     if (user) loadStats();
//   }, [user]);

//   return (
//     <div className="space-y-6">
//   <h1 className="text-4xl font-semibold text-gray-900 flex items-center gap-3">
//     {getGreeting()}, {user?.name}
//     <span className="text-4xl">👋</span>
//   </h1>

// <p className="text-gray-500 mt-1 text-base">
//   {user.role === "admin"
//     ? "Here’s your dashboard summary for today."
//     : "Here’s your project summary for today."}
// </p>


//       {/* Admin = 3 cards | Customer = 2 cards */}
//       <div
//         className={`grid gap-6 ${
//           user.role === "admin"
//             ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//             : "grid-cols-1 sm:grid-cols-2"
//         }`}
//       >

//         {/* ⭐ ADMIN — Total Customers */}
//         {user.role === "admin" && (
//           <div
//             onClick={() => navigate("/admin/customers")}
//             className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
//           >
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-pink-500/10 rounded-xl">
//                 <Users className="text-pink-600" size={22} />
//               </div>
//               <h3 className="text-gray-700 text-sm font-semibold">Total Customers</h3>
//             </div>

//             <p className="text-4xl font-bold text-gray-900 mt-4">
//               {stats.customers}
//             </p>

//             <p className="text-xs text-gray-400 mt-1">Updated just now</p>
//           </div>

//         )}

//         {/* ⭐ Total Projects */}
// <div
//   onClick={() => navigate("/projects")}
//   className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
// >
//   <div className="flex items-center gap-3">
//     <div className="p-3 bg-blue-500/10 rounded-xl">
//       <Folder className="text-blue-600" size={22} />
//     </div>
//     <h3 className="text-gray-700 text-sm font-semibold">
//       {user.role === "admin" ? "Total Projects" : "My Projects"}
//     </h3>
//   </div>

//   <p className="text-4xl font-bold text-gray-900 mt-4">
//     {stats.projects}
//   </p>

//   <p className="text-xs text-gray-400 mt-1">Updated just now</p>
// </div>


//         {/* ⭐ Documents */}
// <div
//   onClick={() => navigate("/projects")}
//   className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
// >
//   <div className="flex items-center gap-3">
//     <div className="p-3 bg-green-500/10 rounded-xl">
//       <FileText className="text-green-600" size={22} />
//     </div>
//     <h3 className="text-gray-700 text-sm font-semibold">
//       {user.role === "admin" ? "Total Documents" : "My Documents"}
//     </h3>
//   </div>

//   <p className="text-4xl font-bold text-gray-900 mt-4">
//     {stats.documents}
//   </p>

//   <p className="text-xs text-gray-400 mt-1">Updated just now</p>
// </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../api/axios";
import { Users, Folder, FileText } from "lucide-react";
import { getGreeting } from "../utils/getGreeting";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const api = useAxios();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    customers: "--",
    projects: "--",
    documents: "--",
  });

  const loadStats = async () => {
    try {
      let res;

      if (user.role === "admin" || user.role === "techsales") {
        res = await api.get("/dashboard/admin");

        setStats({
          customers: res.data.totalCustomers,
          projects: res.data.totalProjects,
          documents: res.data.totalDocuments,
        });
      } else {
        res = await api.get("/dashboard/customer");

        setStats({
          projects: res.data.totalProjects,
          documents: res.data.totalDocuments,
        });
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  useEffect(() => {
    if (user) loadStats();
  }, [user]);

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/40 p-8">

        <div
          className="
            w-full

            /* 🔽 Adjust Height */
            h-[calc(100vh-80px)]  /* example: minus header */

            /* 🔽 Enable smooth scrolling */
            overflow-y-scroll scroll-smooth

            /* 🔽 Adjust Padding */
            p-4 sm:p-6 lg:p-8

            /* 🔽 Background Customization */
            bg-gradient-to-br from-gray-50 via-white to-gray-50/40
          "
          style={{
            /* 🔽 Scrollbar Styling */
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f1f5f9",
          }}
        >


      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            {getGreeting()}, {user?.name}
            <span className="text-4xl">👋</span>
          </h1>

          <p className="text-gray-600 text-lg">
            {user.role === "admin" || user.role === "techsales"
              ? "Here's your dashboard summary for today."
              : "Here's your project summary for today."}
          </p>
        </div>

<div
  className={`grid gap-6 ${
    user.role === "admin" || user.role === "techsales"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2"
  }`}
>

          {(user.role === "admin" || user.role === "techsales") && (
            <div
              onClick={() => navigate("/admin/customers")}
              className="group cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-pink-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Users className="text-pink-600" size={24} />
                    </div>
                    <h3 className="text-gray-700 text-base font-semibold">Total Customers</h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-5xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {stats.customers}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs text-gray-500 font-medium">Updated just now</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            onClick={() => navigate("/projects")}
            className="group cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-16 -mt-16" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Folder className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-gray-700 text-base font-semibold">
                    {user.role === "admin" || user.role === "techsales" ? "Total Projects" : "My Projects"}
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {stats.projects}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-gray-500 font-medium">Updated just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;