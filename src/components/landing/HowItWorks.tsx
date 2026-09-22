import { Upload, Sparkles, Brain, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload or Paste",
    description: "Snap a photo of a book page, or paste your typed notes directly — no scanning required.",
  },
  {
    icon: Sparkles,
    title: "AI Extracts Key Points",
    description: "Our AI reads your material and identifies the definitions, concepts, and facts worth remembering.",
  },
  {
    icon: Brain,
    title: "Active Recall Study",
    description: "Type your answer before seeing the correct one — proven to build stronger, longer-lasting memory.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "See your accuracy, mastered cards, and weak spots — all organized by folder and session.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-8">
        <h2 className="mb-10 text-center text-2xl font-semibold text-gray-900">How It Works</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
             <div key={step.title} className="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                  <Icon size={20} className="text-indigo-600" />
                </div>
                <p className="mb-1 text-xs font-medium text-indigo-500">Step {i + 1}</p>
                <h3 className="mb-2 font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}