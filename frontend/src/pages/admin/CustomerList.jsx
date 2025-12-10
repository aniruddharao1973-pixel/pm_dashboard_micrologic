// // src/pages/admin/CustomerList.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAdminApi } from "../../api/adminApi";

// export default function CustomerList() {
//   const { getCustomers } = useAdminApi();
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getCustomers();
//         setCustomers(res.data || []);
//       } catch (err) {
//         console.error("Load customers error", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Customers</h1>

//         <Link
//           to="/admin/create-customer"
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           + Create Customer
//         </Link>
//       </div>

//       {loading ? (
//         <p className="text-gray-600">Loading...</p>
//       ) : customers.length === 0 ? (
//         <p className="text-gray-500">No customers yet.</p>
//       ) : (
//         <div className="bg-white rounded shadow overflow-hidden">
//           <table className="min-w-full divide-y">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Created</th>
//                 <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y">
//               {customers.map((c) => (
//                 <tr key={c.id}>
//                   <td className="px-6 py-4">{c.name}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{c.email}</td>

//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {new Date(c.created_at).toLocaleString()}
//                   </td>

//                   <td className="px-6 py-4 text-right">
//                     <div className="flex justify-end gap-2">
//                       {/* View Profile */}
//                       <button
//                         onClick={() => navigate(`/admin/customers/${c.id}`)}
//                         className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                       >
//                         View
//                       </button>

//                       {/* FIXED: Correct Project Creation Route */}
//                       <Link
//                         to={`/admin/create-project/${c.id}`}
//                         className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//                       >
//                         +Project
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


// // src/pages/admin/CustomerList.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAdminApi } from "../../api/adminApi";

// export default function CustomerList() {
//   const { getCustomers } = useAdminApi();
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getCustomers();
//         setCustomers(res.data || []);
//       } catch (err) {
//         console.error("Load customers error", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return (
//     <div className="h-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8 overflow-hidden">

//       <div className="max-w-7xl mx-auto">
        
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
//               Customers
//             </h1>
//             <p className="text-amber-700 font-medium">Manage all your customer accounts</p>
//           </div>

//           <Link
//             to="/admin/create-customer"
//             className="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl 
//                        shadow-lg hover:shadow-2xl hover:shadow-green-300 
//                        transform hover:scale-105 hover:-translate-y-1 
//                        transition-all duration-300 ease-out
//                        border-2 border-green-400"
//           >
//             <span className="flex items-center gap-2">
//               <span className="text-xl">+</span>
//               <span>Create Customer</span>
//             </span>
//           </Link>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent mb-4"></div>
//               <p className="text-amber-700 font-semibold text-lg">Loading customers...</p>
//             </div>
//           </div>
//         ) : customers.length === 0 ? (
//           <div className="bg-gradient-to-br from-white to-amber-50 rounded-3xl shadow-xl border-2 border-amber-200 p-12 text-center">
//             <div className="text-6xl mb-4">📋</div>
//             <p className="text-xl text-amber-700 font-semibold">No customers yet.</p>
//             <p className="text-amber-600 mt-2">Create your first customer to get started!</p>
//           </div>
//         ) : (
//           /* Table Container */
//           <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-amber-200 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
                
//                 {/* Table Header */}
//                 <thead className="bg-gradient-to-r from-orange-100 to-amber-100 border-b-2 border-amber-300">
//                   <tr>
//                     <th className="px-8 py-5 text-left text-sm font-bold text-orange-800 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-8 py-5 text-left text-sm font-bold text-orange-800 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-8 py-5 text-left text-sm font-bold text-orange-800 uppercase tracking-wider">
//                       Created
//                     </th>
//                     <th className="px-8 py-5 text-right text-sm font-bold text-orange-800 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 {/* Table Body */}
//                 <tbody className="divide-y divide-amber-100">
//                   {customers.map((c, index) => (
//                     <tr 
//                       key={c.id}
//                       className="group hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 
//                                  transition-all duration-300 ease-out
//                                  hover:shadow-lg hover:shadow-amber-200/50"
//                       style={{
//                         animationDelay: `${index * 50}ms`
//                       }}
//                     >
//                       {/* Name */}
//                       <td className="px-8 py-5">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 
//                                           flex items-center justify-center text-white font-bold text-lg
//                                           shadow-md group-hover:shadow-lg group-hover:shadow-orange-300
//                                           transform group-hover:scale-110 transition-all duration-300">
//                             {c.name.charAt(0).toUpperCase()}
//                           </div>
//                           <span className="font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
//                             {c.name}
//                           </span>
//                         </div>
//                       </td>

//                       {/* Email */}
//                       <td className="px-8 py-5">
//                         <span className="text-sm text-gray-600 group-hover:text-amber-700 font-medium transition-colors">
//                           {c.email}
//                         </span>
//                       </td>

//                       {/* Created Date */}
//                       <td className="px-8 py-5">
//                         <span className="text-sm text-gray-500 group-hover:text-amber-600 font-medium transition-colors">
//                           {new Date(c.created_at).toLocaleString()}
//                         </span>
//                       </td>

//                       {/* Actions */}
//                       <td className="px-8 py-5">
//                         <div className="flex justify-end gap-3">
//                           {/* View Button */}
//                           <button
//                             onClick={() => navigate(`/admin/customers/${c.id}`)}
//                             className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl
//                                        shadow-md hover:shadow-xl hover:shadow-blue-300
//                                        transform hover:scale-110 hover:-translate-y-1
//                                        transition-all duration-300 ease-out
//                                        border-2 border-blue-400"
//                           >
//                             View
//                           </button>

//                           {/* Project Button */}
//                           <Link
//                             to={`/admin/create-project/${c.id}`}
//                             className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl
//                                        shadow-md hover:shadow-xl hover:shadow-purple-300
//                                        transform hover:scale-110 hover:-translate-y-1
//                                        transition-all duration-300 ease-out
//                                        border-2 border-indigo-400"
//                           >
//                             +Project
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             </div>

//             {/* Table Footer */}
//             <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-8 py-4 border-t-2 border-amber-200">
//               <p className="text-sm text-amber-700 font-semibold text-center">
//                 Total Customers: <span className="text-orange-600 font-bold text-lg">{customers.length}</span>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// // src/pages/admin/CustomerList.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";


// export default function CustomerList() {
//   const { getCustomers, deleteCustomer } = useAdminApi();
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getCustomers();
//         setCustomers(res.data || []);
//       } catch (err) {
//         console.error("Load customers error", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // ⭐ DELETE HANDLER
// const handleDelete = async (id, name) => {
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
//     backdrop: `
//       rgba(0,0,0,0.4)
//       left top
//       no-repeat
//     `,
//     customClass: {
//       popup: 'rounded-3xl shadow-xl border border-red-200',
//       title: 'text-2xl font-extrabold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent',
//       htmlContainer: 'text-amber-800 font-medium',
//       confirmButton: 'rounded-2xl px-7 py-3 font-bold shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300',
//       cancelButton: 'rounded-2xl px-7 py-3 font-bold shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300',
//       actions: 'gap-4'
//     },
//     iconColor: "#dc2626",
//   }).then(async (result) => {

//     if (!result.isConfirmed) return;

//     try {
//       await deleteCustomer(id);

//       setCustomers((prev) => prev.filter((c) => c.id !== id));

//       Swal.fire({
//         icon: "success",
//         title: "Customer Deleted",
//         html: `<p class="text-amber-700 font-medium">${name} removed successfully.</p>`,
//         toast: true,
//         position: "top-end",
//         timer: 2500,
//         timerProgressBar: true,
//         showConfirmButton: false,
//         background: "linear-gradient(135deg, #fde68a 0%, #fbcfe8 100%)",
//         customClass: {
//           popup: 'rounded-xl shadow-2xl border-2 border-orange-300',
//         }
//       });

//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to delete customer",
//         confirmButtonColor: "#ef4444",
//       });
//     }
//   });
// };


//   return (
// <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40 flex">

//   <div className="max-w-7xl mx-auto">

//     {/* Header Section */}
//     <div className="flex items-center justify-between mb-8">
//       <div>
//         <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
//           Customers
//         </h1>
//         <p className="text-indigo-700 font-medium">
//           Manage all your customer accounts
//         </p>
//       </div>

//       <Link
//         to="/admin/create-customer"
//         className="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
//                    text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl
//                    hover:shadow-emerald-300 transform hover:scale-105 hover:-translate-y-1
//                    transition-all duration-300 border-2 border-emerald-400"
//       >
//         <span className="flex items-center gap-2">
//           <span className="text-xl">+</span>
//           <span>Create Customer</span>
//         </span>
//       </Link>
//     </div>

//     {/* Loading */}
//     {loading ? (
//       <div className="flex items-center justify-center py-20">
//         <div className="text-center">
//           <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid 
//                           border-indigo-500 border-r-transparent mb-4"></div>
//           <p className="text-indigo-700 font-semibold text-lg">Loading customers...</p>
//         </div>
//       </div>
//     ) : customers.length === 0 ? (
//       <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-indigo-200 p-12 text-center">
//         <div className="text-6xl mb-4">📋</div>
//         <p className="text-xl text-indigo-700 font-semibold">No customers yet.</p>
//         <p className="text-indigo-600 mt-2">Create your first customer to get started!</p>
//       </div>
//     ) : (
//       /* Table Container */
//       <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">

//             {/* Table Header */}
//             <thead className="bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 border-b border-indigo-300">
//               <tr>
//                 <th className="px-8 py-5 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-8 py-5 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-8 py-5 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
//                   Created
//                 </th>
//                 <th className="px-8 py-5 text-right text-sm font-bold text-indigo-800 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             {/* Table Body */}
// <tbody className="divide-y divide-indigo-100">
//   {customers.map((company, index) => (
//     <tr
//       key={company.company_id}
//       className="group hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 
//                  transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-200/50"
//       style={{ animationDelay: `${index * 50}ms` }}
//     >

//       {/* Company Name + Initial */}
//       <td className="px-8 py-5">
//         <div className="flex items-start gap-3">
//           <div
//             className="w-10 h-10 rounded-full bg-gradient-to-br 
//                         from-purple-500 via-indigo-500 to-blue-600 
//                         flex items-center justify-center text-white font-bold text-lg
//                         shadow-md group-hover:shadow-lg group-hover:shadow-indigo-300
//                         transform group-hover:scale-110 transition-all duration-300"
//           >
//             {company.company_name.charAt(0).toUpperCase()}
//           </div>

//           <div>
//             <div className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
//               {company.company_name}
//             </div>

//             {/* SHOW ALL EMAILS */}
//             <div className="mt-1 space-y-1">
//               {company.users.map((u) => (
//                 <div key={u.id} className="text-sm text-gray-600 group-hover:text-indigo-700">
//                   📧 {u.email}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </td>

//       {/* Created — take newest user created_at */}
//       <td className="px-8 py-5">
//         <span className="text-sm text-gray-500 group-hover:text-indigo-600 font-medium transition-colors">
//           {new Date(company.users[0].created_at).toLocaleString()}
//         </span>
//       </td>

//       {/* Actions */}
//       <td className="px-8 py-5">
//         <div className="flex justify-end gap-3">
          
//           {/* View Company */}
//           <button
//             onClick={() => navigate(`/admin/company/${company.company_id}`)}
//             className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
//                       font-bold rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-300
//                       transform hover:scale-110 hover:-translate-y-1 transition-all duration-300
//                       border-2 border-indigo-400"
//           >
//             View
//           </button>

//           {/* Edit Company */}
//             <button
//               onClick={() => {
//                 console.log("➡ EDIT CLICKED for company:", company.company_id);
//                 navigate(`/admin/edit-customer/${company.company_id}`);
//               }}
//               className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white 
//                         font-bold rounded-xl shadow-md hover:shadow-xl hover:shadow-amber-300
//                         transform hover:scale-110 hover:-translate-y-1 transition-all duration-300
//                         border-2 border-amber-400 flex items-center gap-2"
//             >
//               ✏️ Edit
//             </button>



//           {/* Delete Company */}
//           <button
//             onClick={() => handleDelete(company.company_id, company.company_name)}
//             className="px-5 py-2 bg-red-500 text-white font-bold rounded-xl shadow-md 
//                        hover:shadow-xl hover:shadow-red-300 transform hover:scale-110 
//                        hover:-translate-y-1 transition-all duration-300 border-2 border-red-400 flex items-center gap-2"
//           >
//             🗑 Delete
//           </button>

//         </div>
//       </td>

//     </tr>
//   ))}
// </tbody>

//           </table>
//         </div>

//         {/* Footer */}
//         <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 px-8 py-4 border-t border-indigo-200">
//           <p className="text-sm text-indigo-700 font-semibold text-center">
//             Total Customers: <span className="text-purple-600 font-bold text-lg">{customers.length}</span>
//           </p>
//         </div>

//       </div>
//     )}
//   </div>
// </div>

//   );
// }



// // src/pages/admin/CustomerList.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAdminApi } from "../../api/adminApi";
// import Swal from "sweetalert2";
// import AddCollaboratorModal from "../../components/modals/AddCollaboratorModal";   // ⭐ ADD THIS

// export default function CustomerList() {
// const { getCustomers, deleteCompany } = useAdminApi();

//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // ⭐ NEW: Collaborator Modal State
//   const [openAdd, setOpenAdd] = useState(false);
//   const [selectedCompany, setSelectedCompany] = useState(null);

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

//       // Remove company from UI list
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
//     <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40 flex">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
//               Customers
//             </h1>
//             <p className="text-indigo-700 font-medium">
//               Manage all your customer accounts
//             </p>
//           </div>

//           <Link
//             to="/admin/create-customer"
//             className="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
//                text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl
//                transform hover:scale-105 transition-all duration-300"
//           >
//             <span className="flex items-center gap-2">
//               <span className="text-xl">+</span>
//               <span>Create Customer</span>
//             </span>
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
//           <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-indigo-200 p-12 text-center">
//             <div className="text-6xl mb-4">📋</div>
//             <p className="text-xl text-indigo-700 font-semibold">No customers yet.</p>
//             <p className="text-indigo-600 mt-2">
//               Create your first customer to get started!
//             </p>
//           </div>
//         ) : (
//           <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-200 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full">

//                 {/* Header */}
//                 <thead className="bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 border-b border-indigo-300">
//                   <tr>
//                     <th className="px-8 py-5 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-8 py-5 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-8 py-5 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">
//                       Created
//                     </th>
//                     <th className="px-8 py-5 text-right text-sm font-bold text-indigo-800 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-indigo-100">
//                   {customers.map((company) => (
//                     <tr
//                       key={company.company_id}
//                       className="group hover:bg-indigo-50 transition-all duration-300"
//                     >
//                       {/* Company + Emails */}
//                       <td className="px-8 py-5">
//                         <div className="flex items-start gap-3">
//                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 
//                               flex items-center justify-center text-white font-bold text-lg shadow-md">
//                             {company.company_name.charAt(0).toUpperCase()}
//                           </div>

//                           <div>
//                             <div className="font-semibold text-gray-800">
//                               {company.company_name}
//                             </div>

//                             <div className="mt-1 space-y-1">
//                             {/* Admin Email */}
//                             <div className="text-sm text-gray-800 font-semibold">
//                               👤 Admin: {company.users[0]?.email}
//                             </div>


//                             {/* Collaborators */}
//                             {company.users.slice(1).map((u) => (
//                               <div key={u.id} className="text-sm text-gray-600">
//                                 📧 {u.email}
//                               </div>
//                             ))}

//                             </div>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Created */}
//                       <td className="px-8 py-5">
//                         <span className="text-sm text-gray-600 font-medium">
//                         {
//                         new Date(company.users[0]?.created_at).toLocaleString()

//                         }

//                         </span>
//                       </td>

//                       {/* Actions */}
//                       <td className="px-8 py-5">
//                         <div className="flex justify-end gap-3">

//                           {/* View */}
//                           <button
//                             onClick={() =>
//                               navigate(`/admin/company/${company.company_id}`)
//                             }
//                             className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:scale-110 transition"
//                           >
//                             View
//                           </button>

//                           {/* Edit */}
//                           <button
//                             onClick={() =>
//                               navigate(`/admin/edit-customer/${company.company_id}`)
//                             }
//                             className="px-5 py-2 bg-yellow-500 text-white font-bold rounded-xl shadow-md hover:scale-110 transition"
//                           >
//                             ✏️ Edit
//                           </button>

//                           {/* ⭐ ADD COLLABORATOR BUTTON */}
//                           <button
//                             onClick={() => {
//                               setSelectedCompany(company);
//                               setOpenAdd(true);
//                             }}
//                             className="px-5 py-2 bg-green-600 text-white font-bold rounded-xl shadow-md hover:scale-110 transition"
//                           >
//                             + Add Collaborator
//                           </button>

//                           {/* Delete */}
//                           <button
//                             onClick={() =>
//                               handleDelete(
//                                 company.company_id,
//                                 company.company_name
//                               )
//                             }
//                             className="px-5 py-2 bg-red-500 text-white font-bold rounded-xl shadow-md hover:scale-110 transition"
//                           >
//                             🗑 Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             </div>

//             {/* Footer */}
//             <div className="bg-indigo-50 px-8 py-4 border-t border-indigo-200 text-center">
//               <p className="text-sm text-indigo-700 font-semibold">
//                 Total Customers:{" "}
//                 <span className="text-purple-600 font-bold text-lg">
//                   {customers.length}
//                 </span>
//               </p>
//             </div>
//           </div>
//         )}

//         {/* ⭐ ADD COLLABORATOR MODAL */}
//         <AddCollaboratorModal
//           open={openAdd}
//           onClose={() => setOpenAdd(false)}
//           companyName={selectedCompany?.company_name}
//           companyId={selectedCompany?.company_id}
//           onAdded={loadCustomers}
//         />

//       </div>
//     </div>
//   );
// }




// src/pages/admin/CustomerList.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminApi } from "../../api/adminApi";
import Swal from "sweetalert2";
import AddCollaboratorModal from "../../components/modals/AddCollaboratorModal";

export default function CustomerList() {
const { getCustomers, deleteCompany } = useAdminApi();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [openAdd, setOpenAdd] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

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
          h-[calc(100vh-80px)]    /* adjust for your header height */
          overflow-y-scroll
          scroll-smooth
          bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40
          p-6 md:p-8
        "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f1f5f9",
        }}
      >

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Customers
            </h1>
            <p className="text-gray-600 font-medium">
              Manage all your customer accounts
            </p>
          </div>

          <Link
            to="/admin/create-customer"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
               text-white font-semibold rounded-xl shadow-md hover:shadow-lg
               hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>Create Customer</span>
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-r-transparent mb-4"></div>
              <p className="text-indigo-700 font-semibold text-lg">
                Loading customers...
              </p>
            </div>
          </div>
        ) : customers.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-16 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl text-gray-900 font-semibold mb-2">No customers yet</p>
            <p className="text-gray-600 mb-6">
              Create your first customer to get started!
            </p>
            <Link
              to="/admin/create-customer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
                       text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              + Create Customer
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
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

              {/* Collaborators */}
              {company.users.slice(1).map((u) => (
                <div key={u.id} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <span className="flex-shrink-0">📧</span>
                  <span className="truncate">{u.email}</span>
                </div>
              ))}
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

          {/* Add Collaborator */}
          <button
            onClick={() => {
              setSelectedCompany(company);
              setOpenAdd(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
                       bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800
                       text-white text-sm font-medium shadow-sm hover:shadow-md
                       transform hover:scale-105 transition-all duration-200 ease-in-out
                       border border-emerald-700"
            title="Add collaborator"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add
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

            {/* Footer */}
            <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-700 font-medium text-center">
                Total Customers:{" "}
                <span className="text-purple-600 font-semibold text-base">
                  {customers.length}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Add Collaborator Modal */}
        <AddCollaboratorModal
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          companyName={selectedCompany?.company_name}
          companyId={selectedCompany?.company_id}
          onAdded={loadCustomers}
        />

      </div>
    </div>
  );
}

