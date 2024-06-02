import SmartContractForm from "./smart-contract-form";
import SectionTitle from "../section-title";

type SmartContractProps = {
  setRequestId: (requestId: number) => void;
};

export default function SmartContract({ setRequestId }: SmartContractProps) {
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
      <SmartContractForm setRequestId={setRequestId} />
    </>
  );
}
