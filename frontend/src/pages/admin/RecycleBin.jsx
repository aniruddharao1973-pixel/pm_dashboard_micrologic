// src\pages\admin\RecycleBin.jsx
import React, { useEffect, useState } from "react";
import { Trash2, RotateCcw, Building2, Folder } from "lucide-react";
import { useDocumentsApi } from "../../api/documentsApi";
import ConfirmRestoreModal from "../../components/modals/ConfirmRestoreModal";
import { toast } from "react-toastify";

export default function RecycleBin() {
  const { getAdminRecycleBinDocuments, restoreDocument } = useDocumentsApi();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const loadRecycleBin = async () => {
    try {
      setLoading(true);
      const res = await getAdminRecycleBinDocuments();
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

  const handleRestore = async () => {
    if (!selectedDoc) return;

    try {
      await restoreDocument(selectedDoc.id);

      toast.success("Document restored successfully");

      setShowConfirm(false);
      setSelectedDoc(null);
      await loadRecycleBin(); // refresh list
    } catch (err) {
      console.error("Restore failed:", err);

      toast.error("Failed to restore document");
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-xl p-5 bg-white shadow-sm"
            >
              <div className="font-semibold text-gray-900 mb-2">
                {doc.title}
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 size={14} />
                  <span>{doc.company_name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Folder size={14} />
                  <span>
                    {doc.project_name} / {doc.folder_name}
                  </span>
                </div>

                <div className="text-xs text-gray-400">
                  Deleted on {new Date(doc.deleted_at).toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedDoc(doc);
                  setShowConfirm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                <RotateCcw size={16} />
                Restore
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmRestoreModal
        isOpen={showConfirm}
        document={selectedDoc}
        message={`Are you sure you want to restore "${selectedDoc?.title}"?
The customer will be notified automatically.`}
        onConfirm={handleRestore}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedDoc(null);
        }}
      />
    </div>
  );
}
