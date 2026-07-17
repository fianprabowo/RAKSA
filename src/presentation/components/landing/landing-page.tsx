import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingStory } from "./landing-story";
import { LandingUseCases } from "./landing-use-cases";
import { LandingHowItWorks } from "./landing-how-it-works";
import { LandingProducts } from "./landing-products";
import { LandingFeatures } from "./landing-features";
import { LandingFaq } from "./landing-faq";
import { LandingCta } from "./landing-cta";
import { LandingFooter } from "./landing-footer";

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-canvas">
      <LandingHeader />
      <main className="text-slate-900">
        <LandingHero />
        <LandingStory />
        <LandingUseCases />
        <LandingHowItWorks />
        <LandingProducts />
        <LandingFeatures />
        <LandingFaq />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
