// src/components/Sidebar.jsx
import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = ({ sidebarOpen, onClose }) => {
  const { user, isAdminLike } = useAuth();
  const { projectId } = useParams();

  // Used for link clicks and close button: do NOT prevent default so routing works.
  const handleClose = () => {
    if (sidebarOpen && typeof onClose === "function") {
      onClose();
    }
  };

  // Overlay click handler
  const handleOverlayClick = (evt) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    if (sidebarOpen && typeof onClose === "function") {
      onClose();
    }
  };

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
      color: "from-blue-500 to-blue-600",
      dotColor: "bg-blue-400",
    },
    {
      name: "customers",
      path: "/admin/projects/customers",
      icon: "📁",
      color: "from-cyan-500 to-teal-500",
      dotColor: "bg-cyan-400",
    },
    {
      name: "Create Customer",
      path: "/admin/create-customer",
      icon: "➕",
      color: "from-green-500 to-green-600",
      dotColor: "bg-green-400",
    },
    {
      name: "Customer List",
      path: "/admin/customers",
      icon: "👥",
      color: "from-indigo-500 to-purple-500",
      dotColor: "bg-indigo-400",
    },

    {
      name: "Folder Access Control",
      path: "#",
      icon: "🔐",
      color: "from-amber-500 to-orange-600",
      dotColor: "bg-amber-400",
      action: "open-folder-access",
    },

    {
      name: "Recycle Bin",
      path: "/recycle-bin",
      icon: "♻️",
      color: "from-red-500 to-rose-600",
      dotColor: "bg-red-400",
    },
  ];

  const customerMenu = [
    {
      name: "Dashboard",
      path: "/customer/dashboard",
      icon: "📊",
      color: "from-blue-500 to-blue-600",
      dotColor: "bg-blue-400",
    },
    {
      name: "Projects",
      path: "/projects",
      icon: "📁",
      color: "from-cyan-500 to-teal-500",
      dotColor: "bg-cyan-400",
    },

    {
      name: "Recycle Bin",
      path: "/customer/recycle-bin", // ✅ FIX
      icon: "♻️",
      color: "from-red-500 to-rose-600",
      dotColor: "bg-red-400",
    },
  ];

  const menu = isAdminLike ? adminMenu : customerMenu;

  return (
    <>
      {/* Overlay for mobile/tablet only */}
      {sidebarOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full
          w-56 sm:w-60 md:w-64 xl:w-64
          p-4 sm:p-5 md:p-6
          flex flex-col overflow-y-auto
          bg-gradient-to-b from-[#6366f1] via-[#7c3aed] to-[#6366f1]
          border-r border-white/10 shadow-2xl
          z-50
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0 xl:relative xl:flex
        `}
        aria-label="Sidebar"
      >
        {/* Mobile close button */}
        <button
          onClick={handleClose}
          className="xl:hidden absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg backdrop-blur-sm border border-white/20 active:scale-95 transition-all z-[60]"
          aria-label="Close sidebar"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Ambient glow */}
        <div className="absolute top-0 left-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-16 sm:bottom-20 right-0 w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 bg-purple-300/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10 relative z-20">
          <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-lg ring-1 ring-white/20">
            <span className="text-base sm:text-lg md:text-xl">P</span>
          </div>
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white tracking-tight">
              PM Dashboard
            </h2>
            <p className="text-[10px] sm:text-xs text-white/70 font-medium">
              Project Manager
            </p>
          </div>
        </div>

        {/* Navigation */}
        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 sm:gap-2 relative z-20">
          {menu.map((item) =>
            item.action === "open-folder-access" ? (
              <button
                key={item.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.dispatchEvent(
                    new CustomEvent("open-folder-access-control", {
                      detail: { projectId },
                    })
                  );

                  handleClose();
                }}
                className="
          group flex items-center justify-between
          px-3 sm:px-3.5 md:px-4
          py-2.5 sm:py-3 md:py-3.5
          rounded-lg sm:rounded-xl
          transition-all duration-300
          relative overflow-hidden
          bg-white/5 text-white
          border border-white/10
          hover:bg-white/10 hover:border-white/20
          backdrop-blur-sm
        "
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 pointer-events-none"></div>

                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 relative z-30">
                  <span className="text-sm sm:text-base md:text-lg opacity-90">
                    {item.icon}
                  </span>
                  <span className="font-medium text-xs sm:text-sm tracking-wide">
                    {item.name}
                  </span>
                </div>

                <div
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${item.dotColor} opacity-80 group-hover:scale-125 transition-transform duration-300`}
                />
              </button>
            ) : (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between
           px-3 sm:px-3.5 md:px-4
           py-2.5 sm:py-3 md:py-3.5
           rounded-lg sm:rounded-xl
           transition-all duration-300
           relative overflow-hidden
           ${
             isActive
               ? `bg-gradient-to-r ${item.color} text-white shadow-lg ring-1 ring-white/30`
               : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
           }`
                }
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 pointer-events-none"></div>

                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 relative z-30">
                  <span className="text-sm sm:text-base md:text-lg opacity-90">
                    {item.icon}
                  </span>
                  <span className="font-medium text-xs sm:text-sm tracking-wide">
                    {item.name}
                  </span>
                </div>

                <div
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${item.dotColor} opacity-80 group-hover:scale-125 transition-transform duration-300`}
                />
              </NavLink>
            )
          )}
        </nav>

        <div className="flex-1" />
      </aside>
    </>
  );
};

export default Sidebar;
