
// // src/pages/admin/CustomerList.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAdminApi } from "../../api/adminApi";
// import Swal from "sweetalert2";

// export default function CustomerList() {
// const { getCustomers, deleteCompany } = useAdminApi();

//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();


//   const loadCustomers = async () => {
//     try {
//       const res = await getCustomers();
//       setCustomers(res.data || []);
//     } catch (err) {
//       console.error("Load customers error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCustomers();
//   }, []);

//  const handleDelete = async (id, name) => {
//   console.log("🟡 deleteCustomer CALLED WITH id =", id, "name =", name);

//   Swal.fire({
//     title: "Delete Customer?",
//     html: `<b>${name}</b> will be permanently removed.`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#dc2626",
//     cancelButtonColor: "#6b7280",
//     confirmButtonText: "Yes, Delete",
//     cancelButtonText: "Cancel",
//     background: "#fffbeb",
//     customClass: {
//       popup: "rounded-3xl shadow-xl border border-red-200",
//     },
//     iconColor: "#dc2626",
//   }).then(async (result) => {
//     if (!result.isConfirmed) return;

//     try {
//       console.log("🟠 Sending DELETE request to backend (deleteCompany)...");

//       const response = await deleteCompany(id);

//       console.log("🟢 COMPANY DELETE SUCCESS RESPONSE:", response);

//       setCustomers((prev) => prev.filter((c) => c.company_id !== id));

//       Swal.fire({
//         icon: "success",
//         title: "Company Deleted",
//         toast: true,
//         position: "top-end",
//         timer: 2200,
//         showConfirmButton: false,
//       });

//     } catch (err) {
//       console.error("🔴 DELETE COMPANY ERROR:", err?.response?.data || err);

//       Swal.fire({
//         icon: "error",
//         title: "Delete Failed",
//         text: err?.response?.data?.message || "Could not delete company",
//       });
//     }
//   });
// };


//   return (
//           <div
//             className="
//               w-full
//               h-[calc(100vh-80px)]
//               overflow-y-scroll
//               scroll-smooth
//               bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40
//               p-2 sm:p-6 md:p-8
//             "
//         style={{
//           scrollbarWidth: "thin",
//           scrollbarColor: "#cbd5e1 #f1f5f9",
//         }}
//       >

//       <div className="max-w-7xl mx-auto px-0 lg:px-0">

//         {/* Header */}
// {/* Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2">
//               Customers
//             </h1>
//             <p className="text-sm sm:text-base text-gray-600 font-medium">
//               Manage all your customer accounts
//             </p>
//           </div>

//           <Link
//             to="/admin/create-customer"
//             className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 
//               text-white font-semibold rounded-xl shadow-md hover:shadow-lg
//               hover:scale-105 transition-all duration-200 flex items-center justify-center sm:justify-start gap-2"
//           >
//             <span className="text-lg sm:text-xl">+</span>
//             <span className="text-sm sm:text-base">Create Customer</span>
//           </Link>
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-r-transparent mb-4"></div>
//               <p className="text-indigo-700 font-semibold text-lg">
//                 Loading customers...
//               </p>
//             </div>
//           </div>
//         ) : customers.length === 0 ? (
//         <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-8 sm:p-12 md:p-16 text-center">
//           <div className="text-4xl sm:text-5xl md:text-6xl mb-4">📋</div>
//           <p className="text-lg sm:text-xl text-gray-900 font-semibold mb-2">No customers yet</p>
//           <p className="text-sm sm:text-base text-gray-600 mb-6">
//             Create your first customer to get started!
//           </p>
//           <Link
//             to="/admin/create-customer"
//             className="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 
//                     text-white text-sm sm:text-base font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
//           >
//             + Create Customer
//           </Link>
//         </div>
//         ) : (

//           <>
//   {/* Desktop Table View - Hidden on mobile */}
//   <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//     <div className="overflow-x-auto">
//       <table className="min-w-full">

//         {/* Header */}
//         <thead className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-b border-gray-200">
//           <tr>
//             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//               Name
//             </th>
//             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//               Created
//             </th>
//             <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-gray-100">
//           {customers.map((company) => (
//             <tr
//               key={company.company_id}
//               className="hover:bg-gray-50 transition-colors duration-150"
//             >
//               {/* Company + Emails */}
//               <td className="px-6 py-5">
//                 <div className="flex items-start gap-3">
//                   {/* Avatar */}
//                   <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 
//                       flex items-center justify-center text-white font-semibold text-lg shadow-sm flex-shrink-0">
//                     {company.company_name.charAt(0).toUpperCase()}
//                   </div>

//                   {/* Name + Emails */}
//                   <div className="min-w-0">
//                     <div className="font-semibold text-gray-900 text-base mb-1.5">
//                       {company.company_name}
//                     </div>

//                     <div className="space-y-1">
//                       {/* Admin Email */}
//                       <div className="flex items-center gap-1.5 text-sm text-gray-700 font-medium">
//                         <span className="flex-shrink-0">👤</span>
//                         <span className="truncate">{company.users[0]?.email}</span>
//                       </div>

//                     </div>
//                   </div>
//                 </div>
//               </td>

//               {/* Created */}
//               <td className="px-6 py-5">
//                 <span className="text-sm text-gray-600 font-medium">
//                   {new Date(company.users[0]?.created_at).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//               </td>

//               {/* Actions */}
//               <td className="px-6 py-5">
//                 <div className="flex justify-end gap-2">

//                   {/* View */}
//                   <button
//                     onClick={() => navigate(`/admin/company/${company.company_id}`)}
//                     className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg 
//                                bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
//                                text-white text-sm font-medium shadow-sm hover:shadow-md 
//                                transform hover:scale-105 transition-all duration-200 ease-in-out
//                                border border-blue-700"
//                     title="View company details"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                     View
//                   </button>

//                   {/* Edit */}
//                   <button
//                     onClick={() => navigate(`/admin/edit-customer/${company.company_id}`)}
//                     className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
//                                bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700
//                                text-white text-sm font-medium shadow-sm hover:shadow-md
//                                transform hover:scale-105 transition-all duration-200 ease-in-out
//                                border border-amber-600"
//                     title="Edit company information"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                     </svg>
//                     Edit
//                   </button>

                  

//                   {/* Delete */}
//                   <button
//                     onClick={() => handleDelete(company.company_id, company.company_name)}
//                     className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
//                                bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800
//                                text-white text-sm font-medium shadow-sm hover:shadow-md
//                                transform hover:scale-105 transition-all duration-200 ease-in-out
//                                border border-rose-700"
//                     title="Delete company"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Delete
//                   </button>

//                 </div>
//               </td>

//             </tr>
//           ))}
//         </tbody>

//       </table>
//     </div>

//     {/* Desktop Footer */}
//     <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 px-6 py-4 border-t border-gray-200">
//       <p className="text-sm text-gray-700 font-medium text-center">
//         Total Customers:{" "}
//         <span className="text-purple-600 font-semibold text-base">
//           {customers.length}
//         </span>
//       </p>
//     </div>
//   </div>

//   {/* Mobile/Tablet Card View - Shown on smaller screens */}
//   {/* Mobile/Tablet Card View - Shown on smaller screens */}
// <div className="lg:hidden space-y-4">
//     {customers.map((company) => (
//     <div
//       key={company.company_id}
//       className="bg-white rounded-xl shadow-md border border-gray-200 p-2.5 sm:p-5"
//     >
//         {/* Company Header */}
//         <div className="flex items-start gap-3 mb-4">
//           <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 
//               flex items-center justify-center text-white font-semibold text-base sm:text-lg shadow-sm flex-shrink-0">
//             {company.company_name.charAt(0).toUpperCase()}
//           </div>
          
//           <div className="flex-1 min-w-0">
//             <div className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
//               {company.company_name}
//             </div>
            
//             {/* Admin Email */}
//             <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 font-medium mb-1">
//               <span>👤</span>
//               <span className="truncate">{company.users[0]?.email}</span>
//             </div>
            
//           </div>
//         </div>
        
//         {/* Created Date */}
//         <div className="text-xs sm:text-sm text-gray-500 mb-4">
//           Created: {new Date(company.users[0]?.created_at).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </div>
        
//         {/* Actions - Grid on mobile, flex on tablet */}
//         <div className="grid grid-cols-2 gap-1.5">
//           <button
//             onClick={() => navigate(`/admin/company/${company.company_id}`)}
//             className="flex items-center justify-center gap-1.5 px-1.5 py-2 rounded-lg 
//                        bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
//                        text-white text-xs sm:text-sm font-medium shadow-sm hover:shadow-md 
//                        transform hover:scale-105 transition-all duration-200"
//           >
//             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//             </svg>
//             View
//           </button>
          
//           <button
//             onClick={() => navigate(`/admin/edit-customer/${company.company_id}`)}
//             className="flex items-center justify-center gap-1.5 px-1.5 py-2 rounded-lg
//                        bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700
//                        text-white text-xs sm:text-sm font-medium shadow-sm hover:shadow-md
//                        transform hover:scale-105 transition-all duration-200"
//           >
//             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//             </svg>
//             Edit
//           </button>
          

          
//           <button
//             onClick={() => handleDelete(company.company_id, company.company_name)}
//             className="flex items-center justify-center gap-1.5 px-1.5 py-2 rounded-lg
//                        bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800
//                        text-white text-xs sm:text-sm font-medium shadow-sm hover:shadow-md
//                        transform hover:scale-105 transition-all duration-200"
//           >
//             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//             Delete
//           </button>
//         </div>
//       </div>
//     ))}
    
//     {/* Mobile Footer */}
//     <div className="bg-white rounded-xl shadow-md border border-gray-200 px-4 py-3 mt-4">
//       <p className="text-sm text-gray-700 font-medium text-center">
//         Total Customers:{" "}
//         <span className="text-purple-600 font-semibold">
//           {customers.length}
//         </span>
//       </p>
//     </div>
//   </div>
// </>
//         )}

//       </div>
//     </div>
//   );
// }



// src/pages/admin/CustomerList.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminApi } from "../../api/adminApi";
import Swal from "sweetalert2";

export default function CustomerList() {
const { getCustomers, deleteCompany } = useAdminApi();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data || []);
    } catch (err) {
      console.error("Load customers error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

 const handleDelete = async (id, name) => {
  console.log("🟡 deleteCustomer CALLED WITH id =", id, "name =", name);

  Swal.fire({
    title: "Delete Customer?",
    html: `<b>${name}</b> will be permanently removed.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    background: "#fffbeb",
    customClass: {
      popup: "rounded-3xl shadow-xl border border-red-200",
    },
    iconColor: "#dc2626",
  }).then(async (result) => {
    if (!result.isConfirmed) return;

    try {
      console.log("🟠 Sending DELETE request to backend (deleteCompany)...");

      const response = await deleteCompany(id);

      console.log("🟢 COMPANY DELETE SUCCESS RESPONSE:", response);

      setCustomers((prev) => prev.filter((c) => c.company_id !== id));

      Swal.fire({
        icon: "success",
        title: "Company Deleted",
        toast: true,
        position: "top-end",
        timer: 2200,
        showConfirmButton: false,
      });

    } catch (err) {
      console.error("🔴 DELETE COMPANY ERROR:", err?.response?.data || err);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err?.response?.data?.message || "Could not delete company",
      });
    }
  });
};


  return (
          <div
            className="
              w-full
              h-[calc(100vh-80px)]
              overflow-y-scroll
              scroll-smooth
              bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40
              p-3 sm:p-5 md:p-6 lg:p-8
            "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f1f5f9",
        }}
      >

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              Customers
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
              Manage all your customer accounts
            </p>
          </div>

          <Link
            to="/admin/create-customer"
            className="w-full sm:w-auto px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 
              text-white font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg
              hover:scale-105 transition-all duration-200 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2"
          >
            <span className="text-base sm:text-lg md:text-xl">+</span>
            <span className="text-xs sm:text-sm md:text-base">Create Customer</span>
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
            <div className="text-center">
              <div className="inline-block h-10 w-10 sm:h-12 sm:w-12 animate-spin rounded-full border-4 border-indigo-500 border-r-transparent mb-3 sm:mb-4"></div>
              <p className="text-indigo-700 font-semibold text-base sm:text-lg">
                Loading customers...
              </p>
            </div>
          </div>
        ) : customers.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-10 md:p-12 lg:p-16 text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4">📋</div>
          <p className="text-base sm:text-lg md:text-xl text-gray-900 font-semibold mb-2">No customers yet</p>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">
            Create your first customer to get started!
          </p>
          <Link
            to="/admin/create-customer"
            className="inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                    text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            + Create Customer
          </Link>
        </div>
        ) : (

          <>
  {/* Desktop Table View - Hidden on mobile */}
  <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full">

        {/* Header */}
        <thead className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {customers.map((company) => (
            <tr
              key={company.company_id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {/* Company + Emails */}
              <td className="px-6 py-5">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 
                      flex items-center justify-center text-white font-semibold text-lg shadow-sm flex-shrink-0">
                    {company.company_name.charAt(0).toUpperCase()}
                  </div>

                  {/* Name + Emails */}
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 text-base mb-1.5">
                      {company.company_name}
                    </div>

                    <div className="space-y-1">
                      {/* Admin Email */}
                      <div className="flex items-center gap-1.5 text-sm text-gray-700 font-medium">
                        <span className="flex-shrink-0">👤</span>
                        <span className="truncate">{company.users[0]?.email}</span>
                      </div>

                    </div>
                  </div>
                </div>
              </td>

              {/* Created */}
              <td className="px-6 py-5">
                <span className="text-sm text-gray-600 font-medium">
                  {new Date(company.users[0]?.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-5">
                <div className="flex justify-end gap-2">

                  {/* View */}
                  <button
                    onClick={() => navigate(`/admin/company/${company.company_id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg 
                               bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                               text-white text-sm font-medium shadow-sm hover:shadow-md 
                               transform hover:scale-105 transition-all duration-200 ease-in-out
                               border border-blue-700"
                    title="View company details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => navigate(`/admin/edit-customer/${company.company_id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
                               bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700
                               text-white text-sm font-medium shadow-sm hover:shadow-md
                               transform hover:scale-105 transition-all duration-200 ease-in-out
                               border border-amber-600"
                    title="Edit company information"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>

                  

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(company.company_id, company.company_name)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
                               bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800
                               text-white text-sm font-medium shadow-sm hover:shadow-md
                               transform hover:scale-105 transition-all duration-200 ease-in-out
                               border border-rose-700"
                    title="Delete company"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>

    {/* Desktop Footer */}
    <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 px-6 py-4 border-t border-gray-200">
      <p className="text-sm text-gray-700 font-medium text-center">
        Total Customers:{" "}
        <span className="text-purple-600 font-semibold text-base">
          {customers.length}
        </span>
      </p>
    </div>
  </div>

  {/* Mobile/Tablet Card View - Shown on smaller screens */}
<div className="lg:hidden space-y-3 sm:space-y-4">
    {customers.map((company) => (
    <div
      key={company.company_id}
      className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-5 md:p-6"
    >
        {/* Company Header */}
        <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 
              flex items-center justify-center text-white font-semibold text-sm sm:text-base md:text-lg shadow-sm flex-shrink-0">
            {company.company_name.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg mb-1">
              {company.company_name}
            </div>
            
            {/* Admin Email */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-700 font-medium">
              <span className="text-xs sm:text-sm">👤</span>
              <span className="truncate">{company.users[0]?.email}</span>
            </div>
            
          </div>
        </div>
        
        {/* Created Date */}
        <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 pl-0.5">
          Created: {new Date(company.users[0]?.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        
        {/* Actions - Responsive button layout */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          {/* View and Edit in one row on mobile */}
          <div className="flex gap-2 flex-1">
            <button
              onClick={() => navigate(`/admin/company/${company.company_id}`)}
              className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg 
                         bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                         text-white text-xs sm:text-sm font-medium shadow-sm hover:shadow-md 
                         transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View</span>
            </button>
            
            <button
              onClick={() => navigate(`/admin/edit-customer/${company.company_id}`)}
              className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg
                         bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700
                         text-white text-xs sm:text-sm font-medium shadow-sm hover:shadow-md
                         transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit</span>
            </button>
          </div>
          
          {/* Delete button full width on mobile, inline on tablet */}
          <button
            onClick={() => handleDelete(company.company_id, company.company_name)}
            className="w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg
                       bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800
                       text-white text-xs sm:text-sm font-medium shadow-sm hover:shadow-md
                       transform hover:scale-105 transition-all duration-200"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    ))}
    
    {/* Mobile Footer */}
    <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 mt-3 sm:mt-4">
      <p className="text-xs sm:text-sm text-gray-700 font-medium text-center">
        Total Customers:{" "}
        <span className="text-purple-600 font-semibold text-sm sm:text-base">
          {customers.length}
        </span>
      </p>
    </div>
  </div>
</>
        )}

      </div>
    </div>
  );
}