// // src/components/modals/CreateCustomerModal.jsx
// import React, { useEffect, useState } from "react";
// import BaseModal from "./BaseModal";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";
// import {
//   Loader2,
//   Building2,
//   Mail,
//   Hash,
//   MapPin,
//   User,
//   Phone,
//   Calendar,
//   UserPlus,
//   Info,
// } from "lucide-react";

// export default function CreateCustomerModal({ open, onClose, onSuccess }) {
//   const { createCustomer } = useAdminApi();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     externalId: "",
//     location: "",
//     contactPerson: "",
//     contactPhone: "",
//     registerDate: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // Reset form helper
//   const resetForm = () => {
//     setForm({
//       name: "",
//       email: "",
//       externalId: "",
//       location: "",
//       contactPerson: "",
//       contactPhone: "",
//       registerDate: "",
//     });
//   };

//   // Reset when modal closes
//   useEffect(() => {
//     if (!open) resetForm();
//   }, [open]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name.trim() || !form.email.trim()) {
//       toast.error("Company Name & Admin Email are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createCustomer(form);
//       toast.success("Customer created successfully");
//       onSuccess?.();
//       resetForm();
//       onClose();
//     } catch (err) {
//       toast.error("Failed to create customer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <BaseModal open={open} onClose={onClose} title="Create Customer">
//       <div className="space-y-8">
//         {/* Info Banner */}
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
//           <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//           <div className="space-y-1">
//             <p className="text-sm font-medium text-blue-900">
//               Adding a New Customer
//             </p>
//             <p className="text-sm text-blue-700">
//               Fill in the required information to create a customer profile.
//               Fields marked with * are mandatory.
//             </p>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Company Information */}
//           <div className="space-y-5">
//             <div className="flex items-center gap-2">
//               <Building2 className="w-4 h-4 text-slate-600" />
//               <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
//                 Company Information
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
//                   Company Name
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Building2 className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="Enter company name"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700">
//                   Customer ID
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Hash className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="externalId"
//                     value={form.externalId}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="e.g., CUST-001"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2 md:col-span-2">
//                 <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
//                   Admin Email
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Mail className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="admin@company.com"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-5">
//             <div className="flex items-center gap-2">
//               <User className="w-4 h-4 text-slate-600" />
//               <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
//                 Contact Information
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700">
//                   Contact Person
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <User className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="contactPerson"
//                     value={form.contactPerson}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="John Doe"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Phone className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="contactPhone"
//                     value={form.contactPhone}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="+1 (555) 000-0000"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700">
//                   Location
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <MapPin className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="location"
//                     value={form.location}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="City, Country"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700">
//                   Registration Date
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Calendar className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     type="date"
//                     name="registerDate"
//                     value={form.registerDate}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Creating...
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="w-4 h-4" />
//                   Create Customer
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </BaseModal>
//   );
// }

// // src/components/modals/CreateCustomerModal.jsx
// import React, { useEffect, useState } from "react";
// import BaseModal from "./BaseModal";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";
// import {
//   Loader2,
//   Building2,
//   Mail,
//   Hash,
//   MapPin,
//   User,
//   Phone,
//   Calendar,
//   UserPlus,
//   Info,
// } from "lucide-react";

// // Helper function to get today's date in YYYY-MM-DD format
// const getTodayDate = () => {
//   const today = new Date();
//   return today.toISOString().split("T")[0];
// };

// export default function CreateCustomerModal({ open, onClose, onSuccess }) {
//   const { createCustomer } = useAdminApi();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     externalId: "",
//     location: "",
//     contactPerson: "",
//     contactPhone: "",
//     registerDate: getTodayDate(),
//   });

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Reset form helper
//   const resetForm = () => {
//     setForm({
//       name: "",
//       email: "",
//       externalId: "",
//       location: "",
//       contactPerson: "",
//       contactPhone: "",
//       registerDate: getTodayDate(),
//     });
//   };

//   // Reset when modal closes
//   useEffect(() => {
//     if (!open) resetForm();
//   }, [open]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: null });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = [
//       { key: "name", label: "Company Name" },
//       { key: "email", label: "Admin Email" },
//       { key: "externalId", label: "Customer ID" },
//       { key: "location", label: "Location" },
//       { key: "contactPerson", label: "Contact Person" },
//       { key: "contactPhone", label: "Phone Number" },
//     ];

//     const emptyFields = requiredFields.filter(
//       (field) => !form[field.key]?.trim()
//     );

//     if (emptyFields.length > 0) {
//       toast.error(
//         `Please fill in: ${emptyFields.map((f) => f.label).join(", ")}`
//       );
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     try {
//       setLoading(true);

//       // 🔒 normalize before sending
//       const payload = {
//         ...form,
//         email: form.email.trim().toLowerCase(),
//         contactPhone: form.contactPhone.replace(/\s+/g, ""),
//       };

//       await createCustomer(payload);

//       toast.success("Customer created successfully");
//       onSuccess?.();
//       resetForm();
//       onClose();
//     } catch (err) {
//       const msg = err?.response?.data?.message;

//       if (msg?.toLowerCase().includes("email")) {
//         setErrors({ email: msg });
//       } else if (msg?.toLowerCase().includes("company")) {
//         setErrors({ name: msg });
//       } else if (msg?.toLowerCase().includes("phone")) {
//         setErrors({ contactPhone: msg });
//       } else if (msg?.toLowerCase().includes("customer id")) {
//         setErrors({ externalId: msg });
//       } else {
//         toast.error(msg || "Failed to create customer");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <BaseModal open={open} onClose={onClose} title="Create Customer">
//       <div className="space-y-8">
//         {/* Info Banner */}
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
//           <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//           <div className="space-y-1">
//             <p className="text-sm font-medium text-blue-900">
//               Adding a New Customer
//             </p>
//             <p className="text-sm text-blue-700">
//               Fill in all the required information to create a customer profile.
//               All fields marked with * are mandatory.
//             </p>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Company Information */}
//           <div className="space-y-5">
//             <div className="flex items-center gap-2">
//               <Building2 className="w-4 h-4 text-slate-600" />
//               <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
//                 Company Information
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
//                   Company Name
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Building2 className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="Enter company name"
//                   />

//                   {errors.name && (
//                     <p className="text-xs text-red-600 mt-1">{errors.name}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
//                   Customer ID
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Hash className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="externalId"
//                     value={form.externalId}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="e.g., CUST-001"
//                   />
//                   {errors.externalId && (
//                     <p className="text-xs text-red-600">{errors.externalId}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2 md:col-span-2">
//                 <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
//                   Admin Email
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Mail className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="admin@company.com"
//                   />
//                   {errors.email && (
//                     <p className="text-xs text-red-600">{errors.email}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-5">
//             <div className="flex items-center gap-2">
//               <User className="w-4 h-4 text-slate-600" />
//               <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
//                 Contact Information
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
//                   Contact Person
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <User className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="contactPerson"
//                     value={form.contactPerson}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="John Doe"
//                   />
//                   {errors.contactPerson && (
//                     <p className="text-xs text-red-600">
//                       {errors.contactPerson}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
//                   Phone Number
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Phone className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="contactPhone"
//                     value={form.contactPhone}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="+1 (555) 000-0000"
//                   />
//                   {errors.contactPhone && (
//                     <p className="text-xs text-red-600">
//                       {errors.contactPhone}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
//                   Location
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <MapPin className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     name="location"
//                     value={form.location}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
//                     placeholder="City, Country"
//                   />
//                   {errors.location && (
//                     <p className="text-xs text-red-600">{errors.location}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
//                   Registration Date
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                     <Calendar className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     type="date"
//                     name="registerDate"
//                     value={form.registerDate}
//                     readOnly
//                     disabled
//                     className="w-full pl-10 pr-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-600 cursor-not-allowed"
//                   />
//                 </div>
//                 <p className="text-xs text-slate-500">
//                   Automatically set to today's date
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Creating...
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="w-4 h-4" />
//                   Create Customer
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </BaseModal>
//   );
// }

// src/components/modals/CreateCustomerModal.jsx
import React, { useEffect, useState, useRef } from "react";
import BaseModal from "./BaseModal";
import { useAdminApi } from "../../api/adminApi";
import { toast } from "react-toastify";
import {
  Loader2,
  Building2,
  Mail,
  Hash,
  MapPin,
  User,
  Phone,
  Calendar,
  UserPlus,
  Info,
} from "lucide-react";

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export default function CreateCustomerModal({ open, onClose, onSuccess }) {
  const { createCustomer, validateDuplicate } = useAdminApi();

  const [form, setForm] = useState({
    name: "",
    email: "",
    externalId: "",
    location: "",
    contactPerson: "",
    contactPhone: "",
    registerDate: getTodayDate(),
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const locationDebounceRef = useRef(null);
  const locationWrapperRef = useRef(null);
  const locationCacheRef = useRef({});
  const locationAbortRef = useRef(null);

  /* ---------------------------------------------------
     RESET
  --------------------------------------------------- */
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      externalId: "",
      location: "",
      contactPerson: "",
      contactPhone: "",
      registerDate: getTodayDate(),
    });
    setErrors({});
  };

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        locationWrapperRef.current &&
        !locationWrapperRef.current.contains(e.target)
      ) {
        setLocationSuggestions([]);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setLocationSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ---------------------------------------------------*/
  /* Real Time warning validation helper */
  /* --------------------------------------------------- */

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? null : "Company name is required";

      case "externalId":
        return value.trim() ? null : "Customer ID is required";

      case "email":
        if (!value.trim()) return "Admin email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email address";
        return null;

      case "contactPerson":
        return value.trim() ? null : "Contact person is required";

      case "contactPhone":
        if (!value.trim()) return "Phone number is required";
        if (!/^\d{7,15}$/.test(value.replace(/\s+/g, "")))
          return "Enter a valid phone number";
        return null;

      case "location":
        return value.trim() ? null : "Location is required";

      default:
        return null;
    }
  };

  const debounceRef = useRef(null);

  const checkDuplicateLive = async (type, value) => {
    if (!value?.trim()) return;

    try {
      const { data } = await validateDuplicate({
        type,
        value,
      });

      const fieldMap = {
        email: "email",
        companyName: "name",
        externalId: "externalId",
        phone: "contactPhone",
      };

      const field = fieldMap[type];

      setErrors((prev) => ({
        ...prev,
        [field]: data.exists ? "Already exists" : null,
      }));
    } catch {
      // silent fail – UX only
    }
  };

  /* ---------------------------------------------------
     CHANGE HANDLER
  --------------------------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    // local validation ONLY if no duplicate already exists
    setErrors((prev) => {
      if (prev[name] === "Already exists") return prev;

      return {
        ...prev,
        [name]: validateField(name, value),
      };
    });

    // debounce duplicate check
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (name === "email") checkDuplicateLive("email", value);
      if (name === "name") checkDuplicateLive("companyName", value);
      if (name === "externalId") checkDuplicateLive("externalId", value);
      if (name === "contactPhone") checkDuplicateLive("phone", value);
    }, 400);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (!value?.trim()) return;

    if (name === "email") checkDuplicateLive("email", value);
    if (name === "name") checkDuplicateLive("companyName", value);
    if (name === "externalId") checkDuplicateLive("externalId", value);
    if (name === "contactPhone") checkDuplicateLive("phone", value);
  };

  /* ---------------------------------------------------
     SUBMIT
  --------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Company name is required";
    if (!form.externalId.trim())
      newErrors.externalId = "Customer ID is required";
    if (!form.email.trim()) newErrors.email = "Admin email is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.contactPerson.trim())
      newErrors.contactPerson = "Contact person is required";
    if (!form.contactPhone.trim())
      newErrors.contactPhone = "Phone number is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        email: form.email.trim().toLowerCase(),
        contactPhone: form.contactPhone.replace(/\s+/g, ""),
      };

      await createCustomer(payload);

      toast.success("Customer created successfully");
      onSuccess?.();
      resetForm();
      onClose();
    } catch (err) {
      const msg = err?.response?.data?.message;

      if (msg?.toLowerCase().includes("email")) {
        setErrors({ email: msg });
      } else if (msg?.toLowerCase().includes("company")) {
        setErrors({ name: msg });
      } else if (msg?.toLowerCase().includes("customer id")) {
        setErrors({ externalId: msg });
      } else if (msg?.toLowerCase().includes("phone")) {
        setErrors({ contactPhone: msg });
      } else {
        toast.error(msg || "Failed to create customer");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------------------
     FORM VALIDITY (BUTTON ENABLE LOGIC)
  --------------------------------------------------- */
  const isFormValid =
    form.name.trim() &&
    form.externalId.trim() &&
    form.email.trim() &&
    form.location.trim() &&
    form.contactPerson.trim() &&
    form.contactPhone.trim() &&
    Object.values(errors).every((err) => !err);

  /* ---------------------------------------------------
     UI (UNCHANGED)
  --------------------------------------------------- */
  return (
    <BaseModal open={open} onClose={onClose} title="Create Customer">
      <div className="space-y-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-900">
              Adding a New Customer
            </p>
            <p className="text-sm text-blue-700">
              Fill in all the required information to create a customer profile.
              All fields marked with * are mandatory.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-600" />
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Company Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
                />
                {touched.name && errors.name && (
                  <p className="text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Customer ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Customer ID <span className="text-red-500">*</span>
                </label>
                <input
                  name="externalId"
                  value={form.externalId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
                />
                {touched.externalId && errors.externalId && (
                  <p className="text-xs text-red-600">{errors.externalId}</p>
                )}
              </div>

              {/* Admin Email */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Admin Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-600" />
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
                />
                {touched.contactPerson && errors.contactPerson && (
                  <p className="text-xs text-red-600">{errors.contactPerson}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
                />
                {touched.contactPhone && errors.contactPhone && (
                  <p className="text-xs text-red-600">{errors.contactPhone}</p>
                )}
              </div>

              <div className="space-y-2" ref={locationWrapperRef}>
                <label className="text-sm font-medium text-slate-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  name="location"
                  value={form.location}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  onChange={(e) => {
                    const value = e.target.value;

                    setForm((prev) => ({ ...prev, location: value }));
                    setTouched((prev) => ({ ...prev, location: true }));

                    setErrors((prev) => ({
                      ...prev,
                      location: validateField("location", value),
                    }));

                    if (locationDebounceRef.current)
                      clearTimeout(locationDebounceRef.current);

                    if (value.length < 2) {
                      setLocationSuggestions([]);
                      return;
                    }

                    locationDebounceRef.current = setTimeout(async () => {
                      try {
                        const query = value.toLowerCase();

                        // 1️⃣ Cache hit → instant result
                        if (locationCacheRef.current[query]) {
                          setLocationSuggestions(
                            locationCacheRef.current[query]
                          );
                          return;
                        }

                        // 2️⃣ Abort previous request (prevents lag)
                        if (locationAbortRef.current) {
                          locationAbortRef.current.abort();
                        }

                        locationAbortRef.current = new AbortController();

                        // 3️⃣ Optimized Nominatim request (real data only)
                        const res = await fetch(
                          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                            value
                          )}&format=json&limit=5&accept-language=en&addressdetails=0&countrycodes=in&bounded=1`,
                          { signal: locationAbortRef.current.signal }
                        );

                        const data = await res.json();

                        // 4️⃣ Cache and render
                        locationCacheRef.current[query] = data;
                        setLocationSuggestions(data);
                      } catch (err) {
                        if (err.name !== "AbortError") {
                          setLocationSuggestions([]);
                        }
                      }
                    }, 180);
                  }}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
                />

                {locationSuggestions.length > 0 && (
                  <ul className="border border-slate-200 rounded-lg bg-white shadow-sm max-h-48 overflow-auto">
                    {locationSuggestions.map((item, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-100"
                        onMouseDown={() => {
                          setForm((prev) => ({
                            ...prev,
                            location: item.display_name,
                          }));
                          setLocationSuggestions([]);
                        }}
                      >
                        {item.display_name}
                      </li>
                    ))}
                  </ul>
                )}

                {touched.location && errors.location && (
                  <p className="text-xs text-red-600">{errors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Registration Date
                </label>
                <input
                  value={form.registerDate}
                  disabled
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg
             disabled:opacity-50 disabled:cursor-not-allowed
             flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Customer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}




// // src/components/modals/CreateCustomerModal.jsx
// import React, { useEffect, useState, useRef } from "react";
// import BaseModal from "./BaseModal";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";
// import {
//   Loader2,
//   Building2,
//   Mail,
//   Hash,
//   MapPin,
//   User,
//   Phone,
//   Calendar,
//   UserPlus,
//   Info,
//   CheckCircle2,
//   AlertCircle,
//   X,
//   Sparkles,
// } from "lucide-react";

// // Helper function to get today's date in YYYY-MM-DD format
// const getTodayDate = () => {
//   const today = new Date();
//   return today.toISOString().split("T")[0];
// };

// // Enhanced Input Component
// const FormInput = ({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
//   onBlur,
//   error,
//   touched,
//   icon: Icon,
//   placeholder,
//   disabled = false,
//   required = true,
// }) => {
//   const hasError = touched && error;
//   const isValid = touched && !error && value?.trim();

//   return (
//     <div className="space-y-1.5">
//       <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
//         {label}
//         {required && <span className="text-rose-500">*</span>}
//       </label>
//       <div className="relative group">
//         <div
//           className={`absolute left-0 top-0 h-full w-11 flex items-center justify-center rounded-l-xl border-r transition-all duration-200 ${
//             hasError
//               ? "bg-rose-50 border-rose-200 text-rose-500"
//               : isValid
//               ? "bg-emerald-50 border-emerald-200 text-emerald-600"
//               : disabled
//               ? "bg-slate-100 border-slate-200 text-slate-400"
//               : "bg-slate-50 border-slate-200 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:border-blue-200 group-focus-within:text-blue-600"
//           }`}
//         >
//           <Icon className="w-4 h-4" />
//         </div>
//         <input
//           name={name}
//           type={type}
//           value={value}
//           onChange={onChange}
//           onBlur={onBlur}
//           disabled={disabled}
//           placeholder={placeholder}
//           className={`w-full pl-14 pr-10 py-3 bg-white border rounded-xl text-sm transition-all duration-200 outline-none ${
//             hasError
//               ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
//               : isValid
//               ? "border-emerald-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
//               : disabled
//               ? "bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed"
//               : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
//           }`}
//         />
//         {/* Status Icon */}
//         <div className="absolute right-3 top-1/2 -translate-y-1/2">
//           {hasError && (
//             <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />
//           )}
//           {isValid && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
//         </div>
//       </div>
//       {/* Error Message */}
//       <div
//         className={`overflow-hidden transition-all duration-200 ${
//           hasError ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <p className="flex items-center gap-1.5 text-xs font-medium text-rose-600 mt-1">
//           <AlertCircle className="w-3.5 h-3.5" />
//           {error}
//         </p>
//       </div>
//     </div>
//   );
// };

// // Section Header Component
// const SectionHeader = ({ icon: Icon, title, description }) => (
//   <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
//     <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
//       <Icon className="w-5 h-5 text-blue-600" />
//     </div>
//     <div>
//       <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
//       {description && (
//         <p className="text-xs text-slate-500 mt-0.5">{description}</p>
//       )}
//     </div>
//   </div>
// );

// export default function CreateCustomerModal({ open, onClose, onSuccess }) {
//   const { createCustomer, validateDuplicate } = useAdminApi();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     externalId: "",
//     location: "",
//     contactPerson: "",
//     contactPhone: "",
//     registerDate: getTodayDate(),
//   });

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   // Location autocomplete state + refs
//   const [locationSuggestions, setLocationSuggestions] = useState([]);

//   const locationDebounceRef = useRef(null);
//   const locationWrapperRef = useRef(null);
//   const locationCacheRef = useRef({});
//   const locationAbortRef = useRef(null);

//   /* ---------------------------------------------------
//      RESET
//   --------------------------------------------------- */
//   const resetForm = () => {
//     setForm({
//       name: "",
//       email: "",
//       externalId: "",
//       location: "",
//       contactPerson: "",
//       contactPhone: "",
//       registerDate: getTodayDate(),
//     });
//     setErrors({});
//     setTouched({});
//   };

//   useEffect(() => {
//     if (!open) resetForm();
//   }, [open]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         locationWrapperRef.current &&
//         !locationWrapperRef.current.contains(e.target)
//       ) {
//         setLocationSuggestions([]);
//       }
//     };

//     const handleEscape = (e) => {
//       if (e.key === "Escape") {
//         setLocationSuggestions([]);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   /* ---------------------------------------------------*/
//   /* Real Time warning validation helper */
//   /* --------------------------------------------------- */

//   const validateField = (name, value) => {
//     switch (name) {
//       case "name":
//         return value.trim() ? null : "Company name is required";

//       case "externalId":
//         return value.trim() ? null : "Customer ID is required";

//       case "email":
//         if (!value.trim()) return "Admin email is required";
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           return "Invalid email address";
//         return null;

//       case "contactPerson":
//         return value.trim() ? null : "Contact person is required";

//       case "contactPhone":
//         if (!value.trim()) return "Phone number is required";
//         if (!/^\d{7,15}$/.test(value.replace(/\s+/g, "")))
//           return "Enter a valid phone number";
//         return null;

//       case "location":
//         return value.trim() ? null : "Location is required";

//       default:
//         return null;
//     }
//   };

//   const debounceRef = useRef(null);

//   const checkDuplicateLive = async (type, value) => {
//     if (!value?.trim()) return;

//     try {
//       const { data } = await validateDuplicate({
//         type,
//         value,
//       });

//       const fieldMap = {
//         email: "email",
//         companyName: "name",
//         externalId: "externalId",
//         phone: "contactPhone",
//       };

//       const field = fieldMap[type];

//       setErrors((prev) => ({
//         ...prev,
//         [field]: data.exists ? "Already exists" : null,
//       }));
//     } catch {
//       // silent fail – UX only
//     }
//   };

//   /* ---------------------------------------------------
//      CHANGE HANDLER
//   --------------------------------------------------- */
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({ ...prev, [name]: value }));
//     setTouched((prev) => ({ ...prev, [name]: true }));

//     // local validation ONLY if no duplicate already exists
//     setErrors((prev) => {
//       if (prev[name] === "Already exists") return prev;

//       return {
//         ...prev,
//         [name]: validateField(name, value),
//       };
//     });

//     // debounce duplicate check
//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     debounceRef.current = setTimeout(() => {
//       if (name === "email") checkDuplicateLive("email", value);
//       if (name === "name") checkDuplicateLive("companyName", value);
//       if (name === "externalId") checkDuplicateLive("externalId", value);
//       if (name === "contactPhone") checkDuplicateLive("phone", value);
//     }, 400);
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({
//       ...prev,
//       [name]: value.trim().length > 0,
//     }));

//     if (!value?.trim()) return;

//     if (name === "email") checkDuplicateLive("email", value);
//     if (name === "name") checkDuplicateLive("companyName", value);
//     if (name === "externalId") checkDuplicateLive("externalId", value);
//     if (name === "contactPhone") checkDuplicateLive("phone", value);
//   };

//   /* ---------------------------------------------------
//      SUBMIT
//   --------------------------------------------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     const newErrors = {};

//     if (!form.name.trim()) newErrors.name = "Company name is required";
//     if (!form.externalId.trim())
//       newErrors.externalId = "Customer ID is required";
//     if (!form.email.trim()) newErrors.email = "Admin email is required";
//     if (!form.location.trim()) newErrors.location = "Location is required";
//     if (!form.contactPerson.trim())
//       newErrors.contactPerson = "Contact person is required";
//     if (!form.contactPhone.trim())
//       newErrors.contactPhone = "Phone number is required";

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (form.email && !emailRegex.test(form.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setTouched({
//         name: true,
//         email: true,
//         externalId: true,
//         location: true,
//         contactPerson: true,
//         contactPhone: true,
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         ...form,
//         email: form.email.trim().toLowerCase(),
//         contactPhone: form.contactPhone.replace(/\s+/g, ""),
//       };

//       await createCustomer(payload);

//       toast.success("Customer created successfully");
//       onSuccess?.();
//       resetForm();
//       onClose();
//     } catch (err) {
//       const msg = err?.response?.data?.message;

//       if (msg?.toLowerCase().includes("email")) {
//         setErrors({ email: msg });
//       } else if (msg?.toLowerCase().includes("company")) {
//         setErrors({ name: msg });
//       } else if (msg?.toLowerCase().includes("customer id")) {
//         setErrors({ externalId: msg });
//       } else if (msg?.toLowerCase().includes("phone")) {
//         setErrors({ contactPhone: msg });
//       } else {
//         toast.error(msg || "Failed to create customer");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------------------------------------------
//      FORM VALIDITY (BUTTON ENABLE LOGIC)
//   --------------------------------------------------- */
//   const isFormValid =
//     form.name.trim() &&
//     form.externalId.trim() &&
//     form.email.trim() &&
//     form.location.trim() &&
//     form.contactPerson.trim() &&
//     form.contactPhone.trim() &&
//     Object.values(errors).every((err) => !err);

//   // Calculate completion percentage
//   const validFields = [
//     !errors.name && form.name.trim(),
//     !errors.externalId && form.externalId.trim(),
//     !errors.email && form.email.trim(),
//     !errors.location && form.location.trim(),
//     !errors.contactPerson && form.contactPerson.trim(),
//     !errors.contactPhone && form.contactPhone.trim(),
//   ].filter(Boolean).length;

//   const completionPercentage = Math.round((validFields / 6) * 100);

//   /* ---------------------------------------------------
//      UI
//   --------------------------------------------------- */
//   return (
//     <BaseModal open={open} onClose={onClose} title="Create Customer">
//       <div className="space-y-6">
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Company Information Section */}
//           <div className="space-y-5">
//             <SectionHeader
//               icon={Building2}
//               title="Company Information"
//               description="Basic details about the organization"
//             />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <FormInput
//                 label="Company Name"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={errors.name}
//                 touched={touched.name}
//                 icon={Building2}
//                 placeholder="Enter company name"
//               />

//               <FormInput
//                 label="Customer ID"
//                 name="externalId"
//                 value={form.externalId}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={errors.externalId}
//                 touched={touched.externalId}
//                 icon={Hash}
//                 placeholder="Enter unique customer ID"
//               />

//               <div className="md:col-span-2">
//                 <FormInput
//                   label="Admin Email"
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={errors.email}
//                   touched={touched.email}
//                   icon={Mail}
//                   placeholder="admin@company.com"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Contact Information Section */}
//           <div className="space-y-5">
//             <SectionHeader
//               icon={User}
//               title="Contact Information"
//               description="Primary contact details for communication"
//             />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <FormInput
//                 label="Contact Person"
//                 name="contactPerson"
//                 value={form.contactPerson}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={errors.contactPerson}
//                 touched={touched.contactPerson}
//                 icon={User}
//                 placeholder="Full name of contact person"
//               />

//               <FormInput
//                 label="Phone Number"
//                 name="contactPhone"
//                 value={form.contactPhone}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={errors.contactPhone}
//                 touched={touched.contactPhone}
//                 icon={Phone}
//                 placeholder="+1 234 567 8900"
//               />

//               <div className="space-y-1.5" ref={locationWrapperRef}>
//                 <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
//                   Location <span className="text-rose-500">*</span>
//                 </label>

//                 <div className="relative group">
//                   <div className="absolute left-0 top-0 h-full w-11 flex items-center justify-center rounded-l-xl border-r bg-slate-50 border-slate-200 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:border-blue-200 group-focus-within:text-blue-600">
//                     <MapPin className="w-4 h-4" />
//                   </div>

//                   <input
//                     name="location"
//                     value={form.location}
//                     autoComplete="off"
//                     autoCorrect="off"
//                     spellCheck={false}
//                     placeholder="City, Country"
//                     className={`w-full pl-14 pr-10 py-3 bg-white border rounded-xl text-sm transition-all duration-200 outline-none ${
//                       touched.location && errors.location
//                         ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
//                         : form.location.trim()
//                         ? "border-emerald-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
//                         : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
//                     }`}
//                     onChange={(e) => {
//                       const value = e.target.value;

//                       setForm((prev) => ({ ...prev, location: value }));
//                       setTouched((prev) => ({ ...prev, location: true }));
//                       setErrors((prev) => ({
//                         ...prev,
//                         location: validateField("location", value),
//                       }));

//                       if (locationDebounceRef.current)
//                         clearTimeout(locationDebounceRef.current);

//                       if (value.length < 2) {
//                         setLocationSuggestions([]);
//                         return;
//                       }

//                       locationDebounceRef.current = setTimeout(async () => {
//                         try {
//                           const query = value.toLowerCase();

//                           if (locationCacheRef.current[query]) {
//                             setLocationSuggestions(
//                               locationCacheRef.current[query]
//                             );
//                             return;
//                           }

//                           if (locationAbortRef.current) {
//                             locationAbortRef.current.abort();
//                           }

//                           locationAbortRef.current = new AbortController();

//                           const res = await fetch(
//                             `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//                               value
//                             )}&format=json&limit=5&accept-language=en&addressdetails=0&countrycodes=in&bounded=1`,
//                             { signal: locationAbortRef.current.signal }
//                           );

//                           const data = await res.json();
//                           locationCacheRef.current[query] = data;
//                           setLocationSuggestions(data);
//                         } catch (err) {
//                           if (err.name !== "AbortError") {
//                             setLocationSuggestions([]);
//                           }
//                         }
//                       }, 180);
//                     }}
//                     onBlur={handleBlur}
//                   />

//                   {/* Status icon */}
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                     {touched.location && errors.location && (
//                       <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />
//                     )}
//                     {touched.location &&
//                       !errors.location &&
//                       form.location.trim() && (
//                         <CheckCircle2 className="w-5 h-5 text-emerald-500" />
//                       )}
//                   </div>
//                 </div>

//                 {locationSuggestions.length > 0 && (
//                   <ul className="mt-1 border border-slate-200 rounded-xl bg-white shadow-lg max-h-48 overflow-auto">
//                     {locationSuggestions.map((item, idx) => (
//                       <li
//                         key={idx}
//                         className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-100"
//                         onMouseDown={() => {
//                           setForm((prev) => ({
//                             ...prev,
//                             location: item.display_name,
//                           }));
//                           setLocationSuggestions([]);
//                         }}
//                       >
//                         {item.display_name}
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//                 {touched.location && errors.location && (
//                   <p className="flex items-center gap-1.5 text-xs font-medium text-rose-600 mt-1">
//                     <AlertCircle className="w-3.5 h-3.5" />
//                     {errors.location}
//                   </p>
//                 )}
//               </div>

//               <FormInput
//                 label="Registration Date"
//                 name="registerDate"
//                 value={form.registerDate}
//                 onChange={() => {}}
//                 onBlur={() => {}}
//                 error={null}
//                 touched={false}
//                 icon={Calendar}
//                 disabled={true}
//                 required={false}
//               />
//             </div>
//           </div>

//           {/* Header with Progress */}
//           <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-6 text-white">
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/20" />
//               <div className="absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-white/20" />
//             </div>

//             <div className="relative z-10">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
//                   <UserPlus className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold">
//                     New Customer Profile
//                   </h2>
//                   <p className="text-sm text-blue-100">
//                     Fill in the details to create a customer account
//                   </p>
//                 </div>
//               </div>

//               {/* Progress Bar */}
//               <div className="mt-4">
//                 <div className="flex items-center justify-between text-sm mb-2">
//                   <span className="text-blue-100">Completion Progress</span>
//                   <span className="font-semibold">{completionPercentage}%</span>
//                 </div>
//                 <div className="h-2 bg-white/20 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-white rounded-full transition-all duration-500 ease-out"
//                     style={{ width: `${completionPercentage}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Info Banner */}
//           <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex gap-3">
//             <div className="p-1.5 bg-amber-100 rounded-lg h-fit">
//               <Info className="w-4 h-4 text-amber-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-amber-900">
//                 Important Information
//               </p>
//               <p className="text-sm text-amber-700 mt-0.5">
//                 All fields marked with{" "}
//                 <span className="text-rose-500 font-medium">*</span> are
//                 mandatory. The admin email will receive login credentials.
//               </p>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-200">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all duration-200 flex items-center justify-center gap-2"
//             >
//               <X className="w-4 h-4" />
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading || !isFormValid}
//               className={`w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 flex items-center justify-center gap-2 ${
//                 loading || !isFormValid
//                   ? "bg-slate-300 cursor-not-allowed"
//                   : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   <span>Creating...</span>
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="w-4 h-4" />
//                   <span>Create Customer</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </BaseModal>
//   );
// }
