// // frontend/src/components/modals/AddCollaboratorModal.jsx
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useAdminApi } from "../../api/adminApi";

// const AddCollaboratorModal = ({ open, onClose, companyName, companyId, onAdded }) => {
//   const { addCollaborator } = useAdminApi();

//   const [email, setEmail] = useState("");

//   if (!open) return null;

//   const toast = (icon, title) => {
//     Swal.fire({
//       icon,
//       title,
//       toast: true,
//       position: "top-end",
//       timer: 2000,
//       showConfirmButton: false,
//       background: "#fff",
//       color: "#444",
//     });
//   };

//   const handleSubmit = async () => {
//     if (!email.trim()) {
//       toast("error", "Email is required");
//       return;
//     }

//     try {
//       const res = await addCollaborator({
//         companyId,
//         email: email.trim(),
//       });

//       toast("success", "Collaborator added!");
//       onAdded();   // refresh customer list
//       onClose();   // close modal

//     } catch (err) {
//       toast("error", err?.response?.data?.message || "Failed to add collaborator");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-lg animate-fadeIn">
        
//         {/* Header */}
//         <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
//           Add Collaborator
//         </h2>

//         {/* Company */}
//         <div className="mb-4">
//           <label className="text-sm font-medium">Company</label>
//           <input
//             type="text"
//             value={companyName}
//             disabled
//             className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="text-sm font-medium">Collaborator Email</label>
//           <input
//             type="email"
//             placeholder="Enter collaborator email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
//           />
//         </div>

//         {/* Info */}
//         <p className="text-xs text-gray-500 mb-4">
//           A temporary password will be automatically generated and emailed to the collaborator.
//         </p>

//         {/* Buttons */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow hover:opacity-90 transition"
//           >
//             Add Collaborator
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCollaboratorModal;


// frontend/src/components/modals/AddCollaboratorModal.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAdminApi } from "../../api/adminApi";

const AddCollaboratorModal = ({ open, onClose, companyName, companyId, onAdded }) => {
  const { addCollaborator } = useAdminApi();
  const [email, setEmail] = useState("");

  // ⭐ Reset modal input each time modal opens
  useEffect(() => {
    if (open) {
      setEmail("");
    }
  }, [open]);

  if (!open) return null;

  const toast = (icon, title) => {
    Swal.fire({
      icon,
      title,
      toast: true,
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
      background: "#fff",
      color: "#444",
    });
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast("error", "Email is required");
      return;
    }

    // ⭐ Instant feedback + close modal
    toast("success", "Adding collaborator...");
    onClose();

    try {
      await addCollaborator({
        companyId,
        email: email.trim(),
      });

      // Refresh parent list after success
      if (onAdded) onAdded();

      // Optional success toast (if you want a second toast)
      // toast("success", "Collaborator added!");

    } catch (err) {
      toast("error", err?.response?.data?.message || "Failed to add collaborator");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-lg animate-fadeIn">

        {/* Header */}
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Add Collaborator
        </h2>

        {/* Company */}
        <div className="mb-4">
          <label className="text-sm font-medium">Company</label>
          <input
            type="text"
            value={companyName}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium">Collaborator Email</label>
          <input
            type="email"
            placeholder="Enter collaborator email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <p className="text-xs text-gray-500 mb-4">
          A temporary password will be automatically generated and emailed to the collaborator.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow hover:opacity-90 transition"
          >
            Add Collaborator
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddCollaboratorModal;
