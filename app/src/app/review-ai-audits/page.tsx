import HeroBanner from "../_components/ui/hero-banner";
import SearchReview from "../_components/ui/search-review";
import TabsReview from "../_components/ui/tabs-review/tabs-review";

export default function ReviewAiAuditsPage() {
  return (
    <main className="min-h-screen bg-dark-darkMain px-24 text-white">
      <div className="h-8" />
      <HeroBanner
        title="Review AI Audits"
        text="Review AI audits, give feedback and get rewarded."
        img="/ai-review-exp.svg"
        imgAlt="Review Ai Audits Banner"
        imgWidth={260}
        imgHeight={260}
        breakTitle
      />
      <div className="h-8" />
      <SearchReview />
      <div className="h-8" />
      <TabsReview />
      <div className="h-8" />
    </main>
  );
}
