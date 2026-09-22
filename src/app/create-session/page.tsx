import Header from "@/src/components/header";
import SessionPageHeader from "@/src/components/create-session/SessionPageHeader";
import CreateSessionFlow from "@/src/components/create-session/CreateSessionFlow";

export default function CreateSessionPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-8 py-6">
        <SessionPageHeader />
        <CreateSessionFlow />
      </main>
    </div>
  );
}