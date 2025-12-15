// src/components/modals/ConfirmRestoreModal.jsx
import React from "react";
import { RotateCcw, X } from "lucide-react";

const ConfirmRestoreModal = ({
  isOpen,
  document,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Restore Document
          </h2>
          <button onClick={onCancel}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          <p className="text-sm text-gray-700 whitespace-pre-line">{message}</p>

          <div className="bg-gray-50 border rounded-lg p-3">
            <p className="font-medium text-gray-900">{document.title}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md border text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md
                       bg-green-600 text-white
                       hover:bg-green-700
                       flex items-center gap-2"
          >
            <RotateCcw size={14} />
            Restore
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRestoreModal;
