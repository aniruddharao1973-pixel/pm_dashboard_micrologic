// import React, { useState } from "react";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";

// const CreateCustomer = () => {
//   const { createCustomer } = useAdminApi();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [generatedPw, setGeneratedPw] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim() || !email.trim()) {
//       toast.error("Name and Email are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await createCustomer({ name, email });

//       toast.success("Customer created successfully!");

//       setGeneratedPw({
//         email: res.data.customer.email,
//         password: res.data.temporaryPassword,
//       });

//       // reset
//       setName("");
//       setEmail("");

// } catch (err) {
//   const msg = err?.response?.data?.message;

//   if (msg === "Email already in use") {
//     toast.error("This email is already registered. Please ask the customer to log in.");
//     return;
//   }

//   toast.error(msg || "Error creating customer");
// }


//   };

//   return (
// <div className="p-6">
//   <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//     Create Customer
//   </h1>

//   <form 
//     onSubmit={handleSubmit} 
//     className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border border-purple-200 w-full max-w-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
//   >
    
//     {/* Name */}
//     <div className="mb-5">
//       <label className="block text-gray-700 mb-2 font-semibold text-sm">Name</label>
//       <input
//         type="text"
//         className="w-full bg-white border-2 border-purple-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none shadow-sm"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter customer name"
//         required
//       />
//     </div>

//     {/* Email */}
//     <div className="mb-6">
//       <label className="block text-gray-700 mb-2 font-semibold text-sm">Email</label>
//       <input
//         type="email"
//         className="w-full bg-white border-2 border-purple-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none shadow-sm"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="customer@example.com"
//         required
//       />
//     </div>

//     {/* Submit */}
//     <button
//       type="submit"
//       disabled={loading}
//       className={`w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
//       hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 shadow-lg hover:shadow-xl hover:shadow-purple-300/50 transition-all duration-300 ${
//         loading ? "opacity-50 cursor-not-allowed" : ""
//       }`}
//     >
//       {loading ? "Creating..." : "Create Customer"}
//     </button>
//   </form>

//   {/* Show generated password */}
//   {generatedPw && (
//     <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl shadow-lg">
//       <h2 className="font-bold text-green-700 mb-3 text-lg">
//         🎉 Customer Login Details:
//       </h2>
//       <div className="bg-white p-4 rounded-xl space-y-2">
//         <p><strong>Email:</strong> {generatedPw.email}</p>
//         <p><strong>Temporary Password:</strong> <span className="font-mono bg-green-100 px-3 py-1 rounded-lg text-green-800">{generatedPw.password}</span></p>
//       </div>
//     </div>
//   )}
// </div>

//   );
// };

// export default CreateCustomer;


// C:\Users\hp\Desktop\project_management\frontend\src\pages\admin\CreateCustomer.jsx
// import React, { useState } from "react";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";

// const CreateCustomer = () => {
//   const { createCustomer } = useAdminApi();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [generatedPw, setGeneratedPw] = useState(null);

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!name.trim() || !email.trim()) {
//     toast.error("Name and Email are required");
//     return;
//   }

//   try {
//     setLoading(true);

//     const res = await createCustomer({ name, email });

//     // ⭐ If email exists
//     if (res.data.status === "exists") {
//       toast.error("This email is already registered. Please ask the customer to log in.");
//       return;
//     }

//     // ⭐ New customer created
//     toast.success("Customer created successfully!");

//     setGeneratedPw({
//       email: res.data.customer.email,
//       password: res.data.temporaryPassword,
//     });

//     setName("");
//     setEmail("");

//   } catch (err) {
//     toast.error("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//         Create Customer
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border border-purple-200 w-full max-w-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
//       >
//         {/* Name */}
//         <div className="mb-5">
//           <label className="block text-gray-700 mb-2 font-semibold text-sm">Name</label>
//           <input
//             type="text"
//             className="w-full bg-white border-2 border-purple-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none shadow-sm"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter customer name"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2 font-semibold text-sm">Email</label>
//           <input
//             type="email"
//             className="w-full bg-white border-2 border-purple-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none shadow-sm"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="customer@example.com"
//             required
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3.5 rounded-xl text-white font-semibold 
//           bg-gradient-to-r from-orange-400 to-rose-400 
//           hover:from-orange-500 hover:to-rose-500 
//           shadow-md hover:shadow-lg 
//           transition-all duration-300 ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}


//         >
//           {loading ? "Creating..." : "Create Customer"}
//         </button>
//       </form>

//       {/* Show generated password */}
//       {generatedPw && (
//         <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl shadow-lg">
//           <h2 className="font-bold text-green-700 mb-3 text-lg">
//             🎉 Customer Login Details:
//           </h2>
//           <div className="bg-white p-4 rounded-xl space-y-2">
//             <p><strong>Email:</strong> {generatedPw.email}</p>
//             <p>
//               <strong>Temporary Password:</strong>{" "}
//               <span className="font-mono bg-green-100 px-3 py-1 rounded-lg text-green-800">
//                 {generatedPw.password}
//               </span>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateCustomer;


// // src/pages/admin/CreateCustomer.jsx
// import React, { useState } from "react";
// import { useAdminApi } from "../../api/adminApi";
// import { toast } from "react-toastify";

// const CreateCustomer = () => {
//   const { createCustomer } = useAdminApi();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [generatedPw, setGeneratedPw] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim() || !email.trim()) {
//       toast.error("Name and Email are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await createCustomer({ name, email });

//       if (res.data.status === "exists") {
//         toast.error("This email is already registered. Please ask the customer to log in.");
//         return;
//       }

//       toast.success("Customer created successfully!");

//       setGeneratedPw({
//         email: res.data.customer.email,
//         password: res.data.temporaryPassword,
//       });

//       setName("");
//       setEmail("");

//     } catch (err) {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
// <div className="w-full flex justify-center items-start mt-16 pb-20">

//   <div className="w-full max-w-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl 
//                   p-10 mx-4 animate-fadeIn">

//     {/* Header */}
//     <h1 className="text-4xl font-extrabold bg-gradient-to-r 
//                    from-purple-600 via-indigo-500 to-blue-600
//                    bg-clip-text text-transparent text-center mb-10">
//       Create Customer
//     </h1>

//     {/* FORM */}
//     <form onSubmit={handleSubmit} className="space-y-6">

//       {/* Name */}
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Name</label>
//         <input
//           type="text"
//           className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                      focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
//                      outline-none transition-all shadow-sm"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter customer name"
//           required
//         />
//       </div>

//       {/* Email */}
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Email</label>
//         <input
//           type="email"
//           className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
//                      focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
//                      outline-none transition-all shadow-sm"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="customer@example.com"
//           required
//         />
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={loading}
//         className={`w-full py-4 rounded-xl text-white font-semibold text-lg 
//                     bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600
//                     hover:from-purple-700 hover:via-indigo-600 hover:to-blue-700
//                     shadow-lg hover:shadow-2xl transform hover:scale-[1.02]
//                     transition-all duration-300 ${
//                       loading ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//       >
//         {loading ? "Creating..." : "Create Customer"}
//       </button>
//     </form>

//     {/* Password Details Box */}
//     {generatedPw && (
//       <div className="mt-8 p-6 bg-white/70 backdrop-blur-lg rounded-2xl border border-purple-300 shadow-xl">
//         <h2 className="font-bold text-purple-700 mb-3 text-lg">
//           🎉 Customer Login Details
//         </h2>
//         <div className="bg-white p-4 rounded-xl shadow space-y-2">
//           <p><strong>Email:</strong> {generatedPw.email}</p>
//           <p>
//             <strong>Temporary Password: </strong>
//             <span className="font-mono bg-purple-100 px-3 py-1 rounded-lg text-purple-800">
//               {generatedPw.password}
//             </span>
//           </p>
//         </div>
//       </div>
//     )}

//   </div>
// </div>

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
    contactEmail: "",
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

  if (!form.name.trim() || !form.email.trim() || !form.contactEmail.trim()) {
    toast.error("Company Name, Admin Email & Collaborator Email are required");
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
        collabEmail: res.data.collaborator.email,
        collabPassword: res.data.collabTempPassword,
      });



      setForm({
        name: "",
        email: "",
        externalId: "",
        location: "",
        contactPerson: "",
        contactEmail: "",
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
    <div className="w-full flex justify-center items-start mt-16 pb-20">

<div
  className="
    w-full 
    max-w-2xl 
    bg-white/40 backdrop-blur-xl 
    border border-white/50 
    shadow-2xl 
    rounded-3xl 
    p-10 mx-4 
    animate-fadeIn

    /* 🔥 Scroll Settings */
    max-h-[80vh]
    overflow-y-scroll
  "
  style={{
    scrollbarWidth: "thin",
    scrollbarColor: "#cbd5e1 #f1f5f9",
  }}
>


        {/* Header */}
        <h1 className="text-4xl font-extrabold bg-gradient-to-r 
                       from-purple-600 via-indigo-500 to-blue-600
                       bg-clip-text text-transparent text-center mb-10">
          Create Customer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
                         outline-none transition-all shadow-sm"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter company name"
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

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Customer Admin Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
              value={form.email}
              onChange={handleChange}
              placeholder="customer@example.com"
              required
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
              value={form.contactPerson}
              onChange={handleChange}
              placeholder="Enter contact person's name"
            />
          </div>

          {/* Contact Email (REQUIRED) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Contact Email (Collaborator)</label>
            <input
              type="email"
              name="contactEmail"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                        focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="collaborator@example.com"
            />
          </div>


          {/* Contact Phone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Contact Phone</label>
            <input
              type="text"
              name="contactPhone"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
              value={form.contactPhone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
              value={form.location}
              onChange={handleChange}
              placeholder="City / State / Country"
            />
          </div>

          {/* Register Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Register Date</label>
            <input
              type="date"
              name="registerDate"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-purple-300 
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 shadow-sm"
              value={form.registerDate}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-semibold text-lg 
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
          <div className="mt-8 p-6 bg-white/70 backdrop-blur-lg rounded-2xl border border-purple-300 shadow-xl">

            <h2 className="font-bold text-purple-700 mb-4 text-lg">
              🎉 Login Credentials Generated
            </h2>

            {/* Admin User */}
            <div className="bg-white p-4 rounded-xl shadow mb-4">
              <h3 className="font-semibold text-indigo-600 mb-2">Customer Admin</h3>
              <p><strong>Email:</strong> {generatedPw.adminEmail}</p>
              <p>
                <strong>Password:</strong>{" "}
                <span className="font-mono bg-purple-100 px-3 py-1 rounded-lg text-purple-800">
                  {generatedPw.adminPassword}
                </span>
              </p>
            </div>

            {/* Collaborator User */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold text-indigo-600 mb-2">Collaborator</h3>
              <p><strong>Email:</strong> {generatedPw.collabEmail}</p>
              <p>
                <strong>Password:</strong>{" "}
                <span className="font-mono bg-indigo-100 px-3 py-1 rounded-lg text-indigo-800">
                  {generatedPw.collabPassword}
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
