// src/components/modals/ChangePasswordModal.jsx
import React, { useState } from "react";
import { useAxios } from "../../api/axios";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const ChangePasswordModal = ({ open, onChanged, userId }) => {
  const api = useAxios();

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const toast = (icon, title) => {
    Swal.fire({
      icon,
      title,
      toast: true,
      position: "top-end",
      timer: 2200,
      showConfirmButton: false,
      background: "#ffffff",
      color: "#333",
      padding: "10px 16px",
      timerProgressBar: true,
    });
  };

  const submit = async () => {
    if (!newPassword || !confirm) {
      toast("error", "All fields are required");
      return;
    }

    if (newPassword !== confirm) {
      toast("error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/set-new-password", {
        userId,
        newPassword,
      });

      toast("success", "Password updated!");
      onChanged();
    } catch (err) {
      toast("error", err?.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Set New Password
        </h2>

        <div className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 pr-12 focus:ring-2 focus:ring-blue-300"
            />

            <div
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer hover:scale-110 active:scale-90 transition"
            >
              {showNew ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 pr-12 focus:ring-2 focus:ring-blue-300"
            />

            <div
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer hover:scale-110 active:scale-90 transition"
            >
              {showConfirm ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={submit}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white font-medium shadow ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
