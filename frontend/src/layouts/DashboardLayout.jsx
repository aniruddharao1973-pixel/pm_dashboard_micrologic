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

// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";

const DashboardLayout = ({ children }) => {
  const { isAuthenticated, user, refreshUser, loading } = useAuth();
  const [showModal, setShowModal] = useState(true);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

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

        {/* ⛔ No vertical scrolling here */}
        <main className="px-4 py-2 flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

