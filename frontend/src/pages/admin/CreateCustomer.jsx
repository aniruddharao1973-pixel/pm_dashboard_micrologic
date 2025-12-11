




// // src/pages/admin/CreateCustomer.jsx
// import React, { useState } from "react";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";

// const CreateCustomer = () => {
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
//   const [generatedPw, setGeneratedPw] = useState(null);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!form.name.trim() || !form.email.trim()) {
//     toast.error("Company Name & Admin Email are required");
//     return;
//   }

//   try {
//     setLoading(true);

//     const res = await createCustomer(form);

//     if (res.data.status === "exists") {
//       toast.error("This email is already registered.");
//       return;
//     }

//     toast.success("Customer created successfully!");

//     setGeneratedPw({
//       adminEmail: res.data.adminUser.email,
//       adminPassword: res.data.adminTempPassword,
//     });

//     setForm({
//       name: "",
//       email: "",
//       externalId: "",
//       location: "",
//       contactPerson: "",
//       contactPhone: "",
//       registerDate: "",
//     });

//   } catch (err) {
//     toast.error("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="w-full flex justify-center items-start mt-16 pb-20">

// <div
//   className="
//     w-full 
//     max-w-2xl 
//     bg-white/40 backdrop-blur-xl 
//     border border-white/50 
//     shadow-2xl 
//     rounded-3xl 
//     p-10 mx-4 
//     animate-fadeIn

//     /* 🔥 Scroll Settings */
//     max-h-[80vh]
//     overflow-y-scroll
//   "
//   style={{
//     scrollbarWidth: "thin",
//     scrollbarColor: "#cbd5e1 #f1f5f9",
//   }}
// >


//         {/* Header */}
//         <h1 className="text-4xl font-extrabold bg-gradient-to-r 
//                        from-purple-600 via-indigo-500 to-blue-600
//                        bg-clip-text text-transparent text-center mb-10">
//           Create Customer
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Name */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
//             <input
//               type="text"
//               name="name"
//               className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                          focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
//                          outline-none transition-all shadow-sm"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Enter company name"
//               required
//             />
//           </div>

//           {/* Customer ID */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Customer ID 
//             </label>
//             <input
//               type="text"
//               name="externalId"
//               className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                          focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
//               value={form.externalId}
//               onChange={handleChange}
//               placeholder="e.g., YAZ-001"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Customer Admin Email</label>
//             <input
//               type="email"
//               name="email"
//               className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                          focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="customer@example.com"
//               required
//             />
//           </div>

//           {/* Contact Person */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Contact Person</label>
//             <input
//               type="text"
//               name="contactPerson"
//               className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                          focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
//               value={form.contactPerson}
//               onChange={handleChange}
//               placeholder="Enter contact person's name"
//             />
//           </div>

//           {/* Contact Email (REQUIRED) */}
//           {/* <div>
//             <label className="block text-gray-700 font-semibold mb-2">Contact Email (Collaborator)</label>
//             <input
//               type="email"
//               name="contactEmail"
//               required
//               className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
//               value={form.contactEmail}
//               onChange={handleChange}
//               placeholder="collaborator@example.com"
//             />
//           </div> */}


//           {/* Contact Phone */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Contact Phone</label>
//             <input
//               type="text"
//               name="contactPhone"
//               className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                          focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
//               value={form.contactPhone}
//               onChange={handleChange}
//               placeholder="+91 98765 43210"
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Location</label>
//             <input
//               type="text"
//               name="location"
//               className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                          focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
//               value={form.location}
//               onChange={handleChange}
//               placeholder="City / State / Country"
//             />
//           </div>

//           {/* Register Date */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Register Date</label>
//             <input
//               type="date"
//               name="registerDate"
//               className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                          focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
//               value={form.registerDate}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-4 rounded-xl text-white font-semibold text-lg 
//                         bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600
//                         hover:from-purple-700 hover:via-indigo-600 hover:to-blue-700
//                         shadow-lg hover:shadow-2xl transform hover:scale-[1.02]
//                         transition-all duration-300 ${
//                           loading ? "opacity-50 cursor-not-allowed" : ""
//                         }`}
//           >
//             {loading ? "Creating..." : "Create Customer"}
//           </button>
//         </form>

//         {/* Password Box */}
//         {generatedPw && (
//           <div className="mt-8 p-6 bg-white/70 backdrop-blur-lg rounded-2xl border border-purple-300 shadow-xl">

//             <h2 className="font-bold text-purple-700 mb-4 text-lg">
//               Login Credentials Generated
//             </h2>

//             {/* Admin User */}
//             <div className="bg-white p-4 rounded-xl shadow mb-4">
//               <h3 className="font-semibold text-indigo-600 mb-2">Customer Admin</h3>
//               <p><strong>Email:</strong> {generatedPw.adminEmail}</p>
//               <p>
//                 <strong>Password:</strong>{" "}
//                 <span className="font-mono bg-purple-100 px-3 py-1 rounded-lg text-purple-800">
//                   {generatedPw.adminPassword}
//                 </span>
//               </p>
//             </div>

//           </div>
//         )}



//       </div>
//     </div>
//   );
// };

// export default CreateCustomer;


// src/pages/admin/CreateCustomer.jsx
import React, { useState } from "react";
import { useAdminApi } from "../../api/adminApi";
import { toast } from "react-toastify";

const CreateCustomer = () => {
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
  const [generatedPw, setGeneratedPw] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Company Name & Admin Email are required");
      return;
    }

    try {
      setLoading(true);

      const res = await createCustomer(form);

      if (res.data.status === "exists") {
        toast.error("This email is already registered.");
        return;
      }

      toast.success("Customer created successfully!");

      setGeneratedPw({
        adminEmail: res.data.adminUser.email,
        adminPassword: res.data.adminTempPassword,
      });

      setForm({
        name: "",
        email: "",
        externalId: "",
        location: "",
        contactPerson: "",
        contactPhone: "",
        registerDate: "",
      });

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-start mt-8 sm:mt-12 md:mt-16 pb-10 sm:pb-16 md:pb-20">

      <div
        className="
          w-full 
          max-w-2xl 
          bg-white/40 backdrop-blur-xl 
          border border-white/50 
          shadow-2xl 
          rounded-2xl sm:rounded-3xl 
          p-6 sm:p-8 md:p-10 
          mx-4 
          animate-fadeIn

          /* 🔥 Scroll Settings */
          max-h-[85vh] sm:max-h-[80vh]
          overflow-y-scroll
        "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f1f5f9",
        }}
      >

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r 
                       from-purple-600 via-indigo-500 to-blue-600
                       bg-clip-text text-transparent text-center mb-6 sm:mb-8 md:mb-10">
          Create Customer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-1.5 sm:mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
                         outline-none transition-all shadow-sm text-sm sm:text-base"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Customer ID */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-1.5 sm:mb-2">
              Customer ID 
            </label>
            <input
              type="text"
              name="externalId"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm text-sm sm:text-base"
              value={form.externalId}
              onChange={handleChange}
              placeholder="e.g., YAZ-001"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-1.5 sm:mb-2">
              Customer Admin Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm text-sm sm:text-base"
              value={form.email}
              onChange={handleChange}
              placeholder="customer@example.com"
              required
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-1.5 sm:mb-2">
              Contact Person
            </label>
            <input
              type="text"
              name="contactPerson"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm text-sm sm:text-base"
              value={form.contactPerson}
              onChange={handleChange}
              placeholder="Enter contact person's name"
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-1.5 sm:mb-2">
              Contact Phone
            </label>
            <input
              type="text"
              name="contactPhone"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm text-sm sm:text-base"
              value={form.contactPhone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-1.5 sm:mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm text-sm sm:text-base"
              value={form.location}
              onChange={handleChange}
              placeholder="City / State / Country"
            />
          </div>

          {/* Register Date */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-1.5 sm:mb-2">
              Register Date
            </label>
            <input
              type="date"
              name="registerDate"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm text-sm sm:text-base"
              value={form.registerDate}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 sm:py-3.5 md:py-4 rounded-xl text-white font-semibold 
                        text-base sm:text-lg 
                        bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600
                        hover:from-purple-700 hover:via-indigo-600 hover:to-blue-700
                        shadow-lg hover:shadow-2xl transform hover:scale-[1.02]
                        transition-all duration-300 ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
          >
            {loading ? "Creating..." : "Create Customer"}
          </button>
        </form>

        {/* Password Box */}
        {generatedPw && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-5 md:p-6 bg-white/70 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-purple-300 shadow-xl">

            <h2 className="font-bold text-purple-700 mb-3 sm:mb-4 text-base sm:text-lg">
              Login Credentials Generated
            </h2>

            {/* Admin User */}
            <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow mb-3 sm:mb-4">
              <h3 className="font-semibold text-indigo-600 mb-1.5 sm:mb-2 text-sm sm:text-base">
                Customer Admin
              </h3>
              <p className="text-sm sm:text-base">
                <strong>Email:</strong> {generatedPw.adminEmail}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Password:</strong>{" "}
                <span className="font-mono bg-purple-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-purple-800 text-xs sm:text-sm">
                  {generatedPw.adminPassword}
                </span>
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CreateCustomer;