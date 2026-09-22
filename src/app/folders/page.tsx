import Header from "@/src/components/header";
import RealFoldersContent from "@/src/components/folders/RealFoldersContent";

export default function FoldersPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-5xl px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Folders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize your study sessions, or delete ones you no longer need.
          </p>
        </div>
        <RealFoldersContent />
      </main>
    </div>
  );
}