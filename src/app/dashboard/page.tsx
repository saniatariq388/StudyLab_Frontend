import Header from "@/src/components/header";
import DashboardContent from "@/src/components/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-8 py-6">
        <DashboardContent />
      </main>
    </div>
  );
}