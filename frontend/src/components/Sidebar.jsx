// // import React from "react";
// // import { NavLink } from "react-router-dom";
// // import { useAuth } from "../hooks/useAuth";

// // const Sidebar = () => {
// //   const { user } = useAuth();

// //   // Base menu (visible to everyone)
// //   const baseMenu = [
// //   {
// //     name: "Dashboard",
// //     path: user?.role === "admin" ? "/dashboard" : "/customer/dashboard",
// //     color: "from-blue-500 to-blue-600",
// //   },
// //   {
// //     name: "Projects",
// //     path: "/projects",
// //     color: "from-purple-500 to-purple-600",
// //   },
// // ];


// //   // Admin-only menu
// //   const adminMenu = [
// //     {
// //       name: "Create Customer",
// //       path: "/admin/create-customer",
// //       color: "from-green-500 to-green-600",
// //     },
// //     {
// //       name: "Customer List",
// //       path: "/admin/customers",
// //       color: "from-pink-500 to-pink-600",
// //     },
// //   ];

// //   // Combine dynamically
// //   const menu =
// //     user?.role === "admin" ? [...baseMenu, ...adminMenu] : baseMenu;

// //   return (
// //     <div className="w-64 h-screen bg-gradient-to-b from-orange-50 to-orange-100 border-r border-orange-200 shadow-sm p-6 flex flex-col">

// //       {/* Logo */}
// //       <div className="flex items-center gap-3 mb-10">
// //         <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white font-bold shadow-sm hover:scale-105 transition-all duration-200">
// //           P
// //         </div>
// //         <h2 className="text-xl font-semibold text-gray-700">PM Dashboard</h2>
// //       </div>

// //       {/* Menu */}
// //       <nav className="flex flex-col gap-3 flex-1">

// // {menu.map((item) => (
// //   <NavLink
// //     key={item.name}
// //     to={item.path}
// //     className={({ isActive }) =>
// //       `group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm
// //       ${item.disabled ? "opacity-40 cursor-not-allowed" : ""}
// //       ${isActive 
// //         ? "bg-gradient-to-r " + item.color + " text-white shadow-2xl shadow-pink-400/50 border-2 border-white/30"
// //         : "bg-amber-50/80 text-gray-800 hover:bg-gradient-to-br hover:from-amber-100 hover:to-orange-200 hover:shadow-xl hover:shadow-amber-300/60 hover:-translate-y-0.5"
// //       }`
// //     }
// //   >
// //     <span className="font-semibold tracking-wide">
// //       {item.name}
// //     </span>

// //     <div
// //       className={`h-2.5 w-2.5 rounded-full transition-all duration-300
// //         ${item.disabled ? "bg-gray-300" : "bg-gradient-to-br " + item.color + " group-hover:shadow-xl group-hover:shadow-rose-400/70 group-hover:scale-125"}
// //       `}
// //     ></div>
// //   </NavLink>
// // ))}

// //       </nav>

// //       {/* User footer */}
// //       <div className="mt-auto">
// //         <div className="bg-gradient-to-br from-orange-200 to-rose-200 rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-orange-400">
// //           <p className="text-xs font-medium text-pink-900">Logged in as:</p>
// //           <span className="block text-sm font-semibold text-rose-800 mt-1">
// //             {user?.name || "User"}
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// const Sidebar = () => {
//   const { user } = useAuth();

//   // Base menu (visible to everyone)
//   const baseMenu = [
//     {
//       name: "Dashboard",
//       path: user?.role === "admin" ? "/dashboard" : "/customer/dashboard",
//       color: "from-blue-500 to-blue-600",
//       dotColor: "bg-blue-500",
//       icon: "📊"
//     },
//     {
//       name: "Projects",
//       path: "/projects",
//       color: "from-purple-500 to-purple-600",
//       dotColor: "bg-purple-500",
//       icon: "📁"
//     },
//   ];

//   // Admin-only menu
//   const adminMenu = [
//     {
//       name: "Create Customer",
//       path: "/admin/create-customer",
//       color: "from-green-500 to-green-600",
//       dotColor: "bg-green-500",
//       icon: "➕"
//     },
//     {
//       name: "Customer List",
//       path: "/admin/customers",
//       color: "from-purple-500 to-purple-600",
//       dotColor: "bg-purple-500",
//       icon: "👥"
//     },
//   ];

//   // Combine dynamically
//   const menu =
//     user?.role === "admin" ? [...baseMenu, ...adminMenu] : baseMenu;

//   return (
//     <div className="w-64 h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 border-r border-gray-200 shadow-xl p-6 flex flex-col relative overflow-hidden">
      
//       {/* Decorative gradient orbs */}
//       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-20 left-0 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>

//       {/* Logo */}
//       <div className="flex items-center gap-3 mb-10 relative z-10">
//         <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 relative">
//           <span className="text-xl">P</span>
//           <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent"></div>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold text-gray-800">PM Dashboard</h2>
//           <p className="text-xs text-gray-500">Project Manager</p>
//         </div>
//       </div>

//       {/* Menu */}
//       <nav className="flex flex-col gap-2 flex-1 relative z-10">
//         {menu.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.path}
//             className={({ isActive }) =>
//               `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden
//               ${item.disabled ? "opacity-40 cursor-not-allowed" : ""}
//               ${isActive 
//                 ? "bg-gradient-to-r " + item.color + " text-white shadow-lg shadow-blue-500/30 scale-105"
//                 : "text-gray-700 hover:bg-white hover:shadow-md hover:scale-102 hover:-translate-y-0.5 bg-white/50 backdrop-blur-sm"
//               }`
//             }
//           >
//             {/* Shimmer effect on hover */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
//             <div className="flex items-center gap-3 relative z-10">
//               <span className="text-lg">{item.icon}</span>
//               <span className="font-semibold text-sm tracking-wide">
//                 {item.name}
//               </span>
//             </div>

//             <div className={`h-2 w-2 rounded-full ${item.dotColor} transition-all duration-300 group-hover:scale-150 shadow-md relative z-10`}></div>
//           </NavLink>
//         ))}
//       </nav>

//       {/* User footer */}


      
//     </div>
//   );
// };

// export default Sidebar;



// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// const Sidebar = () => {
//   const { user } = useAuth();

//   // Base menu (visible to everyone)
//   const baseMenu = [
//     {
//       name: "Dashboard",
//       path: user?.role === "admin" ? "/dashboard" : "/customer/dashboard",
//       color: "from-blue-500 to-blue-600",
//       hoverColor: "from-blue-600 to-blue-700",
//       dotColor: "bg-blue-500",
//       icon: "📊"
//     },
//     {
//       name: "Projects",
//       path: "/projects",
//       color: "from-cyan-500 to-teal-500",
//       hoverColor: "from-cyan-600 to-teal-600",
//       dotColor: "bg-cyan-500",
//       icon: "📁"
//     },
//   ];

//   // Admin-only menu
//   const adminMenu = [
//     {
//       name: "Create Customer",
//       path: "/admin/create-customer",
//       color: "from-green-500 to-green-600",
//       hoverColor: "from-green-600 to-green-700",
//       dotColor: "bg-green-500",
//       icon: "➕"
//     },
//     {
//       name: "Customer List",
//       path: "/admin/customers",
//       color: "from-cyan-500 to-teal-500",
//       hoverColor: "from-cyan-600 to-teal-600",
//       dotColor: "bg-cyan-500",
//       icon: "👥"
//     },
//   ];

//   // Combine dynamically
//   const menu =
//     user?.role === "admin" ? [...baseMenu, ...adminMenu] : baseMenu;

//   return (
// <div className="w-64 h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 border-r border-purple-500/40 shadow-2xl p-6 flex flex-col relative overflow-hidden">
   
//       {/* Decorative gradient orbs */}
//       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-blue-400/20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-20 left-0 w-40 h-40 bg-gradient-to-tr from-teal-500/20 to-white/10 rounded-full blur-3xl"></div>

//       {/* Logo */}
//       <div className="flex items-center gap-3 mb-10 relative z-10">
//         <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-white to-cyan-50 flex items-center justify-center text-cyan-600 font-bold shadow-lg shadow-cyan-900/30 hover:shadow-xl hover:shadow-cyan-900/40 hover:scale-105 transition-all duration-300 relative ring-2 ring-white/50">
//           <span className="text-xl">P</span>
//           <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent"></div>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold text-white drop-shadow-md">PM Dashboard</h2>
//           <p className="text-xs text-cyan-100">Project Manager</p>
//         </div>
//       </div>

//       {/* Menu */}
//       <nav className="flex flex-col gap-2 flex-1 relative z-10">
//         {menu.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.path}
//             className={({ isActive }) =>
//               `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden
//               ${item.disabled ? "opacity-40 cursor-not-allowed" : ""}
//               ${isActive 
//                 ? "bg-gradient-to-r " + item.hoverColor + " text-white shadow-lg shadow-cyan-900/40 scale-105 ring-2 ring-white/30"
//                 : "text-white/90 hover:bg-gradient-to-r hover:" + item.hoverColor + " hover:text-white hover:shadow-md hover:scale-102 hover:-translate-y-0.5 bg-white/10 backdrop-blur-sm border border-white/20"
//               }`
//             }
//           >
//             {/* Shimmer effect on hover */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
//             <div className="flex items-center gap-3 relative z-10">
//               <span className="text-lg drop-shadow-sm">{item.icon}</span>
//               <span className="font-semibold text-sm tracking-wide drop-shadow-sm">
//                 {item.name}
//               </span>
//             </div>

//             <div className={`h-2 w-2 rounded-full ${item.dotColor} transition-all duration-300 group-hover:scale-150 shadow-md relative z-10 ring-1 ring-white/30`}></div>
//           </NavLink>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;





// // frontend/src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// const Sidebar = () => {
//   const { user } = useAuth();

//   // Base menu (visible to everyone)
//   const baseMenu = [
//     {
//       name: "Dashboard",
//       path: user?.role === "admin" ? "/dashboard" : "/customer/dashboard",
//       color: "from-blue-500 to-blue-600",
//       hoverColor: "from-blue-600 to-blue-700",
//       dotColor: "bg-blue-400",
//       icon: "📊",
//     },
    
//     {
//       name: "Projects",
//       path: user?.role === "admin" 
//         ? "/admin/projects/customers"   // Admin → Select Customer → Projects
//         : "/projects",                  // Customer → Their own projects
//       color: "from-cyan-500 to-teal-500",
//       hoverColor: "from-cyan-600 to-teal-600",
//       dotColor: "bg-cyan-400",
//       icon: "📁",
//     },


//   ];

//   // Admin-only menu
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

//   const menu =
//     user?.role === "admin" ? [...baseMenu, ...adminMenu] : baseMenu;

//   return (
//     <div className="w-64 h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 border-r border-white/10 shadow-xl p-6 flex flex-col relative overflow-hidden">

//       {/* Subtle glow spots */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-10 right-0 w-40 h-40 bg-blue-400/10 blur-3xl rounded-full"></div>

//       {/* Logo Section */}
//       <div className="flex items-center gap-3 mb-10 relative z-10">
//         <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold shadow-md shadow-black/20 ring-1 ring-white/20 hover:scale-105 transition">
//           <span className="text-xl">P</span>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-white">PM Dashboard</h2>
//           <p className="text-xs text-white/100">Project Manager</p>
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
//                   ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-black/20 scale-105 ring-1 ring-white/30`
//                   : `bg-white/10 backdrop-blur-sm text-white/90 border border-white/10 hover:bg-white/20 hover:text-white hover:shadow-md hover:scale-[1.03]`
//               }`
//             }
//           >
//             {/* Soft hover shimmer */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>

//             <div className="flex items-center gap-3 relative z-10">
//               <span className="text-lg">{item.icon}</span>
//               <span className="font-medium text-sm tracking-wide">
//                 {item.name}
//               </span>
//             </div>

//             {/* Dot Indicator */}
//             <div
//               className={`h-2 w-2 rounded-full ${item.dotColor} opacity-90 group-hover:scale-150 transition-all duration-300 shadow shadow-black/20`}
//             ></div>
//           </NavLink>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;






// frontend/src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  // Base menu (visible to everyone)
  const baseMenu = [
    {
      name: "Dashboard",
      path: user?.role === "admin" ? "/dashboard" : "/customer/dashboard",
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700",
      dotColor: "bg-blue-400",
      icon: "📊",
    },
    
    {
      name: "Projects",
      path: user?.role === "admin" 
        ? "/admin/projects/customers"   // Admin → Select Customer → Projects
        : "/projects",                  // Customer → Their own projects
      color: "from-cyan-500 to-teal-500",
      hoverColor: "from-cyan-600 to-teal-600",
      dotColor: "bg-cyan-400",
      icon: "📁",
    },
  ];

  // Admin-only menu
  const adminMenu = [
    {
      name: "Create Customer",
      path: "/admin/create-customer",
      color: "from-green-500 to-green-600",
      hoverColor: "from-green-600 to-green-700",
      dotColor: "bg-green-400",
      icon: "➕",
    },
    {
      name: "Customer List",
      path: "/admin/customers",
      color: "from-indigo-500 to-purple-500",
      hoverColor: "from-indigo-600 to-purple-600",
      dotColor: "bg-indigo-400",
      icon: "👥",
    },
  ];

  const menu =
    user?.role === "admin" ? [...baseMenu, ...adminMenu] : baseMenu;

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#6366f1] via-[#7c3aed] to-[#6366f1] border-r border-white/10 shadow-2xl p-6 flex flex-col relative overflow-hidden">

      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-0 w-40 h-40 bg-purple-300/10 blur-3xl rounded-full"></div>

      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10 relative z-10">
        <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-lg ring-1 ring-white/20 hover:scale-105 transition-transform duration-300">
          <span className="text-xl">P</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white tracking-tight">PM Dashboard</h2>
          <p className="text-xs text-white/70 font-medium">Project Manager</p>
        </div>
      </div>

      {/* Menu Section */}
      <nav className="flex flex-col gap-2 relative z-10">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden
              ${
                isActive
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg ring-1 ring-white/30`
                  : `bg-white/5 backdrop-blur-sm text-white border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20`
              }`
            }
          >
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <div className="flex items-center gap-3 relative z-10">
              <span className="text-lg opacity-90">{item.icon}</span>
              <span className="font-medium text-sm tracking-wide">
                {item.name}
              </span>
            </div>



            {/* Dot Indicator */}
            <div
              className={`h-2 w-2 rounded-full ${item.dotColor} opacity-80 group-hover:scale-125 transition-transform duration-300`}
            ></div>
          </NavLink>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* User Info Section */}
      {/* <div className="relative z-10 mt-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-1 ring-white/20">
            {user?.role === "admin" ? "A" : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.role === "admin" ? "Admin" : "User"}
            </p>
            <p className="text-xs text-white/60 truncate capitalize">
              {user?.role || "Role"}
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;