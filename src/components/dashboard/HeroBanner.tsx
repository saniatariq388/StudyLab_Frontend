import { Plus } from "lucide-react";
import { DashboardSummary } from "@/src/types/dashboard";

interface HeroBannerProps {
  data: DashboardSummary;
}

export default function HeroBanner({ data }: HeroBannerProps) {
  return (
    <section className="rounded-2xl bg-linear-to-br from-indigo-50 to-white px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-medium text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            • Semester 1 Focus
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {data.userName}. What do you want to revise today?
          </h1>
          <p className="mt-2 max-w-xl text-sm text-gray-500">
            Your spaced retrieval curve is primed. {data.sessionsRequiringConsolidation} target sessions require
            consolidation before the {data.decayThresholdDays}-day memory decay threshold.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm">
            <div className="h-8 w-8 rounded bg-gray-100" />
            <div className="text-xs">
              <p className="text-gray-400">Active Stack</p>
              <p className="font-medium text-gray-900">{data.activeStackName}</p>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
            <Plus size={16} />
            Create New Session
          </button>
        </div>
      </div>
    </section>
  );
}