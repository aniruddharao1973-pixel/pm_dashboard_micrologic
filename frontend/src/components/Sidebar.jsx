




// // frontend/src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// const Sidebar = () => {
//   const { user, isAdminLike } = useAuth();

//   // Base menu (visible to everyone)
//   const baseMenu = [
//     {
//       name: "Dashboard",
//       path: isAdminLike ? "/dashboard" : "/customer/dashboard",
//       color: "from-blue-500 to-blue-600",
//       hoverColor: "from-blue-600 to-blue-700",
//       dotColor: "bg-blue-400",
//       icon: "📊",
//     },

//     {
//       name: "Projects",
//       path: isAdminLike
//         ? "/admin/projects/customers"
//         : "/projects", // Customer → Their own projects
//       color: "from-cyan-500 to-teal-500",
//       hoverColor: "from-cyan-600 to-teal-600",
//       dotColor: "bg-cyan-400",
//       icon: "📁",
//     },
//   ];

//   // Admin + Tech Sales menu
//   const adminMenu = [
//     {
//       name: "Create Customer",
//       path: "/admin/create-customer",
//       color: "from-green-500 to-green-600",
//       hoverColor: "from-green-600 to-green-700",
//       dotColor: "bg-green-400",
//       icon: "➕",
//     },
//     {
//       name: "Customer List",
//       path: "/admin/customers",
//       color: "from-indigo-500 to-purple-500",
//       hoverColor: "from-indigo-600 to-purple-600",
//       dotColor: "bg-indigo-400",
//       icon: "👥",
//     },
//   ];

//   // Final menu for rendering
//   const menu = isAdminLike ? [...baseMenu, ...adminMenu] : baseMenu;



//   return (
//     <div className="w-64 h-screen bg-gradient-to-b from-[#6366f1] via-[#7c3aed] to-[#6366f1] border-r border-white/10 shadow-2xl p-6 flex flex-col relative overflow-hidden">

//       {/* Subtle ambient glow */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-20 right-0 w-40 h-40 bg-purple-300/10 blur-3xl rounded-full"></div>

//       {/* Logo Section */}
//       <div className="flex items-center gap-3 mb-10 relative z-10">
//         <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-lg ring-1 ring-white/20 hover:scale-105 transition-transform duration-300">
//           <span className="text-xl">P</span>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-white tracking-tight">PM Dashboard</h2>
//           <p className="text-xs text-white/70 font-medium">Project Manager</p>
//         </div>
//       </div>

//       {/* Menu Section */}
//       <nav className="flex flex-col gap-2 relative z-10">
//         {menu.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.path}
//             className={({ isActive }) =>
//               `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden
//               ${
//                 isActive
//                   ? `bg-gradient-to-r ${item.color} text-white shadow-lg ring-1 ring-white/30`
//                   : `bg-white/5 backdrop-blur-sm text-white border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20`
//               }`
//             }
//           >
//             {/* Subtle shimmer effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

//             <div className="flex items-center gap-3 relative z-10">
//               <span className="text-lg opacity-90">{item.icon}</span>
//               <span className="font-medium text-sm tracking-wide">
//                 {item.name}
//               </span>
//             </div>



//             {/* Dot Indicator */}
//             <div
//               className={`h-2 w-2 rounded-full ${item.dotColor} opacity-80 group-hover:scale-125 transition-transform duration-300`}
//             ></div>
//           </NavLink>
//         ))}
//       </nav>

//       {/* Spacer */}
//       <div className="flex-1"></div>

//       {/* User Info Section */}
//       {/* <div className="relative z-10 mt-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
//         <div className="flex items-center gap-3">
//           <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-1 ring-white/20">
//             {user?.role === "admin" ? "A" : "U"}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium text-white truncate">
//               {user?.role === "admin" ? "Admin" : "User"}
//             </p>
//             <p className="text-xs text-white/60 truncate capitalize">
//               {user?.role || "Role"}
//             </p>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Sidebar;




// // frontend/src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// const Sidebar = ({ sidebarOpen, onClose }) => {
//   const { user, isAdminLike } = useAuth();

//   const baseMenu = [
//     {
//       name: "Dashboard",
//       path: isAdminLike ? "/dashboard" : "/customer/dashboard",
//       color: "from-blue-500 to-blue-600",
//       dotColor: "bg-blue-400",
//       icon: "📊",
//     },
//     {
//       name: "Projects",
//       path: isAdminLike ? "/admin/projects/customers" : "/projects",
//       color: "from-cyan-500 to-teal-500",
//       dotColor: "bg-cyan-400",
//       icon: "📁",
//     },
//   ];

//   const adminMenu = [
//     {
//       name: "Create Customer",
//       path: "/admin/create-customer",
//       color: "from-green-500 to-green-600",
//       dotColor: "bg-green-400",
//       icon: "➕",
//     },
//     {
//       name: "Customer List",
//       path: "/admin/customers",
//       color: "from-indigo-500 to-purple-500",
//       dotColor: "bg-indigo-400",
//       icon: "👥",
//     },
//   ];

//   const menu = isAdminLike ? [...baseMenu, ...adminMenu] : baseMenu;

//   return (
//     <div
//       data-sidebar="true"
//       className={`
//         bg-gradient-to-b from-[#6366f1] via-[#7c3aed] to-[#6366f1]
//         border-r border-white/10 shadow-2xl relative flex flex-col
//         overflow-y-auto

//         /* Desktop: visible at all times */
//         hidden sm:flex sm:w-64 sm:h-screen sm:translate-x-0 sm:p-6

//         /* Mobile: sliding panel */
//         fixed top-0 left-0 w-64 h-full p-6
//         transform transition-transform duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         sm:translate-x-0

//         z-[9999]
//       `}
//     >

//       {/* MOBILE CLOSE BUTTON */}
//       <button
//         onClick={onClose}
//         className="
//           sm:hidden absolute top-4 right-4 
//           bg-white/20 text-white p-2 rounded-lg 
//           backdrop-blur-sm border border-white/20
//           hover:bg-white/30 active:scale-95 transition-all
//         "
//       >
//         ✕
//       </button>

//       {/* Ambient Glow */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-20 right-0 w-40 h-40 bg-purple-300/10 blur-3xl rounded-full"></div>

//       {/* Logo */}
//       <div className="flex items-center gap-3 mb-10 relative z-10 mt-10 sm:mt-0">
//         <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-lg ring-1 ring-white/20">
//           <span className="text-xl">P</span>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-white tracking-tight">PM Dashboard</h2>
//           <p className="text-xs text-white/70 font-medium">Project Manager</p>
//         </div>
//       </div>

//       {/* Menu */}
//       <nav className="flex flex-col gap-2 relative z-10">
//         {menu.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.path}
//             onClick={onClose} // auto-close only on mobile
//             className={({ isActive }) =>
//               `group flex items-center justify-between px-4 py-3.5 rounded-xl
//                transition-all duration-300 relative overflow-hidden
//                ${
//                  isActive
//                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg ring-1 ring-white/30`
//                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
//                }`
//             }
//           >
//             {/* Hover shimmer effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>

//             <div className="flex items-center gap-3 relative z-10">
//               <span className="text-lg opacity-90">{item.icon}</span>
//               <span className="font-medium text-sm tracking-wide">{item.name}</span>
//             </div>

//             <div className={`h-2 w-2 rounded-full ${item.dotColor} opacity-80 group-hover:scale-125 transition-transform duration-300`} />
//           </NavLink>
//         ))}
//       </nav>

//       <div className="flex-1"></div>
//     </div>
//   );
// };

// export default Sidebar;



// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = ({ sidebarOpen, onClose }) => {
  const { user, isAdminLike } = useAuth();

  // Only used for clicks originating from the overlay.
  const handleOverlayClick = (evt) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    if (typeof onClose === "function") onClose();
  };

  // Used for link clicks and close button: do NOT prevent default so routing works.
  const handleClose = () => {
    if (typeof onClose === "function") onClose();
  };

  const adminMenu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊", color: "from-blue-500 to-blue-600", dotColor: "bg-blue-400" },
    { name: "customers", path: "/admin/projects/customers", icon: "📁", color: "from-cyan-500 to-teal-500", dotColor: "bg-cyan-400" },
    { name: "Create Customer", path: "/admin/create-customer", icon: "➕", color: "from-green-500 to-green-600", dotColor: "bg-green-400" },
    { name: "Customer List", path: "/admin/customers", icon: "👥", color: "from-indigo-500 to-purple-500", dotColor: "bg-indigo-400" }
  ];

  const customerMenu = [
    { name: "Dashboard", path: "/customer/dashboard", icon: "📊", color: "from-blue-500 to-blue-600", dotColor: "bg-blue-400" },
    { name: "Projects", path: "/projects", icon: "📁", color: "from-cyan-500 to-teal-500", dotColor: "bg-cyan-400" }
  ];

  const menu = isAdminLike ? adminMenu : customerMenu;

  return (
    <>
      {/* Overlay for mobile/tablet only */}
      {sidebarOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] xl:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full
          w-64 xl:w-72 p-6
          flex flex-col overflow-y-auto
          bg-gradient-to-b from-[#6366f1] via-[#7c3aed] to-[#6366f1]
          border-r border-white/10 shadow-2xl
          z-[100]
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0 xl:relative xl:flex xl:z-auto
        `}
        aria-label="Sidebar"
      >
        {/* Mobile close button (does NOT prevent default) */}
        <button
          onClick={handleClose}
          className="xl:hidden absolute top-4 right-4 bg-white/30 text-white p-2 rounded-lg backdrop-blur-sm border border-white/30 hover:bg-white/40 active:scale-95 transition-all z-[120]"
          aria-label="Close sidebar"
        >
          ✕
        </button>

        {/* Ambient glow (no pointer events) */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-20 right-0 w-40 h-40 bg-purple-300/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 relative z-20 mt-10 lg:mt-0">
          <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-lg ring-1 ring-white/20">
            <span className="text-xl">P</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight">PM Dashboard</h2>
            <p className="text-xs text-white/70 font-medium">Project Manager</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 relative z-20">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={handleClose} // don't call preventDefault here
              className={({ isActive }) =>
                `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden
                 ${
                   isActive
                     ? `bg-gradient-to-r ${item.color} text-white shadow-lg ring-1 ring-white/30`
                     : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
                 }`
              }
            >
              {/* Shimmer — pointer-events-none so it never blocks clicks */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 pointer-events-none"></div>

              <div className="flex items-center gap-3 relative z-30 pointer-events-auto">
                <span className="text-lg opacity-90">{item.icon}</span>
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
              </div>

              <div className={`h-2 w-2 rounded-full ${item.dotColor} opacity-80 group-hover:scale-125 transition-transform duration-300`} />
            </NavLink>
          ))}
        </nav>

        <div className="flex-1" />

      </aside>
    </>
  );
};

export default Sidebar;
