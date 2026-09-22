import Header from "@/src/components/header";
import HeroLanding from "@/src/components/landing/HeroLanding";
import HowItWorks from "@/src/components/landing/HowItWorks";
import LandingFooter from "@/src/components/landing/LandingFooter";
import { DotPattern } from "@/src/components/ui/dot-pattern";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-white">
      <DotPattern
        width={28}
        height={28}
        cx={1.5}
        cy={1.5}
        cr={1.5}
        className="fill-indigo-300/60"
      />

      <div className="relative z-10">
        <Header />
        <HeroLanding />
        <HowItWorks />
        <LandingFooter />
      </div>
    </div>
  );
}