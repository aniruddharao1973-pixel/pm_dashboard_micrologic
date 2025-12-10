// // src/components/Header.jsx
// import React from "react";
// import { useAuth } from "../hooks/useAuth";
// import Swal from "sweetalert2";

// const Header = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//   Swal.fire({
//     title: "Confirm Logout",
//     text: "Are you ready to end your session?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#8b5cf6",
//     cancelButtonColor: "#f59e0b",
//     confirmButtonText: "Yes, Sign Out",
//     cancelButtonText: "Not Yet",
//     background: "#fffbeb",
//     backdrop: `
//       rgba(139, 92, 246, 0.15)
//       left top
//       no-repeat
//     `,
//     customClass: {
//       popup: 'rounded-3xl shadow-xl border border-amber-200',
//       title: 'text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent',
//       htmlContainer: 'text-amber-800 font-medium',
//       confirmButton: 'rounded-2xl px-7 py-3 font-bold shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300',
//       cancelButton: 'rounded-2xl px-7 py-3 font-bold shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300',
//       actions: 'gap-4'
//     },
//     iconColor: "#d97706",
//     showClass: {
//       popup: 'animate-fadeIn'
//     }
//   }).then((result) => {
//     if (result.isConfirmed) {
//       logout();
      
//       Swal.fire({
//         icon: "success",
//         title: "Goodbye! 🌟",
//         html: '<p class="text-purple-600 font-semibold">Successfully signed out</p>',
//         toast: true,
//         position: "top-end",
//         timer: 2500,
//         timerProgressBar: true,
//         showConfirmButton: false,
//         background: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)",
//         customClass: {
//           popup: 'rounded-2xl shadow-2xl border-2 border-purple-300',
//           timerProgressBar: 'bg-gradient-to-r from-purple-500 to-pink-500'
//         }
//       });
//     }
//   });
// };

//   return (
// <header className="w-full bg-white/100 border-b border-orange-200/40 shadow-sm px-6 py-4 flex justify-between items-center backdrop-blur-sm">
//   {/* Left: Logo / Title */}
//   <div className="flex items-center gap-3">
//     <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white font-bold shadow-sm hover:scale-105 transition-all duration-200">
//       P
//     </div>
//     <h1 className="text-xl font-semibold text-orange-700 tracking-wide">
//       Project Management System
//     </h1>
//   </div>
//   {/* Right: User Profile */}
//   <div className="flex items-center gap-4">
//     {/* User Info */}
//     <div className="text-right">
//       <p className="text-sm font-medium text-orange-700">
//         {user?.name || "User"}
//       </p>
//       <p className="text-xs text-amber-600 capitalize">
//         {/* {user?.role || "role"} */}
//       </p>
//     </div>
//     {/* Avatar */}
//     <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 text-white flex items-center justify-center font-semibold shadow-sm hover:scale-105 transition-all duration-200 cursor-pointer">
//       {user?.name ? user.name[0]?.toUpperCase() : "U"}
//     </div>
//     {/* Logout Button */}
//     <button
//       onClick={handleLogout}
//       className="
//         px-5 py-2 
//         bg-gradient-to-r from-rose-400 to-pink-400 
//         hover:from-rose-500 hover:to-pink-500
//         text-white text-sm font-semibold 
//         rounded-lg shadow-sm
//         hover:shadow-md
//         transition-all duration-200 
//         hover:scale-105 active:scale-95
//       "
//     >
//       Logout
//     </button>
//   </div>
// </header>
//   );
// };

// export default Header;


// // src/components/Header.jsx
// import React from "react";
// import { useAuth } from "../hooks/useAuth";
// import Swal from "sweetalert2";
// import { FcRefresh } from "react-icons/fc"; // 🔥 REFRESH ICON IMPORT

// const Header = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Confirm Logout",
//       text: "Are you ready to end your session?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#8b5cf6",
//       cancelButtonColor: "#f59e0b",
//       confirmButtonText: "Yes, Sign Out",
//       cancelButtonText: "Not Yet",
//       background: "#fffbeb",
//       backdrop: `rgba(139, 92, 246, 0.15) left top no-repeat`,
//       customClass: {
//         popup: "rounded-3xl shadow-xl border border-amber-200",
//         title:
//           "text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent",
//         htmlContainer: "text-amber-800 font-medium",
//         confirmButton:
//           "rounded-2xl px-7 py-3 font-bold shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300",
//         cancelButton:
//           "rounded-2xl px-7 py-3 font-bold shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300",
//         actions: "gap-4",
//       },
//       iconColor: "#d97706",
//       showClass: {
//         popup: "animate-fadeIn",
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();

//         Swal.fire({
//           icon: "success",
//           title: "Goodbye! 🌟",
//           html: '<p class="text-purple-600 font-semibold">Successfully signed out</p>',
//           toast: true,
//           position: "top-end",
//           timer: 2500,
//           timerProgressBar: true,
//           showConfirmButton: false,
//           background: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)",
//           customClass: {
//             popup: "rounded-2xl shadow-2xl border-2 border-purple-300",
//             timerProgressBar: "bg-gradient-to-r from-purple-500 to-pink-500",
//           },
//         });
//       }
//     });
//   };

//   // 🔥 REFRESH PAGE FUNCTION
//   const handlePageRefresh = () => {
//     window.location.reload();
//   };

//   return (
//     <header className="w-full bg-white/100 border-b border-orange-200/40 shadow-sm px-6 py-4 flex justify-between items-center backdrop-blur-sm">

//       {/* Left Logo */}
//       <div className="flex items-center gap-3">
//         <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white font-bold shadow-sm hover:scale-105 transition-all duration-200">
//           P
//         </div>
//         <h1 className="text-xl font-semibold text-orange-700 tracking-wide">
//           Project Management System
//         </h1>
//       </div>

//       {/* Right Side */}
//       <div className="flex items-center gap-4">

//         {/* 🔄 REFRESH BUTTON */}
//         <button
//           onClick={handlePageRefresh}
//           className="
//             p-2 rounded-full bg-orange-100
//             hover:bg-orange-200 hover:scale-110
//             transition-all shadow-sm
//           "
//           title="Refresh Page"
//         >
//           <FcRefresh size={28} />
//         </button>

//         {/* User Info */}
//         <div className="text-right">
//           <p className="text-sm font-medium text-orange-700">{user?.name || "User"}</p>
//         </div>

//         {/* Avatar */}
//         <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 text-white flex items-center justify-center font-semibold shadow-sm hover:scale-105 transition-all duration-200 cursor-pointer">
//           {user?.name ? user.name[0]?.toUpperCase() : "U"}
//         </div>

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="
//             px-5 py-2 bg-gradient-to-r from-rose-400 to-pink-400
//             hover:from-rose-500 hover:to-pink-500
//             text-white text-sm font-semibold rounded-lg shadow-sm
//             hover:shadow-md transition-all duration-200
//             hover:scale-105 active:scale-95
//           "
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


// // src/components/Header.jsx
// import React from "react";
// import { useAuth } from "../hooks/useAuth";
// import Swal from "sweetalert2";
// import { FcRefresh } from "react-icons/fc";

// const Header = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Confirm Logout",
//       text: "Are you ready to end your session?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#2563eb",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, Sign Out",
//       cancelButtonText: "Cancel",
//       background: "#ffffff",
//       backdrop: `rgba(37, 99, 235, 0.1) left top no-repeat`,
//       customClass: {
//         popup: "rounded-2xl shadow-2xl border border-gray-200",
//         title: "text-2xl font-bold text-gray-800",
//         htmlContainer: "text-gray-600 font-medium",
//         confirmButton:
//           "rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300",
//         cancelButton:
//           "rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300",
//         actions: "gap-3",
//       },
//       iconColor: "#2563eb",
//       showClass: {
//         popup: "animate-fadeIn",
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();

//         Swal.fire({
//           icon: "success",
//           title: "Goodbye! 👋",
//           html: '<p class="text-blue-600 font-semibold">Successfully signed out</p>',
//           toast: true,
//           position: "top-end",
//           timer: 2500,
//           timerProgressBar: true,
//           showConfirmButton: false,
//           background: "linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)",
//           customClass: {
//             popup: "rounded-2xl shadow-2xl border-2 border-blue-200",
//             timerProgressBar: "bg-gradient-to-r from-blue-500 to-purple-500",
//           },
//         });
//       }
//     });
//   };

//   const handlePageRefresh = () => {
//     window.location.reload();
//   };

//   return (
//     <header className="w-full bg-white border-b border-gray-200 shadow-sm px-8 py-4 flex justify-between items-center relative overflow-hidden">
      
//       {/* Decorative gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-pink-50/30 pointer-events-none"></div>

//       {/* Left Side - Logo & Title */}
//       <div className="flex items-center gap-4 relative z-10">
//         <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 relative group">
//           <span className="text-lg">P</span>
//           <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent group-hover:from-white/30 transition-all duration-300"></div>
//         </div>
//         <div>
//           <h1 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//             Project Management System
//           </h1>
//           <p className="text-xs text-gray-500 font-medium">Manage your projects efficiently</p>
//         </div>
//       </div>

//       {/* Right Side - Actions */}
//       <div className="flex items-center gap-4 relative z-10">

//         {/* Refresh Button */}
//         <button
//           onClick={handlePageRefresh}
//           className="group relative p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 border border-gray-200"
//           title="Refresh Page"
//         >
//           <FcRefresh size={22} className="group-hover:rotate-180 transition-transform duration-500" />
//           <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         </button>

//         {/* Divider */}
//         <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

//         {/* User Info Card */}
//         <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
          
//           {/* Avatar */}
//           <div className="relative">
//             <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30 group-hover:shadow-lg group-hover:shadow-purple-500/40 transition-all duration-300">
//               {user?.name ? user.name[0]?.toUpperCase() : "U"}
//             </div>
//             <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
//           </div>

//           {/* User Details */}
//           <div className="text-left">
//             <p className="text-sm font-bold text-gray-800">{user?.name || "User"}</p>
//             <p className="text-xs text-gray-500 font-medium">Administrator</p>
//           </div>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="relative px-6 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group"
//         >
//           {/* Shimmer effect */}
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//           <span className="relative z-10 flex items-center gap-2">
//             <span>Logout</span>
//             <span className="text-lg">→</span>
//           </span>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;




// src/components/Header.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FcRefresh } from "react-icons/fc";

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Confirm Logout",
      text: "Are you ready to end your session?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      backdrop: `rgba(37, 99, 235, 0.1) left top no-repeat`,
      customClass: {
        popup: "rounded-2xl shadow-2xl border border-gray-200",
        title: "text-2xl font-bold text-gray-800",
        htmlContainer: "text-gray-600 font-medium",
        confirmButton:
          "px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300",

        cancelButton:
          "px-6 py-2.5 rounded-xl bg-gray-200 text-gray-800 font-semibold shadow-sm hover:shadow-md hover:bg-gray-300 hover:scale-105 active:scale-95 transition-all duration-300",

        actions: "gap-3",
      },
      iconColor: "#2563eb",
      showClass: {
        popup: "animate-fadeIn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout();

        Swal.fire({
          icon: "success",
          title: "Goodbye! 👋",
          html: '<p class="text-blue-600 font-semibold">Successfully signed out</p>',
          toast: true,
          position: "top-end",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
          background: "linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)",
          customClass: {
            popup: "rounded-2xl shadow-2xl border-2 border-blue-200",
            timerProgressBar: "bg-gradient-to-r from-blue-500 to-purple-500",
          },
        });
      }
    });
  };

  const handlePageRefresh = () => {
    window.location.reload();
  };

  return (
<header className="w-full bg-white border-b border-gray-200 shadow-sm px-10 py-4 flex justify-between items-center relative overflow-hidden">

  {/* Subtle decorative overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-pink-50/30 opacity-40 pointer-events-none"></div>

  {/* LEFT — LOGO + NAME */}
  <div className="flex items-center gap-4 relative z-10">
    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
      <span className="text-lg">P</span>
    </div>

    <div className="leading-[1.15]">
      <h1 className="text-lg font-semibold text-gray-800">Project Management System</h1>
      <p className="text-xs text-gray-500 font-medium">Manage your projects efficiently</p>
    </div>
  </div>

  {/* RIGHT — ACTIONS */}
  <div className="flex items-center gap-5 relative z-10">

    {/* Refresh */}
    <button
      onClick={handlePageRefresh}
      className="group relative p-2.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
    >
      <FcRefresh size={22} className="group-hover:rotate-180 transition-all duration-500" />
    </button>

    {/* Divider */}
    <div className="h-7 w-px bg-gray-300"></div>

    {/* USER BADGE */}
    <div className="flex items-center gap-3 px-4 py-2 rounded-xl 
bg-gradient-to-br from-purple-600/10 via-fuchsia-500/10 to-blue-600/10
backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md 
transition-all duration-300 cursor-pointer">


      {/* Avatar */}
      <div className="relative">
      <div className="h-10 w-10 rounded-xl bg-gradient-to-br 
      from-purple-600 via-indigo-500 to-blue-600
      text-white flex items-center justify-center font-bold shadow-md 
      transition-all duration-300">
        {user?.name ? user.name[0]?.toUpperCase() : "U"}
      </div>

        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p>
        <p className="text-xs text-gray-500 font-medium">
        {user?.role === "admin" && "Administrator"}
        {user?.role === "customer" && "Customer"}
        {user?.role === "collaborator" && "Collaborator"}
      </p>

      </div>
    </div>

    {/* Logout */}
<button
  onClick={handleLogout}
  className="px-6 py-2.5 bg-gradient-to-r 
  from-purple-600 via-indigo-500 to-blue-600
  text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg 
  hover:scale-105 active:scale-95 transition-all duration-300 
  relative overflow-hidden group"
>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
  -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>

  Logout →
</button>


  </div>
</header>
  );
};

export default Header;
