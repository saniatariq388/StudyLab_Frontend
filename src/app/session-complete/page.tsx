import Header from "@/src/components/header";
import SessionResultContent from "@/src/components/session-result/SessionResultContent";

export default function SessionCompletePage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl space-y-6 px-8 py-6">
        <SessionResultContent />
      </main>
    </div>
  );
}