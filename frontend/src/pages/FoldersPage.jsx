// // src/pages/FoldersPage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useFoldersApi } from "../api/foldersApi";
// import FolderCard from "../components/FolderCard";

// const FoldersPage = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const { getFoldersByProject } = useFoldersApi();

//   const [folders, setFolders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadFolders = async () => {
//     try {
//       const res = await getFoldersByProject(projectId);
//       setFolders(res.data);
//     } catch (err) {
//       console.error("Error loading folders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadFolders();
//   }, [projectId]);

//   if (loading) {
//     return <p className="text-gray-600">Loading folders...</p>;
//   }

//   return (
//     <div className="space-y-6">

      
//     {/* Breadcrumb */}
//     <p className="text-gray-600 text-sm mb-2">
//       Projects &gt; Project &gt; Folders
//     </p>


//       {/* Title */}
//       <h1 className="text-3xl font-bold text-gray-800">Folders</h1>
//       <p className="text-gray-600">All folders under this project.</p>

//       {/* Folder List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {folders.length === 0 ? (
//           <p className="text-gray-500">No folders found.</p>
//         ) : (
//           folders.map((folder) => (
//             <FolderCard
//               key={folder.id}
//               folder={folder}
//               onClick={() =>
//                 navigate(`/projects/${projectId}/folders/${folder.id}`)
//               }
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoldersPage;


// // src/pages/FoldersPage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useFoldersApi } from "../api/foldersApi";
// import { useProjectsApi } from "../api/projectsApi";
// import { useAdminApi } from "../api/adminApi";
// import { useAuth } from "../hooks/useAuth";
// import FolderCard from "../components/FolderCard";

// const FoldersPage = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const { user } = useAuth();              // ⭐ Get logged-in user role
//   const { getFoldersByProject } = useFoldersApi();
//   const { getProjectById } = useProjectsApi();
//   const { getCustomer } = useAdminApi();

//   const [folders, setFolders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [customerName, setCustomerName] = useState("");
//   const [projectName, setProjectName] = useState("");

//   const loadFolders = async () => {
//     try {
//       const res = await getFoldersByProject(projectId);
//       setFolders(res.data);
//     } catch (err) {
//       console.error("Error loading folders:", err);
//     }
//   };

//   const loadProjectAndCustomer = async () => {
//     try {
//       const pRes = await getProjectById(projectId);
//       const project = pRes.data;

//       setProjectName(project.name);

//       // ⭐ FIX: Customers must NOT call admin API
//       if (user.role === "admin") {
//         // Admin → fetch from /api/admin/customers
//         if (project.customer_id) {
//           const cRes = await getCustomer(project.customer_id);
//           if (cRes.data?.customer) {
//             setCustomerName(cRes.data.customer.name);
//           }
//         }
//       } else {
//         // Customer → already have name in project.customer_name
//         if (project.customer_name) {
//           setCustomerName(project.customer_name);
//         }
//       }

//     } catch (err) {
//       console.error("Error loading project/customer:", err);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await Promise.all([loadFolders(), loadProjectAndCustomer()]);
//       setLoading(false);
//     })();
//   }, [projectId]);

//   if (loading) {
//     return (
//       <div className="p-8">
//         <p className="text-gray-600 text-lg">Loading folders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 space-y-6">

//       {/* Breadcrumb */}
//       <p className="text-gray-600 text-sm">
//         Projects 
//         {customerName && <> &gt; {customerName}</>}
//         {projectName && <> &gt; {projectName}</>}
//         &gt; <span className="font-semibold text-gray-800">Folders</span>
//       </p>

//       {/* Title */}
//       <h1 className="text-3xl font-bold text-gray-800">{projectName} — Folders</h1>
//       <p className="text-gray-600">All folders under this project.</p>

//       {/* Folder List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {folders.length === 0 ? (
//           <p className="text-gray-500">No folders found.</p>
//         ) : (
//           folders.map((folder) => (
//             <FolderCard
//               key={folder.id}
//               folder={folder}
//               onClick={() => navigate(`/projects/${projectId}/folders/${folder.id}`)}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };  

// export default FoldersPage;





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
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { getFoldersByProject } = useFoldersApi();
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
      const res = await getFoldersByProject(projectId);
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
      setCompanyId(project.company_id);  // ⭐ ADD THIS

      // ⭐ Admin users → load company profile
      if (user.role === "admin") {
        if (project.company_id) {
          const cRes = await getCustomer(project.company_id);
          if (cRes.data?.company) {
            setCustomerName(cRes.data.company.name);
          }
        }
      } else {
        // ⭐ Customer users → rely on project.company_name
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
  }, [projectId]);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-600 text-lg">Loading folders...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">

{/* ⭐ Updated Premium Breadcrumb — No "Folders" at end */}
<div className="
  flex items-center gap-1.5 text-base font-semibold
  px-4 py-2.5 bg-gradient-to-r from-white via-indigo-50/20 to-white 
  backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm
  hover:shadow-md hover:border-indigo-200/70 transition-all duration-300
  relative overflow-hidden
  before:absolute before:inset-0 before:bg-gradient-to-r 
  before:from-transparent before:via-indigo-100/10 before:to-transparent
  before:translate-x-[-100%] hover:before:translate-x-[100%]
  before:transition-transform before:duration-1000
">

  {/* Projects */}
  <span
    onClick={() => navigate("/projects")}
    className="
      text-gray-700 font-semibold hover:text-indigo-600 
      transition-all duration-300 relative px-2.5 py-1 rounded-lg cursor-pointer
      hover:bg-white/80 hover:shadow-sm
      after:content-[''] after:absolute after:bottom-0.5
      after:left-2.5 after:right-2.5 after:h-0.5
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
          transition-all duration-300 relative px-2.5 py-1 rounded-lg cursor-pointer
          hover:bg-white/80 hover:shadow-sm
          after:content-[''] after:absolute after:bottom-0.5
          after:left-2.5 after:right-2.5 after:h-0.5
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
      text-indigo-600 font-bold relative px-2.5 py-1 rounded-lg
      bg-gradient-to-br from-indigo-50 via-white to-indigo-50
      shadow-sm border border-indigo-100/50
      hover:shadow-md transition-all duration-300 cursor-pointer
    "
  >
    {projectName}
    <span className="
      absolute bottom-0.5 left-2.5 right-2.5 h-0.5 
      bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500
      rounded-full shadow-sm
    "></span>
  </span>
</div>




      <h1 className="text-3xl font-bold text-gray-800">{projectName} — Folders</h1>
      <p className="text-gray-600">All folders under this project.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.length === 0 ? (
          <p className="text-gray-500">No folders found.</p>
        ) : (
          folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onClick={() => navigate(`/projects/${projectId}/folders/${folder.id}`)}
          />
          ))
        )}
      </div>
    </div>
  );
};

export default FoldersPage;
