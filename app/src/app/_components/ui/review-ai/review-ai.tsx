import SectionTitle from "../section-title";
import ReviewAiForm from "./review-ai-form";

export default function ReviewAi() {
  return (
    <>
      <div className="relative">
        <div className="text-textLight bg-dark-darkLight absolute right-0 top-0 rounded-full px-4 py-2">
          <p>*Optional</p>
        </div>
        <SectionTitle
          title="Review AI audit"
          text="Offer a price pool for human help, this will get you top tier devs reviewing your code in exchange of rewards."
          imgSrc="/pageview.svg"
          imgAlt="pageview"
          imgWidth={48}
          imgHeight={48}
        />
      </div>
      <div className="h-8" />
      <ReviewAiForm />
    </>
  );
}
