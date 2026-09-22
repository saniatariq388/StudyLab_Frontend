"use client";

import { SlidersHorizontal, Pencil, ChevronDown, Info, ScanSearch, BookOpen } from "lucide-react";

interface ExtractionConfigFormProps {
  sessionName: string;
  onSessionNameChange: (val: string) => void;
  density: "core" | "detailed";
  onDensityChange: (val: "core" | "detailed") => void;
}

export default function ExtractionConfigForm({
  sessionName,
  onSessionNameChange,
  density,
  onDensityChange,
}: ExtractionConfigFormProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal size={18} className="text-gray-700" />
        <h3 className="text-base font-semibold text-gray-900">AI Extraction Configuration</h3>
      </div>

      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Session Name</label>
          <span className="text-xs text-gray-400">Max 80 chars</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3">
          <input
            type="text"
            value={sessionName}
            onChange={(e) => onSessionNameChange(e.target.value)}
            maxLength={80}
            className="flex-1 text-sm text-gray-900 outline-none"
          />
          <Pencil size={14} className="shrink-0 text-gray-300" />
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Target Deck / Folder</label>
        <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm text-gray-900 hover:border-gray-300">
          No folder selected
          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">Extraction Density</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onDensityChange("core")}
            className={`rounded-xl border p-3 text-left ${
              density === "core" ? "border-indigo-400 bg-indigo-50" : "border-gray-200"
            }`}
          >
            <div className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-900">
              <ScanSearch size={14} />
              Core Concepts only
            </div>
            <p className="text-xs text-gray-500">High-yield facts, key terms, definitions</p>
          </button>

          <button
            onClick={() => onDensityChange("detailed")}
            className={`rounded-xl border p-3 text-left ${
              density === "detailed" ? "border-indigo-400 bg-indigo-50" : "border-gray-200"
            }`}
          >
            <div className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-900">
              <BookOpen size={14} />
              Detailed comprehensive
            </div>
            <p className="text-xs text-gray-500">Step-by-step cascades &amp; mechanism nuances</p>
          </button>
        </div>
      </div>

      <div className="flex gap-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-500">
        <Info size={14} className="mt-0.5 shrink-0" />
        <p>AI identifies definitions, mechanisms, and key formulas without creating redundant cards.</p>
      </div>
    </div>
  );
}