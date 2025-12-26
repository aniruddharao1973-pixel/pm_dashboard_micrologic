// import React, { useEffect, useState } from "react";
// import BaseModal from "./BaseModal";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";
// import { Loader2 } from "lucide-react";

// export default function EditCustomerModal({
//   open,
//   companyId,
//   onClose,
//   onSuccess,
// }) {
//   const { getCustomer, updateCustomer } = useAdminApi();

//   const [form, setForm] = useState({
//     name: "",
//     externalId: "",
//     location: "",
//     contactPerson: "",
//     contactPhone: "",
//     registerDate: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // Load customer when modal opens
//   useEffect(() => {
//     if (!open || !companyId) return;

//     setLoading(true);

//     (async () => {
//       try {
//         const res = await getCustomer(companyId);
//         const c = res.data.company;

//         setForm({
//           name: c.name || "",
//           externalId: c.external_id || "",
//           location: c.location || "",
//           contactPerson: c.contact_person || "",
//           contactPhone: c.contact_phone || "",
//           registerDate: c.register_date?.slice(0, 10) || "",
//         });
//       } catch {
//         toast.error("Failed to load customer details");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [open, companyId]);

//   // Reset when modal closes
//   useEffect(() => {
//     if (!open) {
//       setForm({
//         name: "",
//         externalId: "",
//         location: "",
//         contactPerson: "",
//         contactPhone: "",
//         registerDate: "",
//       });
//     }
//   }, [open]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);
//       await updateCustomer(companyId, form);
//       toast.success("Customer updated successfully");
//       onSuccess?.();
//       onClose();
//     } catch {
//       toast.error("Failed to update customer");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <BaseModal open={open} onClose={onClose} title="Edit Customer">
//       {loading ? (
//         <div className="flex items-center justify-center py-10">
//           <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Company Name"
//             className="w-full border rounded-xl px-4 py-3"
//           />

//           <input
//             name="externalId"
//             value={form.externalId}
//             onChange={handleChange}
//             placeholder="Customer ID"
//             className="w-full border rounded-xl px-4 py-3"
//           />

//           <input
//             name="contactPerson"
//             value={form.contactPerson}
//             onChange={handleChange}
//             placeholder="Contact Person"
//             className="w-full border rounded-xl px-4 py-3"
//           />

//           <input
//             name="contactPhone"
//             value={form.contactPhone}
//             onChange={handleChange}
//             placeholder="Contact Phone"
//             className="w-full border rounded-xl px-4 py-3"
//           />

//           <input
//             name="location"
//             value={form.location}
//             onChange={handleChange}
//             placeholder="Location"
//             className="w-full border rounded-xl px-4 py-3"
//           />

//           <input
//             type="date"
//             name="registerDate"
//             value={form.registerDate}
//             onChange={handleChange}
//             className="w-full border rounded-xl px-4 py-3"
//           />

//           <button
//             type="submit"
//             disabled={saving}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//           >
//             {saving && <Loader2 className="w-5 h-5 animate-spin" />}
//             {saving ? "Saving..." : "Save Changes"}
//           </button>
//         </form>
//       )}
//     </BaseModal>
//   );
// }

// src/components/modals/EditCustomerModal.jsx
import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { useAdminApi } from "../../api/adminApi";
import { toast } from "react-toastify";
import {
  Loader2,
  Building2,
  Hash,
  MapPin,
  User,
  Phone,
  Calendar,
  Save,
  Info,
} from "lucide-react";

export default function EditCustomerModal({
  open,
  companyId,
  onClose,
  onSuccess,
}) {
  const { getCustomer, updateCustomer } = useAdminApi();

  const [form, setForm] = useState({
    name: "",
    externalId: "",
    location: "",
    contactPerson: "",
    contactPhone: "",
    registerDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load customer when modal opens
  useEffect(() => {
    if (!open || !companyId) return;

    setLoading(true);

    (async () => {
      try {
        const res = await getCustomer(companyId);
        const c = res.data.company;

        setForm({
          name: c.name || "",
          externalId: c.external_id || "",
          location: c.location || "",
          contactPerson: c.contact_person || "",
          contactPhone: c.contact_phone || "",
          registerDate: c.register_date?.slice(0, 10) || "",
        });
      } catch {
        toast.error("Failed to load customer details");
      } finally {
        setLoading(false);
      }
    })();
  }, [open, companyId]);

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        externalId: "",
        location: "",
        contactPerson: "",
        contactPhone: "",
        registerDate: "",
      });
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updateCustomer(companyId, form);
      toast.success("Customer updated successfully");
      onSuccess?.();
      onClose();
    } catch {
      toast.error("Failed to update customer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Edit Customer">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping opacity-20"></div>
            <div className="relative p-4 bg-white rounded-full shadow-lg">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          </div>
          <p className="text-sm font-medium text-slate-600">
            Loading customer details...
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Info Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-amber-900">
                Editing Customer Profile
              </p>
              <p className="text-sm text-amber-700">
                Update the customer information below. All changes will be saved
                to the system.
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
                  <label className="text-sm font-medium text-slate-700">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Building2 className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors hover:border-slate-400"
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
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors hover:border-slate-400"
                      placeholder="e.g., CUST-001"
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
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors hover:border-slate-400"
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
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors hover:border-slate-400"
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
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors hover:border-slate-400"
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
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors hover:border-slate-400"
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
                disabled={saving}
                className="px-6 py-2.5 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </BaseModal>
  );
}
