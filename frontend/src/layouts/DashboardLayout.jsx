// // src/layouts/DashboardLayout.jsx - RESPONSIVE + CENTRALIZED OVERLAY
// import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import ChangePasswordModal from "../components/modals/ChangePasswordModal";

// const DashboardLayout = ({ children }) => {
//   const { isAuthenticated, user, refreshUser, loading } = useAuth();
//   const [showModal, setShowModal] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   // Prevent flash of unstyled content
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Prevent body scroll when sidebar is open (mobile)
//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }

//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [sidebarOpen]);

//   if (loading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center bg-gray-50">
//         <div className="animate-pulse flex flex-col items-center gap-4">
//           <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600"></div>
//           <p className="text-gray-500 text-lg">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // overlay click handler (desktop overlay is hidden by xl:hidden via Tailwind class).
//   const handleOverlayClick = (evt) => {
//     evt?.preventDefault();
//     setSidebarOpen(false);
//   };

//   return (
//     <div
//       className={`h-screen w-full flex bg-gray-50 transition-all duration-300 ${
//         isMounted ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       {/* Render Sidebar component (it will handle translate-x classes based on sidebarOpen) */}
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       {/* Layout columns: reserved desktop column + main content */}
//       <div className="flex w-full min-h-screen relative">
//         {/* Desktop-only reserved width so content does NOT shift when sidebar is persistent */}
//         <div className="hidden xl:block w-64 shrink-0" />

//         {/* Main Area */}
//         <div className="flex-1 flex flex-col transition-all duration-300">
//           {/* Header */}
//           <Header setSidebarOpen={() => setSidebarOpen(true)} />

//           {/* Change password modal */}
//           {user?.must_change_password && showModal && (
//             <ChangePasswordModal
//               open={true}
//               onClose={() => {}}
//               onChanged={async () => {
//                 setShowModal(false);
//                 await refreshUser();
//               }}
//             />
//           )}

//           {/* Page content */}
//           <main className="flex-1 p-0 sm:p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white transition-all duration-300">
//             {children}
//           </main>
//         </div>

//         {/* Overlay / Backdrop for mobile & tablet.
//             - Only show on small screens (xl:hidden).
//             - z-index placed between content and sidebar (sidebar should be higher).
//             - pointer-events: auto when visible so clicks register.
//         */}
//         <div
//           aria-hidden={!sidebarOpen}
//           onClick={handleOverlayClick}
//           className={`xl:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${
//             sidebarOpen
//               ? "opacity-100 pointer-events-auto"
//               : "opacity-0 pointer-events-none"
//           }`}
//         />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// src/layouts/DashboardLayout.jsx - RESPONSIVE + CENTRALIZED OVERLAY
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";
import FolderAccessControlModal from "../components/modals/FolderAccessControlModal";

const DashboardLayout = ({ children }) => {
  const { isAuthenticated, user, refreshUser, loading } = useAuth();

  const [showModal, setShowModal] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // ⭐ NEW — Folder access control modal
  const [folderAccessOpen, setFolderAccessOpen] = useState(false);

  // ✅ ADD THIS LINE BELOW
  const [activeProjectId, setActiveProjectId] = useState(null);

  // Prevent flash of unstyled content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent body scroll when sidebar is open (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [sidebarOpen]);

  // ⭐ Listen for sidebar-triggered folder access modal
  useEffect(() => {
    const openHandler = (e) => {
      const projectId = e.detail?.projectId || null;

      if (!projectId) {
        console.warn(
          "[FolderAccessControl] Opened without projectId — showing warning UI"
        );
      }

      setActiveProjectId(projectId);
      setFolderAccessOpen(true);
    };

    window.addEventListener("open-folder-access-control", openHandler);

    return () => {
      window.removeEventListener("open-folder-access-control", openHandler);
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600" />
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Overlay click handler
  const handleOverlayClick = (evt) => {
    evt?.preventDefault();
    setSidebarOpen(false);
  };

  return (
    <div
      className={`h-screen w-full flex bg-gray-50 transition-all duration-300 ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex w-full min-h-screen relative">
        {/* Desktop sidebar spacer */}
        <div className="hidden xl:block w-64 shrink-0" />

        {/* Main content */}
        <div className="flex-1 flex flex-col transition-all duration-300">
          {/* Header */}
          <Header setSidebarOpen={() => setSidebarOpen(true)} />

          {/* Force password change */}
          {user?.must_change_password && showModal && (
            <ChangePasswordModal
              open={true}
              onClose={() => {}}
              onChanged={async () => {
                setShowModal(false);
                await refreshUser();
              }}
            />
          )}

          {/* ⭐ Folder Access Control Modal */}
          {folderAccessOpen && (
            <FolderAccessControlModal
              open={folderAccessOpen}
              projectId={activeProjectId} // ⭐ REQUIRED
              onClose={() => {
                setFolderAccessOpen(false);
                setActiveProjectId(null);
              }}
            />
          )}

          {/* Page body */}
          <main className="flex-1 p-0 sm:p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white transition-all duration-300">
            {children}
          </main>
        </div>

        {/* Mobile overlay */}
        <div
          aria-hidden={!sidebarOpen}
          onClick={handleOverlayClick}
          className={`xl:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${
            sidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
