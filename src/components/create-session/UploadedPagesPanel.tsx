import { Trash2 } from "lucide-react";

interface StagedFile {
  id: string;
  file: File;
}

interface UploadedPagesPanelProps {
  files: StagedFile[];
  onRemove: (id: string) => void;
}

export default function UploadedPagesPanel({ files, onRemove }: UploadedPagesPanelProps) {
  const totalMB = (files.reduce((sum, f) => sum + f.file.size, 0) / (1024 * 1024)).toFixed(1);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="mb-1 text-base font-semibold text-gray-900">Uploaded Pages</h3>
      <p className="mb-4 text-xs text-gray-400">
        {files.length} Pages Staged • {totalMB} MB Total
      </p>

      {files.length === 0 ? (
        <p className="text-sm text-gray-400">No pages uploaded yet.</p>
      ) : (
        <div className="space-y-3">
          {files.map((staged, index) => (
            <div key={staged.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{staged.file.name}</p>
                <p className="text-xs text-gray-400">{(staged.file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button onClick={() => onRemove(staged.id)} className="shrink-0 text-gray-300 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}