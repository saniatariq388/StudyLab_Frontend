"use client";
import Link from "next/link";
import { Sparkles, Timer } from "lucide-react";
import { GenerationEstimate } from "../../types/createSession";

interface GenerationPanelProps {
  estimate: GenerationEstimate;
}

export default function GenerationPanel({ estimate }: GenerationPanelProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">Estimated Generation Yield</p>
        <p className="text-lg font-semibold text-gray-900">~{estimate.estimatedCards} Cards</p>
      </div>

      <div className="mb-3 flex h-1.5 overflow-hidden rounded-full">
        <div className="bg-indigo-500" style={{ width: "55%" }} />
        <div className="bg-green-500" style={{ width: "30%" }} />
        <div className="bg-orange-400" style={{ width: "15%" }} />
      </div>

      <div className="mb-5 flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          {estimate.mechanismsCount} Mechanisms
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {estimate.termsCount} Terms
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          {estimate.yieldEquationsCount} Yield Equations
        </span>
      </div>

      <Link
        href="/study"
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700"
      >
        <Sparkles size={16} />
        Generate Flashcards with AI
      </Link>


      <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <Timer size={13} />
        Estimated synthesis time: {estimate.estimatedSeconds} seconds
      </p>
    </div>
  );
}