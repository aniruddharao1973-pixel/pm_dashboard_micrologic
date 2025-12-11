// // src/layouts/DashboardLayout.jsx
// import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import ChangePasswordModal from "../components/modals/ChangePasswordModal";

// const DashboardLayout = ({ children }) => {
//   const { isAuthenticated, user, refreshUser, loading } = useAuth();
//   const [showModal, setShowModal] = useState(true);

//   console.log("DashboardLayout → loading:", loading);
//   console.log("DashboardLayout → isAuthenticated:", isAuthenticated);
//   console.log("DashboardLayout → user:", user);

//   // 🟢 FIX: Wait until Auth finishes initializing
//   if (loading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Loading...</p>
//       </div>
//     );
//   }

//   // ❗ Only redirect AFTER loading is complete
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="h-screen bg-gray-50 flex overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />

//         {user?.must_change_password && showModal && (
//           <ChangePasswordModal
//             open={true}
//             onClose={() => {}}
//             onChanged={async () => {
//               setShowModal(false);
//               await refreshUser();
//             }}
//           />
//         )}

//         <main className="px-4 py-2 flex-1 overflow-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;





// // src/layouts/DashboardLayout.jsx
// import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import ChangePasswordModal from "../components/modals/ChangePasswordModal";

// const DashboardLayout = ({ children }) => {
//   const { isAuthenticated, user, refreshUser, loading } = useAuth();
//   const [showModal, setShowModal] = useState(true);

//   if (loading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="h-screen bg-gray-50 flex overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />

//         {user?.must_change_password && showModal && (
//           <ChangePasswordModal
//             open={true}
//             onClose={() => {}}
//             onChanged={async () => {
//               setShowModal(false);
//               await refreshUser();
//             }}
//           />
//         )}

//         {/* ⛔ No vertical scrolling here */}
//         <main className="px-4 py-2 flex-1 overflow-hidden">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;





// // src/layouts/DashboardLayout.jsx - UPDATED
// import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import ChangePasswordModal from "../components/modals/ChangePasswordModal";

// const DashboardLayout = ({ children }) => {
//   const { isAuthenticated, user, refreshUser, loading } = useAuth();
//   const [showModal, setShowModal] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   if (loading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="h-screen w-full flex bg-gray-50 overflow-hidden">
      
//       {/* SIDEBAR */}
//       <Sidebar 
//         sidebarOpen={sidebarOpen} 
//         onClose={() => setSidebarOpen(false)} 
//       />

//         {sidebarOpen && (
//           <div className="fixed top-0 right-0 text-white p-2 z-[10000]">
//           </div>
//         )}
        
//       {/* OVERLAY - Only on mobile when sidebar is open */}
//       {/* {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 z-[999] lg:hidden"
//         />
//       )} */}

//       {/* MAIN CONTENT AREA */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* HEADER */}
//         <Header setSidebarOpen={() => setSidebarOpen(true)} />

//         {/* CHANGE PASSWORD MODAL */}
//         {user?.must_change_password && showModal && (
//           <ChangePasswordModal
//             open={true}
//             onClose={() => {}}
//             onChanged={async () => {
//               setShowModal(false);
//               await refreshUser();
//             }}
//           />
//         )}

//         {/* PAGE CONTENT */}
//         <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



// // src/layouts/DashboardLayout.jsx - WITH SMOOTH ANIMATIONS
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

//   // Prevent body scroll when sidebar is open
//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.classList.add('overflow-hidden');
//     } else {
//       document.body.classList.remove('overflow-hidden');
//     }
    
//     return () => {
//       document.body.classList.remove('overflow-hidden');
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

//   return (
//     <div className={`h-screen w-full flex bg-gray-50 transition-all duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      
//       {/* SIDEBAR */}
// {/* SIDEBAR */}
// {/* SIDEBAR */}
//     <Sidebar 
//       sidebarOpen={sidebarOpen} 
//       onClose={() => { 
//         console.log("🔵 DashboardLayout: onClose called, current sidebarOpen:", sidebarOpen);
//         setSidebarOpen(false);
//         console.log("🔵 DashboardLayout: setSidebarOpen(false) executed");
//       }} 
//     />


//       {/* MAIN CONTENT AREA */}
//       {/* MAIN CONTENT AREA - Add margin on desktop for sidebar */}
//       <div className="flex-1 flex flex-col transition-all duration-300 xl:ml-64">        {/* HEADER */}
//         <Header setSidebarOpen={() => setSidebarOpen(true)} />

//         {/* CHANGE PASSWORD MODAL */}
//         {user?.must_change_password && showModal && (
//           <ChangePasswordModal
//             open={true}
//             onClose={() => {}}
//             onChanged={async () => {
//               setShowModal(false);
//               await refreshUser();
//             }}
//           />
//         )}

//         {/* PAGE CONTENT */}
// {/* PAGE CONTENT */}
// <main className="flex-1 p-0 sm:p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white transition-all duration-300">
//   {children}
// </main>
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

const DashboardLayout = ({ children }) => {
  const { isAuthenticated, user, refreshUser, loading } = useAuth();
  const [showModal, setShowModal] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600"></div>
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // overlay click handler (desktop overlay is hidden by xl:hidden via Tailwind class).
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
      {/* Render Sidebar component (it will handle translate-x classes based on sidebarOpen) */}
      <Sidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Layout columns: reserved desktop column + main content */}
      <div className="flex w-full min-h-screen relative">
        {/* Desktop-only reserved width so content does NOT shift when sidebar is persistent */}
        <div className="hidden xl:block w-64 shrink-0" />

        {/* Main Area */}
        <div className="flex-1 flex flex-col transition-all duration-300">
          {/* Header */}
          <Header setSidebarOpen={() => setSidebarOpen(true)} />

          {/* Change password modal */}
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

          {/* Page content */}
          <main className="flex-1 p-0 sm:p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white transition-all duration-300">
            {children}
          </main>
        </div>

        {/* Overlay / Backdrop for mobile & tablet.
            - Only show on small screens (xl:hidden). 
            - z-index placed between content and sidebar (sidebar should be higher).
            - pointer-events: auto when visible so clicks register.
        */}
        <div
          aria-hidden={!sidebarOpen}
          onClick={handleOverlayClick}
          className={`xl:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${
            sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
