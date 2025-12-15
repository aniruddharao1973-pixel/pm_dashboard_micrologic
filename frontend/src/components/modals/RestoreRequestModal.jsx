// src/components/modals/RestoreRequestModal.jsx
import React, { useState } from "react";
import { Mail, X } from "lucide-react";
import { useDocumentsApi } from "../../api/documentsApi";

const RestoreRequestModal = ({ isOpen, onClose, document }) => {
  // ✅ CORRECT: frontend API name
  const { requestRestore } = useDocumentsApi();
  const [loading, setLoading] = useState(false);

  if (!isOpen || !document) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      // ✅ CORRECT call
      await requestRestore(document.id);

      onClose(true); // success flag
    } catch (err) {
      console.error("Restore request failed:", err);
      alert("Failed to send restore request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Request Restore
          </h2>
          <button onClick={() => onClose(false)}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          <p className="text-sm text-gray-700">
            You are requesting to restore the following document:
          </p>

          <div className="bg-gray-50 border rounded-lg p-3">
            <p className="font-medium text-gray-900">{document.title}</p>
            <p className="text-xs text-gray-500 mt-1">
              Project: {document.project_name}
            </p>
          </div>

          <p className="text-sm text-gray-600">
            An email will be sent to the administrator for approval. The
            document will remain in the recycle bin until approved.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 text-sm rounded-md border text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-md
                       bg-amber-600 text-white
                       hover:bg-amber-700
                       flex items-center gap-2
                       disabled:opacity-60"
          >
            <Mail size={14} />
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreRequestModal;
