import Header from "@/src/components/header";
import ViewCardsContent from "@/src/components/view-cards/ViewCardsContent";

export default async function ViewCardsPage({
  searchParams,
}: {
  searchParams: Promise<{ sessionId?: string }>;
}) {
  const params = await searchParams;

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-3xl px-8 py-6">
        <ViewCardsContent sessionId={params.sessionId} />
      </main>
    </div>
  );
}