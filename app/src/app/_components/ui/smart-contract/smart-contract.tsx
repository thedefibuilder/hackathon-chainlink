import SmartContractForm from "./smart-contract-form";
import SectionTitle from "../section-title";

export default function SmartContract() {
  return (
    <>
      <SectionTitle
        title="Your Smart Contract"
        text="Input your code here and get Audited"
        imgSrc="/terminal.png"
        imgAlt="terminal"
        imgWidth={48}
        imgHeight={48}
      />
      <div className="h-6" />
      <SmartContractForm />
    </>
  );
}
