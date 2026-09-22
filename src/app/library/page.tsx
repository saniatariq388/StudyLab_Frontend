import Header from "@/src/components/header";
import LibraryRealContent from "@/src/components/library/LibraryRealContent";

export default function LibraryPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Library</h1>
          <p className="mt-1 text-sm text-gray-500">All your saved study sessions in one place.</p>
        </div>
        <LibraryRealContent />
      </main>
    </div>
  );
}