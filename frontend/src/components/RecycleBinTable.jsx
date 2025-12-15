// src\components\RecycleBinTable.jsx
import React from "react";
import { RotateCcw, Mail } from "lucide-react";
import { formatDate } from "../utils/formatDate";

const RecycleBinTable = ({
  documents = [],
  role,
  onRequestRestore,
  onRestore,
}) => {
  if (!documents.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        Recycle Bin is empty
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left">Document</th>
            <th className="px-4 py-3 text-left">Project</th>
            <th className="px-4 py-3 text-left">Folder</th>
            <th className="px-4 py-3 text-left">Deleted On</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-b hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium text-gray-900">
                {doc.title}
              </td>

              <td className="px-4 py-3 text-gray-600">{doc.project_name}</td>

              <td className="px-4 py-3 text-gray-600">{doc.folder_name}</td>

              <td className="px-4 py-3 text-gray-500">
                {formatDate(doc.deleted_at)}
              </td>

              <td className="px-4 py-3 text-right">
                {role === "customer" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestRestore(doc.id);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5
                               text-xs font-semibold rounded-md
                               bg-amber-100 text-amber-700
                               hover:bg-amber-200 transition"
                  >
                    <Mail size={14} />
                    Request Restore
                  </button>
                )}

                {(role === "admin" || role === "techsales") && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRestore(doc.id);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5
                               text-xs font-semibold rounded-md
                               bg-green-100 text-green-700
                               hover:bg-green-200 transition"
                  >
                    <RotateCcw size={14} />
                    Restore
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecycleBinTable;
