// src\pages\customer\RecycleBin.jsx
import React, { useEffect, useState } from "react";
import { useDocumentsApi } from "../../api/documentsApi";
import RestoreRequestModal from "../../components/modals/RestoreRequestModal";
import { Trash2, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";

export default function RecycleBin() {
  const { getCustomerRecycleBinDocuments, requestRestoreDocument } =
    useDocumentsApi();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const loadRecycleBin = async () => {
    try {
      setLoading(true);
      const res = await getCustomerRecycleBinDocuments();
      setDocuments(res.data || []);
    } catch (err) {
      console.error("Failed to load recycle bin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecycleBin();
  }, []);

  const handleRequestRestore = async () => {
    if (!selectedDoc) return;

    try {
      await requestRestoreDocument(selectedDoc.id);
      setShowConfirm(false);
      setSelectedDoc(null);

      toast.success(
        "Restore request sent to admin. You will be notified once approved."
      );
    } catch (err) {
      console.error("Restore request failed:", err);
      toast.error("Failed to send restore request");
    }
  };

  if (loading) {
    return <div className="p-6">Loading recycle bin…</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trash2 className="text-red-600" />
        <h1 className="text-2xl font-bold">Recycle Bin</h1>
      </div>

      {documents.length === 0 ? (
        <div className="text-gray-500 text-center mt-20">
          No deleted documents
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-xl p-5 bg-gray-50 shadow-sm"
            >
              <div className="mb-2 font-semibold text-gray-900">
                {doc.title}
              </div>

              <div className="text-sm text-gray-500 mb-4">
                Deleted on {new Date(doc.deleted_at).toLocaleDateString()}
              </div>

              <div className="text-xs text-red-600 mb-4">
                This document is frozen and cannot be accessed.
              </div>

              <button
                onClick={() => {
                  setSelectedDoc(doc);
                  setShowConfirm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <RotateCcw size={16} />
                Request Restore
              </button>
            </div>
          ))}
        </div>
      )}

      <RestoreRequestModal
        isOpen={showConfirm}
        document={selectedDoc}
        onClose={(success) => {
          setShowConfirm(false);
          setSelectedDoc(null);

          if (success) {
            toast.success(
              "Restore request sent to admin. You will be notified once approved."
            );
          }
        }}
      />
    </div>
  );
}
