import SectionTitle from "./section-title";

const content = [
  {
    title: "Audit Contracts",
    text: "Get smart contracts audited in seconds by AI, and understand it’s vulnerabilities.",
    imgSrc: "/terminal.png",
  },
  {
    title: "Review Contracts",
    text: "Get smart contracts audited in seconds by AI, and understand it’s vulnerabilities.",
    imgSrc: "/search_green.svg",
  },
  {
    title: "Deploy Contracts",
    text: "Get smart contracts audited in seconds by AI, and understand it’s vulnerabilities.",
    imgSrc: "/developer_mode_tv.png",
  },
];
export default function DescriptionCard() {
  return (
    <>
      <h1 className="text-center text-5xl font-bold">
        Streamline the Smart Contracts of Your dApp
      </h1>
      <div className="h-6" />
      <div className="h-0.5 w-full bg-primary-purpleMedium" />
      <div className="h-6" />
      <div className="flex w-full  gap-4 ">
        {content.map((item, index) => {
          return (
            <div
              key={index}
              className="relative  rounded-lg bg-dark-darkLight p-4"
            >
              <SectionTitle
                title={item.title}
                text={item.text}
                imgSrc={item.imgSrc}
                imgAlt="icon"
                imgWidth={54}
                imgHeight={54}
                titelStart
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
