// frontend/src/pages/admin/EditCustomer.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminApi } from "../../api/adminApi";
import { toast } from "react-toastify";

const EditCustomer = () => {
  console.log("🟦 EditCustomer.jsx MOUNTED");
  try {
  console.log("✅ EditCustomer Component Started Rendering");
} catch (e) {
  console.error("❌ ERROR before rendering:", e);
}


  const { companyId } = useParams();
  console.log("🟪 URL PARAM companyId:", companyId);

  const navigate = useNavigate();
  const { getCustomer, updateCustomer } = useAdminApi();

  const scrollRef = useRef(null);   // ⭐ FIX ADDED

  const [form, setForm] = useState({
    name: "",
    externalId: "",
    location: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    registerDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


useEffect(() => {
  console.log("🟧 FETCHING COMPANY PROFILE for:", companyId);

  const fetchData = async () => {
    try {
      const res = await getCustomer(companyId);
      const c = res.data.company;

      setForm({
        name: c.name || "",
        externalId: c.external_id || "",
        location: c.location || "",
        contactPerson: c.contact_person || "",
        contactEmail: c.contact_email || "",
        contactPhone: c.contact_phone || "",
        registerDate: c.register_date ? c.register_date.slice(0, 10) : "",
      });

    } catch (err) {
      toast.error("Failed to load company data");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [companyId]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (!form.contactEmail.trim()) {
    toast.error("Contact Email (Collaborator) is required.");
    return;
  }

    try {
      setSaving(true);

      await updateCustomer(companyId, form);

      toast.success("Customer updated successfully!");
      navigate("/admin/customers");

    } catch (err) {
      toast.error("Failed to update customer");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full 
                       border-4 border-purple-500 border-r-transparent"></div>
          <p className="mt-3 text-indigo-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

console.log("🟦 Form State:", form);
console.log("🟥 Loading:", loading, "Saving:", saving);
return (
  <div className="w-full px-4 pt-4">

    {/* ⭐ PAGE TITLE */}
    <h1 className="text-4xl font-extrabold bg-gradient-to-r 
                   from-purple-600 via-indigo-500 to-blue-600
                   bg-clip-text text-transparent text-center mb-8 mt-10">
      Edit Customer Profile
    </h1>

    {/* ⭐ SCROLLABLE CONTAINER (same as DocumentsPage) */}
    <div
    ref={scrollRef}
    className="
        max-w-2xl mx-auto
        bg-white/40 backdrop-blur-xl 
        border border-white/50 
        shadow-2xl rounded-3xl 
        p-10
        h-auto
        max-h-[70vh]
        overflow-y-scroll
    "
    style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f1f5f9',
    }}
    >


      {/* ⭐ FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Company Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                     focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Customer ID */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Customer ID
          </label>
          <input
            type="text"
            name="externalId"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                     focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
            value={form.externalId}
            onChange={handleChange}
            placeholder="e.g., YAZ-001"
          />
        </div>

        {/* Contact Person */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Contact Person
          </label>
          <input
            type="text"
            name="contactPerson"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                     focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
            value={form.contactPerson}
            onChange={handleChange}
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Contact Email
          </label>
          <input
            type="email"
            name="contactEmail"
            required   // ⭐ ADD THIS
            className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                    focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
            value={form.contactEmail}
            onChange={handleChange}
            placeholder="collaborator@example.com"
          />

        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Contact Phone
          </label>
          <input
            type="text"
            name="contactPhone"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                     focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
            value={form.contactPhone}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                     focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        {/* Register Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Register Date
          </label>
          <input
            type="date"
            name="registerDate"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                     focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
            value={form.registerDate}
            onChange={handleChange}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className={`w-full py-4 rounded-xl text-white font-semibold text-lg 
                      bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                      hover:scale-[1.02] hover:shadow-2xl
                      transition-all duration-300
                      ${saving ? "opacity-50 cursor-not-allowed" : ""}
                    `}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  </div>
);

};

export default EditCustomer;
