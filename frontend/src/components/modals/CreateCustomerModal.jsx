// import React, { useEffect, useState } from "react";
// import BaseModal from "./BaseModal";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";
// import { Loader2 } from "lucide-react";

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
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Company Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full border rounded-xl px-4 py-3"
//         />

//         <input
//           name="externalId"
//           placeholder="Customer ID"
//           value={form.externalId}
//           onChange={handleChange}
//           className="w-full border rounded-xl px-4 py-3"
//         />

//         <input
//           name="email"
//           placeholder="Admin Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full border rounded-xl px-4 py-3"
//         />

//         <input
//           name="contactPerson"
//           placeholder="Contact Person"
//           value={form.contactPerson}
//           onChange={handleChange}
//           className="w-full border rounded-xl px-4 py-3"
//         />

//         <input
//           name="contactPhone"
//           placeholder="Contact Phone"
//           value={form.contactPhone}
//           onChange={handleChange}
//           className="w-full border rounded-xl px-4 py-3"
//         />

//         <input
//           name="location"
//           placeholder="Location"
//           value={form.location}
//           onChange={handleChange}
//           className="w-full border rounded-xl px-4 py-3"
//         />

//         <input
//           type="date"
//           name="registerDate"
//           value={form.registerDate}
//           onChange={handleChange}
//           className="w-full border rounded-xl px-4 py-3"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//         >
//           {loading && <Loader2 className="w-5 h-5 animate-spin" />}
//           {loading ? "Creating..." : "Create Customer"}
//         </button>
//       </form>
//     </BaseModal>
//   );
// }

// src/components/modals/CreateCustomerModal.jsx
import React, { useEffect, useState } from "react";
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

export default function CreateCustomerModal({ open, onClose, onSuccess }) {
  const { createCustomer } = useAdminApi();

  const [form, setForm] = useState({
    name: "",
    email: "",
    externalId: "",
    location: "",
    contactPerson: "",
    contactPhone: "",
    registerDate: "",
  });

  const [loading, setLoading] = useState(false);

  // Reset form helper
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      externalId: "",
      location: "",
      contactPerson: "",
      contactPhone: "",
      registerDate: "",
    });
  };

  // Reset when modal closes
  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Company Name & Admin Email are required");
      return;
    }

    try {
      setLoading(true);
      await createCustomer(form);
      toast.success("Customer created successfully");
      onSuccess?.();
      resetForm();
      onClose();
    } catch (err) {
      toast.error("Failed to create customer");
    } finally {
      setLoading(false);
    }
  };

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
              Fill in the required information to create a customer profile.
              Fields marked with * are mandatory.
            </p>
          </div>
        </div>

        {/* Form */}
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  Company Name
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Building2 className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Customer ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Hash className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    name="externalId"
                    value={form.externalId}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                    placeholder="e.g., CUST-001"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  Admin Email
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                    placeholder="admin@company.com"
                  />
                </div>
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
                  Contact Person
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    name="contactPerson"
                    value={form.contactPerson}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    name="contactPhone"
                    value={form.contactPhone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Registration Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    name="registerDate"
                    value={form.registerDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
