import Header from "@/src/components/header";
import AnalyticsRealContent from "@/src/components/analytics/AnalyticsRealContent";

export default function AnalyticsPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl space-y-6 px-8 py-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Track your study performance over time.</p>
        </div>
        <AnalyticsRealContent />
      </main>
    </div>
  );
}