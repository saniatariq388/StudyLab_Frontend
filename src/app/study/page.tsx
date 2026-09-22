import Header from "@/src/components/header";
import StudySessionContent from "@/src/components/study/StudySessionContent";

export default function StudyPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-8 py-6">
        <StudySessionContent />
      </main>
    </div>
  );
}